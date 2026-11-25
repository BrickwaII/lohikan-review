// Shared kit for the Sports Center + Circus: materials, canvas textures, wall helpers (quad, holedWall), groups ext/inn/root.
// Everything here was the top of buildSportsCenter; each part file receives these through the kit object.
import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';
import { SC } from './data.js';

function canvasTex(renderer, w, h, draw, rx = 1, ry = 1) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rx, ry);
  if (renderer) t.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return t;
}
function star(g, x, y, r) { g.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.42 : r; g.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } g.closePath(); g.fill(); }

export function makeKit(renderer, opts = {}) {
  const S = SC, root = new THREE.Group(); root.name = 'SportsCenter';
  let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const mat = (o) => new THREE.MeshStandardMaterial({ roughness: 0.85, metalness: 0, side: THREE.DoubleSide, ...o });
  const T = (w, h, d, rx, ry) => canvasTex(renderer, w, h, d, rx, ry);

  // ---------- textures ----------
  const siding = T(256, 256, (g, w, h) => { g.fillStyle = '#2b221d'; g.fillRect(0, 0, w, h);
    for (let x = 0; x < w; x += 32) { g.fillStyle = '#1d1714'; g.fillRect(x, 0, 6, h); g.fillStyle = `rgba(255,230,200,${0.02 + rnd() * 0.03})`; g.fillRect(x + 6, 0, 26, h); } }, 1, 1);
  const roofTex = (base, dark) => T(256, 256, (g, w, h) => { g.fillStyle = base; g.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 16) { g.fillStyle = dark; g.fillRect(0, y, w, 2); for (let x = (y / 16 % 2) * 16; x < w; x += 32) g.fillRect(x, y, 2, 16); }
    for (let i = 0; i < 400; i++) { g.fillStyle = `rgba(0,0,0,${rnd() * 0.08})`; g.fillRect(rnd() * w, rnd() * h, 6, 3); } }, 1, 1);
  const greyRoof = roofTex('#5f6265', '#4f5255'), greenRoof = roofTex('#40594a', '#33483c');
  const starWall = T(512, 512, (g, w, h) => { g.fillStyle = '#1c3a86'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#f4f1e6'; for (let i = 0; i < 110; i++) star(g, rnd() * w, rnd() * h, 4 + rnd() * 5); }, 1, 1);
  const clere = T(256, 64, (g, w, h) => { g.clearRect(0, 0, w, h); g.fillStyle = 'rgba(205,226,240,0.22)'; for (const [y0, y1] of [[0, h * 0.46], [h * 0.54, h]]) g.fillRect(0, y0, w, y1 - y0);
    g.fillStyle = '#e9eef2'; for (let x = 0; x <= w; x += w / 6) g.fillRect(x - 2, 0, 4, h); g.fillRect(0, 0, w, 4); g.fillRect(0, h - 4, w, 4); g.fillStyle = '#1f3f8c'; g.fillRect(0, h * 0.46, w, h * 0.08); }, 1, 1);   /* Henry: two rows of see-through windows */
  const clereOut = T(256, 64, (g, w, h) => { g.fillStyle = '#2b3138'; g.fillRect(0, 0, w, h); g.fillStyle = '#6f8597'; for (let x = 0; x < w; x += w / 6) { g.fillRect(x + 4, 4, w / 6 - 8, h / 2 - 6); g.fillRect(x + 4, h / 2 + 2, w / 6 - 8, h / 2 - 6); } }, 1, 1);
  const floorTex = T(1024, 1024, (g, w, h) => { g.fillStyle = '#a19d97'; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 6000; i++) { const v = 135 + rnd() * 40 | 0; g.fillStyle = `rgba(${v},${v - 3},${v - 8},0.10)`; g.beginPath(); g.arc(rnd() * w, rnd() * h, 4 + rnd() * 34, 0, 7); g.fill(); }
    g.strokeStyle = 'rgba(70,70,70,.35)'; g.lineWidth = 2; for (let x = 0; x <= w; x += w / 2) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, h); g.stroke(); g.beginPath(); g.moveTo(0, x); g.lineTo(w, x); g.stroke(); } }, 1, 1);
  const lamella = T(1024, 1024, (g, w, h) => { g.fillStyle = '#c69a62'; g.fillRect(0, 0, w, h);
    g.strokeStyle = '#d6ad78'; g.lineWidth = 3; for (let y = 0; y < h; y += 20) { g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke(); }
    const n = 4; for (const dir of [1, -1]) for (let i = -n; i <= 2 * n; i++) { g.strokeStyle = '#7f5326'; g.lineWidth = 24; g.beginPath(); g.moveTo(i * w / n, 0); g.lineTo(i * w / n + dir * w, h); g.stroke(); g.strokeStyle = '#b4803f'; g.lineWidth = 11; g.beginPath(); g.moveTo(i * w / n, 0); g.lineTo(i * w / n + dir * w, h); g.stroke(); } }, 1, 1);
  const woodBoards = T(256, 256, (g, w, h) => { g.fillStyle = '#b08455'; g.fillRect(0, 0, w, h); for (let x = 0; x < w; x += 24) { g.fillStyle = `rgba(80,50,20,${0.15 + rnd() * 0.15})`; g.fillRect(x, 0, 2, h); } }, 1, 1);
  const tex = (t, rx, ry) => { const c = t.clone(); c.needsUpdate = true; c.repeat.set(rx, ry); return c; };

  const M = {
    siding: (rx, ry) => mat({ map: tex(siding, rx, ry) }),
    star: (rx, ry) => mat({ map: tex(starWall, rx, ry) }),
    wood: (rx, ry) => mat({ map: tex(woodBoards, rx, ry) }),
    white: mat({ color: 0xf0eee6 }),
  };

  // helper: plane between two points along x, spanning y0..y1 at fixed z, or sloped roof planes
  /* v8: flat wall from xa..xb, y0..y1 at depth z, with rectangular holes [[hx0, hy0, hx1, hy1], ...] so windows are real openings */
  function holedWall(xa, xb, y0, y1, z, holes, material, uvs = 4) {
    const sh = new THREE.Shape(); sh.moveTo(xa, y0); sh.lineTo(xb, y0); sh.lineTo(xb, y1); sh.lineTo(xa, y1); sh.lineTo(xa, y0);
    for (const [a, b, c, d] of holes) { const h = new THREE.Path(); h.moveTo(a, b); h.lineTo(c, b); h.lineTo(c, d); h.lineTo(a, d); h.lineTo(a, b); sh.holes.push(h); }
    const g = new THREE.ShapeGeometry(sh); const uv = g.attributes.uv, p = g.attributes.position; for (let i = 0; i < uv.count; i++) uv.setXY(i, p.getX(i) / uvs, p.getY(i) / uvs);
    const m = new THREE.Mesh(g, material); m.position.z = z; return m;
  }
  const glassMat = () => mat({ color: 0xcfe3ef, roughness: 0.1, transparent: true, opacity: 0.22, depthWrite: false });
  function quad(p0, p1, p2, p3, material, uvScale = [1, 1]) {
    const g = new THREE.BufferGeometry();
    const P = [p0, p1, p2, p3]; const pos = new Float32Array([...P[0], ...P[1], ...P[2], ...P[0], ...P[2], ...P[3]]);
    const lu = Math.hypot(p1[0] - p0[0], p1[1] - p0[1], p1[2] - p0[2]) / uvScale[0], lv = Math.hypot(p3[0] - p0[0], p3[1] - p0[1], p3[2] - p0[2]) / uvScale[1];
    const uv = new Float32Array([0, 0, lu, 0, lu, lv, 0, 0, lu, lv, 0, lv]);
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.BufferAttribute(uv, 2)); g.computeVertexNormals();
    return new THREE.Mesh(g, material);
  }
  const ext = new THREE.Group(); ext.name = 'exterior'; root.add(ext);
  const inn = new THREE.Group(); inn.name = 'interior'; root.add(inn);
  return { S, root, seed, rnd, mat, T, siding, roofTex, greyRoof, greenRoof, starWall, clere, clereOut, floorTex, lamella, woodBoards, tex, M, holedWall, glassMat, quad, ext, inn, renderer, opts };
}
