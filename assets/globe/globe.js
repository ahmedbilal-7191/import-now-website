/**
 * Shipping Globe — a standalone three.js component.
 *
 *   import { createShippingGlobe } from "./globe.js";
 *   const globe = createShippingGlobe(document.querySelector("#globe"));
 *   // later: globe.destroy();
 *
 * The component only adds a <canvas> inside the container you pass. It never
 * touches page styles, so it fits into any layout. Give the container a size.
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const EARTH_RADIUS = 1;

function defaultTextures() {
  // Resolved relative to this file, so the textures folder travels with globe.js.
  return {
    day: new URL("./textures/earth-blue-marble.jpg", import.meta.url).href,
    bump: new URL("./textures/earth-topology.png", import.meta.url).href,
    specular: new URL("./textures/earth-water.png", import.meta.url).href,
    clouds: new URL("./textures/earth-clouds.png", import.meta.url).href,
  };
}

const DEFAULTS = {
  from: { name: "Shanghai", country: "China", lat: 31.2304, lon: 121.4737 },
  to: { name: "Mumbai", country: "India", lat: 19.076, lon: 72.8777 },
  focus: { lat: 22, lon: 100 }, // point that faces the camera at start (Asia)
  rotationSpeed: 0.035, // radians per second
  routeDuration: 5, // seconds for one ship trip
  arcAltitude: 0.3, // arc height above the surface, in earth radii
  arcColor: "#ffb547",
  markerColor: "#ff6a3d",
  atmosphereColor: "#5fa8ff",
  clouds: true,
  stars: true,
  labels: true,
  interactive: true, // drag to rotate
  autoSway: false,
  pointerControl: false,
  swayAmplitude: 0.13,
  swayPeriod: 24,
  zoom: false, // mouse-wheel zoom (off so page scrolling still works)
  maxPixelRatio: 2,
  textures: undefined, // { day, bump, specular, clouds } URLs to override
  onReady: undefined, // called once textures have loaded
};

/** Latitude/longitude in degrees to a point on a sphere (matches three.js sphere UVs). */
export function latLonToVector3(lat, lon, radius = EARTH_RADIUS) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

/** Points along the great circle between two coordinates, lifted into an arc. */
function arcPoints(from, to, altitude, segments = 128) {
  const a = latLonToVector3(from.lat, from.lon).normalize();
  const b = latLonToVector3(to.lat, to.lon).normalize();
  const omega = a.angleTo(b);
  const sinO = Math.sin(omega);
  const points = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const dir =
      sinO < 1e-6
        ? a.clone()
        : a
            .clone()
            .multiplyScalar(Math.sin((1 - t) * omega) / sinO)
            .add(b.clone().multiplyScalar(Math.sin(t * omega) / sinO));
    const r = EARTH_RADIUS * (1.004 + altitude * Math.sin(Math.PI * t));
    points.push(dir.normalize().multiplyScalar(r));
  }
  return points;
}

function glowTexture(color) {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.18, color);
  g.addColorStop(0.45, color + "55");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function drawFlag(ctx, country, x, y, width, height) {
  const flagCountry = country.toLowerCase();
  if (flagCountry !== "india" && flagCountry !== "china") return;
  const isIndia = flagCountry === "india";
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, 4);
  ctx.clip();

  if (isIndia) {
    ctx.fillStyle = "#ff9933";
    ctx.fillRect(x, y, width, height / 3);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x, y + height / 3, width, height / 3);
    ctx.fillStyle = "#138808";
    ctx.fillRect(x, y + (height * 2) / 3, width, height / 3);
    ctx.strokeStyle = "#000080";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(x + width / 2, y + height / 2, height * 0.14, 0, Math.PI * 2);
    ctx.stroke();
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(x + width / 2, y + height / 2);
      ctx.lineTo(
        x + width / 2 + Math.cos(angle) * height * 0.14,
        y + height / 2 + Math.sin(angle) * height * 0.14,
      );
      ctx.stroke();
    }
  } else {
    ctx.fillStyle = "#de2910";
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = "#ffde00";
    const star = (cx, cy, outer, inner) => {
      ctx.beginPath();
      for (let i = 0; i < 10; i++) {
        const radius = i % 2 ? inner : outer;
        const angle = -Math.PI / 2 + (i * Math.PI) / 5;
        const px = cx + Math.cos(angle) * radius;
        const py = cy + Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    };
    star(x + width * 0.25, y + height * 0.32, 4.2, 1.8);
    star(x + width * 0.55, y + height * 0.18, 1.5, 0.65);
    star(x + width * 0.67, y + height * 0.36, 1.5, 0.65);
    star(x + width * 0.67, y + height * 0.58, 1.5, 0.65);
    star(x + width * 0.55, y + height * 0.77, 1.5, 0.65);
  }
  ctx.restore();

  ctx.strokeStyle = "rgba(17, 24, 39, 0.18)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, 4);
  ctx.stroke();
}

function labelSprite(title, country) {
  const w = 512;
  const h = 128;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  const font = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
  const flagWidth = 36;
  const flagHeight = 24;
  const padding = 22;
  const gap = 12;
  ctx.font = `700 40px ${font}`;
  const titleW = ctx.measureText(title).width;
  const boxW = Math.min(w - 8, titleW + flagWidth + gap + padding * 2);
  const x = (w - boxW) / 2;
  ctx.shadowColor = "rgba(15, 23, 42, 0.24)";
  ctx.shadowBlur = 16;
  ctx.shadowOffsetY = 6;
  ctx.fillStyle = "rgba(255, 255, 255, 0.98)";
  ctx.beginPath();
  ctx.roundRect(x, 8, boxW, h - 16, (h - 16) / 2);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  ctx.strokeStyle = "rgba(17, 24, 39, 0.12)";
  ctx.lineWidth = 2;
  ctx.stroke();
  const flagX = x + padding;
  const flagY = (h - flagHeight) / 2;
  drawFlag(ctx, country, flagX, flagY, flagWidth, flagHeight);
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#171717";
  ctx.font = `700 40px ${font}`;
  ctx.fillText(title, flagX + flagWidth + gap, 77);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }),
  );
  sprite.scale.set(0.42, 0.11, 1);
  sprite.center.set(0.5, 0);
  return sprite;
}

const atmosphereVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;
const haloFragment = /* glsl */ `
  uniform vec3 uColor;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    float f = clamp(-dot(vNormal, vViewDir), 0.0, 1.0);
    float intensity = pow(f, 1.6) * 1.0;
    gl_FragColor = vec4(uColor * intensity, intensity);
  }
`;
const rimFragment = /* glsl */ `
  uniform vec3 uColor;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    float rim = 1.0 - clamp(dot(vNormal, vViewDir), 0.0, 1.0);
    float intensity = pow(rim, 4.0) * 0.65;
    gl_FragColor = vec4(uColor * intensity, intensity);
  }
`;

/**
 * Mounts an animated 3D globe inside `container`.
 * @param {HTMLElement} container
 * @param {Partial<typeof DEFAULTS>} [userOptions]
 */
export function createShippingGlobe(container, userOptions = {}) {
  if (!container) throw new Error("createShippingGlobe: container element not found");
  const opts = { ...DEFAULTS, ...userOptions };
  const textures = { ...defaultTextures(), ...(opts.textures || {}) };
  const routes =
    Array.isArray(opts.routes) && opts.routes.length
      ? opts.routes.filter((route) => route && route.from && route.to)
      : [{ from: opts.from, to: opts.to }];
  if (!routes.length) throw new Error("createShippingGlobe: at least one route is required");
  const reducedMotion =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const disposables = [];
  const track = (obj) => (disposables.push(obj), obj);

  // Renderer — transparent so the page background shows through.
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, opts.maxPixelRatio));
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.style.display = "block";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.outline = "none";
  container.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 400);
  camera.position.set(0, 0, 3.6);
  scene.add(camera);

  // Lighting: soft fill + a "sun" attached to the camera so the lit side stays in view.
  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const sun = new THREE.DirectionalLight(0xfff4e6, 2.6);
  sun.position.set(-2.5, 1.6, 2.4);
  camera.add(sun);
  const rimLight = new THREE.DirectionalLight(0x6fa8ff, 0.6);
  rimLight.position.set(3, -1, -2);
  camera.add(rimLight);

  // Hierarchy: tilt (faces the focus latitude) > spin (rotates) > earth + overlays.
  const tilt = new THREE.Group();
  const spin = new THREE.Group();
  tilt.add(spin);
  scene.add(tilt);

  const focus = latLonToVector3(opts.focus.lat, 0);
  const focusDir = latLonToVector3(opts.focus.lat, opts.focus.lon);
  spin.rotation.y = Math.atan2(-focusDir.x, focusDir.z);
  tilt.rotation.x = Math.atan2(focus.y, Math.hypot(focus.x, focus.z));
  const homeRotation = spin.rotation.y;

  // Textures
  const manager = new THREE.LoadingManager();
  let ready = false;
  manager.onLoad = () => {
    ready = true;
    if (typeof opts.onReady === "function") opts.onReady();
  };
  const loader = new THREE.TextureLoader(manager);
  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  const load = (url, srgb) => {
    const tex = track(loader.load(url));
    tex.anisotropy = Math.min(8, maxAniso);
    if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  };

  // Earth
  const earthGeo = track(new THREE.SphereGeometry(EARTH_RADIUS, 128, 128));
  const earthMat = track(
    new THREE.MeshPhongMaterial({
      map: load(textures.day, true),
      bumpMap: load(textures.bump, false),
      bumpScale: 2.5,
      specularMap: load(textures.specular, false),
      specular: new THREE.Color(0x4d5a66),
      shininess: 22,
    }),
  );
  const earth = new THREE.Mesh(earthGeo, earthMat);
  spin.add(earth);

  // Clouds
  let cloudMesh = null;
  if (opts.clouds && textures.clouds) {
    const cloudMat = track(
      new THREE.MeshPhongMaterial({
        map: load(textures.clouds, true),
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      }),
    );
    cloudMesh = new THREE.Mesh(track(new THREE.SphereGeometry(EARTH_RADIUS * 1.01, 96, 96)), cloudMat);
    spin.add(cloudMesh);
  }

  // Atmosphere: inner rim haze + outer halo.
  const atmoColor = new THREE.Color(opts.atmosphereColor);
  const rim = new THREE.Mesh(
    track(new THREE.SphereGeometry(EARTH_RADIUS * 1.012, 96, 96)),
    track(
      new THREE.ShaderMaterial({
        uniforms: { uColor: { value: atmoColor } },
        vertexShader: atmosphereVertex,
        fragmentShader: rimFragment,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    ),
  );
  const halo = new THREE.Mesh(
    track(new THREE.SphereGeometry(EARTH_RADIUS * 1.22, 96, 96)),
    track(
      new THREE.ShaderMaterial({
        uniforms: { uColor: { value: atmoColor } },
        vertexShader: atmosphereVertex,
        fragmentShader: haloFragment,
        side: THREE.BackSide,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    ),
  );
  scene.add(rim, halo); // not spun: the glow is view-dependent and symmetric

  // Stars
  if (opts.stars) {
    const count = 1800;
    const positions = new Float32Array(count * 3);
    let seed = 1337;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < count; i++) {
      const v = new THREE.Vector3(rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1).normalize();
      v.multiplyScalar(60 + rand() * 60);
      positions.set([v.x, v.y, v.z], i * 3);
    }
    const starGeo = track(new THREE.BufferGeometry());
    starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const stars = new THREE.Points(
      starGeo,
      track(
        new THREE.PointsMaterial({
          color: 0xffffff,
          size: 1.4,
          sizeAttenuation: false,
          transparent: true,
          opacity: 0.75,
          depthWrite: false,
        }),
      ),
    );
    scene.add(stars);
  }

  // Markers
  const markerColor = new THREE.Color(opts.markerColor);
  const dotTex = track(glowTexture(opts.markerColor));
  const markers = [];
  const up = new THREE.Vector3(0, 0, 1);
  const placeKey = (place) => `${place.name}:${place.lat}:${place.lon}`;
  const places = [...new Map(
    routes.flatMap(({ from, to }) => [from, to]).map((place) => [placeKey(place), place]),
  ).values()];
  for (const place of places) {
    const normal = latLonToVector3(place.lat, place.lon).normalize();
    const group = new THREE.Group();
    group.position.copy(normal.clone().multiplyScalar(EARTH_RADIUS * 1.002));
    group.quaternion.setFromUnitVectors(up, normal);

    const dot = new THREE.Mesh(
      track(new THREE.CircleGeometry(0.013, 32)),
      track(new THREE.MeshBasicMaterial({ color: markerColor })),
    );
    const ringMat = track(
      new THREE.MeshBasicMaterial({
        color: markerColor,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    );
    const ring = new THREE.Mesh(track(new THREE.RingGeometry(0.02, 0.026, 48)), ringMat);
    const glow = new THREE.Sprite(
      track(
        new THREE.SpriteMaterial({
          map: dotTex,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      ),
    );
    glow.scale.setScalar(0.09);
    glow.position.z = 0.004;

    // Pin: a short beam out of the surface with the label on top.
    const beamMat = track(
      new THREE.MeshBasicMaterial({ color: markerColor, transparent: true, opacity: 0.85 }),
    );
    const beam = new THREE.Mesh(track(new THREE.CylinderGeometry(0.0022, 0.0022, 0.09, 8)), beamMat);
    beam.rotation.x = Math.PI / 2;
    beam.position.z = 0.045;

    group.add(dot, ring, glow, beam);
    let label = null;
    if (opts.labels && place.showLabel !== false) {
      label = labelSprite(place.name, place.country || "");
      track(label.material.map);
      track(label.material);
      const [offsetX = 0, offsetY = 0] = place.labelOffset || [];
      label.position.set(offsetX, offsetY, 0.1);
      label.center.set(place.labelAnchor === "left" ? 1 : 0.5, 0);
      group.add(label);
    }
    spin.add(group);
    markers.push({ placeKey: placeKey(place), ring, ringMat, label });
  }

  // Show every trade lane, then animate each route in sequence.
  const TUBE_SEG = 240;
  const RADIAL = 8;
  const routeAnimations = routes.map(({ from, to, color }) => {
    const curve = new THREE.CatmullRomCurve3(arcPoints(from, to, opts.arcAltitude));
    const routeColor = color || opts.arcColor;
    const trailGeo = track(new THREE.TubeGeometry(curve, TUBE_SEG, 0.0055, RADIAL, false));
    const ghost = new THREE.Mesh(
      track(new THREE.TubeGeometry(curve, TUBE_SEG, 0.0028, RADIAL, false)),
      track(
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(routeColor),
          transparent: true,
          opacity: 0.28,
          depthWrite: false,
        }),
      ),
    );
    const trail = new THREE.Mesh(
      trailGeo,
      track(
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(routeColor),
          transparent: true,
          opacity: 0.95,
        }),
      ),
    );
    trailGeo.setDrawRange(0, 0);
    const ship = new THREE.Sprite(
      track(
        new THREE.SpriteMaterial({
          map: track(glowTexture(routeColor)),
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      ),
    );
    ship.scale.setScalar(0.1);
    spin.add(ghost, trail, ship);
    return { curve, fromKey: placeKey(from), toKey: placeKey(to), trailGeo, ship };
  });

  const TRAIL_LEN = 0.35; // fraction of the route the bright trail covers
  const PER_SEG = RADIAL * 6; // indices per tube segment
  const setTrail = (trailGeo, startT, endT) => {
    const s = Math.floor(THREE.MathUtils.clamp(startT, 0, 1) * TUBE_SEG);
    const e = Math.ceil(THREE.MathUtils.clamp(endT, 0, 1) * TUBE_SEG);
    trailGeo.setDrawRange(s * PER_SEG, Math.max(0, e - s) * PER_SEG);
  };

  // Interaction
  let controls = null;
  let dragging = false;
  if (opts.interactive) {
    controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.enableZoom = !!opts.zoom;
    controls.minDistance = 1.8;
    controls.maxDistance = 8;
    controls.rotateSpeed = 0.5;
    controls.addEventListener("start", () => (dragging = true));
    controls.addEventListener("end", () => (dragging = false));
  }

  // Sizing — fit the globe and its glow inside any container shape.
  const fitDistance = (aspect) => {
    const r = EARTH_RADIUS * 1.38;
    const vFov = THREE.MathUtils.degToRad(camera.fov);
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
    return Math.max(r / Math.sin(vFov / 2), r / Math.sin(hFov / 2));
  };
  const resize = () => {
    const w = container.clientWidth || 300;
    const h = container.clientHeight || 300;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const dist = fitDistance(camera.aspect);
    camera.position.setLength(dist);
    markers.forEach((marker) => {
      if (marker.label) marker.label.visible = w > 360;
    });
    if (controls) controls.update();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  resize();

  // Pause rendering when the globe is off-screen or the tab is hidden.
  let visible = true;
  const io = new IntersectionObserver(([entry]) => {
    visible = entry ? entry.isIntersecting : true;
  });
  io.observe(container);

  // Animation loop
  let rotationSpeed = reducedMotion ? 0 : opts.rotationSpeed;
  let pointerTarget = 0;
  let pointerOffset = 0;
  let paused = false;
  let rafId = 0;
  let last = performance.now();
  let elapsed = 0;
  const CYCLE = opts.routeDuration * (1 + TRAIL_LEN) + 1.2;
  const FULL_CYCLE = CYCLE * routeAnimations.length;

  const frame = (now) => {
    rafId = requestAnimationFrame(frame);
    const dt = THREE.MathUtils.clamp((now - last) / 1000, 0, 0.05);
    last = now;
    if (paused || !visible || document.hidden) return;
    elapsed += dt;

    if (opts.autoSway && !reducedMotion) {
      pointerOffset += (pointerTarget - pointerOffset) * (1 - Math.exp(-3 * dt));
      spin.rotation.y = homeRotation
        + Math.sin((elapsed * Math.PI * 2) / Math.max(1, opts.swayPeriod)) * opts.swayAmplitude
        + pointerOffset;
    } else if (!dragging) {
      spin.rotation.y += rotationSpeed * dt;
    }
    if (cloudMesh) cloudMesh.rotation.y += dt * 0.012;

    // Route progress: head moves 0 → 1, tail follows, then a short pause.
    const cycleTime = elapsed % FULL_CYCLE;
    const activeRoute = Math.floor(cycleTime / CYCLE);
    const p = (cycleTime % CYCLE) / opts.routeDuration;
    const head = THREE.MathUtils.clamp(p, 0, 1);
    const tail = Math.max(0, p - TRAIL_LEN);
    routeAnimations.forEach((route, index) => {
      const active = index === activeRoute;
      setTrail(route.trailGeo, active ? tail : 0, active ? head : 0);
      route.ship.visible = active && p <= 1;
      if (route.ship.visible) {
        route.curve.getPointAt(head, route.ship.position);
        route.ship.scale.setScalar(0.09 + Math.sin(elapsed * 8) * 0.01);
      }
    });

    // Marker pulses (destination pulses harder right after the ship arrives).
    markers.forEach((m, i) => {
      const phase = (elapsed * 0.9 + i * 0.5) % 1;
      const arrived =
        m.placeKey === routeAnimations[activeRoute].toKey && p > 1 && p < 1 + TRAIL_LEN ? 1.6 : 1;
      m.ring.scale.setScalar(1 + phase * 2.2 * arrived);
      m.ringMat.opacity = (1 - phase) * 0.9;
    });

    if (controls) controls.update();
    renderer.render(scene, camera);
  };
  rafId = requestAnimationFrame(frame);

  return {
    scene,
    camera,
    renderer,
    get ready() {
      return ready;
    },
    /** Radians per second; 0 stops the spin. */
    setRotationSpeed(v) {
      rotationSpeed = v;
    },
    setPointerTarget(v) {
      if (opts.pointerControl && !reducedMotion) {
        pointerTarget = THREE.MathUtils.clamp(Number(v) || 0, -0.3, 0.3);
      }
    },
    pause() {
      paused = true;
    },
    resume() {
      paused = false;
      last = performance.now();
    },
    /** Stops the animation and frees all GPU memory. */
    destroy() {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      io.disconnect();
      if (controls) controls.dispose();
      disposables.forEach((d) => d.dispose && d.dispose());
      renderer.dispose();
      if (canvas.parentNode === container) container.removeChild(canvas);
    },
  };
}
