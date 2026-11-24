import { createShippingGlobe } from "./assets/globe/globe.js";
import { createPortScene, voyageFraction } from "./assets/port/port-scene.js";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------ *
 * 0. Responsive navigation & top scroll progress bar
 * ------------------------------------------------------------------ */
const menuButton = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");
const progressBar = document.querySelector("#scroll-progress");

const setMenuOpen = (open) => {
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  primaryNav.classList.toggle("open", open);
};

menuButton.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});
primaryNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuOpen(false);
});
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

/* ------------------------------------------------------------------ *
 * 1. Hero globe — China → India trade routes
 * ------------------------------------------------------------------ */
const globeEl = document.querySelector("#globe");
try {
  const globe = createShippingGlobe(globeEl, {
    stars: false,
    interactive: false,
    autoSway: true,
    pointerControl: true,
    focus: { lat: 24, lon: 96 },
    atmosphereColor: "#7297c9",
    markerColor: "#e03c31",
    arcColor: "#e03c31",
    routes: [
      {
        from: { name: "Shanghai", country: "China", lat: 31.2304, lon: 121.4737, labelOffset: [0.12, 0.08], labelAnchor: "left" },
        to: { name: "Nhava Sheva", country: "India", lat: 18.95, lon: 72.95, labelOffset: [-0.2, 0.12] },
      },
      {
        from: { name: "Yiwu", country: "China", lat: 29.306, lon: 120.075, labelOffset: [-0.4, -0.04], labelAnchor: "left" },
        to: { name: "Chennai", country: "India", lat: 13.0827, lon: 80.2707, labelOffset: [-0.16, -0.14] },
      },
      {
        from: { name: "Guangzhou", country: "China", lat: 23.1291, lon: 113.2644, labelOffset: [-0.32, -0.12], labelAnchor: "left" },
        to: { name: "Hyderabad", country: "India", lat: 17.385, lon: 78.4867, labelOffset: [0.18, -0.02] },
      },
    ],
  });

  // Don't spend GPU time while the hero is off-screen.
  new IntersectionObserver(([entry]) => {
    entry.isIntersecting ? globe.resume() : globe.pause();
  }, { threshold: 0 }).observe(globeEl);
  const hero = globeEl.closest(".hero");
  hero.addEventListener("pointermove", (event) => {
    const bounds = hero.getBoundingClientRect();
    const position = (event.clientX - bounds.left) / bounds.width;
    globe.setPointerTarget((position - 0.5) * 0.45);
  });
  hero.addEventListener("pointerleave", () => globe.setPointerTarget(0));
} catch (err) {
  console.warn("Globe unavailable:", err);
  globeEl.closest(".hero-globe").style.display = "none";
}

document.querySelectorAll(".services li, .ind, .trip-card, .del-card, .guide-card, .cert").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const bounds = card.getBoundingClientRect();
    card.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    card.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  });
});

/* ------------------------------------------------------------------ *
 * 2. Hero stat counters
 * ------------------------------------------------------------------ */
document.querySelectorAll("[data-count]").forEach((el) => {
  const target = Number(el.dataset.count);
  if (reduceMotion) { el.textContent = target; return; }
  const start = performance.now();
  const dur = 1600;
  const tick = (now) => {
    const t = Math.min(1, (now - start) / dur);
    el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});

/* ------------------------------------------------------------------ *
 * 3. Scroll-driven port scene (Shanghai → Chennai) & scroll progress
 * ------------------------------------------------------------------ */
const STEP_STARTS = [0, 0.14, 0.28, 0.46, 0.84, 0.94]; // matches the scene timeline
const TOTAL_DAYS = 25;

const section = document.querySelector("#journey");
const loading = document.querySelector("#port-loading");
const stepEls = [...document.querySelectorAll("#steps li")];
const bar = document.querySelector("#bar");
const dot = document.querySelector("#dot");
const day = document.querySelector("#day");

let port = null;
try {
  port = createPortScene(document.querySelector("#port"), {
    shipName: "Import Now",
    onReady: () => loading.classList.add("done"),
  });
} catch (err) {
  console.warn("Port scene unavailable:", err);
  loading.textContent = "3D view isn't supported on this device.";
}

let shownStep = -1;
function updateStory() {
  if (progressBar) {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFrac = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
    progressBar.style.transform = `scaleX(${scrollFrac})`;
  }

  const rect = section.getBoundingClientRect();
  const scrollable = rect.height - window.innerHeight;
  const p = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
  if (port) port.setProgress(p);

  const v = voyageFraction(p);
  bar.style.transform = `scaleX(${v})`;
  dot.style.left = `${v * 100}%`;
  day.textContent = `Day ${Math.round(v * TOTAL_DAYS)}`;

  let i = 0;
  while (i < STEP_STARTS.length - 1 && p >= STEP_STARTS[i + 1]) i++;
  if (i !== shownStep) {
    shownStep = i;
    stepEls.forEach((el, idx) => {
      el.classList.toggle("active", idx === i);
      el.classList.toggle("done", idx < i);
    });
  }
}

let ticking = false;
window.addEventListener("scroll", () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { updateStory(); ticking = false; });
}, { passive: true });
window.addEventListener("resize", updateStory);
updateStory();

/* ------------------------------------------------------------------ *
 * 4. Quote form → WhatsApp
 * ------------------------------------------------------------------ */
const form = document.querySelector("#quote-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const nameInput = form.elements.name;
  nameInput.classList.toggle("invalid", !data.name.trim());
  if (!data.name.trim()) { nameInput.focus(); return; }

  const opt = (label, value) => (value.trim() ? `${label}: ${value.trim()}` : null);
  const lines = [
    "Hi ImportNow, I'd like a free sourcing quote.",
    "",
    `Name: ${data.name.trim()}`,
    opt("City", data.city),
    `Looking to import: ${data.product}`,
    opt("Approx. quantity", data.qty),
    `Budget: ${data.budget}`,
    opt("Details", data.details),
  ].filter((l) => l !== null);

  const url = `https://wa.me/919989724320?text=${encodeURIComponent(lines.join("\n"))}`;
  window.open(url, "_blank", "noopener");
});