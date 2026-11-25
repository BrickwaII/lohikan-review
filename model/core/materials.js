// Camp-wide materials: ONE place for the colours and textures that repeat all over camp.
// Henry: most buildings are the exact same dark brown wood on the outside of the walls, so every building, closet,
// shed and hut takes its outside walls from here. Change a colour here and the whole camp follows.
// Use the names (PALETTE.wood.post, sidingMaterial('darkbrown'), ...) instead of raw hex colours in zone code.
import * as THREE from 'three';

export const PALETTE = {
  // outside wall boards: [board colour, gap/batten colour]. 'darkbrown' is the camp standard.
  siding: { darkbrown: ['#2a221c', '#1f1915'], brown: ['#5a4330', '#47342a'], charcoal: ['#262220', '#141210'],
            corrugated: ['#b8a582', '#958463'] },   // Henry: the Rec Hall alone has corrugated metal walls, painted tan outside
  // roofs: [base, line colour]
  roof: { grey: ['#7a7c7e', '#68696b'], green: ['#4a6553', '#3c5444'], metal: ['#d4d6d6', '#b9bcbd'] },
  trim: { white: 0xf1efe8, brown: 0x4a3426, dark: 0x2e241c },
  wood: { post: 0x4a3826, door: 0x3d2a1c, bench: 0x6b5236, stain: 0x6a4a2c, natural: 0x9b7b52 },
  paint: { red: 0xd23b2f, yellow: 0xf2c12e, blue: 0x2f6fd6, green: 0x3fb36b, white: 0xf4f1e6 },
  concrete: 0xbfc4c8, steel: 0x5f6366, glass: 0xcfe3ef,
};
export const STANDARD_SIDING = 'darkbrown';
// One siding texture tile covers SIDING_TILE metres of wall, so boards are the same width on every building.
export const SIDING_TILE = 3;

// Deterministic noise so the shared textures look the same on every page load.
function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function canvasTex(w, h, draw) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 8; return t;
}
const cache = new Map();
const once = (key, make) => { if (!cache.has(key)) cache.set(key, make()); return cache.get(key); };

/** Siding texture (one tile = SIDING_TILE m). pattern: 'board' (vertical board and batten, the camp standard), 'liveedge' (Lower Office)
 *  or 'corrugated' (ribbed metal, Rec Hall only). */
export function sidingTexture(style = STANDARD_SIDING, pattern = 'board') {
  const [a, b] = PALETTE.siding[style] || PALETTE.siding[STANDARD_SIDING];
  return once(`siding:${style}:${pattern}`, () => { const rnd = rng(7);
    if (pattern === 'corrugated') return canvasTex(256, 256, (g, w, h) => { g.fillStyle = a; g.fillRect(0, 0, w, h);   // vertical ribs ~7.5 cm apart
      for (let x = 0; x < w; x += 6) { const gr = g.createLinearGradient(x, 0, x + 6, 0); gr.addColorStop(0, b); gr.addColorStop(0.5, 'rgba(255,255,255,0.18)'); gr.addColorStop(1, b); g.fillStyle = gr; g.fillRect(x, 0, 6, h); }
      for (let y = 0; y < h; y += 64) { g.fillStyle = `rgba(0,0,0,${0.05 + rnd() * 0.05})`; g.fillRect(0, y, w, 1); } });
    return pattern === 'liveedge' ? canvasTex(256, 256, (g, w, h) => { g.fillStyle = a; g.fillRect(0, 0, w, h);   // horizontal waney-edge boards (Lower Office photos)
      for (let y = 0; y < h; y += 26) { const ph = rnd() * 6, f = 1 + rnd() * 2; g.fillStyle = b; g.beginPath(); g.moveTo(0, y);
        for (let x = 0; x <= w; x += 8) g.lineTo(x, y + 4 + Math.sin(x / w * Math.PI * 2 * f + ph) * 3.5); g.lineTo(w, y); g.fill();
        g.fillStyle = `rgba(255,235,210,${0.03 + rnd() * 0.05})`; g.fillRect(0, y + 9, w, 3); } })
    : canvasTex(256, 256, (g, w, h) => { g.fillStyle = a; g.fillRect(0, 0, w, h);
      for (let x = 0; x < w; x += 28) { g.fillStyle = b; g.fillRect(x, 0, 4, h); g.fillStyle = `rgba(255,235,210,${0.02 + rnd() * 0.04})`; g.fillRect(x + 4, 0, 24, h); } }); });
}
/** Roof texture: shingles (grey/green) or standing-seam metal. */
export function roofTexture(style = 'grey') {
  const [a, b] = PALETTE.roof[style] || PALETTE.roof.grey;
  return once(`roof:${style}`, () => style === 'metal'
    ? canvasTex(256, 256, (g, w, h) => { g.fillStyle = a; g.fillRect(0, 0, w, h); for (let x = 0; x < w; x += 32) { g.fillStyle = b; g.fillRect(x, 0, 5, h); g.fillStyle = 'rgba(255,255,255,.35)'; g.fillRect(x + 5, 0, 3, h); } })
    : canvasTex(256, 256, (g, w, h) => { g.fillStyle = a; g.fillRect(0, 0, w, h); for (let y = 0; y < h; y += 16) { g.fillStyle = b; g.fillRect(0, y, w, 2); for (let x = (y / 16 % 2) * 16; x < w; x += 32) g.fillRect(x, y, 2, 16); }
        const rnd = rng(11); for (let i = 0; i < 500; i++) { const v = rnd(); g.fillStyle = v > .5 ? `rgba(255,255,255,${(v - .5) * .12})` : `rgba(0,0,0,${v * .14})`; g.fillRect(rnd() * w, rnd() * h, 14, 7); } }));
}
/** A repeat of a shared texture (cheap clone that shares the image). */
export function repeat(tex, rx, ry) { const c = tex.clone(); c.needsUpdate = true; c.repeat.set(rx, ry); return c; }
/** Siding material for a wall w metres wide and h metres tall (boards come out the same width everywhere). */
export function sidingMaterial(style = STANDARD_SIDING, w = SIDING_TILE, h = SIDING_TILE, opts = {}) {
  return new THREE.MeshStandardMaterial({ map: repeat(sidingTexture(style, opts.pattern), w / SIDING_TILE, h / SIDING_TILE), roughness: 0.88, metalness: 0, ...(opts.side ? { side: opts.side } : {}) });
}
/** Plain coloured material from a palette value (or any hex). */
export function paletteMaterial(color, opts = {}) { return new THREE.MeshStandardMaterial({ color, roughness: 0.88, metalness: 0, ...opts }); }
