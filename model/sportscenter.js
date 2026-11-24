// Camp Lohikan — Sports Center (west: gymnastics/sports hall, east: Circus building, built 2008)
// Local frame: x = east (m), y = up, z = south. Origin = E 475172, N 4633315 (UTM 18N), at floor level.
// Dimensions from 2019 LiDAR cross-sections; finishes from the 360° tour + ~1,100 camp photos.
import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js'

export const SC = {
  E0: 475172, N0: 4633315,
  westX0: -44, westX1: 10,      // west section 54 m (green roof)
  circX0: 10, circX1: 44,       // circus section 34 m (grey roof)
  halfW: 20.5,                  // outer walls at N 4633294.5 / 4633335.5
  westEave: 2.8, westRidge: 11.0,
  aisleEave: 3.0, aisleTop: 5.5, // circus side aisles (lean-to roofs)
  naveHalf: 12.5,               // clerestory walls at N 4633302.5 / 4633327.5
  clereTop: 11.0, ridge: 15.7, vaultRise: 2.3,
};

export const ASSUMPTIONS = [
  'Shape and heights come from the 2019 LiDAR (±0.3 m). Finishes come from the 360° tour and ~20 photos you confirmed in the photo review, 2001–2023.',
  'Sports Center (from you): the arena (indoor basketball court / hockey rink) is walled off from the canteen and from the gymnastics room.',
  'Court area (from your confirmed photos): blue painted floor with white court lines and an orange multi-use ring, roller-hockey goals, a curved wood-slat ceiling with trusses, flags of many countries hanging overhead, and banners/murals on the walls. The court runs east–west in the west part of the hall; that orientation is a guess.',
  'Canteen (Ghost photo IMG_8314 + you): a long drop-ceiling room along the south wall, walled off from the arena (two doorways), booths, ping-pong tables and foosball, with the snack counter at the east end by your Canteen pin. Doorway positions are guesses.',
  'Floor (you): grey concrete with white lines everywhere in the arena — it is an indoor basketball court / hockey rink.',
  'Circus south wall (you): closed, with an entrance near the Sports Center and doors into the weight-lifting area toward the east end. The weight room layout is a guess.',
  'Gymnastics room (from the gymnastics 360°): a long room along the north wall, west of your Gymnastics pin, with a white curved ceiling, windows along the outer wall, a tall cream/yellow board partition, blue mats, a rod floor, beams and bars. Its exact length and door position are guesses.',
  'Wall shared by the Sports Center and the circus (from the circus 360° looking west): the bottom ~4.6 m across the nave is open framing with posts, low wooden knee walls and benches, and one walk-through bay, so you can see the Sports Center flags through it. Above that is a blue board band, then star panels up to the vault. The number of bays and which one is the walk-through are estimates.',
  'Circus nave: a curved lamella (diamond-lattice) wooden vault under a plain gable roof. Posts alternate red and yellow with blue X-braces, the walls are navy with white stars, and a band of clerestory windows runs under the vault.',
  'The indoor flying trapeze runs along the north side, with the board at the west end. Its exact length and heights are estimates.',
  'Dance studio (360° photo): curved white ceiling, cream walls with wood-trimmed windows on both long sides, one giant mirror along the whole south wall (facing the circus) over a low step, wood floor, ballet barre, white doors, blue benches. Entered from the circus north aisle (a "DANCE" sign is visible there in the circus 360°); its exact position is a guess.',
  'Exterior: dark brown board siding. The circus roof is grey and the Sports Center roof is green (2025 drone video). White X barn doors and a "SPORTS CENTER" sign on the west end.',
];

function canvasTex(renderer, w, h, draw, rx = 1, ry = 1) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rx, ry);
  if (renderer) t.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return t;
}
function star(g, x, y, r) { g.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.42 : r; g.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } g.closePath(); g.fill(); }

export function buildSportsCenter(renderer, opts = {}) {
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
  { const fd = new THREE.Mesh(new THREE.BoxGeometry(S.circX1 - S.westX0 + 0.4, 1.6, 2 * S.halfW + 0.4), new THREE.MeshStandardMaterial({ color: 0x6f6b64, roughness: 0.95 })); fd.position.set((S.westX0 + S.circX1) / 2, -0.81, 0); root.add(fd); }

  // ---------- WEST SECTION (gymnastics / sports hall) ----------
  {
    const x0 = S.westX0, x1 = S.westX1, H = S.halfW;
    const GZM = (-S.halfW + 0.1 - 10.5) / 2;   /* middle of the gym's end walls */
    const NWIN = []; for (let x = x0 + 2.5; x < x1 - 1.5; x += 3.2) NWIN.push(x);   /* north wall windows */
    for (const s of [-1, 1]) {
      ext.add(quad([x0, S.westEave, s * H], [x1, S.westEave, s * H], [x1, S.westRidge, 0], [x0, S.westRidge, 0], mat({ map: tex(greenRoof, 1, 1) }), [4, 4]));
      if (s < 0) ext.add(holedWall(x0, x1, 0, S.westEave, -H, NWIN.map(x => [x - 0.55, 1.05, x + 0.55, 1.95]), mat({ map: tex(siding, 1, 1) })));   /* v8: north wall windows are see-through */
      else ext.add(quad([x0, 0, s * H], [x1, 0, s * H], [x1, S.westEave, s * H], [x0, S.westEave, s * H], mat({ map: tex(siding, 1, 1) }), [4, 4]));
      // eave overhang shadow line
      const fas = new THREE.Mesh(new THREE.BoxGeometry(x1 - x0, 0.25, 0.3), mat({ color: 0x2e241a })); fas.position.set((x0 + x1) / 2, S.westEave, s * (H + 0.1)); ext.add(fas);
    }
    // west gable end with big white X barn doors ("SPORTS CENTER" sign side)
    const sh = new THREE.Shape(); sh.moveTo(-H, 0); sh.lineTo(H, 0); sh.lineTo(H, S.westEave); sh.lineTo(0, S.westRidge); sh.lineTo(-H, S.westEave); sh.lineTo(-H, 0);
    { const hl = new THREE.Path(); hl.moveTo(-1.5, 0); hl.lineTo(-1.5, 3.7); hl.lineTo(1.5, 3.7); hl.lineTo(1.5, 0); hl.lineTo(-1.5, 0); sh.holes.push(hl); }   // open doorway into the hall (IMG_8261)
    for (const dz of [GZM - 2.0, GZM + 2.0]) { const h = new THREE.Path(); h.moveTo(dz - 0.45, 1.15); h.lineTo(dz + 0.45, 1.15); h.lineTo(dz + 0.45, 2.05); h.lineTo(dz - 0.45, 2.05); h.lineTo(dz - 0.45, 1.15); sh.holes.push(h); }   /* v8: gym windows open right through */
    const gw = new THREE.Mesh(new THREE.ShapeGeometry(sh), mat({ map: tex(siding, 0.25, 0.25) })); gw.rotation.y = -Math.PI / 2; gw.position.x = x0; ext.add(gw);
    const doorM = mat({ color: 0x5a4430 }), xM = mat({ color: 0xf1efe8 });
    // two white-X sliding barn doors, slid open to either side of the doorway (Ghost photo IMG_8261)
    for (const dz of [-2.75, 2.75]) {
      const d = new THREE.Mesh(new THREE.BoxGeometry(0.12, 3.9, 2.5), doorM); d.position.set(x0 - 0.12, 1.95, dz); ext.add(d);
      for (const a of [1, -1]) { const b = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.16, Math.hypot(3.6, 2.2)), xM); b.position.set(x0 - 0.2, 1.95, dz); b.rotation.x = a * Math.atan2(3.6, 2.2); ext.add(b); }
      for (const [fy, fh, fw] of [[0.08, 0.16, 2.5], [3.82, 0.16, 2.5]]) { const f = new THREE.Mesh(new THREE.BoxGeometry(0.06, fh, fw), xM); f.position.set(x0 - 0.2, fy, dz); ext.add(f); }
      for (const fz of [-1.17, 1.17]) { const f = new THREE.Mesh(new THREE.BoxGeometry(0.06, 3.9, 0.16), xM); f.position.set(x0 - 0.2, 1.95, dz + fz); ext.add(f); } }
    { const rail = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.14, 8.2), mat({ color: 0x2a2018 })); rail.position.set(x0 - 0.1, 3.98, 0); ext.add(rail);
      const lin = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 3.0), mat({ color: 0x3b2c1e })); lin.position.set(x0 - 0.05, 3.85, 0); ext.add(lin); }
    // small doors and windows on the west end: north door (gymnastics side) and Henry's south door into the canteen
    { const wd = mat({ color: 0x9a7a55 }), tr = mat({ color: 0xf1efe8 }), gl = mat({ color: 0x23303a, roughness: 0.3 });
      for (const dz of [GZM, 16.4]) { const d = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.1, 0.95), wd); d.position.set(x0 - 0.06, 1.05, dz); ext.add(d);
        for (const [fy, fz, fhh, fww] of [[2.15, 0, 0.1, 1.15], [1.05, -0.52, 2.2, 0.1], [1.05, 0.52, 2.2, 0.1]]) { const f = new THREE.Mesh(new THREE.BoxGeometry(0.08, fhh, fww), tr); f.position.set(x0 - 0.1, fy, dz + fz); ext.add(f); } }
      for (const dz of [GZM - 2.0, GZM + 2.0, 14.3, 18.6]) { const w = new THREE.Mesh(dz < 0 ? new THREE.PlaneGeometry(0.9, 0.9) : new THREE.BoxGeometry(0.08, 0.9, 0.9), dz < 0 ? glassMat() : gl); if (dz < 0) w.rotation.y = Math.PI / 2; w.position.set(x0 - 0.05, 1.6, dz); ext.add(w);
        const fr = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.05, 1.05), tr); fr.position.set(x0 - 0.03, 1.6, dz); ext.add(fr); }
      const pl = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.25), mat({ color: 0xf1efe8 })); pl.rotation.y = -Math.PI / 2; pl.position.set(x0 - 0.12, 2.5, GZM); ext.add(pl); }
    // concrete walk along the west end, with red benches on the south half
    { const walk = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.5, 2 * H + 0.6), mat({ color: 0xb8b5ae, roughness: 0.95 })); walk.position.set(x0 - 1.3, -0.22, 0); ext.add(walk);
      const red = mat({ color: 0x9c2f2a });
      for (const bz of [6.5, 9.4, 12.3]) { const seat = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.06, 1.9), red); seat.position.set(x0 - 0.7, 0.45, bz); ext.add(seat); const back = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.45, 1.9), red); back.position.set(x0 - 0.45, 0.72, bz); ext.add(back);
        for (const lz of [-0.8, 0.8]) { const lg = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.45, 0.08), mat({ color: 0x6b4a30 })); lg.position.set(x0 - 0.7, 0.22, bz + lz); ext.add(lg); } } }
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(9, 1.4), mat({ map: T(512, 80, (g, w, h) => { g.clearRect(0, 0, w, h); g.fillStyle = '#f1efe8'; g.font = 'bold 58px Futura, Arial'; g.textAlign = 'center'; g.fillText('SPORTS CENTER', w / 2, 62); }), transparent: true, alphaTest: 0.4 }));
    sign.rotation.y = -Math.PI / 2; sign.position.set(x0 - 0.15, 6.4, 0); ext.add(sign);
    // square windows along the south wall
    const winM = mat({ color: 0x23303a, roughness: 0.3 });
    for (let x = x0 + 4; x < x1 - 2; x += 5) { const w = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.0, 0.1), winM); w.position.set(x, 1.7, H + 0.06); ext.add(w); }
    // Henry (gymnastics 360): windows all along the north wall too: wood-framed, set high, visible from inside and out
    { const frameM = mat({ color: 0xc8954e, roughness: 0.7 }), glassM = mat({ color: 0xcfe3ef, roughness: 0.15, emissive: 0x8fb4c8, emissiveIntensity: 0.35 });
      for (const x of NWIN) { for (const [w, h, dx, dy] of [[1.3, 0.12, 0, 0.51], [1.3, 0.12, 0, -0.51], [0.12, 1.1, 0.6, 0], [0.12, 1.1, -0.6, 0], [0.05, 0.9, 0, 0]]) { const fr = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.42), frameM); fr.position.set(x + dx, 1.5 + dy, -H); ext.add(fr); }
        const gl = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.9), glassMat()); gl.position.set(x, 1.5, -H); ext.add(gl);   /* Henry: lower (v5 rework); v8: transparent */ } }
    // ===== interior, from photos =====
    // Evidence: Henry (court + canteen are one open space; gymnastics is a walled-off room); 15 confirmed court photos 2001–2014
    // (blue painted floor with white court lines, roller-hockey goals, wood-slat curved ceiling with lights, flags of many
    // countries hanging overhead, murals/banners on the upper walls); gymnastics 360° (long room, white curved ceiling,
    // windows along the outer wall, tall cream/yellow board partition, blue mats, rod floor, beams, bars); pins.
    const R = 26, rise = 5.2, cy = S.westEave + rise - R, ceilY = z => cy + Math.sqrt(R * R - z * z);
    const GZ = -10.5;                                  // gymnastics partition line (north strip z < GZ)
    const gx0 = x0 + 0.3, gx1 = S.westX1 - 0.3;   /* Henry 1:10 PM markup: the gym room runs all the way east to the circus wall */                     // gymnastics room extent along the building (pin at x≈-18)
    const fl = (x0_, x1_, z0_, z1_, m, y = 0.02) => { const f = new THREE.Mesh(new THREE.PlaneGeometry(x1_ - x0_, z1_ - z0_), m); f.rotation.x = -Math.PI / 2; f.position.set((x0_ + x1_) / 2, y, (z0_ + z1_) / 2); inn.add(f); };
    // curved ceiling: wood slats over the open court/canteen hall, white over the gymnastics room
    const ceilPiece = (za, zb, xa, xb, m) => { const a0 = Math.asin(-zb / R), a1 = Math.asin(-za / R);
      const g = new THREE.CylinderGeometry(R, R, xb - xa, 48, 1, true, a0, a1 - a0); g.rotateZ(Math.PI / 2);
      const c = new THREE.Mesh(g, m); c.rotateX(-Math.PI / 2); c.position.set((xa + xb) / 2, cy, 0); inn.add(c); return c; };
    const woodCeil = mat({ map: tex(woodBoards, 1, 1), side: THREE.DoubleSide, emissive: 0x3a2412, emissiveIntensity: 0.5 }); woodCeil.map.repeat.set(10, 4); woodCeil.map.rotation = Math.PI / 2;
    // gymnastics room (360° photo s34; its 'curved' ceiling is lens distortion): outer wall up to the eave with windows, then a flat white ceiling
    // sloping up under the roof to the top of the cream/yellow partition
    { const zA = -H + 0.15, yW = 2.55, yP = ceilY(GZ) - 0.05;
      inn.add(quad([x0 + 0.2, yW, zA], [gx1, yW, zA], [gx1, yP, GZ - 0.02], [x0 + 0.2, yP, GZ - 0.02], mat({ color: 0xf2f1ec, emissive: 0x9a9a9a, emissiveIntensity: 0.55, side: THREE.DoubleSide }), [1, 1]));
      inn.add(holedWall(x0 + 0.2, gx1, 0, yW, zA + 0.02, NWIN.map(x => [x - 0.55, 1.05, x + 0.55, 1.95]), mat({ color: 0xece7d2, emissive: 0x6d6a5e, emissiveIntensity: 0.45 })));
      const trimG = new THREE.Mesh(new THREE.BoxGeometry(gx1 - x0 - 0.2, 0.16, 0.05), mat({ color: 0xb07a3c })); trimG.position.set((x0 + 0.2 + gx1) / 2, yW - 0.1, zA + 0.05); inn.add(trimG);
      for (let k = 0; k < 9; k++) { const lt = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.08, 12), mat({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.9 })); const z = (zA + GZ) / 2, y = yW + (yP - yW) * 0.5 - 0.06; lt.position.set(x0 + 4 + k * 5, y, z); inn.add(lt); } }
    // open hall: exposed rafters and purlins under the roof boards, with steel tie rods (2026 Ghost photos IMG_8308/8311)
    const roofU = z => S.westEave + (S.westRidge - S.westEave) * (1 - Math.abs(z) / H) - 0.15;
    { const boards = mat({ color: 0x4a3423, emissive: 0x24170d, emissiveIntensity: 0.6 }), raf = mat({ color: 0x7a5232, emissive: 0x2a1a0c, emissiveIntensity: 0.5 });
      for (const sg of [-1, 1]) { const za = 0, zb = sg * (H - 0.3);
        inn.add(quad([x0 + 0.2, roofU(za) + 0.1, za], [x1 - 0.2, roofU(za) + 0.1, za], [x1 - 0.2, roofU(zb) + 0.1, zb], [x0 + 0.2, roofU(zb) + 0.1, zb], boards, [1, 1])); }
      for (const sg of [-1, 1]) { const zz = sg * (H - 0.3); const len = Math.hypot(Math.abs(zz), roofU(0) - roofU(zz)), ang = Math.atan2(roofU(0) - roofU(zz), Math.abs(zz));
        for (let x = x0 + 1; x < x1 - 0.5 && false; x += 1.2) { const r = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.28, len), raf);   /* the truss top chords are the rafters now */ r.position.set(x, (roofU(0) + roofU(zz)) / 2, zz / 2); r.rotation.x = sg * ang; inn.add(r); } }
      for (let z = -H + 0.5; z < H - 0.5; z += 0.9) { const xa = x0 + 0.2; const pu = new THREE.Mesh(new THREE.BoxGeometry(x1 - 0.2 - xa, 0.12, 0.08), raf); pu.position.set((xa + x1 - 0.2) / 2, roofU(z) - 0.15, z); inn.add(pu); }
      for (let x = x0 + 4; x < x1; x += 9) { const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 2 * H - 4, 4), mat({ color: 0x777777 })); rod.rotation.x = Math.PI / 2; rod.position.set(x, S.westEave + 1.6, 0); inn.add(rod); } }
    // trusses under the wood ceiling (visible in every court photo)
    /* Henry Nov 16: triangular trusses, no arches — horizontal bottom chord across the open hall, angled top chords up to the ridge, web members */
    const TB = 5.0, tm = mat({ color: 0x6e4a2a, emissive: 0x24160a, emissiveIntensity: 0.5 });
    const tseg = (x, za, ya, zb, yb, t = 0.16) => { const m = new THREE.Mesh(new THREE.BoxGeometry(t, t, Math.hypot(zb - za, yb - ya)), tm); m.position.set(x, (ya + yb) / 2, (za + zb) / 2); m.rotation.x = -Math.atan2(yb - ya, zb - za); inn.add(m); };
    { const zA = GZ + 0.15, zB = 11.6 - 0.15, top = z => roofU(z) - 0.25;
      for (let x = x0 + 1.2; x < x1 - 0.6; x += 1.22) { tseg(x, zA, TB, zB, TB, 0.2); tseg(x, zA, TB, zA, top(zA)); tseg(x, zB, TB, zB, top(zB)); tseg(x, zA, top(zA), 0, top(0), 0.22); tseg(x, 0, top(0), zB, top(zB), 0.22);
        tseg(x, 0, TB, 0, top(0)); for (const zq of [zA / 2, zB / 2]) { tseg(x, zq, TB, zq, top(zq)); tseg(x, zq, TB, 0, (TB + top(0)) / 2); } } }
    // walls inside: brown boards low, banners/murals band high
    const muralTex = T(1024, 128, (g, w, h) => { g.fillStyle = '#5b4330'; g.fillRect(0, 0, w, h);
      const cols = ['#d23b2f', '#f2c12e', '#2f6fd6', '#2e9e57', '#e8742a', '#8b3fbf', '#f4f1e6'];
      for (let x = 6; x < w; x += 46 + rnd() * 20) { g.fillStyle = cols[(rnd() * cols.length) | 0]; const bw = 34 + rnd() * 18; g.fillRect(x, 12 + rnd() * 10, bw, h - 34 - rnd() * 10); g.fillStyle = 'rgba(255,255,255,.35)'; g.fillRect(x + 4, 30, bw - 8, 6); } }, 1, 1);
    for (const s of [-1, 1]) {
      const zw = s * (H - 0.08);
      if (s > 0) inn.add(quad([x0, 0, zw], [x1, 0, zw], [x1, S.westEave, zw], [x0, S.westEave, zw], mat({ map: tex(woodBoards, 1, 1) }), [3, 3]));
      else inn.add(holedWall(x0, x1, 0, S.westEave, zw, NWIN.map(x => [x - 0.55, 1.05, x + 0.55, 1.95]), mat({ map: tex(woodBoards, 1, 1) }), 3));   /* v8: windows through */
    }
    { const band = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0 - 2, 1.4), mat({ map: tex(muralTex, 3, 1) })); band.position.set((x0 + x1) / 2, 2.0, H - 0.15); band.rotation.y = Math.PI; inn.add(band); }
    // camp murals: a mosaic of painted boards (one per cabin/year) covering the upper walls — west gable inside and the gymnastics partition (IMG_8308/8311)
    const panelTex = T(1024, 512, (g, w, h) => { g.fillStyle = '#6b5440'; g.fillRect(0, 0, w, h); const pal = ['#2f6fd6', '#d23b2f', '#f2c12e', '#2e9e57', '#e8742a', '#8b3fbf', '#f4f1e6', '#1e8fa8', '#c2185b', '#7cb342', '#ffffff', '#222'];
      for (let y = 4; y < h - 40; y += 84) for (let x = 4; x < w - 60; x += 128) { const bg = pal[(rnd() * pal.length) | 0]; g.fillStyle = bg; g.fillRect(x, y, 122, 78);
        for (let k = 0; k < 6; k++) { g.fillStyle = pal[(rnd() * pal.length) | 0]; const t = rnd(); if (t < 0.4) { g.beginPath(); g.arc(x + 10 + rnd() * 100, y + 10 + rnd() * 58, 6 + rnd() * 16, 0, 7); g.fill(); } else if (t < 0.7) g.fillRect(x + rnd() * 100, y + rnd() * 60, 10 + rnd() * 40, 6 + rnd() * 18); else { g.font = 'bold ' + (12 + rnd() * 12 | 0) + 'px sans-serif'; g.fillText(['SUMMERFEST', 'OLYMPICS', '2009', 'PIRATES', 'VOLCANO', 'SYDNEY', 'AZTECS', '2014', 'KNIGHTS'][(rnd() * 9) | 0], x + 6 + rnd() * 30, y + 20 + rnd() * 50); } } } });
    { const wh = S.westRidge - 3.0, gw = new THREE.Shape(); gw.moveTo(-H + 0.3, 2.6); gw.lineTo(H - 0.3, 2.6); gw.lineTo(H - 0.3, roofU(H - 0.3) - 0.05); gw.lineTo(0, roofU(0) - 0.4); gw.lineTo(-H + 0.3, roofU(-H + 0.3) - 0.05); gw.lineTo(-H + 0.3, 2.6);
      const gg = new THREE.ShapeGeometry(gw); const uv = gg.attributes.uv, pp = gg.attributes.position; for (let i = 0; i < uv.count; i++) uv.setXY(i, (pp.getX(i) + H) / 19.2, (pp.getY(i) - 2.6) / 9.14);   /* panels = 8 x 5 ft color war banners */
      const pt = panelTex.clone(); pt.wrapS = pt.wrapT = THREE.RepeatWrapping; pt.needsUpdate = true; const m = new THREE.Mesh(gg, mat({ map: pt, emissive: 0x333333, emissiveIntensity: 0.4 })); m.rotation.y = Math.PI / 2; m.position.x = x0 + 0.15; inn.add(m);
      const pt2 = panelTex.clone(); pt2.wrapS = pt2.wrapT = THREE.RepeatWrapping; pt2.repeat.set((gx1 - gx0) / 10, 1); pt2.needsUpdate = true;
      }   /* the partition murals are built with the gymnastics room (three-row panel wall) */
    // ceiling lights (court photos show rows of lights between the trusses)
    for (const [lx, lz, I] of [[-34, 3, 40], [-21, 3, 40], [-8, 3, 40], [2, 10, 30], [-30, -16, 30], [-12, -16, 30]]) { const l = new THREE.PointLight(0xfff1dc, I, 26, 1.5); l.position.set(lx, (lz < GZ ? ceilY(lz) : roofU(lz)) - 1.0, lz); inn.add(l); }
    // ---- open hall: basketball court (west) + canteen (east, south wall) ----
    fl(x0 + 0.2, x1 - 0.2, GZ, H - 0.2, mat({ color: 0x6c7076, roughness: 0.9 }));   /* blue-grey (2010 rink photo, 2020 IG) */          // grey concrete (Henry: always grey with white lines — indoor basketball court / hockey rink)
    const courtTex = T(1024, 560, (g, w, h) => { g.clearRect(0, 0, w, h);
      g.strokeStyle = '#ffffff'; g.lineWidth = 6; g.strokeRect(16, 16, w - 32, h - 32); g.beginPath(); g.moveTo(w / 2, 16); g.lineTo(w / 2, h - 16); g.stroke(); g.beginPath(); g.arc(w / 2, h / 2, 64, 0, 7); g.stroke();
      for (const sx of [16, w - 16]) { const d = sx < w / 2 ? 1 : -1; g.strokeRect(Math.min(sx, sx + d * 200), h / 2 - 64, 200, 128); g.beginPath(); g.arc(sx + d * 200, h / 2, 64, 0, 7); g.stroke();
        g.beginPath(); g.arc(sx, h / 2, 240, d > 0 ? -1.35 : Math.PI - 1.35, d > 0 ? 1.35 : Math.PI + 1.35); g.stroke(); }
      g.strokeStyle = '#ffffff'; g.lineWidth = 4; g.beginPath(); g.arc(w / 2, h / 2, 140, 0, 7); g.stroke(); });   // hockey circle, also white
    const courtL = 28, courtW = 15.2, ccx = -21, ccz = 2.0;
    { const c = new THREE.Mesh(new THREE.PlaneGeometry(courtL, courtW), new THREE.MeshStandardMaterial({ map: courtTex, transparent: true, roughness: 0.6 })); c.rotation.x = -Math.PI / 2; c.position.set(ccx, 0.03, ccz); inn.add(c); }
    for (const d of [-1, 1]) {
      const hx = ccx + d * (courtL / 2 - 0.2);
      /* Henry + IG 3754170343943659788: the hoops hang from the rafters on a steel frame (no floor poles) */
      { const st = mat({ color: 0x6a6a6a }), yTop = TB - 0.1, yB = 3.85;
        for (const dz of [-0.6, 0.6]) { const v = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, yTop - yB, 6), st); v.position.set(hx + d * 0.1, (yTop + yB) / 2, ccz + dz); inn.add(v);
          const len = Math.hypot(1.6, yTop - yB), br = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, len, 6), st); br.position.set(hx + d * 0.9, (yTop + yB) / 2, ccz + dz); br.rotation.z = d * Math.atan2(1.6, yTop - yB); inn.add(br); }
        const top = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 1.4), st); top.position.set(hx + d * 0.1, yB, ccz); inn.add(top); }
      const bb = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.05, 1.8), mat({ color: 0xffffff })); bb.position.set(hx, 3.35, ccz); inn.add(bb);
      const sq = new THREE.Mesh(new THREE.PlaneGeometry(0.59, 0.45), mat({ color: 0xd2302c })); sq.rotation.y = d > 0 ? -Math.PI / 2 : Math.PI / 2; sq.position.set(hx - d * 0.03, 3.2, ccz); inn.add(sq);
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.23, 0.02, 6, 24), mat({ color: 0xff5a1f })); rim.rotation.x = Math.PI / 2; rim.position.set(hx - d * 0.3, 3.05, ccz); inn.add(rim);
      // roller-hockey goal
      const goal = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.2, 1.8), mat({ color: 0xd8302c, wireframe: true })); goal.position.set(hx - d * 1.6, 0.6, ccz + 4.5); inn.add(goal);
    }
    // flags of many countries hanging from the rafters down the middle of the hall (wayback 2003 wint_14, 2010 400RollerHockey08, IG 3754170343943659788)
    { const tri = (c, horiz) => (g, w, h) => { for (let i = 0; i < 3; i++) { g.fillStyle = c[i]; if (horiz) g.fillRect(0, i * h / 3, w, h / 3 + 1); else g.fillRect(i * w / 3, 0, w / 3 + 1, h); } };
      const cross = (bg, fg, inner) => (g, w, h) => { g.fillStyle = bg; g.fillRect(0, 0, w, h); g.fillStyle = fg; g.fillRect(w * 0.3, 0, w * 0.16, h); g.fillRect(0, h * 0.42, w, h * 0.16); if (inner) { g.fillStyle = inner; g.fillRect(w * 0.34, 0, w * 0.08, h); g.fillRect(0, h * 0.46, w, h * 0.08); } };
      const F = [
        cross('#006aa7', '#fecc00'), cross('#ba0c2f', '#fff', '#00205b'), (g, w, h) => { g.fillStyle = '#fff'; g.fillRect(0, 0, w, h); g.fillStyle = '#bc002d'; g.beginPath(); g.arc(w / 2, h / 2, h * 0.3, 0, 7); g.fill(); },
        (g, w, h) => { g.fillStyle = '#d52b1e'; g.fillRect(0, 0, w, h); g.fillStyle = '#fff'; g.fillRect(w * 0.42, h * 0.2, w * 0.16, h * 0.6); g.fillRect(w * 0.3, h * 0.42, w * 0.4, h * 0.16); },
        (g, w, h) => { g.fillStyle = '#d52b1e'; g.fillRect(0, 0, w, h); g.fillStyle = '#fff'; g.fillRect(w * 0.25, 0, w * 0.5, h); g.fillStyle = '#d52b1e'; g.beginPath(); g.moveTo(w / 2, h * 0.2); g.lineTo(w * 0.6, h * 0.6); g.lineTo(w * 0.4, h * 0.6); g.fill(); g.fillRect(w * 0.48, h * 0.55, w * 0.04, h * 0.25); },
        (g, w, h) => { g.fillStyle = '#fff'; g.fillRect(0, 0, w, h); g.fillStyle = '#ce1124'; g.fillRect(w * 0.43, 0, w * 0.14, h); g.fillRect(0, h * 0.4, w, h * 0.2); },
        (g, w, h) => { g.fillStyle = '#009c3b'; g.fillRect(0, 0, w, h); g.fillStyle = '#ffdf00'; g.beginPath(); g.moveTo(w * 0.08, h / 2); g.lineTo(w / 2, h * 0.1); g.lineTo(w * 0.92, h / 2); g.lineTo(w / 2, h * 0.9); g.fill(); g.fillStyle = '#002776'; g.beginPath(); g.arc(w / 2, h / 2, h * 0.22, 0, 7); g.fill(); },
        (g, w, h) => { g.fillStyle = '#012169'; g.fillRect(0, 0, w, h); g.strokeStyle = '#fff'; g.lineWidth = h * 0.18; g.beginPath(); g.moveTo(0, 0); g.lineTo(w, h); g.moveTo(w, 0); g.lineTo(0, h); g.stroke(); g.strokeStyle = '#c8102e'; g.lineWidth = h * 0.07; g.stroke(); g.fillStyle = '#fff'; g.fillRect(w * 0.42, 0, w * 0.16, h); g.fillRect(0, h * 0.36, w, h * 0.28); g.fillStyle = '#c8102e'; g.fillRect(w * 0.45, 0, w * 0.1, h); g.fillRect(0, h * 0.41, w, h * 0.18); },
        tri(['#009246', '#fff', '#ce2b37']), tri(['#000', '#dd0000', '#ffce00'], true), tri(['#002395', '#fff', '#ed2939']), tri(['#c60b1e', '#ffc400', '#c60b1e'], true),
        (g, w, h) => { for (let i = 0; i < 9; i++) { g.fillStyle = i % 2 ? '#fff' : '#0d5eaf'; g.fillRect(0, i * h / 9, w, h / 9 + 1); } g.fillStyle = '#0d5eaf'; g.fillRect(0, 0, w * 0.4, h * 5 / 9); g.fillStyle = '#fff'; g.fillRect(w * 0.16, 0, w * 0.08, h * 5 / 9); g.fillRect(0, h * 2 / 9, w * 0.4, h / 9); },
        tri(['#169b62', '#fff', '#ff883e']), tri(['#006847', '#fff', '#ce1126']), tri(['#ae1c28', '#fff', '#21468b'], true), (g, w, h) => { g.fillStyle = '#fff'; g.fillRect(0, 0, w, h / 2); g.fillStyle = '#dc143c'; g.fillRect(0, h / 2, w, h / 2); },
        (g, w, h) => { for (let i = 0; i < 13; i++) { g.fillStyle = i % 2 ? '#fff' : '#b22234'; g.fillRect(0, i * h / 13, w, h / 13 + 1); } g.fillStyle = '#3c3b6e'; g.fillRect(0, 0, w * 0.4, h * 7 / 13); },
        tri(['#000', '#ffce00', '#ff0000']), tri(['#fff', '#0039a6', '#d52b1e'], true), tri(['#74acdf', '#fff', '#74acdf'], true)];
      let k = 0; for (let fx = x0 + 3; fx < x1 - 2; fx += 1.9, k++) { const fz = k % 2 ? 0.9 : -0.9;
        const ft = T(120, 80, F[(k * 7) % F.length]); const f = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.0), mat({ map: ft, side: THREE.DoubleSide, emissive: 0x333333, emissiveIntensity: 0.4 }));
        f.position.set(fx, TB - 0.75, fz); f.rotation.y = Math.PI / 2 + (k % 2 ? 1 : -1) * 0.12; inn.add(f);
        const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.6, 4), mat({ color: 0x3a2a1a })); rod.rotation.x = Math.PI / 2; rod.position.set(fx, TB - 0.2, fz); inn.add(rod); } }
    // low brown rink boards (dasher boards) along the hall walls below the murals (2003/2010 rink photos, IG 2358606171873347822)
    { const dash = mat({ color: 0x5a3a24, roughness: 0.8 }); const db = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.15, 11.6 - GZ), dash); db.position.set(x0 + 0.24, 0.58, (11.6 + GZ) / 2); inn.add(db); }
    // canteen (Ghost photo IMG_8314, looking west along it): a long room on the south side with a white drop ceiling, windows in the outer wall,
    // wooden booths along both sides, ping-pong tables down the middle and foosball; the inner side is open between posts above the booth backs.
    { const cz0 = 11.6, cz1 = H - 0.15, cx0 = S.westX0 + 0.25, cx1 = S.westX1 - 0.3, ch = 2.75, wood = mat({ color: 0x8a6440 }), cream = mat({ color: 0xe8e2c8, emissive: 0x6b675a, emissiveIntensity: 0.5 });
      const ceil = new THREE.Mesh(new THREE.PlaneGeometry(cx1 - cx0, cz1 - cz0), mat({ map: T(256, 256, (g, w, h) => { g.fillStyle = '#efede6'; g.fillRect(0, 0, w, h); g.strokeStyle = '#c9c6bd'; g.lineWidth = 3; for (let k = 0; k <= w; k += 64) { g.beginPath(); g.moveTo(k, 0); g.lineTo(k, h); g.stroke(); g.beginPath(); g.moveTo(0, k); g.lineTo(w, k); g.stroke(); } }), emissive: 0x777777, emissiveIntensity: 0.6, side: THREE.DoubleSide }));
      ceil.material.map.wrapS = ceil.material.map.wrapT = THREE.RepeatWrapping; ceil.material.map.repeat.set((cx1 - cx0) / 2.4, (cz1 - cz0) / 2.4); ceil.rotation.x = Math.PI / 2; ceil.position.set((cx0 + cx1) / 2, ch, (cz0 + cz1) / 2); inn.add(ceil);
      for (let x = cx0 + 3; x < cx1 - 1; x += 3.5) { const fx = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.04, 0.2), mat({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.9 })); fx.position.set(x, ch - 0.03, (cz0 + cz1) / 2); inn.add(fx); }
      inn.add(quad([cx0, 0, cz1 - 0.02], [cx1, 0, cz1 - 0.02], [cx1, ch, cz1 - 0.02], [cx0, ch, cz1 - 0.02], cream, [1, 1]));                          // cream inner face of the outer wall
      for (const xe of [cx0, cx1]) inn.add(quad([xe, 0, cz0], [xe, 0, cz1], [xe, ch, cz1], [xe, ch, cz0], cream, [1, 1]));
      // Henry 9:08 AM: the wall between the court and the canteen is only ~4 ft (1.2 m) high, so the canteen is in plain view from the court; two walk-through gaps
      const SX0 = -15.0, SX1 = 0.3, SZ = 15.2, MZ = (cz0 + cz1) / 2;   /* Henry 1:18 PM: the candy canteen room is the room against the south wall next to the bathrooms (nothing at the west end) */ const SXOLD = cx0 - 1;   /* candy-canteen room at the WEST end, against the south wall, half the canteen depth (length ~9 m is an estimate) */
      { const dw = [[-24, 1.8], [-4, 1.8]], wallTop = roofU(cz0) - 0.05, armWood = mat({ map: tex(woodBoards, 1, 1) }), KW = 1.2;
        let xs = cx0; const pieces = [];
        for (const [dc, w] of dw) { pieces.push([xs, dc - w / 2]); xs = dc + w / 2; } pieces.push([xs, cx1]);
        for (const [xa, xb] of pieces) { const kw = new THREE.Mesh(new THREE.BoxGeometry(xb - xa, KW, 0.15), cream); kw.position.set((xa + xb) / 2, KW / 2, cz0); inn.add(kw);
          const cap = new THREE.Mesh(new THREE.BoxGeometry(xb - xa, 0.06, 0.25), wood); cap.position.set((xa + xb) / 2, KW + 0.03, cz0); inn.add(cap); }
        inn.add(quad([cx0, ch, cz0 - 0.02], [cx1, ch, cz0 - 0.02], [cx1, wallTop, cz0 - 0.02], [cx0, wallTop, cz0 - 0.02], armWood, [3, 1]));   /* boards close the space above the drop ceiling */
        const tim = mat({ color: 0xc9a27a });   /* big diagonal timber braces (Ghost IMG_8313) */
        for (const [bx, dir] of [[-3.4, 1], [0.2, -1]]) { const len = Math.hypot(1.6, ch); const br = new THREE.Mesh(new THREE.BoxGeometry(0.25, len, 0.2), tim); br.position.set(bx + dir * 0.8, ch / 2, cz0 + 0.2); br.rotation.z = dir * Math.atan2(1.6, ch); inn.add(br); } }
      /* Ghost IMG_8314: square posts carrying a beam along the inner edge of each booth row (east of the candy room) */
      const RX0b = -15.0; for (const pz of [cz1 - 2.0, cz0 + 2.0]) { const bx0 = cx0 + 1.0, bx1 = pz > (cz0 + cz1) / 2 ? RX0b - 0.5 : cx1 - 3; const beam = new THREE.Mesh(new THREE.BoxGeometry(bx1 - bx0, 0.25, 0.18), mat({ color: 0x6e6450 })); beam.position.set((bx0 + bx1) / 2, ch - 0.13, pz); inn.add(beam);
        for (let x = bx0 + 0.2; x < bx1; x += 4.8) { const po = new THREE.Mesh(new THREE.BoxGeometry(0.15, ch, 0.15), mat({ color: 0x8a7656 })); po.position.set(x, ch / 2, pz); inn.add(po); } }
      inn.add(quad([cx1 - 0.05, 0, cz0], [cx1 - 0.05, 0, cz1], [cx1 - 0.05, ch, cz1], [cx1 - 0.05, ch, cz0], cream, [1, 1]));   /* east end wall */
      /* Henry 1:10 PM markup: a row of rooms against the south wall at the east end — an unnamed room, then the women's and the men's bathrooms on the corner */
      const RZ = 15.2, RX0 = -15.0, RX1 = cx1, rooms = [[0.3, 7.0, 'WOMEN'], [7.0, RX1, 'MEN']];
      { const rw = mat({ color: 0xe8e2c8, emissive: 0x6b675a, emissiveIntensity: 0.5 });
        inn.add(quad([0.3, 0, RZ], [RX1, 0, RZ], [RX1, ch, RZ], [0.3, ch, RZ], rw, [1, 1])); inn.add(quad([RX0, 0, RZ], [RX0, 0, cz1], [RX0, ch, cz1], [RX0, ch, RZ], rw, [1, 1]));
        for (const [a2, b2, lbl] of rooms) { if (a2 > 0.3) inn.add(quad([a2, 0, RZ], [a2, 0, cz1], [a2, ch, cz1], [a2, ch, RZ], rw, [1, 1]));
          const dx = (a2 + b2) / 2; const dr = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 2.05), mat({ color: 0x8a6a4a })); dr.rotation.y = Math.PI; dr.position.set(dx, 1.03, RZ - 0.03); inn.add(dr);
          if (lbl) { const sg = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.3), mat({ map: T(96, 32, (g2, w, h) => { g2.fillStyle = '#f4f2ec'; g2.fillRect(0, 0, w, h); g2.fillStyle = '#222'; g2.font = 'bold 18px sans-serif'; g2.textAlign = 'center'; g2.fillText(lbl, w / 2, 23); }) })); sg.rotation.y = Math.PI; sg.position.set(dx, 2.3, RZ - 0.04); inn.add(sg); } } }
      /* the candy canteen room: walls to the drop ceiling, 4 service windows in its north wall where kids line up, a door on its east side, shelves of candy and drinks inside */
      { const rw = mat({ color: 0xe8e2c8, emissive: 0x6b675a, emissiveIntensity: 0.5 }), dark = mat({ color: 0x2a2018 });
        const wins = [0, 1, 2, 3].map(k => SX0 + 1.4 + k * 2.0), ww = 1.1, sill = 0.95, wh = 0.9;
        let xa = SX0; for (const wx of wins) { inn.add(quad([xa, 0, SZ], [wx - ww / 2, 0, SZ], [wx - ww / 2, ch, SZ], [xa, ch, SZ], rw, [1, 1])); inn.add(quad([wx - ww / 2, 0, SZ], [wx + ww / 2, 0, SZ], [wx + ww / 2, sill, SZ], [wx - ww / 2, sill, SZ], rw, [1, 1]));
          inn.add(quad([wx - ww / 2, sill + wh, SZ], [wx + ww / 2, sill + wh, SZ], [wx + ww / 2, ch, SZ], [wx - ww / 2, ch, SZ], rw, [1, 1]));
          const ledge = new THREE.Mesh(new THREE.BoxGeometry(ww + 0.2, 0.05, 0.4), wood); ledge.position.set(wx, sill, SZ); inn.add(ledge); xa = wx + ww / 2; }
        inn.add(quad([xa, 0, SZ], [SX1, 0, SZ], [SX1, ch, SZ], [xa, ch, SZ], rw, [1, 1]));
        inn.add(quad([SX1, 0, SZ], [SX1, 0, cz1], [SX1, ch, cz1], [SX1, ch, SZ], rw, [1, 1]));
        const door = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 2.05), mat({ color: 0x8a6a4a })); door.rotation.y = Math.PI; door.position.set(SX1 - 1.0, 1.03, SZ - 0.03); inn.add(door);
        const ctr = new THREE.Mesh(new THREE.BoxGeometry(SX1 - SX0 - 0.6, 0.95, 0.6), wood); ctr.position.set((SX0 + SX1) / 2, 0.47, SZ + 0.45); inn.add(ctr);
        const candy = ['#e8434a', '#f2c12e', '#3fb36b', '#4d8fd6', '#f07c2a', '#9b59b6'];
        for (let sh = 0; sh < 3; sh++) for (let k = 0; k < 10; k++) { const bx = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.28, 0.3), mat({ color: new THREE.Color(candy[(k + sh) % candy.length]) })); bx.position.set(SX0 + 0.8 + k * 0.82, 0.9 + sh * 0.5, cz1 - 0.3); inn.add(bx); }
        const fridge = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.9, 0.7), mat({ color: 0xdfe3e6 })); fridge.position.set(SX1 - 0.6, 0.95, cz1 - 0.5); inn.add(fridge);
        const menu = new THREE.Mesh(new THREE.PlaneGeometry(4, 0.6), mat({ map: T(320, 48, (g, w, h) => { g.fillStyle = '#1d2a1d'; g.fillRect(0, 0, w, h); g.fillStyle = '#fff'; g.font = 'bold 30px sans-serif'; g.textAlign = 'center'; g.fillText('CANTEEN', w / 2, 36); }) }));
        menu.rotation.y = Math.PI; menu.position.set((SX0 + SX1) / 2, 2.25, SZ - 0.03); inn.add(menu); }
      for (let x = cx0 + 2.5; x < cx1 - 1; x += 3.2) { const w = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9), mat({ color: 0xdfeefa, emissive: 0xbfd8ea, emissiveIntensity: 0.6 })); w.rotation.y = Math.PI; w.position.set(x, 1.6, cz1 - 0.05); inn.add(w); }
      for (const [bz, face] of [[cz1 - 0.9, -1], [cz0 + 0.9, 1]]) for (let x = cx0 + 1.5; x < cx1 - 5.5; x += 2.4) { if (bz > (cz0 + cz1) / 2 && x > RX0 - 1.2) continue; if (bz < (cz0 + cz1) / 2 && x > -19) continue;   /* Henry 1:30 PM: no booths in the canteen area */ if (bz < (cz0 + cz1) / 2 && Math.abs(x + 24) < 1.6 || bz < (cz0 + cz1) / 2 && Math.abs(x + 4) < 1.6) continue;      // booths: table + two high-backed benches
        const t = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.06, 1.2), wood); t.position.set(x, 0.75, bz); inn.add(t);
        for (const dx of [-0.85, 0.85]) { const back = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.25, 1.3), wood); back.position.set(x + dx, 0.62, bz); inn.add(back); const seat = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.06, 1.3), wood); seat.position.set(x + dx * 0.72, 0.45, bz); inn.add(seat); } }
      /* Henry 9:08 AM: the ping-pong tables down the middle of the canteen are always there (the circus picnic tables were off-season storage and stay out) */
      for (let k = 0; k < 8; k++) { const px = cx0 + 4.0 + k * 4.6, pz = MZ + 0.4;
        if (px > -19.5) break;
        const pt = new THREE.Mesh(new THREE.BoxGeometry(2.74, 0.05, 1.52), mat({ color: 0x5b7a6d })); pt.position.set(px, 0.76, pz); inn.add(pt);
        const net = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.15, 1.6), mat({ color: 0x222222 })); net.position.set(px, 0.86, pz); inn.add(net);
        for (const dx of [-1, 1]) for (const dz of [-0.6, 0.6]) { const lg = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.74, 0.06), wood); lg.position.set(px + dx * 1.2, 0.37, pz + dz); inn.add(lg); } }
      /* pool table at the west end of the ping-pong row (2010 'Canteen Gameroom' web photo + Instagram 903895361570379740) */
      for (const px of [-40.2, -30.5]) { const pz = 14.0; const felt = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.12, 1.4), mat({ color: 0x1f6b4a })); felt.position.set(px, 0.8, pz); inn.add(felt);
        const body = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.55, 1.6), mat({ color: 0x6b4426 })); body.position.set(px, 0.5, pz); inn.add(body); }
      /* Henry 1:10-1:11 PM: arcade machines stand in front of the candy canteen room (along the low court wall, facing south); the DJ booth is in the middle of the space, facing west */
      { const cab = mat({ color: 0x1b1b22 }), scr = mat({ color: 0x3a7bd5, emissive: 0x3a7bd5, emissiveIntensity: 0.8 }), mq = ['#e8434a', '#f2c12e', '#3fb36b', '#9b59b6', '#f07c2a'];
        for (let k = 0; k < 5; k++) { const x = SX0 + 2.0 + k * 0.85; const c = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.8, 0.75), cab); c.position.set(x, 0.9, cz0 + 0.55); inn.add(c);
          const sc = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.42), scr); sc.position.set(x, 1.35, cz0 + 0.93); inn.add(sc);
          const mk = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.18), mat({ color: new THREE.Color(mq[k]), emissive: new THREE.Color(mq[k]), emissiveIntensity: 0.6 })); mk.position.set(x, 1.7, cz0 + 0.93); inn.add(mk); }
        const dx = -15.3, dz = 13.6;   /* platform against the west end of the room row, DJ faces west */
        const plat = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.35, 2.6), wood); plat.position.set(dx, 0.17, dz); inn.add(plat);
        const desk = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.95, 1.8), cab); desk.position.set(dx - 1.0, 0.35 + 0.47, dz); inn.add(desk);
        const deck = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.06, 1.2), mat({ color: 0x555555 })); deck.position.set(dx - 1.0, 1.33, dz); inn.add(deck);
        for (const sz of [-1.25, 1.25]) { const spk = new THREE.Mesh(new THREE.BoxGeometry(0.45, 1.0, 0.5), cab); spk.position.set(dx - 1.6, 0.35 + 0.5, dz + sz); inn.add(spk); } }
            for (const fx of [-1.5, 3.0]) { const fb = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.32, 0.75), mat({ color: 0x3d2c1e })); fb.position.set(fx, 0.82, cz0 + 2.6); inn.add(fb);
        for (const dx of [-0.6, 0.6]) for (const dz of [-0.3, 0.3]) { const lg = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.66, 0.07), mat({ color: 0x3d2c1e })); lg.position.set(fx + dx, 0.33, cz0 + 2.6 + dz); inn.add(lg); } }
    }
    // ---- gymnastics room (walled off): partition to the ceiling, white ceiling, blue mats, rod floor, beams, bars ----
    { const ph = ceilY(GZ) - 0.05;
      const partTex = T(256, 256, (g, w, h) => { g.fillStyle = '#efe6c4'; g.fillRect(0, 0, w, h); g.fillStyle = '#e9b73a'; g.fillRect(0, 0, w, h * 0.35); for (let x = 0; x < w; x += 32) { g.fillStyle = 'rgba(120,90,40,.35)'; g.fillRect(x, 0, 3, h); } });
      /* Instagram 3855568119322750579 / 1248737213601453088 / 3728789413217285297: the hall side of the wall is covered with years of painted plywood cabin murals ('WANTED', years, logos), three rows high */
      { const mw = gx1 - gx0, rows = 4, ph2 = 1.55, cols = Math.round(mw / 2.45);   /* Henry: color war banners ~5 ft tall x 8 ft wide */
        const muralWall = T(2048, 384, (g, w, h) => { const pal = ['#d23b2f', '#f2c12e', '#2f6fd6', '#2e9e57', '#e8742a', '#8b3fbf', '#f4f1e6', '#1d1d1d', '#7fc6e8', '#c8a04a'];
          const cw = w / cols, rh = h / rows; let sd = 11; const rr = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
          const words = ['MADRID \'01', 'PARIS 2002', 'SYDNEY', 'OLYMPICS \'07', 'PATRIOTS', 'AZTECS', 'WIZARDS', 'MARTIANS', 'SUMMERFEST', 'KNIGHTS \'07', 'MONSOON', 'NEW ORLEANS', 'BARBARIANS', 'ROME', 'WANTED', 'SPARTANS', 'PIRATES', 'NINJAS'];
          for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const x = c * cw, y = r * rh; g.fillStyle = pal[(rr() * pal.length) | 0]; g.fillRect(x + 1, y + 1, cw - 2, rh - 2);
            g.fillStyle = pal[(rr() * pal.length) | 0]; if (rr() < 0.5) { g.beginPath(); g.arc(x + cw / 2, y + rh * 0.55, rh * 0.25, 0, 7); g.fill(); } else g.fillRect(x + cw * 0.15, y + rh * 0.35, cw * 0.7, rh * 0.4);
            if (rr() < 0.6) { g.fillStyle = rr() < 0.5 ? '#111' : '#fff'; g.font = `bold ${Math.round(rh * 0.16)}px sans-serif`; g.textAlign = 'center'; g.fillText(words[(rr() * words.length) | 0], x + cw / 2, y + rh * 0.24); } } });
        const mm = new THREE.Mesh(new THREE.PlaneGeometry(mw, rows * ph2), mat({ map: muralWall, emissive: 0x222222, emissiveIntensity: 0.3 })); mm.position.set((gx0 + gx1) / 2, 1.2 + rows * ph2 / 2, GZ + 0.09); inn.add(mm); }
      for (const side of [1, -1]) inn.add(quad([gx0, 0, GZ + side * 0.05], [gx1, 0, GZ + side * 0.05], [gx1, ph, GZ + side * 0.05], [gx0, ph, GZ + side * 0.05], mat({ map: tex(partTex, 1, 1) }), [4, ph]));
      // east end wall of the room with a door
      const eh = ceilY(-H + 0.5);
      const mint = mat({ color: 0xa9d8c0, roughness: 0.9 }), zm = (-H + 0.1 + GZ) / 2;   /* v8 (Henry): both end walls smooth mint, door in the middle with a window either side */
      const endHoles = [[zm - 0.55, 0.0, zm + 0.55, 2.15], [zm - 2.6, 1.0, zm - 1.4, 2.0], [zm + 1.4, 1.0, zm + 2.6, 2.0]];
      for (const xe of [gx1, gx0]) { const ew = holedWall(-H + 0.1, GZ, 0, ph, 0, endHoles.map(([a, b, c, d]) => [a, b, c, d]), mint); ew.position.z = 0; ew.rotation.y = -Math.PI / 2; ew.position.x = xe; inn.add(ew);
        for (const dz of [-2.0, 2.0]) { const gl = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.0), glassMat()); gl.rotation.y = Math.PI / 2; gl.position.set(xe, 1.5, zm + dz); inn.add(gl);
          for (const [hh, ww, dy, dzz] of [[0.08, 1.3, 0.54, 0], [0.08, 1.3, -0.54, 0], [1.1, 0.08, 0, 0.62], [1.1, 0.08, 0, -0.62]]) { const f = new THREE.Mesh(new THREE.BoxGeometry(0.14, hh, ww), mat({ color: 0xf2f0ea })); f.position.set(xe, 1.5 + dy, zm + dz + dzz); inn.add(f); } } }
      const door = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 2.2), mat({ color: 0xf2f0ea })); door.position.set(gx1 - 3, 1.1, GZ + 0.08); inn.add(door);   /* door through the partition into the hall */
      fl(gx0, gx1, -H + 0.2, GZ, mat({ color: 0xc9a77c }), 0.025);
      fl(gx0 + 1, gx1 - 1, -H + 1, GZ - 0.6, mat({ color: 0x2f62c8 }), 0.06);
      { const TX = -22.5, TZ = GZ - 0.35 - 1.3, TL = 17;   /* Henry (v6): tumble track right against the tall partition, ending ~4 m east of the 360 camera */
        const top = new THREE.Mesh(new THREE.BoxGeometry(TL, 0.45, 1.9), mat({ color: 0x1b1b1b })); top.position.set(TX, 0.225, TZ); inn.add(top);
        const red = mat({ color: 0xc8262a }); for (const dz of [-1.12, 1.12]) { const e = new THREE.Mesh(new THREE.BoxGeometry(TL + 0.7, 0.62, 0.36), red); e.position.set(TX, 0.31, TZ + dz); inn.add(e); }
        for (const dx of [-(TL / 2 + 0.2), TL / 2 + 0.2]) { const e = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.62, 2.6), red); e.position.set(TX + dx, 0.31, TZ); inn.add(e); } }
      /* Henry (v6): the doors at both ends of the gym room (white), plus the partition door seen from the gym side */
      for (const [x, z, ry] of [[gx1 - 0.06, zm, -Math.PI / 2], [gx0 + 0.06, zm, Math.PI / 2]]) { const d = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 2.1), mat({ color: 0xf2f0ea, side: THREE.DoubleSide })); d.rotation.y = ry; d.position.set(x, 1.05, z); inn.add(d);
        const fr = new THREE.Mesh(new THREE.PlaneGeometry(1.16, 2.2), mat({ color: 0x8a6440, side: THREE.DoubleSide })); fr.rotation.y = ry; fr.position.set(x + (ry < 0 ? 0.01 : -0.01), 1.1, z); inn.add(fr); }
      { const d2 = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 2.2), mat({ color: 0xf2f0ea })); d2.rotation.y = Math.PI; d2.position.set(gx1 - 3, 1.1, GZ - 0.08); inn.add(d2); }
      for (const z of [-19, -18]) { const bm = new THREE.Mesh(new THREE.BoxGeometry(5, 0.1, 0.1), mat({ color: 0xa47b52 })); bm.position.set(-34, 1.2, z); inn.add(bm);
        for (const dx of [-2, 2]) { const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.2, 6), mat({ color: 0x6b6b6b })); leg.position.set(-34 + dx, 0.6, z); inn.add(leg); } }
      for (const z of [-13, -12.3]) { const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 3.5, 6), mat({ color: 0xc9a46c })); bar.rotation.z = Math.PI / 2; bar.position.set(-6, 1.7, z); inn.add(bar); }
      for (let k = 0; k < 10; k++) { const wm = new THREE.Mesh(new THREE.BoxGeometry(1.85, 1.9, 0.12), mat({ color: k % 3 ? 0x2f62c8 : 0x2a58b8 })); wm.position.set(-27 + k * 1.9, 0.95, GZ - 0.15); wm.visible = (-27 + k * 1.9) > -13.5; inn.add(wm); }   /* row of blue wall mats along the partition */
      // windows along the north outer wall (seen in the gymnastics 360°)
      /* v8: the old opaque window panels are gone; the north windows are real openings (NWIN) */
    }
  }

  // ---------- CIRCUS SECTION ----------
  const cx0 = S.circX0, cx1 = S.circX1, L = cx1 - cx0, CX = (cx0 + cx1) / 2, H = S.halfW, NH = S.naveHalf;
  const SOUTH_OPEN_X = cx1 - 21.2;
  const WIN_ROWS = [[4.0, 5.0], [S.clereTop - 3.0, S.clereTop - 1.0]];   /* end-wall window rows: low row above the opening, high row level with the clerestory */
  const R = (NH * NH + S.vaultRise * S.vaultRise) / (2 * S.vaultRise), HALF = Math.asin(NH / R);
  {
    for (const s of [-1, 1]) {
      // exterior: aisle lean-to roof, clerestory wall with windows, nave gable roof
      ext.add(quad([cx0, S.aisleEave, s * H], [cx1, S.aisleEave, s * H], [cx1, S.aisleTop, s * NH], [cx0, S.aisleTop, s * NH], mat({ map: tex(greyRoof, 1, 1) }), [4, 4]));
      { const xw = s > 0 ? SOUTH_OPEN_X : cx0, xe = s > 0 ? cx1 : cx1 - 4.9; ext.add(quad([xw, 0, s * H], [xe, 0, s * H], [xe, S.aisleEave, s * H], [xw, S.aisleEave, s * H], mat({ map: tex(siding, 1, 1) }), [4, 4]));
        if (s < 0) for (const px of [cx1 - 4.9, cx1 - 2.45, cx1 - 0.2]) { const pp = new THREE.Mesh(new THREE.BoxGeometry(0.25, S.aisleEave, 0.25), mat({ color: 0x3a2c1e })); pp.position.set(px, S.aisleEave / 2, s * H); ext.add(pp); } }   /* Henry: the north-east corner panels are open */
      ext.add(quad([cx0, S.ridge, 0], [cx1, S.ridge, 0], [cx1, S.clereTop, s * NH], [cx0, S.clereTop, s * NH], mat({ map: tex(greyRoof, 1, 1) }), [4, 4]));
      const cw = quad([cx0, S.aisleTop, s * (NH + 0.05)], [cx1, S.aisleTop, s * (NH + 0.05)], [cx1, S.clereTop - 3.0, s * (NH + 0.05)], [cx0, S.clereTop - 3.0, s * (NH + 0.05)], mat({ map: tex(siding, 1, 1) }), [4, 4]);   // double-sided: the inner star wall must never show outside
      if (s < 0) cw.geometry.scale(1, 1, 1);
      ext.add(cw);
      ext.add(quad([cx0, S.clereTop - 1.0, s * (NH + 0.05)], [cx1, S.clereTop - 1.0, s * (NH + 0.05)], [cx1, S.clereTop, s * (NH + 0.05)], [cx0, S.clereTop, s * (NH + 0.05)], mat({ map: tex(siding, 1, 1) }), [4, 4]));
      const cwin = quad([cx0, S.clereTop - 3.0, s * (NH + 0.06)], [cx1, S.clereTop - 3.0, s * (NH + 0.06)], [cx1, S.clereTop - 1.0, s * (NH + 0.06)], [cx0, S.clereTop - 1.0, s * (NH + 0.06)], mat({ map: tex(clere, L / 3.4, 1), transparent: true, depthWrite: false, side: THREE.DoubleSide }), [L, 2.0]);   /* see-through from outside too */
      ext.add(cwin);
      // big doors in the aisle outer walls (light comes in at ground level in the 360° photo)
      if (s < 0) for (const dx of [-11, 3]) { const d = new THREE.Mesh(new THREE.BoxGeometry(5, 2.6, 0.15), mat({ color: 0x3a2c1e })); d.position.set(CX + dx, 1.3, s * (H + 0.08)); ext.add(d); }
      else { // Henry: south wall closed except an entrance near the Sports Center and doors into the weight-lifting area toward the east end
        /* Henry Nov 16: the south aisle wall is open from the Sports Center to the backstage (posts only) */ for (let x = cx0 + 0.2; x < SOUTH_OPEN_X; x += 3.2) { const pp = new THREE.Mesh(new THREE.BoxGeometry(0.25, S.aisleEave, 0.25), mat({ color: 0x3a2c1e })); pp.position.set(x, S.aisleEave / 2, H - 0.12); ext.add(pp); }
        for (const dz of [-0.62, 0.62]) { const d = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.2, 0.12), mat({ color: 0x5a4430 })); d.position.set(cx1 - 6 + dz, 1.1, H + 0.09); ext.add(d); }
        const sign = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.4), mat({ map: T(256, 44, (g, w, h) => { g.fillStyle = '#f1efe8'; g.fillRect(0, 0, w, h); g.fillStyle = '#222'; g.font = 'bold 26px sans-serif'; g.textAlign = 'center'; g.fillText('WEIGHT ROOM', w / 2, 32); }) })); sign.position.set(cx1 - 6, 2.5, H + 0.16); ext.add(sign); }
    }
    // end walls: stepped profile (aisle eave → aisle top → clerestory → gable ridge)
    function endProfile(withVault) {
      const sh = new THREE.Shape(); sh.moveTo(-H, 0); sh.lineTo(H, 0); sh.lineTo(H, S.aisleEave); sh.lineTo(NH, S.aisleTop); sh.lineTo(NH, S.clereTop);
      sh.lineTo(0, S.ridge); sh.lineTo(-NH, S.clereTop); sh.lineTo(-NH, S.aisleTop); sh.lineTo(-H, S.aisleEave); sh.lineTo(-H, 0); return sh;
    }
    // east end (faces the soccer field): big door in the middle
    {
      /* Henry: the east wall doesn't reach the floor: open along the bottom across the nave and the north-east corner */
      /* v8 (Henry): open along the bottom ~2.8 m, a raised section in the middle, two rows of windows cut right through the wall */
      const sh = endProfile(); const hole = new THREE.Path(); const hx0 = -(NH - 0.3), hx1 = H - 0.3, hh = 2.8, hm = 3.6, mz = 4.0;
      hole.moveTo(hx0, 0.01); hole.lineTo(hx1, 0.01); hole.lineTo(hx1, hh); hole.lineTo(mz, hh); hole.lineTo(mz, hm); hole.lineTo(-mz, hm); hole.lineTo(-mz, hh); hole.lineTo(hx0, hh); hole.lineTo(hx0, 0.01); sh.holes.push(hole);
      for (const [y0, y1] of WIN_ROWS) { const w = new THREE.Path(); w.moveTo(-NH + 0.4, y0); w.lineTo(NH - 0.4, y0); w.lineTo(NH - 0.4, y1); w.lineTo(-NH + 0.4, y1); w.lineTo(-NH + 0.4, y0); sh.holes.push(w); }
      const g = new THREE.ShapeGeometry(sh); const uv = g.attributes.uv, p = g.attributes.position; for (let i = 0; i < uv.count; i++) uv.setXY(i, p.getX(i) / 4, p.getY(i) / 4);
      const wOut = new THREE.Mesh(g, mat({ map: tex(siding, 1, 1), side: THREE.FrontSide })); wOut.rotation.y = Math.PI / 2; wOut.position.x = cx1 + 0.02; ext.add(wOut);
      const wIn = new THREE.Mesh(g.clone(), mat({ map: tex(starWall, 0.12, 0.12), side: THREE.BackSide })); wIn.rotation.y = Math.PI / 2; wIn.position.x = cx1 - 0.02; inn.add(wIn);
      const lintel = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, hx1 - hx0), mat({ color: 0x2e241a })); lintel.position.set(cx1, hh, -(hx0 + hx1) / 2); ext.add(lintel);
      for (const zz of [-H + 0.3, -15.6, -NH + 0.2, -8.6, -4.0, 0, 4.0, 8.6, NH - 0.5]) { const ph = Math.abs(zz) < 4.1 ? hm : hh; const p = new THREE.Mesh(new THREE.BoxGeometry(0.35, ph, 0.35), mat({ color: Math.round(Math.abs(zz)) % 2 ? 0xd8262b : 0xf2d21f })); p.position.set(cx1 - 0.2, ph / 2, zz); inn.add(p); }
    }
    /* Henry: both end walls have the two rows of clerestory windows and a plain band below the rafters; the star pattern does not continue into the gable */
    /* Henry: both end walls have the two rows of windows (real openings, glass you can see through) and a plain band below the rafters */
    for (const [xw, dir, rows] of [[cx1 - 0.06, -1, WIN_ROWS], [cx0 + 0.12, 1, WIN_ROWS.slice(1)]]) for (const [y0, y1] of rows) {
      const wb = new THREE.Mesh(new THREE.PlaneGeometry(2 * NH - 0.8, y1 - y0), mat({ map: tex(clere, 7, 1), transparent: true, depthWrite: false, side: THREE.DoubleSide })); wb.rotation.y = dir * Math.PI / 2; wb.position.set(xw, (y0 + y1) / 2, 0); inn.add(wb); }
    for (const [xw, dir] of [[cx1 - 0.05, -1], [cx0 + 0.07, 1]]) {   /* plain navy boards in the gable (no stars up in the rafters), flush with the wall */
      const tri = new THREE.Shape(); tri.moveTo(-NH, S.clereTop); tri.lineTo(NH, S.clereTop); tri.lineTo(0, S.ridge); tri.lineTo(-NH, S.clereTop);
      const tg = new THREE.Mesh(new THREE.ShapeGeometry(tri), mat({ color: 0x1f3f8c, side: dir < 0 ? THREE.BackSide : THREE.FrontSide })); tg.rotation.y = Math.PI / 2; tg.position.x = xw; inn.add(tg); }
    // shared wall with the Sports Center (x = cx0), from the circus 360° looking west: the lower ~4.6 m between the nave posts is
    // OPEN framing (posts, diagonal braces, low wooden knee walls / benches, one full-height walk-through), so you can see straight
    // into the Sports Center (its hanging flags are visible). Above that: a band of blue boards, then star panels up to the vault.
    {
      const OPEN_TOP = 4.6, BAND_TOP = 6.4;
      const sh = endProfile();
      const hole = new THREE.Path(); hole.moveTo(-NH + 0.3, 0.01); hole.lineTo(NH - 0.3, 0.01); hole.lineTo(NH - 0.3, OPEN_TOP); hole.lineTo(-NH + 0.3, OPEN_TOP); hole.lineTo(-NH + 0.3, 0.01); sh.holes.push(hole);
      { const [y0, y1] = WIN_ROWS[1]; const w = new THREE.Path(); w.moveTo(-NH + 0.4, y0); w.lineTo(NH - 0.4, y0); w.lineTo(NH - 0.4, y1); w.lineTo(-NH + 0.4, y1); w.lineTo(-NH + 0.4, y0); sh.holes.push(w); }   /* v8: the high window row goes right through */
      const g = new THREE.ShapeGeometry(sh); const uv = g.attributes.uv, p = g.attributes.position; for (let i = 0; i < uv.count; i++) uv.setXY(i, p.getX(i) / 3, p.getY(i) / 3);
      const wIn = new THREE.Mesh(g, mat({ map: tex(starWall, 0.35, 0.35) })); wIn.rotation.y = Math.PI / 2; wIn.position.x = cx0 + 0.04; inn.add(wIn);
      const wOut = new THREE.Mesh(g.clone(), mat({ map: tex(woodBoards, 1, 1) })); wOut.rotation.y = Math.PI / 2; wOut.position.x = cx0 - 0.04; root.add(wOut);
      const band = new THREE.Mesh(new THREE.BoxGeometry(0.12, BAND_TOP - OPEN_TOP, 2 * NH - 0.6), mat({ color: 0x1f3f8c })); band.position.set(cx0 + 0.08, (OPEN_TOP + BAND_TOP) / 2, 0); inn.add(band);
      const head = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 2 * NH), mat({ color: 0x7f5326 })); head.position.set(cx0, OPEN_TOP, 0); root.add(head);
      const nOpen = 6, bw = (2 * NH - 0.6) / nOpen;
      for (let k = 0; k <= nOpen; k++) {
        const z = -NH + 0.3 + k * bw;
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.3, OPEN_TOP, 0.3), mat({ color: k % 2 ? 0xd8262b : 0xf2d21f })); post.position.set(cx0, OPEN_TOP / 2, z); root.add(post);
        if (k < nOpen) {
          if (k !== 3) {   // knee wall + bench in every bay except one walk-through
            const knee = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1.05, bw - 0.3), mat({ map: tex(woodBoards, 1, 1) })); knee.position.set(cx0, 0.52, z + bw / 2); root.add(knee);
            const bench = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.06, bw - 0.4), mat({ color: 0xd9b25a })); bench.position.set(cx0 + 0.35, 0.45, z + bw / 2); inn.add(bench);
          }
          if (k === 0 || k === nOpen - 1) { const len = Math.hypot(bw, OPEN_TOP - 1.1); const br = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.2, len), mat({ color: 0x7f5326 }));
            br.position.set(cx0, 1.1 + (OPEN_TOP - 1.1) / 2, z + bw / 2); br.rotation.x = (k === 0 ? 1 : -1) * Math.atan2(OPEN_TOP - 1.1, bw); root.add(br); }
        }
      }
      // the aisles beside the nave stay closed at the shared wall (boards both sides)
      for (const s2 of [-1, 1]) inn.add(quad([cx0 + 0.05, 0, s2 * NH], [cx0 + 0.05, 0, s2 * (H - 0.1)], [cx0 + 0.05, S.aisleEave, s2 * (H - 0.1)], [cx0 + 0.05, S.aisleTop, s2 * NH], mat({ map: tex(woodBoards, 1, 1) }), [3, 3]));
    }
    // floor
    const fl = new THREE.Mesh(new THREE.PlaneGeometry(L, 2 * H), mat({ map: tex(floorTex, L / 8, 2 * H / 8), roughness: 0.7 })); fl.rotation.x = -Math.PI / 2; fl.position.set(CX, 0.01, 0); inn.add(fl);
    // aisle ceilings (underside of the lean-to roofs) in warm wood
    for (const s of [-1, 1]) inn.add(quad([cx0, S.aisleEave - 0.05, s * (H - 0.05)], [cx1, S.aisleEave - 0.05, s * (H - 0.05)], [cx1, S.aisleTop - 0.05, s * NH], [cx0, S.aisleTop - 0.05, s * NH], mat({ map: tex(woodBoards, 1, 1) }), [3, 3]));
    // aisle outer walls inside: wood with bright door openings
    for (const s of [-1, 1]) inn.add(quad([s > 0 ? SOUTH_OPEN_X : cx0, 0, s * (H - 0.06)], [s > 0 ? cx1 : cx1 - 4.9, 0, s * (H - 0.06)], [s > 0 ? cx1 : cx1 - 4.9, S.aisleEave, s * (H - 0.06)], [s > 0 ? SOUTH_OPEN_X : cx0, S.aisleEave, s * (H - 0.06)], mat({ map: tex(woodBoards, 1, 1) }), [3, 3]));
    for (const dx of [-11, 3]) { const d = new THREE.Mesh(new THREE.PlaneGeometry(5, 2.6), mat({ color: 0x8a9a78, emissive: 0x3a4a2a, emissiveIntensity: 0.3 })); d.position.set(CX + dx, 1.3, -(H - 0.1)); inn.add(d); }
    { const d = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 2.7), mat({ color: 0x8a9a78, emissive: 0x3a4a2a, emissiveIntensity: 0.3 })); d.rotation.y = Math.PI; d.position.set(cx0 + 3.2, 1.35, H - 0.1); inn.add(d); }
    // weight-lifting room in the south aisle, east end (behind the doors): walls, rubber floor, benches and racks
    { const wx0 = cx1 - 11, wx1 = cx1 - 4.6, z0 = NH + 0.3, z1 = H - 0.3, wall = mat({ color: 0xe9e4d4 });
      const wf = new THREE.Mesh(new THREE.PlaneGeometry(wx1 - wx0, z1 - z0), mat({ color: 0x2a2a2a, roughness: 0.95 })); wf.rotation.x = -Math.PI / 2; wf.position.set((wx0 + wx1) / 2, 0.03, (z0 + z1) / 2); inn.add(wf);
      inn.add(quad([wx0, 0, z0], [wx1, 0, z0], [wx1, S.aisleTop - 0.1, z0], [wx0, S.aisleTop - 0.1, z0], wall, [3, 3]));
      inn.add(quad([wx0, 0, z0], [wx0, 0, z1], [wx0, S.aisleEave, z1], [wx0, S.aisleEave, z0], wall, [3, 3]));
      for (let k = 0; k < 3; k++) { const b = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.45, 0.35), mat({ color: 0x1e1e1e })); b.position.set(wx0 + 2 + k * 3, 0.45, (z0 + z1) / 2); inn.add(b);
        const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 2.0, 6), mat({ color: 0xaaaaaa, metalness: 0.8 })); bar.rotation.x = Math.PI / 2; bar.position.set(wx0 + 2 + k * 3, 1.05, (z0 + z1) / 2); inn.add(bar);
        for (const sg of [-1, 1]) { const pl = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.05, 16), mat({ color: 0x111111 })); pl.rotation.x = Math.PI / 2; pl.position.set(wx0 + 2 + k * 3, 1.05, (z0 + z1) / 2 + sg * 0.85); inn.add(pl); } }
      const rack = new THREE.Mesh(new THREE.BoxGeometry(2.5, 1.0, 0.5), mat({ color: 0x333333, metalness: 0.5 })); rack.position.set(wx1 - 1.6, 0.5, z1 - 0.4); inn.add(rack); }

    /* Henry 1:10 PM markup: circus backstage room west of the weight room and a storage closet/shed east of it, both in the south aisle */
    { const z0 = NH + 0.3, z1 = H - 0.3, wall = mat({ color: 0x3a2c22 }), wall2 = mat({ color: 0xe9e4d4 });
      const bx0 = cx1 - 21.2, bx1 = cx1 - 11.0;   /* backstage ~10 m (estimate) */
      inn.add(quad([bx0, 0, z0], [bx1, 0, z0], [bx1, S.aisleTop - 0.1, z0], [bx0, S.aisleTop - 0.1, z0], wall, [3, 3]));
      inn.add(quad([bx0, 0, z0], [bx0, 0, z1], [bx0, S.aisleEave, z1], [bx0, S.aisleEave, z0], wall, [3, 3]));
      const curtain = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 3.2), mat({ color: 0x5a1020 })); curtain.position.set((bx0 + bx1) / 2, 1.6, z0 - 0.04); inn.add(curtain);
      const bf = new THREE.Mesh(new THREE.PlaneGeometry(bx1 - bx0, z1 - z0), mat({ color: 0x3b2f26 })); bf.rotation.x = -Math.PI / 2; bf.position.set((bx0 + bx1) / 2, 0.025, (z0 + z1) / 2); inn.add(bf);
      for (let k = 0; k < 4; k++) { const rk = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.9, 0.5), mat({ color: 0x2a2a2a })); rk.position.set(bx0 + 1.5 + k * 2.3, 0.95, z1 - 0.35); inn.add(rk); }
      const sx0 = cx1 - 4.6, sx1 = cx1 - 0.3;   /* storage closet / shed */
      inn.add(quad([sx0, 0, z0], [sx1, 0, z0], [sx1, S.aisleTop - 0.1, z0], [sx0, S.aisleTop - 0.1, z0], wall2, [3, 3]));
      inn.add(quad([sx0, 0, z0], [sx0, 0, z1], [sx0, S.aisleEave, z1], [sx0, S.aisleEave, z0], wall2, [3, 3]));
      const sd = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 2.2), mat({ color: 0x6a5038 })); sd.position.set((sx0 + sx1) / 2, 1.1, z0 - 0.04); inn.add(sd); }
    /* Henry (07 Circus pins): double doors in the nave's south wall into the backstage and into the circus shed; a door from the north aisle into gymnastics */
    for (const dxc of [28.7, 42.3]) { const ln = mat({ color: 0x0e1a3a });   /* Henry: the doors are star-painted and blend into the wall: draw only their outlines + a centre seam */
      for (const [w, h, x, y] of [[1.8, 0.05, dxc, 2.45], [0.05, 2.45, dxc - 0.9, 1.225], [0.05, 2.45, dxc + 0.9, 1.225], [0.03, 2.4, dxc, 1.2]]) { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.03), ln); m.position.set(x, y, NH - 0.04); inn.add(m); }
      for (const sg of [-1, 1]) { const kb = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.06), mat({ color: 0xcccccc, metalness: 0.7 })); kb.position.set(dxc + sg * 0.12, 1.1, NH - 0.07); inn.add(kb); } }
    { const gd = new THREE.Mesh(new THREE.BoxGeometry(0.06, 2.1, 1.0), mat({ color: 0xf1efe8 })); gd.position.set(cx0 + 0.1, 1.05, -16.5); inn.add(gd); }
    // nave walls: lower star panels (some bays open to the aisle), upper star band, clerestory window band
    const NB = { '-1': 13, '1': 10 };   /* v8: posts measured in the circus 360: north wall ~2.6 m apart (13 bays), south ~3.4 m (10 bays) */
    const openBays = { '-1': [0, 8, 9, 10, 11, 12], '1': [0] }, openH = { '1': { 0: 2.7 } }, BR = { '1': [[4, 1], [6, -1]], '-1': [[2, -1], [6, 1], [8, -1]] };   /* v8 north: from the post at ~31 m east to the NE corner the lower bays are open (5 bays), blue diagonals in bays 2, 6 and 8 */   /* north: west bay + the east half open to the NE corner; south: only the west bay, a low opening; single blue diagonals where the 360 shows them */   /* Henry (07 Circus pins): south: west bay open, next one closed, backstage + shed bays closed with double doors; north: west bay and the NE corner bay open, middle bays star panels */
    for (const s of [-1, 1]) {
      const nb = NB[s], bay = L / nb;
      for (let i = 0; i < nb; i++) {
        const xa = cx0 + i * bay;
        const y0 = openBays[s].includes(i) ? ((openH[s] || {})[i] ?? null) : 0; if (y0 !== null) inn.add(quad([xa, y0, s * NH], [xa + bay, y0, s * NH], [xa + bay, S.aisleTop, s * NH], [xa, S.aisleTop, s * NH], mat({ map: tex(starWall, 1, 1) }), [5, 5]));
        for (const [bi, dir] of BR[s] || []) if (bi === i) { const len = Math.hypot(bay, S.aisleTop - 0.4); const b = new THREE.Mesh(new THREE.BoxGeometry(len, 0.22, 0.14), mat({ color: 0x2d56b8 })); b.position.set(xa + bay / 2, (S.aisleTop - 0.4) / 2, s * (NH - 0.18)); b.rotation.z = dir * Math.atan2(S.aisleTop - 0.4, bay); inn.add(b); }
      }
      inn.add(quad([cx0, S.aisleTop, s * (NH - 0.02)], [cx1, S.aisleTop, s * (NH - 0.02)], [cx1, S.clereTop - 3.0, s * (NH - 0.02)], [cx0, S.clereTop - 3.0, s * (NH - 0.02)], mat({ color: 0x1f3f8c }), [5, 5]));   /* plain blue boards below the windows */
      inn.add(quad([cx0, S.clereTop - 1.0, s * (NH - 0.02)], [cx1, S.clereTop - 1.0, s * (NH - 0.02)], [cx1, S.clereTop, s * (NH - 0.02)], [cx0, S.clereTop, s * (NH - 0.02)], mat({ map: tex(starWall, 1, 1) }), [5, 5]));   /* star band above the windows */   /* Henry: a band of wall between the windows and the rafters; no stars up there */
      inn.add(quad([cx0, S.clereTop - 3.0, s * (NH - 0.03)], [cx1, S.clereTop - 3.0, s * (NH - 0.03)], [cx1, S.clereTop - 1.0, s * (NH - 0.03)], [cx0, S.clereTop - 1.0, s * (NH - 0.03)],
        mat({ map: tex(clere, nb, 1), transparent: true, depthWrite: false, side: THREE.DoubleSide }), [L, 2.0]));
      // posts (alternating red / yellow) and top beam
      for (let i = 0; i <= nb; i++) {
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.42, S.clereTop, 0.42), mat({ color: i % 2 ? 0xd8262b : 0xf2d21f, roughness: 0.6 }));
        post.position.set(Math.min(cx1 - 0.35, Math.max(cx0 + 0.35, cx0 + i * bay)), S.clereTop / 2, s * (NH - 0.25)); inn.add(post);
        const rx = cx0 + i * bay, inDance = s < 0 && rx > CX - 8.6 && rx < CX + 2.6;   /* rafters hidden above the dance-studio ceiling */
        const raf = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.3, H - NH), mat({ color: 0x7f5326 })); raf.visible = !inDance;
        raf.position.set(cx0 + i * bay, (S.aisleTop + S.aisleEave) / 2 - 0.25, s * (NH + (H - NH) / 2)); raf.rotation.x = s * Math.atan2(S.aisleTop - S.aisleEave, H - NH); inn.add(raf);
      }
      const beam = new THREE.Mesh(new THREE.BoxGeometry(L, 0.5, 0.5), mat({ color: 0x8e5f30 })); beam.position.set(CX, S.clereTop, s * (NH - 0.25)); inn.add(beam);
    }
    /* Henry Nov 16: no vault — triangular trusses (horizontal bottom chord at the clerestory top, angled top chords to the ridge, webs) under the gable roof */
    { const tmC = mat({ color: 0x7f5326, emissive: 0x2a1a0c, emissiveIntensity: 0.5 }), yb = S.clereTop - 0.1, top = z => S.clereTop + (S.ridge - S.clereTop) * (1 - Math.abs(z) / NH) - 0.35;
      const cs = (x, za, ya, zb, yb2, t = 0.18) => { const m = new THREE.Mesh(new THREE.BoxGeometry(t, t, Math.hypot(zb - za, yb2 - ya)), tmC); m.position.set(x, (ya + yb2) / 2, (za + zb) / 2); m.rotation.x = -Math.atan2(yb2 - ya, zb - za); inn.add(m); };
      for (let x = cx0 + 0.6; x < cx1 - 0.3; x += 0.61) { const zA = -NH + 0.3, zB = NH - 0.3;   /* Henry: more rafters, thinner (~2 ft apart) */
        cs(x, zA, yb, zB, yb, 0.13); cs(x, zA, yb, 0, top(0), 0.12); cs(x, 0, top(0), zB, yb, 0.12); cs(x, 0, yb, 0, top(0), 0.09);
        for (const zq of [zA / 2, zB / 2]) { cs(x, zq, yb, zq, top(zq), 0.08); cs(x, zq, yb, 0, (yb + top(0)) / 2, 0.08); } }
      for (const sg of [-1, 1]) { const zz = sg * (NH - 0.2); inn.add(quad([cx0, top(zz) + 0.3, zz], [cx1, top(zz) + 0.3, zz], [cx1, top(0) + 0.3, 0], [cx0, top(0) + 0.3, 0], mat({ map: tex(woodBoards, 1, 1), emissive: 0x2a1a0c, emissiveIntensity: 0.5, side: THREE.DoubleSide }), [4, 4])); } }
    // mats
    const blue = mat({ color: 0x2a5ac8 }), red = mat({ color: 0xd2302c }), yel = mat({ color: 0xf2c51f });
    const box = (w, h, d, m, x, z, ry = 0) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x, h / 2, z); b.rotation.y = ry; inn.add(b); };
    /* layout from the circus 360 (07 Circus): the camera spot near CX+2.5, z 0.7 is bare concrete; mats sit on the south half */
    box(10, 0.06, 2.6, blue, CX + 7, 4.8, 0.35); box(2.6, 0.35, 1.6, red, CX + 5, 4.2, 0.35); box(2.6, 0.35, 1.6, red, CX + 9, 5.6, 0.2);
    box(7, 0.06, 3, blue, CX - 3, 5.5, -0.3); box(2.4, 0.4, 1.6, red, CX - 2, 5.2, -0.3);
    box(3, 0.06, 4, yel, CX - 12, 6.5, 0); box(2.6, 0.5, 3.2, red, CX - 12, 6.5, 0);
    box(2.2, 0.3, 1.4, red, CX + 12, 2.5, 0.1); box(4, 0.06, 2.2, blue, CX + 12, 2.5, 0.1);

    // aerial apparatus hanging from the vault: silks, lyra hoops, static trapezes
    const lineM = new THREE.LineBasicMaterial({ color: 0xdddddd });
    const line = (a, b) => inn.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([a, b]), lineM));
    const top = (x, z) => S.clereTop - 0.1;   /* rigging hangs from the truss bottom chords */
    /* Henry: no hanging equipment for now (silks/hoops get raised and lowered); only the flying trapeze, which is always up */
    // indoor flying trapeze along the north side (board at the west end, net, fly bar, catch trap)
    {
      const steel = mat({ color: 0xbfc4c8, metalness: 0.6, roughness: 0.35 });
      const z0 = -NH + 4.0, xB = cx0 + 4.5, xC = xB + 19, netH = 2.4, boardH = 7.0, barH = 9.2;
      const netTex = T(256, 256, (g, w, h) => { g.clearRect(0, 0, w, h); g.strokeStyle = '#111'; g.lineWidth = 4; for (let i = 0; i <= w; i += 32) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, h); g.stroke(); g.beginPath(); g.moveTo(0, i); g.lineTo(w, i); g.stroke(); } }, 26, 6);
      const net = new THREE.Mesh(new THREE.PlaneGeometry(xC - xB + 6, 7), new THREE.MeshStandardMaterial({ map: netTex, transparent: true, side: THREE.DoubleSide, roughness: 1 }));
      net.rotateX(-Math.PI / 2); net.position.set((xB + xC) / 2, netH, z0); inn.add(net);
      for (const x of [xB - 3, xC + 3]) for (const dz of [-3.5, 3.5]) { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, netH + 0.6, 8), steel); p.position.set(x, (netH + 0.6) / 2, z0 + dz); inn.add(p); }
      const board = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.12, 1.6), mat({ color: 0x9a7a4a })); board.position.set(xB - 1.2, boardH, z0); inn.add(board);
      for (const dz of [-0.7, 0.7]) { const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, boardH, 8), steel); leg.position.set(xB - 1.8, boardH / 2, z0 + dz); inn.add(leg); }
      const ladM = mat({ color: 0xe0532a }), lad = new THREE.Group();
      for (const dz of [-0.25, 0.25]) { const r = new THREE.Mesh(new THREE.BoxGeometry(0.06, boardH, 0.06), ladM); r.position.set(0, boardH / 2, dz); lad.add(r); }
      for (let y = 0.3; y < boardH; y += 0.3) { const st = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.5), ladM); st.position.set(0, y, 0); lad.add(st); }
      lad.position.set(xB - 2.6, 0, z0); lad.rotation.z = 0.12; inn.add(lad);
      const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.9, 8), steel); bar.rotation.x = Math.PI / 2; bar.position.set(xB + 1.5, boardH - 0.8, z0); inn.add(bar);
      for (const dz of [-0.45, 0.45]) line(new THREE.Vector3(xB + 5, top(xB + 5, z0), z0 + dz), new THREE.Vector3(xB + 1.5, boardH - 0.8, z0 + dz));
      const cbar = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 2.4), steel); cbar.position.set(xC, barH, z0); inn.add(cbar);
      for (const dz of [-1.1, 1.1]) line(new THREE.Vector3(xC, barH, z0 + dz), new THREE.Vector3(xC, top(xC, z0 + dz), z0 + dz));
      for (const [x, z] of [[xB - 3, z0 - 3.5], [xB - 3, z0 + 3.5], [xC + 3, z0 - 3.5], [xC + 3, z0 + 3.5]]) line(new THREE.Vector3(x, netH + 0.6, z), new THREE.Vector3(x + (x < CX ? -3 : 3), 0, z + (z < z0 ? -2 : 2)));
    }
    // dance studio in the north aisle, middle of the north lower roof, a bit west of centre (Henry 00:53; 360° photo s19): curved white ceiling, cream walls with wood-trimmed windows on both long sides,
    // a mirror across the east end over a low step, wood floor, ballet barre, white doors and blue benches. Length 11 m is an estimate.
    {
      const dx0 = CX - 8.5, dx1 = CX + 2.5, z0 = -H + 0.3, z1 = -NH - 0.3, zc = (z0 + z1) / 2, hw = (z1 - z0) / 2, wallH = S.aisleEave - 0.2;
      const cream = mat({ color: 0xf0ead0, emissive: 0x8a8670, emissiveIntensity: 0.45 }), trim = mat({ color: 0xc08a4c });
      const df = new THREE.Mesh(new THREE.PlaneGeometry(dx1 - dx0, z1 - z0), mat({ color: 0xc8904e, roughness: 0.35 })); df.rotation.x = -Math.PI / 2; df.position.set((dx0 + dx1) / 2, 0.03, zc); inn.add(df);
      for (const z of [z0, z1]) inn.add(quad([dx0, 0, z], [dx1, 0, z], [dx1, wallH, z], [dx0, wallH, z], cream, [1, 1]));
      for (const x of [dx0, dx1]) inn.add(quad([x, 0, z0], [x, 0, z1], [x, wallH, z1], [x, wallH, z0], cream, [1, 1]));
      const roofAt = z => S.aisleEave + (S.aisleTop - S.aisleEave) * (H - Math.abs(z)) / (H - NH) - 0.2;   // under the north-aisle lean-to
      inn.add(quad([dx0, roofAt(z0), z0], [dx1, roofAt(z0), z0], [dx1, roofAt(z1), z1], [dx0, roofAt(z1), z1], mat({ color: 0xf4f1e8, emissive: 0xd8d6cf, emissiveIntensity: 0.85, side: THREE.DoubleSide }), [1, 1]));
      for (const x of [dx0, dx1]) inn.add(quad([x, wallH, z0], [x, wallH, z1], [x, roofAt(z1), z1], [x, roofAt(z0), z0], cream, [1, 1]));
      inn.add(quad([dx0, wallH, z1], [dx1, wallH, z1], [dx1, roofAt(z1), z1], [dx0, roofAt(z1), z1], cream, [1, 1]));
      /* Henry 01:04: the south wall (facing the circus) is one giant mirror across its whole length, over a low step; windows are on the north wall and the end walls */
      const glass = mat({ color: 0xdfeefa, emissive: 0xbfd8ea, emissiveIntensity: 0.6 });
      for (let x = dx0 + 1.2; x < dx1 - 0.8; x += 2.0) { const w = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.7), glass); w.position.set(x, 1.75, z0 + 0.04); inn.add(w);
        const fr = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.85, 0.04), trim); fr.position.set(x, 1.75, z0 + 0.02); inn.add(fr); }
      for (const [x, ry] of [[dx0 + 0.04, Math.PI / 2], [dx1 - 0.04, -Math.PI / 2]]) for (const z of [z0 + 1.3, z1 - 1.3]) { const w = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.7), glass); w.rotation.y = ry; w.position.set(x, 1.75, z); inn.add(w);
        const fr = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.85, 1.05), trim); fr.position.set(x + (ry > 0 ? -0.02 : 0.02), 1.75, z); inn.add(fr); }
      { const b = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, dx1 - dx0 - 1, 6), trim); b.rotation.z = Math.PI / 2; b.position.set((dx0 + dx1) / 2, 1.05, z0 + 0.12); inn.add(b); }
      for (const x of [dx0 + 0.12, dx1 - 0.12]) { const b = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 2.0, 6), trim); b.rotation.x = Math.PI / 2; b.position.set(x, 1.05, z0 + 1.5); inn.add(b); }
      const step = new THREE.Mesh(new THREE.BoxGeometry(dx1 - dx0 - 0.2, 0.3, 0.6), mat({ color: 0xece4c8 })); step.position.set((dx0 + dx1) / 2, 0.15, z1 - 0.35); inn.add(step);
      const mirror = new Reflector(new THREE.PlaneGeometry(dx1 - dx0 - 0.4, 1.7), { textureWidth: 1024, textureHeight: 256, color: 0xc4ccd0, clipBias: 0.003 });   /* Henry: mirrors should actually reflect */ mirror.rotation.y = Math.PI; mirror.position.set((dx0 + dx1) / 2, 0.3 + 0.95, z1 - 0.07); inn.add(mirror);
      for (const [x, ry] of [[dx0 + 0.05, Math.PI / 2], [dx1 - 0.05, -Math.PI / 2]]) { const d = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 2.05), mat({ color: 0xf6f4ee })); d.rotation.y = ry; d.position.set(x, 1.03, zc);   /* Henry 01:05: doors on the east and west walls, about in the middle */ inn.add(d); }
      for (const x of [dx0 + 2.5, dx0 + 6.5]) { const bn = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.4, 0.35), mat({ color: 0x3a6fc4 })); bn.position.set(x, 0.2, z0 + 0.4); inn.add(bn); }
    }
  }
  return root;
}
