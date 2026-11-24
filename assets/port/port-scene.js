/**
 * Port Scene — a standalone, scroll-driven three.js animation.
 *
 * A container ship is loaded at a Chinese port, sails across the sea and
 * docks at an Indian port. You drive it with a progress value from 0 to 1
 * (usually the scroll position of a section):
 *
 *   import { createPortScene } from "./port-scene.js";
 *   const port = createPortScene(document.querySelector("#port"));
 *   port.setProgress(0.5); // halfway through the story
 *
 * It only adds a <canvas> inside the container and never touches page styles.
 */
import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water.js";

// ---------- Story timeline (fractions of total progress) ----------
export const TIMELINE = {
  loadStart: 0.28, // crane starts loading the last container
  loadEnd: 0.44,
  depart: 0.46, // ship leaves the origin quay
  arrive: 0.84, // ship docks at the destination quay
};

const smooth = (t) => t * t * (3 - 2 * t);
const clamp01 = (t) => Math.min(1, Math.max(0, t));

/** 0 → 1 fraction of the sea voyage for a given story progress. */
export function voyageFraction(progress) {
  return smooth(clamp01((progress - TIMELINE.depart) / (TIMELINE.arrive - TIMELINE.depart)));
}

const DEST_X = 700; // distance between the two ports along the sea lane
const DOCK_Z = 9; // ship centre distance from the quay edge

const DEFAULTS = {
  shipName: "Import Now",
  originFlag: "china",
  destinationFlag: "india",
  waterNormals: undefined, // URL override for the water ripple texture
  maxPixelRatio: 1.5,
  shadows: true,
  frameShift: 0.16, // 0 = centred; 0.16 moves the scene right on wide screens
  onReady: undefined,
};

// ---------- Small helpers ----------
function seeded(seed) {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function canvasTexture(w, h, draw) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  draw(c.getContext("2d"), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function flagTexture(kind) {
  return canvasTexture(300, 200, (ctx, w, h) => {
    if (kind === "india") {
      ctx.fillStyle = "#ff9933";
      ctx.fillRect(0, 0, w, h / 3);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, h / 3, w, h / 3);
      ctx.fillStyle = "#138808";
      ctx.fillRect(0, (2 * h) / 3, w, h / 3);
      ctx.strokeStyle = "#000080";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, h / 7.5, 0, Math.PI * 2);
      ctx.stroke();
      for (let i = 0; i < 24; i++) {
        const a = (i / 24) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(w / 2, h / 2);
        ctx.lineTo(w / 2 + Math.cos(a) * (h / 7.5), h / 2 + Math.sin(a) * (h / 7.5));
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    } else {
      ctx.fillStyle = "#de2910";
      ctx.fillRect(0, 0, w, h);
      const star = (cx, cy, r, rot) => {
        ctx.beginPath();
        for (let i = 0; i < 10; i++) {
          const rr = i % 2 === 0 ? r : r * 0.4;
          const a = rot + (i * Math.PI) / 5 - Math.PI / 2;
          ctx.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
        }
        ctx.closePath();
        ctx.fillStyle = "#ffde00";
        ctx.fill();
      };
      star(50, 50, 30, 0);
      star(100, 20, 10, 0.4);
      star(120, 40, 10, 0.8);
      star(120, 70, 10, 0);
      star(100, 90, 10, 0.4);
    }
  });
}

// ---------- Scene ----------
/**
 * @param {HTMLElement} container
 * @param {Partial<typeof DEFAULTS>} [userOptions]
 */
export function createPortScene(container, userOptions = {}) {
  if (!container) throw new Error("createPortScene: container element not found");
  const opts = { ...DEFAULTS, ...userOptions };
  const rand = seeded(20251123);
  const disposables = [];
  const track = (o) => (disposables.push(o), o);

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, opts.maxPixelRatio));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = !!opts.shadows;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  const canvas = renderer.domElement;
  canvas.style.display = "block";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  container.appendChild(canvas);

  const scene = new THREE.Scene();
  const FOG = new THREE.Color("#d7dde0");
  scene.fog = new THREE.Fog(FOG, 70, 400);
  scene.background = track(
    canvasTexture(4, 256, (ctx, w, h) => {
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#9fb1bd");
      g.addColorStop(0.55, "#cdd6db");
      g.addColorStop(1, "#dfe4e6");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    }),
  );

  const camera = new THREE.PerspectiveCamera(42, 1, 0.5, 2000);

  // Light: overcast sky + soft sun that follows the ship for shadows.
  scene.add(new THREE.HemisphereLight(0xe8eef2, 0x5a6066, 1.4));
  const sun = new THREE.DirectionalLight(0xfff2e2, 2.4);
  sun.castShadow = !!opts.shadows;
  sun.shadow.mapSize.set(2048, 2048);
  const sc = sun.shadow.camera;
  sc.left = -90;
  sc.right = 90;
  sc.top = 90;
  sc.bottom = -90;
  sc.near = 1;
  sc.far = 400;
  sun.shadow.bias = -0.0005;
  sun.shadow.normalBias = 0.4;
  scene.add(sun, sun.target);
  const SUN_OFFSET = new THREE.Vector3(70, 110, 60);

  // Loading
  const manager = new THREE.LoadingManager();
  const loader = new THREE.TextureLoader(manager);
  let texturesLoaded = false;
  manager.onLoad = () => (texturesLoaded = true);

  // Water
  const normals = track(
    loader.load(opts.waterNormals || new URL("./textures/waternormals.jpg", import.meta.url).href),
  );
  normals.wrapS = normals.wrapT = THREE.RepeatWrapping;
  const water = new Water(track(new THREE.PlaneGeometry(4000, 2000)), {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: normals,
    sunDirection: SUN_OFFSET.clone().normalize(),
    sunColor: 0xfff4e6,
    waterColor: 0x3c4e57,
    distortionScale: 2.2,
    fog: true,
  });
  water.rotation.x = -Math.PI / 2;
  water.position.x = DEST_X / 2;
  water.material.uniforms.size.value = 1.6;
  track(water.material);
  scene.add(water);

  // ---- Shared materials ----
  const mat = (o) => track(new THREE.MeshStandardMaterial({ roughness: 0.8, metalness: 0.05, ...o }));
  const concreteTex = track(
    canvasTexture(256, 256, (ctx, w, h) => {
      ctx.fillStyle = "#9a9d9e";
      ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < 2500; i++) {
        const v = 130 + Math.floor(rand() * 50);
        ctx.fillStyle = `rgba(${v},${v},${v},0.35)`;
        ctx.fillRect(rand() * w, rand() * h, 2, 2);
      }
      ctx.strokeStyle = "rgba(60,60,60,0.25)";
      for (let i = 0; i <= 4; i++) {
        ctx.beginPath();
        ctx.moveTo((i * w) / 4, 0);
        ctx.lineTo((i * w) / 4, h);
        ctx.stroke();
      }
    }),
  );
  concreteTex.wrapS = concreteTex.wrapT = THREE.RepeatWrapping;
  concreteTex.repeat.set(20, 6);
  const containerTex = track(
    canvasTexture(128, 64, (ctx, w, h) => {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
      for (let x = 0; x < w; x += 6) {
        ctx.fillStyle = "rgba(0,0,0,0.18)";
        ctx.fillRect(x, 0, 2, h);
      }
      ctx.strokeStyle = "rgba(0,0,0,0.35)";
      ctx.lineWidth = 3;
      ctx.strokeRect(1, 1, w - 2, h - 2);
    }),
  );
  const CONTAINER_COLORS = [
    "#b23a2e", "#2f5d8a", "#3f7d4e", "#d1a23a", "#c7652e",
    "#6b7f8e", "#8f2f3a", "#e3e3de", "#355f6b", "#2b3f66",
  ].map((c) => new THREE.Color(c));
  const containerMat = mat({ map: containerTex, roughness: 0.65, metalness: 0.2 });
  const containerGeo = track(new THREE.BoxGeometry(6.1, 2.6, 2.44));

  const concreteMat = mat({ map: concreteTex, roughness: 0.95 });
  const quaySideMat = mat({ color: 0x6f7375, roughness: 1 });
  const stripeMat = mat({ color: 0xe2b93b, roughness: 0.6 });
  const darkMat = mat({ color: 0x222428, roughness: 0.6 });
  const whiteMat = mat({ color: 0xeeeeea, roughness: 0.7 });
  const poleMat = mat({ color: 0xb8bcbf, metalness: 0.6, roughness: 0.4 });
  const skylineMat = mat({ color: 0xc3cbd0, roughness: 1 });

  // ---------- Builders ----------
  function addContainersInstanced(positions, parent, castShadow = true) {
    const mesh = new THREE.InstancedMesh(containerGeo, containerMat, positions.length);
    const m = new THREE.Matrix4();
    positions.forEach((p, i) => {
      m.makeRotationY(p.ry || 0);
      m.setPosition(p.x, p.y, p.z);
      mesh.setMatrixAt(i, m);
      mesh.setColorAt(i, CONTAINER_COLORS[Math.floor(rand() * CONTAINER_COLORS.length)]);
    });
    mesh.castShadow = castShadow;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }

  function buildCrane(color) {
    const g = new THREE.Group();
    const m = mat({ color, roughness: 0.55, metalness: 0.3 });
    const box = (w, h, d, x, y, z) => {
      const b = new THREE.Mesh(track(new THREE.BoxGeometry(w, h, d)), m);
      b.position.set(x, y, z);
      b.castShadow = true;
      g.add(b);
      return b;
    };
    for (const x of [-6, 6]) for (const z of [-3, -20]) box(1.3, 28, 1.3, x, 14, z);
    box(13.3, 1.6, 1.6, 0, 27, -3);
    box(13.3, 1.6, 1.6, 0, 27, -20);
    box(13.3, 1, 1, 0, 9, -3);
    box(13.3, 1, 1, 0, 9, -20);
    for (const x of [-6, 6]) {
      box(1, 1, 17, x, 9, -11.5);
      const brace = box(0.6, 22, 0.6, x, 17, -11.5);
      brace.rotation.x = Math.atan2(17, 18);
    }
    // girders: back-reach to boom over the water
    for (const x of [-4.5, 4.5]) box(1.2, 2.2, 62, x, 30, 0);
    box(10, 1, 1, 0, 30, 30.5);
    box(9, 4.5, 8, 0, 33.4, -15); // machinery house
    // A-frame + stays
    for (const x of [-4.5, 4.5]) {
      box(1, 14, 1, x, 38, -5);
    }
    box(10, 1, 1, 0, 45, -5);
    const stayPts = [
      [new THREE.Vector3(0, 45, -5), new THREE.Vector3(-4.5, 31, 30)],
      [new THREE.Vector3(0, 45, -5), new THREE.Vector3(4.5, 31, 30)],
      [new THREE.Vector3(0, 45, -5), new THREE.Vector3(-4.5, 31, 14)],
      [new THREE.Vector3(0, 45, -5), new THREE.Vector3(4.5, 31, 14)],
      [new THREE.Vector3(0, 45, -5), new THREE.Vector3(-4.5, 31, -30)],
      [new THREE.Vector3(0, 45, -5), new THREE.Vector3(4.5, 31, -30)],
    ];
    const lineMat = track(new THREE.LineBasicMaterial({ color: 0x333333 }));
    for (const [a, b] of stayPts) {
      g.add(new THREE.Line(track(new THREE.BufferGeometry().setFromPoints([a, b])), lineMat));
    }
    // trolley + spreader (animated on the loading crane)
    const trolley = box(5, 1.4, 4, 0, 28.6, 10);
    const spreader = new THREE.Mesh(track(new THREE.BoxGeometry(6.4, 0.6, 2.6)), darkMat);
    spreader.castShadow = true;
    g.add(spreader);
    const cable = new THREE.Mesh(track(new THREE.BoxGeometry(0.12, 1, 0.12)), darkMat);
    g.add(cable);
    const setSpreader = (z, y) => {
      trolley.position.z = z;
      spreader.position.set(0, y, z);
      const top = 28;
      const len = Math.max(0.1, top - y);
      cable.scale.y = len;
      cable.position.set(0, y + len / 2, z);
    };
    setSpreader(10, 20);
    return { group: g, setSpreader };
  }

  function buildWarehouse(roofColor) {
    const g = new THREE.Group();
    const body = new THREE.Mesh(track(new THREE.BoxGeometry(40, 10, 24)), whiteMat);
    body.position.y = 5;
    const roof = new THREE.Mesh(
      track(new THREE.CylinderGeometry(12, 12, 40, 32)),
      mat({ color: roofColor, roughness: 0.6 }),
    );
    roof.rotation.z = Math.PI / 2;
    roof.scale.set(0.5, 1, 1);
    roof.position.y = 10;
    body.castShadow = body.receiveShadow = roof.castShadow = true;
    g.add(body, roof);
    return g;
  }

  const flags = [];
  function buildFlag(kind) {
    const g = new THREE.Group();
    const pole = new THREE.Mesh(track(new THREE.CylinderGeometry(0.15, 0.2, 16, 8)), poleMat);
    pole.position.y = 8;
    const geo = track(new THREE.PlaneGeometry(4.5, 3, 12, 1));
    const cloth = new THREE.Mesh(
      geo,
      track(new THREE.MeshStandardMaterial({ map: track(flagTexture(kind)), side: THREE.DoubleSide, roughness: 0.9 })),
    );
    cloth.position.set(2.3, 14.3, 0);
    g.add(pole, cloth);
    flags.push({ geo, base: Float32Array.from(geo.attributes.position.array) });
    return g;
  }

  function buildPort({ x0, x1, craneColor, roofColor, flag, cranes, loadingCraneX }) {
    const port = new THREE.Group();
    const len = x1 - x0;
    const cx = (x0 + x1) / 2;
    // quay slab
    const slab = new THREE.Mesh(track(new THREE.BoxGeometry(len, 4, 90)), [
      quaySideMat, quaySideMat, concreteMat, quaySideMat, quaySideMat, quaySideMat,
    ]);
    slab.position.set(cx, 1, -45);
    slab.receiveShadow = true;
    port.add(slab);
    const stripe = new THREE.Mesh(track(new THREE.BoxGeometry(len, 0.08, 0.6)), stripeMat);
    stripe.position.set(cx, 3.05, -1.2);
    port.add(stripe);
    // fenders + bollards
    const bollGeo = track(new THREE.CylinderGeometry(0.35, 0.45, 0.9, 10));
    const fenderGeo = track(new THREE.BoxGeometry(1.2, 2.6, 0.7));
    const nB = Math.floor(len / 9);
    const boll = new THREE.InstancedMesh(bollGeo, darkMat, nB);
    const fend = new THREE.InstancedMesh(fenderGeo, darkMat, nB);
    const m4 = new THREE.Matrix4();
    for (let i = 0; i < nB; i++) {
      m4.makeTranslation(x0 + 4 + i * 9, 3.45, -0.6);
      boll.setMatrixAt(i, m4);
      m4.makeTranslation(x0 + 4 + i * 9, 1.6, 0.2);
      fend.setMatrixAt(i, m4);
    }
    port.add(boll, fend);
    // cranes
    const craneObjs = [];
    for (const x of cranes) {
      const c = buildCrane(craneColor);
      c.group.position.set(x, 3, 0);
      port.add(c.group);
      craneObjs.push({ x, ...c });
    }
    // container yard
    const yard = [];
    for (let row = 0; row < 7; row++) {
      for (let bay = 0; bay < Math.floor(len / 7); bay++) {
        if (rand() < 0.22) continue;
        const h = 1 + Math.floor(rand() * 4);
        for (let t = 0; t < h; t++) {
          yard.push({ x: x0 + 5 + bay * 7, y: 3 + 1.3 + t * 2.6, z: -28 - row * 3.2 });
        }
      }
    }
    addContainersInstanced(yard, port);
    // a few containers waiting on the apron
    const apron = [];
    for (let i = 0; i < Math.floor(len / 16); i++) {
      const x = x0 + 8 + i * 16 + rand() * 4;
      if (loadingCraneX !== undefined && Math.abs(x - loadingCraneX) < 8) continue;
      apron.push({ x, y: 4.3, z: -10 - rand() * 6 });
      if (rand() < 0.5) apron.push({ x, y: 6.9, z: -10 - rand() * 2 });
    }
    addContainersInstanced(apron, port);
    // warehouses
    for (let i = 0; i < 4; i++) {
      const w = buildWarehouse(roofColor);
      w.position.set(x0 + 30 + i * (len / 4), 3, -66);
      port.add(w);
    }
    // light masts
    for (let x = x0 + 20; x < x1; x += 45) {
      const pole = new THREE.Mesh(track(new THREE.CylinderGeometry(0.25, 0.35, 30, 8)), poleMat);
      pole.position.set(x, 18, -22);
      const head = new THREE.Mesh(track(new THREE.BoxGeometry(2.4, 0.8, 1)), poleMat);
      head.position.set(x, 33, -22);
      port.add(pole, head);
    }
    // flag at the quay
    const f = buildFlag(flag);
    f.position.set(x0 + 26, 3, -4);
    port.add(f);
    // skyline in the fog
    const sky = new THREE.InstancedMesh(track(new THREE.BoxGeometry(1, 1, 1)), skylineMat, 46);
    for (let i = 0; i < 46; i++) {
      const w = 10 + rand() * 18;
      const h = 20 + rand() * 80;
      m4.makeScale(w, h, w);
      m4.setPosition(cx - 300 + rand() * 600, h / 2, -230 - rand() * 120);
      sky.setMatrixAt(i, m4);
    }
    port.add(sky);
    scene.add(port);
    return craneObjs;
  }

  const LOAD_CRANE_X = -3.9;
  const originCranes = buildPort({
    x0: -150, x1: 110, craneColor: 0xc8312b, roofColor: 0xa8322d,
    flag: opts.originFlag, cranes: [-60, -30, LOAD_CRANE_X, 30, 62], loadingCraneX: LOAD_CRANE_X,
  });
  buildPort({
    x0: DEST_X - 130, x1: DEST_X + 130, craneColor: 0x2c3035, roofColor: 0x2e3338,
    flag: opts.destinationFlag, cranes: [DEST_X - 50, DEST_X - 20, DEST_X + 25, DEST_X + 55],
  });
  const loadingCrane = originCranes.find((c) => c.x === LOAD_CRANE_X);

  // ---------- Ship ----------
  const ship = new THREE.Group();
  const shipBody = new THREE.Group(); // bobbing happens here
  ship.add(shipBody);
  scene.add(ship);
  {
    const shape = new THREE.Shape();
    shape.moveTo(-31, -5);
    shape.lineTo(20, -5);
    shape.quadraticCurveTo(30, -4, 33, 0);
    shape.quadraticCurveTo(30, 4, 20, 5);
    shape.lineTo(-31, 5);
    shape.quadraticCurveTo(-33, 0, -31, -5);
    const hullMat = mat({ color: 0x1c212b, roughness: 0.5, metalness: 0.3 });
    const deckMat = mat({ color: 0x4b4f52, roughness: 0.9 });
    const redMat = mat({ color: 0x8e2a24, roughness: 0.6 });
    const makeHull = (depth, y, material) => {
      const geo = track(new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false }));
      geo.rotateX(-Math.PI / 2);
      const mesh = new THREE.Mesh(geo, material);
      mesh.position.y = y;
      mesh.castShadow = mesh.receiveShadow = true;
      shipBody.add(mesh);
      return mesh;
    };
    makeHull(3.2, -3, [redMat, redMat]);
    makeHull(4.4, 0.2, [deckMat, hullMat]);
    const stripe = new THREE.Mesh(
      track(new THREE.BoxGeometry(51, 0.25, 10.06)),
      whiteMat,
    );
    stripe.position.set(-5.5, 4.1, 0);
    shipBody.add(stripe);

    // Name on both sides
    const nameTex = track(
      canvasTexture(1024, 128, (ctx, w, h) => {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "#f2f2ee";
        ctx.font = "800 86px system-ui, -apple-system, 'Segoe UI', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(String(opts.shipName).toUpperCase(), w / 2, h / 2 + 4);
      }),
    );
    const nameMat = track(new THREE.MeshBasicMaterial({ map: nameTex, transparent: true, depthWrite: false, toneMapped: false }));
    const nameGeo = track(new THREE.PlaneGeometry(22, 2.75));
    const n1 = new THREE.Mesh(nameGeo, nameMat);
    n1.position.set(4, 2.3, 5.03);
    const n2 = new THREE.Mesh(nameGeo, nameMat);
    n2.position.set(4, 2.3, -5.03);
    n2.rotation.y = Math.PI;
    shipBody.add(n1, n2);

    // Bridge / accommodation block at the stern
    const winTex = track(
      canvasTexture(256, 256, (ctx, w, h) => {
        ctx.fillStyle = "#f1f1ec";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#2c3540";
        for (let r = 0; r < 6; r++) for (let c = 0; c < 8; c++) ctx.fillRect(10 + c * 31, 14 + r * 41, 18, 14);
      }),
    );
    const bridge = new THREE.Mesh(track(new THREE.BoxGeometry(7, 11, 9)), mat({ map: winTex, roughness: 0.6 }));
    bridge.position.set(-25, 4.6 + 5.5, 0);
    const wing = new THREE.Mesh(track(new THREE.BoxGeometry(4, 1.6, 12)), whiteMat);
    wing.position.set(-23.5, 4.6 + 11.8, 0);
    const funnel = new THREE.Mesh(track(new THREE.BoxGeometry(3, 6, 3.4)), darkMat);
    funnel.position.set(-29.3, 4.6 + 10, 0);
    const funnelBand = new THREE.Mesh(track(new THREE.BoxGeometry(3.05, 1, 3.45)), redMat);
    funnelBand.position.set(-29.3, 4.6 + 11.5, 0);
    const mast = new THREE.Mesh(track(new THREE.CylinderGeometry(0.15, 0.15, 6, 6)), poleMat);
    mast.position.set(-24, 4.6 + 15, 0);
    [bridge, wing, funnel].forEach((o) => (o.castShadow = o.receiveShadow = true));
    shipBody.add(bridge, wing, funnel, funnelBand, mast);
  }
  // Deck cargo
  const DECK_Y = 4.6 + 1.3;
  const slot = (bay, row, tier) =>
    new THREE.Vector3(-16.5 + bay * 6.4, DECK_Y + tier * 2.6, -3.75 + row * 2.5);
  const LOAD_SLOTS = [
    { bay: 1, row: 1, tier: 2 },
    { bay: 2, row: 1, tier: 2 },
    { bay: 3, row: 1, tier: 2 },
    { bay: 4, row: 1, tier: 2 },
  ];
  const deck = [];
  for (let bay = 0; bay < 7; bay++)
    for (let row = 0; row < 4; row++)
      for (let tier = 0; tier < 3; tier++) {
        if (LOAD_SLOTS.some((slot) => bay === slot.bay && row === slot.row && tier === slot.tier)) continue;
        if (tier === 2 && bay === 6 && rand() < 0.6) continue;
        const p = slot(bay, row, tier);
        deck.push({ x: p.x, y: p.y, z: p.z });
      }
  addContainersInstanced(deck, shipBody);

  const loadBoxes = LOAD_SLOTS.map((loadSlot, index) => {
    const target = slot(loadSlot.bay, loadSlot.row, loadSlot.tier);
    const box = new THREE.Mesh(
      containerGeo,
      mat({
        map: containerTex,
        color: CONTAINER_COLORS[index].getHex(),
        roughness: 0.65,
        metalness: 0.2,
      }),
    );
    box.castShadow = true;
    shipBody.add(box);
    return {
      box,
      target,
      lifted: new THREE.Vector3(target.x, target.y + 12, target.z),
      overQuay: new THREE.Vector3(target.x + 14, target.y + 12, -4 - (index % 2) * 4),
      landed: new THREE.Vector3(target.x + 14, 4.3, -4 - (index % 2) * 4),
      source: new THREE.Vector3(
        LOAD_CRANE_X + (index % 2) * 7,
        4.3,
        -12 - Math.floor(index / 2) * 3.2,
      ),
    };
  });

  // ---------- Story → world ----------
  const shipPos = new THREE.Vector3();
  function shipPlacement(p, out) {
    const v = voyageFraction(p);
    out.set(v * DEST_X, 0, DOCK_Z + Math.sin(Math.PI * v) * 34);
    return v;
  }

  // Camera keys: offsets from the ship (position, look-at target).
  const KEYS = [
    { p: 0.0, pos: [-75, 46, 100], look: [10, 8, -18] },
    { p: 0.14, pos: [-62, 32, 88], look: [0, 10, -12] },
    { p: 0.28, pos: [32, 28, 70], look: [-4, 14, 0] },
    { p: 0.44, pos: [52, 16, 60], look: [-2, 8, 0] },
    { p: 0.56, pos: [-52, 15, 60], look: [6, 5, 0] },
    { p: 0.7, pos: [56, 10, 44], look: [0, 6, 0] },
    { p: 0.84, pos: [-58, 30, 80], look: [12, 8, -16] },
    { p: 1.0, pos: [-85, 56, 115], look: [16, 10, -22] },
  ].map((k) => ({ p: k.p, pos: new THREE.Vector3(...k.pos), look: new THREE.Vector3(...k.look) }));
  const camOffset = new THREE.Vector3();
  const lookOffset = new THREE.Vector3();
  const lookAt = new THREE.Vector3();
  function cameraKey(p) {
    let i = 0;
    while (i < KEYS.length - 2 && p > KEYS[i + 1].p) i++;
    const a = KEYS[i];
    const b = KEYS[i + 1];
    const t = smooth(clamp01((p - a.p) / (b.p - a.p)));
    camOffset.lerpVectors(a.pos, b.pos, t);
    lookOffset.lerpVectors(a.look, b.look, t);
  }

  const tmp = new THREE.Vector3();
  const ahead = new THREE.Vector3();
  function applyStory(p, time) {
    shipPlacement(p, shipPos);
    shipPlacement(Math.min(1, p + 0.002), ahead);
    ship.position.copy(shipPos);
    const dx = ahead.x - shipPos.x;
    const dz = ahead.z - shipPos.z;
    ship.rotation.y = Math.hypot(dx, dz) > 1e-3 ? -Math.atan2(dz, dx) : 0;
    const moving = p > TIMELINE.depart && p < TIMELINE.arrive ? 1 : 0.35;
    shipBody.position.y = Math.sin(time * 0.9) * 0.18 * moving;
    shipBody.rotation.x = Math.sin(time * 0.7) * 0.012 * moving;
    shipBody.rotation.z = Math.sin(time * 0.5 + 1) * 0.006 * moving;

    // Crane loading sequence
    const l = clamp01((p - TIMELINE.loadStart) / (TIMELINE.loadEnd - TIMELINE.loadStart));
    const startZ = -12;
    const endZ = DOCK_Z + loadBoxes[0].target.z;
    const quayY = 3 + 1.3;
    const liftY = 24;
    const endY = loadBoxes[0].target.y;
    const loadingProgress = clamp01((p - TIMELINE.loadStart) / (TIMELINE.loadEnd - TIMELINE.loadStart));
    let activeLoad = -1;
    loadBoxes.forEach(({ box, target, lifted, overQuay, landed, source }, index) => {
      const rawStep = loadingProgress * loadBoxes.length - index;
      const step = clamp01(rawStep);
      box.visible = true;
      box.position.lerpVectors(source, target, step);
      const unloading = clamp01((p - TIMELINE.arrive) / (1 - TIMELINE.arrive));
      const unloadStep = clamp01(unloading * loadBoxes.length - index);
      if (unloadStep > 0) {
        if (unloadStep < 0.25) {
          box.position.lerpVectors(target, lifted, smooth(unloadStep / 0.25));
        } else if (unloadStep < 0.75) {
          box.position.lerpVectors(lifted, overQuay, smooth((unloadStep - 0.25) / 0.5));
        } else {
          box.position.lerpVectors(overQuay, landed, smooth((unloadStep - 0.75) / 0.25));
        }
      }
      box.scale.setScalar(1);
      if (loadingProgress < 1 && rawStep >= 0 && rawStep < 1) activeLoad = index;
    });
    if (p < TIMELINE.loadEnd) {
      let z = startZ;
      let y = quayY;
      if (activeLoad >= 0) {
        const l = loadingProgress * loadBoxes.length - activeLoad;
        const { target } = loadBoxes[activeLoad];
        const loadEndZ = DOCK_Z + target.z;
        if (l < 0.25) y = THREE.MathUtils.lerp(quayY, liftY, smooth(l / 0.25));
        else if (l < 0.7) {
          y = liftY;
          z = THREE.MathUtils.lerp(startZ, loadEndZ, smooth((l - 0.25) / 0.45));
        } else {
          z = loadEndZ;
          y = THREE.MathUtils.lerp(liftY, target.y, smooth((l - 0.7) / 0.3));
        }
      }
      loadingCrane.setSpreader(z, y + 1.6);
    } else {
      const back = clamp01((p - TIMELINE.loadEnd) / 0.04);
      loadingCrane.setSpreader(endZ, THREE.MathUtils.lerp(endY + 1.6, 22, smooth(back)));
    }

    // Camera
    cameraKey(p);
    camera.position.copy(shipPos).add(camOffset);
    camera.position.y += Math.sin(time * 0.3) * 0.3;
    lookAt.copy(shipPos).add(lookOffset);
    camera.lookAt(lookAt);

    // Sun follows for crisp shadows near the ship
    sun.position.copy(shipPos).add(SUN_OFFSET);
    sun.target.position.copy(shipPos);

    // Flags flutter
    for (const f of flags) {
      const pos = f.geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = f.base[i * 3];
        pos.setZ(i, Math.sin(x * 1.6 - time * 4) * 0.25 * ((x + 2.25) / 4.5));
      }
      pos.needsUpdate = true;
    }
    tmp.set(0, 0, 0);
  }

  // ---------- Sizing & loop ----------
  const resize = () => {
    const w = container.clientWidth || 300;
    const h = container.clientHeight || 300;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // keep the framing on tall/narrow screens
    camera.fov = camera.aspect < 1 ? 60 : 42;
    // On wide screens shift the picture right, leaving room for text on the left.
    const shift = camera.aspect > 1.1 ? opts.frameShift : 0;
    if (shift) camera.setViewOffset(w, h, -w * shift, 0, w, h);
    else camera.clearViewOffset();
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  let visible = true;
  const io = new IntersectionObserver(([e]) => (visible = e ? e.isIntersecting : true));
  io.observe(container);

  let target = 0;
  let current = 0;
  let time = 0;
  let last = performance.now();
  let rafId = 0;
  let readyFired = false;
  const frame = (now) => {
    rafId = requestAnimationFrame(frame);
    const dt = THREE.MathUtils.clamp((now - last) / 1000, 0, 0.05);
    last = now;
    if (!visible || document.hidden) return;
    time += dt;
    current += (target - current) * (1 - Math.exp(-6 * dt));
    if (Math.abs(target - current) < 1e-5) current = target;
    water.material.uniforms.time.value += dt * 0.45;
    applyStory(current, time);
    renderer.render(scene, camera);
    if (texturesLoaded && !readyFired) {
      readyFired = true;
      if (typeof opts.onReady === "function") opts.onReady();
    }
  };
  applyStory(0, 0);
  rafId = requestAnimationFrame(frame);

  return {
    scene,
    camera,
    renderer,
    /** Story progress 0 → 1. The scene eases toward it smoothly. */
    setProgress(p) {
      target = clamp01(Number(p) || 0);
    },
    /** Jump straight to a progress value without easing. */
    jumpTo(p) {
      target = current = clamp01(Number(p) || 0);
    },
    get progress() {
      return current;
    },
    destroy() {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      water.geometry.dispose();
      water.material.dispose();
      disposables.forEach((d) => d.dispose && d.dispose());
      scene.traverse((o) => o.isInstancedMesh && o.dispose());
      renderer.dispose();
      if (canvas.parentNode === container) container.removeChild(canvas);
    },
  };
}
