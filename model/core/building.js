// Building kit: builds any building from a config object (walls, roofs, porches, windows, interiors).
// Camp Lohikan — building kit + per-building configs (Dining Hall, Senior Dining Hall, …)
// Each building is modelled in a local frame: x = along the ridge (long axis), y = up, z = across (+z = the porch side by default).
// Origin = footprint centre at the LOWEST ground under the footprint (LiDAR ground_z). The kit adds a foundation skirt so
// sloping ground never shows a gap. Placement uses the regularised LiDAR footprint (data/blockout_reg/buildings.json).

// Henry: two flagpoles stand between the two Senior Dining porches (not in the middle of the quad)
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

export function canvasTex(renderer, w, h, draw) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping;
  if (renderer) t.anisotropy = renderer.capabilities.getMaxAnisotropy(); return t;
}

export function buildCampBuilding(cfg, renderer) {
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const OPEN_IN = [];   /* windows/doors on the outer walls, echoed on the inner wall finish so they show from inside */
  const mat = o => new THREE.MeshStandardMaterial({ roughness: 0.88, metalness: 0, side: THREE.DoubleSide, ...o });
  const T = (w, h, d) => canvasTex(renderer, w, h, d);
  const rep = (t, rx, ry) => { const c = t.clone(); c.needsUpdate = true; c.repeat.set(rx, ry); return c; };
  const SID = { darkbrown: ['#2a221c', '#1f1915'], charcoal: ['#262220', '#141210'], brown: ['#5a4330', '#47342a'] }[cfg.siding] || ['#2a221c', '#1f1915'];
  const siding = cfg.sidingStyle === 'liveedge' ? T(256, 256, (g, w, h) => { g.fillStyle = SID[0]; g.fillRect(0, 0, w, h);   // horizontal waney-edge boards (Lower Office photos)
      for (let y = 0; y < h; y += 26) { const a = rnd() * 6, f = 1 + rnd() * 2; g.fillStyle = SID[1]; g.beginPath(); g.moveTo(0, y);
        for (let x = 0; x <= w; x += 8) g.lineTo(x, y + 4 + Math.sin(x / w * Math.PI * 2 * f + a) * 3.5); g.lineTo(w, y); g.fill();
        g.fillStyle = `rgba(255,235,210,${0.03 + rnd() * 0.05})`; g.fillRect(0, y + 9, w, 3); } })
    : T(256, 256, (g, w, h) => { g.fillStyle = SID[0]; g.fillRect(0, 0, w, h);
    for (let x = 0; x < w; x += 28) { g.fillStyle = SID[1]; g.fillRect(x, 0, 4, h); g.fillStyle = `rgba(255,235,210,${0.02 + rnd() * 0.04})`; g.fillRect(x + 4, 0, 24, h); } });
  const RC = { grey: ['#7a7c7e', '#68696b'], green: ['#4a6553', '#3c5444'], metal: ['#d4d6d6', '#b9bcbd'] }[cfg.roof] || ['#7a7c7e', '#68696b'];
  const shingles = cfg.roof === 'metal' ? T(256, 256, (g, w, h) => { g.fillStyle = RC[0]; g.fillRect(0, 0, w, h); for (let x = 0; x < w; x += 32) { g.fillStyle = RC[1]; g.fillRect(x, 0, 5, h); g.fillStyle = 'rgba(255,255,255,.35)'; g.fillRect(x + 5, 0, 3, h); } }) : T(256, 256, (g, w, h) => { g.fillStyle = RC[0]; g.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 16) { g.fillStyle = RC[1]; g.fillRect(0, y, w, 2); for (let x = (y / 16 % 2) * 16; x < w; x += 32) g.fillRect(x, y, 2, 16); }
    for (let i = 0; i < 500; i++) { const v = rnd(); g.fillStyle = v > .5 ? `rgba(255,255,255,${(v - .5) * .12})` : `rgba(0,0,0,${v * .14})`; g.fillRect(rnd() * w, rnd() * h, 14, 7); } });
  const deck = T(256, 256, (g, w, h) => { g.fillStyle = '#6b5440'; g.fillRect(0, 0, w, h); for (let y = 0; y < h; y += 20) { g.fillStyle = 'rgba(0,0,0,.25)'; g.fillRect(0, y, w, 2); } });
  const lattice = T(128, 128, (g, w, h) => { g.fillStyle = '#141110'; g.fillRect(0, 0, w, h); g.strokeStyle = '#2c241d'; g.lineWidth = 6;
    for (let i = -w; i < 2 * w; i += 24) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i + h, h); g.stroke(); g.beginPath(); g.moveTo(i, h); g.lineTo(i + h, 0); g.stroke(); } });
  const white = cfg.trim === 'white', trimC = white ? 0xece9e1 : 0x3a2a1c, postC = 0x4a3826;
  const M = { roof: mat({ map: rep(shingles, cfg.len / 4, cfg.wid / 4) }), trim: mat({ color: trimC }), post: mat({ color: postC }), win: mat({ color: 0xbfd8e6, roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.22, depthWrite: false }),   /* Henry: windows you can see through (the walls have real holes) */
    winFrame: mat({ color: white ? 0xe8e4da : 0x6a5a48 }), door: mat({ color: 0x2c2118 }), deck: mat({ map: rep(deck, 4, 1) }), skirt: mat({ map: rep(lattice, 8, 1) }),
    vent: mat({ color: 0x9aa0a6, metalness: 0.6, roughness: 0.4 }), rail: mat({ color: cfg.railWhite ? 0xe6e2d8 : 0x9c958a }), siding: (rx, ry) => mat({ map: rep(siding, rx, ry) }) };
  const root = new THREE.Group(); root.name = cfg.name;
  const L = cfg.len, W2 = cfg.wid / 2, F = cfg.floor;
  const PROF = cfg.profile || [[-W2, cfg.eave], [0, cfg.ridge], [W2, cfg.eave]];
  const roofY = z => { if (z <= PROF[0][0]) return PROF[0][1]; for (let i = 1; i < PROF.length; i++) { const [z0, h0] = PROF[i - 1], [z1, h1] = PROF[i]; if (z <= z1) return h0 + (h1 - h0) * (z - z0) / (z1 - z0); } return PROF[PROF.length - 1][1]; };
  const zLo = PROF[0][0], zHi = PROF[PROF.length - 1][0];
  const BODY = cfg.body || [[-L / 2, L / 2, zLo + 0.5, zHi - 0.5]];
  // roof sections along the ridge, each with its own cross-section (e.g. a lower or narrower east end)
  const PARTS = (cfg.roofParts || [{ x0: -L / 2, x1: L / 2, profile: PROF }]).map(q => ({ ...q, profile: q.profile || PROF }));
  const ry = (P, z) => { if (z <= P[0][0]) return P[0][1]; for (let i = 1; i < P.length; i++) { const [z0, h0] = P[i - 1], [z1, h1] = P[i]; if (z <= z1) return h0 + (h1 - h0) * (z - z0) / (z1 - z0); } return P[P.length - 1][1]; };
  const profAt = x => (PARTS.find(q => x >= q.x0 - 1e-6 && x <= q.x1 + 1e-6) || { profile: PROF }).profile;
  const roofYx = (x, z) => ry(profAt(x), z);
  const box = (w, h, d, m, x, y, z) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x, y, z); root.add(b); return b; };
  const quad = (pts, m) => { const g = new THREE.BufferGeometry(); const p = pts.flat();
    g.setAttribute('position', new THREE.Float32BufferAttribute([...p.slice(0, 9), ...p.slice(0, 3), ...p.slice(6, 12)], 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute([0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1], 2)); g.computeVertexNormals(); const q = new THREE.Mesh(g, m); root.add(q); return q; };
  const inBody = (x, z) => BODY.some(([a, b, c, d]) => x > a + 0.01 && x < b - 0.01 && z > c + 0.01 && z < d - 0.01);
  for (const op of cfg.openLong || []) { const zz = op.side > 0 ? BODY[0][3] - 0.12 : BODY[0][2] + 0.12; for (let x = op.x0 + 0.15; x <= op.x1; x += (op.post || 4)) box(0.22, roofYx(x, zz) - F, 0.22, M.post, Math.min(x, op.x1 - 0.15), (F + roofYx(x, zz)) / 2, zz); }
  // ---- body rooms: skirt, walls (only where they face outside), gable ends
  for (const [x0, x1, z0, z1] of BODY) {
    // long walls (constant z) — split into 1 m pieces so shared walls between rooms disappear
    for (const [z, out] of [[z0, -1], [z1, +1]]) { let a = null;
      const flush = (xa, xb) => { if (xb - xa < 0.05) return; for (const op of cfg.openLong || []) if (op.side === out && op.x0 < xb && op.x1 > xa) { flush(xa, Math.max(xa, op.x0)); flush(Math.min(xb, op.x1), xb); return; } const cuts = [xa, ...PARTS.map(q => q.x0).filter(v => v > xa + 0.05 && v < xb - 0.05), xb];
        const wOn = ((cfg.windows || {}).sides || ['+z', '-z']).includes(out > 0 ? '+z' : '-z'), wc0 = cfg.windows || { h: 1.2, sill: 1, spacing: 3 }, WX = [];
        if (wOn) for (let x = xa + 1.6; x < xb - 1.0; x += wc0.spacing || 3) if (!(cfg.doors || []).some(d => Math.abs(d.along - x) < d.w / 2 + 0.9 && Math.sign(d.side) === out)) WX.push(x);
        for (let k = 1; k < cuts.length; k++) { const ca = cuts[k - 1], cb = cuts[k], tp = roofYx((ca + cb) / 2, z), here = WX.filter(x => x - 0.56 > ca + 0.02 && x + 0.56 < cb - 0.02);
          if (!here.length) { quad([[ca, F, z], [cb, F, z], [cb, tp, z], [ca, tp, z]], M.siding((cb - ca) / 3, (tp - F) / 3)); continue; }
          const sh = new THREE.Shape(); sh.moveTo(ca, F); sh.lineTo(cb, F); sh.lineTo(cb, tp); sh.lineTo(ca, tp); sh.lineTo(ca, F);   // wall piece with real window holes
          for (const x of here) for (const yo of ((cfg.storeys || 1) > 1 && F + 2.7 + wc0.sill + wc0.h < roofYx(x, z) - 0.2 ? [0, 2.7] : [0])) { const y0 = F + wc0.sill + yo, y1 = y0 + wc0.h; if (y1 > tp - 0.1) continue;
            const hl = new THREE.Path(); hl.moveTo(x - 0.55, y0); hl.lineTo(x - 0.55, y1); hl.lineTo(x + 0.55, y1); hl.lineTo(x + 0.55, y0); hl.lineTo(x - 0.55, y0); sh.holes.push(hl); }
          const sg = new THREE.ShapeGeometry(sh); const uv = sg.attributes.uv, pp = sg.attributes.position; for (let i = 0; i < uv.count; i++) uv.setXY(i, pp.getX(i) / 3, pp.getY(i) / 3);
          const wm = new THREE.Mesh(sg, M.siding(1, 1)); wm.position.z = z; root.add(wm); }
        const top = roofYx((xa + xb) / 2, z);
        if (!cfg.stilts) quad([[xa, -1.5, z], [xb, -1.5, z], [xb, F, z], [xa, F, z]], cfg.skirt === 'siding' ? M.siding((xb - xa) / 3, (F + 1.5) / 3) : M.skirt); else quad([[xa, F - 0.25, z], [xb, F - 0.25, z], [xb, F, z], [xa, F, z]], M.post);
        if (!((cfg.windows || {}).sides || ['+z', '-z']).includes(out > 0 ? '+z' : '-z')) return;
        for (let x = xa + 1.6; x < xb - 1.0; x += (cfg.windows || { spacing: 3 }).spacing) { if ((cfg.doors || []).some(d => Math.abs(d.along - x) < d.w / 2 + 0.9 && Math.sign(d.side) === out)) continue;
          const wc = cfg.windows || { h: 1.2, sill: 1 }; const w = new THREE.Mesh(new THREE.PlaneGeometry(1.1, wc.h), M.win); w.position.set(x, F + wc.sill + wc.h / 2, z + out * 0.04); root.add(w); OPEN_IN.push({ x, y: F + wc.sill + wc.h / 2, z, w: 1.1, h: wc.h, nx: 0, nz: out });
          box(1.3, 0.09, 0.06, M.winFrame, x, F + wc.sill, z + out * 0.06); box(1.3, 0.09, 0.06, M.winFrame, x, F + wc.sill + wc.h, z + out * 0.06);
          if ((cfg.storeys || 1) > 1 && F + 2.7 + wc.sill + wc.h < roofYx(x, z) - 0.2) { const w2 = w.clone(); w2.position.y += 2.7; root.add(w2); box(1.3, 0.09, 0.06, M.winFrame, x, F + 2.7 + wc.sill, z + out * 0.06); } } };
      for (let x = x0; x <= x1 + 1e-6; x += 0.5) { const outside = !inBody(Math.min(x + 0.25, x1 - 0.01), z + out * 0.3); if (outside && a === null) a = x; if ((!outside || x + 0.5 > x1 + 1e-6) && a !== null) { flush(a, outside ? Math.min(x + 0.5, x1) : x); a = null; } } }
    // end walls (constant x) with the roof profile on top
    for (const [x, out] of [[x0, -1], [x1, +1]]) { const P = profAt(x - out * 0.1); const yb = cfg.stilts ? F - 0.25 : (cfg.skirt === 'siding' ? -1.5 : F);
      const runs = []; let a = null; for (let zz = z0; zz <= z1 + 1e-6; zz += 0.25) { const open = zz < z1 - 1e-6 && !inBody(x + out * 0.3, Math.min(zz + 0.125, z1 - 0.01)); if (open && a === null) a = zz; if (!open && a !== null) { runs.push([a, Math.min(zz, z1)]); a = null; } }
      if (a !== null) runs.push([a, z1]);   // close a run that reaches the far corner when the width isn't a multiple of the step
      for (const [za, zb] of runs) { const sh = new THREE.Shape(); sh.moveTo(za, yb); sh.lineTo(zb, yb); sh.lineTo(zb, ry(P, zb));
        for (const [pz] of [...P].reverse()) if (pz > za && pz < zb) sh.lineTo(pz, ry(P, pz)); sh.lineTo(za, ry(P, za)); sh.lineTo(za, yb);
        const g = new THREE.ShapeGeometry(sh); const uv = g.attributes.uv, p = g.attributes.position; for (let i = 0; i < uv.count; i++) uv.setXY(i, p.getX(i) / 3, p.getY(i) / 3);
        const m = new THREE.Mesh(g, M.siding(1, 1)); m.rotation.y = -Math.PI / 2; m.position.x = x; root.add(m); } }
  }
  if (cfg.stilts) { const stilt = (x0, x1, z0, z1) => { for (let x = x0 + 0.15; x <= x1 - 0.1; x += Math.max(1.8, (x1 - x0 - 0.3) / Math.round((x1 - x0) / 2.6))) for (const z of [z0 + 0.15, z1 - 0.15]) {
        box(0.2, F + 1.5, 0.2, M.post, x, (F - 1.5) / 2, z);
        for (const sx of [-1, 1]) { const b = box(0.09, 0.09, 1.1, M.post, x + sx * 0.38, F - 0.45, z); b.rotation.y = Math.PI / 2; b.rotation.z = sx * Math.PI / 4; } } };
    for (const [x0, x1, z0, z1] of BODY) stilt(x0, x1, z0, z1); for (const P of cfg.porches || []) if (!P.level) stilt(P.x0, P.x1, P.z0, P.z1); }
  // doors on the outer long walls
  for (const d of cfg.doors || []) { const zs = BODY.filter(([a, b]) => d.along > a && d.along < b).map(r => d.side > 0 ? r[3] : r[2]); if (!zs.length) continue;
    const z = d.side > 0 ? Math.max(...zs) : Math.min(...zs); const p = new THREE.Mesh(new THREE.PlaneGeometry(d.w, 2.1), M.door); p.position.set(d.along, F + 1.05, z + d.side * 0.05); root.add(p); OPEN_IN.push({ x: d.along, y: F + 1.05, z, w: d.w, h: 2.1, nx: 0, nz: Math.sign(d.side), door: true }); }
  // ---- explicit windows / doors on any wall: {wall:'+x'|'-x'|'+z'|'-z', at, y (sill above floor), w, h, grid:[cols,rows], kind:'door', color}
  if (cfg.winList) { const ex = { x0: Math.min(...BODY.map(b => b[0])), x1: Math.max(...BODY.map(b => b[1])), z0: Math.min(...BODY.map(b => b[2])), z1: Math.max(...BODY.map(b => b[3])) };
    for (const o of cfg.winList) { const g = new THREE.Group(); const w = o.w || 1.0, h = o.h || (o.kind === 'door' ? 2.1 : 1.4), y = o.y ?? (o.kind === 'door' ? 0 : 0.9);
      const pane = new THREE.Mesh(new THREE.PlaneGeometry(w, h), o.kind === 'door' ? mat({ color: new THREE.Color(o.color || '#2c2118'), emissive: new THREE.Color(o.color || '#2c2118'), emissiveIntensity: 0.25 }) : M.win); pane.position.set(0, h / 2, 0.02); g.add(pane);
      const fr = (fw, fh, fx, fy) => { const b = new THREE.Mesh(new THREE.BoxGeometry(fw, fh, 0.07), M.winFrame); b.position.set(fx, fy, 0.05); g.add(b); };
      const t = o.frame ?? 0.1; fr(w + 2 * t, t, 0, -t / 2); fr(w + 2 * t, t, 0, h + t / 2); fr(t, h, -w / 2 - t / 2, h / 2); fr(t, h, w / 2 + t / 2, h / 2);
      const [gc, gr] = o.grid || (o.kind === 'door' ? [1, 1] : [1, 2]); for (let i = 1; i < gc; i++) fr(0.06, h, -w / 2 + w * i / gc, h / 2); for (let j = 1; j < gr; j++) fr(w, 0.06, 0, h * j / gr);
      const Y = F + y; if (o.wall === '+x') { g.position.set(ex.x1, Y, o.at); g.rotation.y = Math.PI / 2; } else if (o.wall === '-x') { g.position.set(ex.x0, Y, o.at); g.rotation.y = -Math.PI / 2; }
      else if (o.wall === '+z') g.position.set(o.at, Y, ex.z1); else { g.position.set(o.at, Y, ex.z0); g.rotation.y = Math.PI; }
      root.add(g);
      { const nx = o.wall === '+x' ? 1 : o.wall === '-x' ? -1 : 0, nz = o.wall === '+z' ? 1 : o.wall === '-z' ? -1 : 0; OPEN_IN.push({ x: g.position.x, y: Y + h / 2, z: g.position.z, w, h, nx, nz, door: o.kind === 'door', color: o.color }); } } }
  // ---- small sheds (e.g. outdoor bathrooms): {x0,x1,z0,z1,h,y0, doors:[{wall,at}]}
  for (const S of cfg.sheds || []) { const y0 = S.y0 ?? 0, h = S.h || 2.4, w = S.x1 - S.x0, d = S.z1 - S.z0, sx = (S.x0 + S.x1) / 2, sz = (S.z0 + S.z1) / 2;
    const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), M.siding(w / 3, h / 3)); b.position.set(sx, y0 + h / 2, sz); root.add(b); box(w + 0.3, 0.12, d + 0.3, M.roof, sx, y0 + h + 0.06, sz);
    for (const o of S.doors || []) { const p = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 2.0), M.door); const e = 0.02;
      if (o.wall === '+z') p.position.set(o.at, y0 + 1.0, S.z1 + e); else if (o.wall === '-z') { p.position.set(o.at, y0 + 1.0, S.z0 - e); p.rotation.y = Math.PI; }
      else if (o.wall === '+x') { p.position.set(S.x1 + e, y0 + 1.0, o.at); p.rotation.y = Math.PI / 2; } else { p.position.set(S.x0 - e, y0 + 1.0, o.at); p.rotation.y = -Math.PI / 2; } root.add(p); } }
  // ---- free-standing straight stairways: {from:[x,z], to:[x,z], y0, y1, width} (y relative to the floor F)
  for (const st of cfg.stairways || []) { const [ax, az] = st.from, [bx, bz] = st.to, Y0 = F + st.y0, Y1 = F + st.y1, run = Math.hypot(bx - ax, bz - az), n = Math.max(2, Math.round((Y1 - Y0) / 0.19)), ang = Math.atan2(bz - az, bx - ax), wdt = st.width || 1.1;
    for (let i = 0; i < n; i++) { const t = (i + 0.5) / n; const s2 = box(run / n + 0.05, 0.06, wdt, M.deck, ax + (bx - ax) * t, Y0 + (Y1 - Y0) * (i + 1) / n - 0.03, az + (bz - az) * t); s2.rotation.y = -ang; }
    for (const sd of [-1, 1]) { const ox = -Math.sin(ang) * sd * wdt / 2, oz = Math.cos(ang) * sd * wdt / 2, ln = Math.hypot(run, Y1 - Y0);
      for (const hy of [0.0, 0.95]) { const r = box(ln, hy ? 0.07 : 0.22, hy ? 0.07 : 0.06, hy ? (st.railColor ? M.rail : M.post) : M.post, (ax + bx) / 2 + ox, (Y0 + Y1) / 2 + hy, (az + bz) / 2 + oz); r.rotation.order = 'YZX'; r.rotation.y = -ang; r.rotation.z = Math.atan2(Y1 - Y0, run); }
      if (st.y0 > 0.3) box(0.15, Y0 + 1.5, 0.15, M.post, ax + ox, (Y0 - 1.5) / 2, az + oz); } }
  // ---- roof: one plane per profile segment, full length + overhang; gable trim at both ends; eave trim; ridge cap
  const oh = 0.5; const xMin = Math.min(...PARTS.map(q => q.x0)), xMax = Math.max(...PARTS.map(q => q.x1));
  for (const q of PARTS) { const P = q.profile, a = q.x0 - (q.x0 <= xMin + 1e-6 ? oh : 0), b = q.x1 + (q.x1 >= xMax - 1e-6 ? oh : 0), cxp = (a + b) / 2;
    for (let i = 1; i < P.length; i++) { const [z0, h0] = P[i - 1], [z1, h1] = P[i];
      quad([[a, h0, z0], [b, h0, z0], [b, h1, z1], [a, h1, z1]], M.roof);
      for (const x of [a, b]) { if (PARTS.some(o => o !== q && Math.abs((x === a ? o.x1 : o.x0) - (x === a ? q.x0 : q.x1)) < 1e-6 && ry(o.profile, (z0 + z1) / 2) >= ry(P, (z0 + z1) / 2) - 0.05)) continue;
        const len = Math.hypot(z1 - z0, h1 - h0); const t = box(0.12, 0.24, len, M.trim, x, (h0 + h1) / 2 - 0.05, (z0 + z1) / 2); t.rotation.x = -Math.atan2(h1 - h0, z1 - z0); } }
    for (const [z, h] of [P[0], P[P.length - 1]]) box(b - a, 0.28, 0.1, M.trim, cxp, h - 0.1, z);
    const tp = P.reduce((u, v) => v[1] > u[1] ? v : u); box(b - a, 0.18, 0.5, mat({ color: 0x3d4043 }), cxp, tp[1] + 0.05, tp[0]); }
  const top = PROF.reduce((a, b) => b[1] > a[1] ? b : a);
  for (const x of [...(cfg.vents || []), ...(cfg.kitchenVents || [])]) { const z = top[0] + 1.2; const v = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 1.0, 12), M.vent); v.position.set(x, roofY(z) + 0.4, z); root.add(v);
    const c = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.12, 12), M.vent); c.position.set(x, roofY(z) + 0.95, z); root.add(c); }
  // ---- porches: deck, skirt, posts + railing on the outer edges, white valance, small roof if not under the main roof, stairs
  const steps = Math.max(2, Math.round(F / 0.18)), rise = F / steps, run = 0.28;
  for (const P of cfg.porches || []) { const { x0, x1, z0, z1 } = P; const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2; const F = cfg.floor + (P.level || 0);
    const steps = Math.max(2, Math.round(F / 0.18)), rise = F / steps, run = 0.28;
    if (!P.noDeck) box(x1 - x0, 0.15, z1 - z0, M.deck, cx, F - 0.07, cz);
    if (P.stilts) for (let x = x0 + 0.15; x <= x1 - 0.1; x += Math.max(1.6, (x1 - x0 - 0.3) / Math.max(1, Math.round((x1 - x0) / 2.4)))) for (let z = z0 + 0.15; z <= z1 - 0.1; z += Math.max(1.6, (z1 - z0 - 0.3) / Math.max(1, Math.round((z1 - z0) / 2.4)))) {
      box(0.18, F + 1.5, 0.18, M.post, x, (F - 1.5) / 2, z); for (const sx of [-1, 1]) { const b = box(0.08, 0.08, 1.0, M.post, x + sx * 0.34, F - 0.42, z); b.rotation.y = Math.PI / 2; b.rotation.z = sx * Math.PI / 4; } }
    if (P.level) for (const [px, pz] of [[x0 + 0.2, z0 + 0.2], [x1 - 0.2, z0 + 0.2], [x0 + 0.2, z1 - 0.2], [x1 - 0.2, z1 - 0.2]]) box(0.2, F + 1.5, 0.2, M.post, px, (F - 1.5) / 2, pz);
    const under = !P.roof; const ceilAt = (x, z) => under ? roofY(z) : (P.roofH ? P.roofH - (P.roofDrop ?? 0.4) - 0.05 : F + 2.7);
    // outer edges = edges not touching the body
    const edges = [['+z', [x0, z1], [x1, z1]], ['-z', [x0, z0], [x1, z0]], ['+x', [x1, z0], [x1, z1]], ['-x', [x0, z0], [x0, z1]]]
      .filter(([e, a, b]) => { const mx = (a[0] + b[0]) / 2 + (e === '+x' ? .3 : e === '-x' ? -.3 : 0), mz = (a[1] + b[1]) / 2 + (e === '+z' ? .3 : e === '-z' ? -.3 : 0); return !inBody(mx, mz) && !(cfg.porches || []).some(Q => Q !== P && mx > Q.x0 && mx < Q.x1 && mz > Q.z0 && mz < Q.z1); });
    for (const [e, a, b] of edges) { const horiz = e[1] === 'z'; const len = horiz ? b[0] - a[0] : b[1] - a[1]; const inset = 0.2 * (e[0] === '+' ? -1 : 1);
      const at = t => horiz ? [t, a[1] + inset] : [a[0] + inset, t]; const t0 = horiz ? a[0] : a[1], t1 = t0 + len;
      if (!P.level && !cfg.stilts && !P.stilts && !P.noDeck) quad(horiz ? [[x0, -1.5, a[1]], [x1, -1.5, a[1]], [x1, F - 0.15, a[1]], [x0, F - 0.15, a[1]]] : [[a[0], -1.5, z0], [a[0], -1.5, z1], [a[0], F - 0.15, z1], [a[0], F - 0.15, z0]], M.skirt);
      const n = Math.max(1, Math.round(len / (P.open ? 1.8 : 3.2))); for (let k = 0; k <= n; k++) { const [px, pz] = at(t0 + 0.15 + (len - 0.3) * k / n); const pt = P.open ? F + 1.0 : ceilAt(px, pz), pb = P.noDeck ? -1.5 : F; box(P.open ? 0.12 : 0.2, pt - pb, P.open ? 0.12 : 0.2, P.railColor ? M.rail : M.post, px, (pb + pt) / 2, pz); }
      const gaps = (P.stairs || []).filter(s => s.edge === e).map(s => [s.at - s.width / 2, s.at + s.width / 2]).sort((p, q) => p[0] - q[0]);
      if (P.rail) { let s0 = t0; for (const g of [...gaps, [t1, t1]]) { const sa = s0, sb = g[0]; s0 = g[1]; if (sb - sa < 0.3) continue;
        const [mx, mz] = at((sa + sb) / 2); const L2 = sb - sa; box(horiz ? L2 : 0.09, 0.09, horiz ? 0.09 : L2, P.railColor ? M.rail : M.post, mx, F + 0.95, mz); box(horiz ? L2 : 0.06, 0.06, horiz ? 0.06 : L2, P.railColor ? M.rail : M.post, mx, F + 0.1, mz);
        if (P.railStyle === 'x') { const nseg = Math.max(1, Math.round(L2 / 1.6)), sl = L2 / nseg; for (let k = 0; k < nseg; k++) { const [cx2, cz2] = at(sa + sl * (k + 0.5)); const dl = Math.hypot(sl, 0.85), ang = Math.atan2(0.85, sl);
            for (const sg of [1, -1]) { const d = box(horiz ? dl : 0.06, 0.07, horiz ? 0.06 : dl, M.rail, cx2, F + 0.52, cz2); if (horiz) d.rotation.z = sg * ang; else d.rotation.x = sg * ang; }
            const [ex, ez] = at(sa + sl * k); box(0.1, 0.9, 0.1, M.rail, ex, F + 0.5, ez); } }
        else for (let t = sa + 0.12; t < sb; t += 0.14) { const [bx, bz] = at(t); box(0.035, 0.85, 0.035, M.post, bx, F + 0.52, bz); } } }
      if (white && under && !P.open) { const val = T(256, 64, (g, w, h) => { g.clearRect(0, 0, w, h); g.fillStyle = '#ece9e1'; g.fillRect(0, 0, w, h * 0.45); for (let x = 0; x < w; x += 32) { g.beginPath(); g.arc(x + 16, h * 0.45, 14, 0, Math.PI); g.fill(); } });
        const [mx, mz] = at((t0 + t1) / 2); const [ox, oz] = horiz ? [0, a[1] - inset] : [a[0] - inset, 0]; const vy = ceilAt(horiz ? mx : a[0], horiz ? a[1] : mz) - 0.3;
        const v = new THREE.Mesh(new THREE.PlaneGeometry(len, 0.55), mat({ map: rep(val, len / 1.2, 1), transparent: true, alphaTest: 0.5 })); v.position.set(horiz ? mx : a[0], vy, horiz ? a[1] : mz); if (!horiz) v.rotation.y = Math.PI / 2; root.add(v); }
      for (const s of (P.stairs || []).filter(s => s.edge === e)) { const sg = e[0] === '+' ? 1 : -1; const D = Math.min(F, s.drop ?? F), y0 = F - D;   // drop = height down to the local ground
        const steps = Math.max(1, Math.round(D / 0.18)), rise = D / steps;
        for (let i = 0; i < steps; i++) { const d = run * (steps - i); if (horiz) box(s.width, rise, d, M.deck, s.at, y0 + rise * (i + 0.5), a[1] + sg * d / 2); else box(d, rise, s.width, M.deck, a[0] + sg * d / 2, y0 + rise * (i + 0.5), s.at); }
        if (D > 0.5) for (const side of [-1, 1]) { const ln = Math.hypot(run * steps, D); const r = horiz ? box(0.08, 0.08, ln, P.railColor ? M.rail : M.post, s.at + side * s.width / 2, y0 + D / 2 + 0.9, a[1] + sg * run * steps / 2) : box(ln, 0.08, 0.08, P.railColor ? M.rail : M.post, a[0] + sg * run * steps / 2, y0 + D / 2 + 0.9, s.at + side * s.width / 2);
          if (horiz) r.rotation.x = sg * Math.atan2(D, run * steps); else r.rotation.z = -sg * Math.atan2(D, run * steps); } } }
    if (P.roof && !(P.level && F + 2.8 > roofY(cz) - 0.2)) { const h0 = P.roofH ?? F + 2.8, h1 = h0 - (P.roofDrop ?? 0.4); const d = P.roofDir || '+z';
      if (d === '+z') { quad([[x0 - 0.3, h0, z0], [x1 + 0.3, h0, z0], [x1 + 0.3, h1, z1 + 0.3], [x0 - 0.3, h1, z1 + 0.3]], M.roof); box(x1 - x0 + 0.6, 0.2, 0.1, M.trim, cx, h1 - 0.08, z1 + 0.3); }
      else if (d === '-z') { quad([[x0 - 0.3, h0, z1], [x1 + 0.3, h0, z1], [x1 + 0.3, h1, z0 - 0.3], [x0 - 0.3, h1, z0 - 0.3]], M.roof); box(x1 - x0 + 0.6, 0.2, 0.1, M.trim, cx, h1 - 0.08, z0 - 0.3); }
      else if (d === '+x') { quad([[x0, h0, z0 - 0.3], [x0, h0, z1 + 0.3], [x1 + 0.3, h1, z1 + 0.3], [x1 + 0.3, h1, z0 - 0.3]], M.roof); box(0.1, 0.2, z1 - z0 + 0.6, M.trim, x1 + 0.3, h1 - 0.08, cz); }
      else { quad([[x1, h0, z0 - 0.3], [x1, h0, z1 + 0.3], [x0 - 0.3, h1, z1 + 0.3], [x0 - 0.3, h1, z0 - 0.3]], M.roof); box(0.1, 0.2, z1 - z0 + 0.6, M.trim, x0 - 0.3, h1 - 0.08, cz); } }
  }
  // ---- interior: floor, solid blocks (stages, mezzanines) and partition walls
  if (cfg.interior) { const I = cfg.interior, cm = {}; const cmat = c => cm[c] || (cm[c] = mat({ color: new THREE.Color(c), emissive: new THREE.Color(c), emissiveIntensity: 0.35 }));   // interiors get soft built-in light
    // finishes: two-tone inner walls and a ceiling under the roof planes
    if (I.wallLower || I.wallUpper) for (const [x0, x1, z0, z1] of BODY) { const e = 0.08, sp = I.split || 1.3;
      const segs = (zz, a, b, side) => { let r = [[a, b]]; for (const op of cfg.openLong || []) if (op.side === side) r = r.flatMap(([u, v]) => (op.x1 <= u || op.x0 >= v) ? [[u, v]] : [[u, op.x0], [op.x1, v]].filter(([p1, p2]) => p2 - p1 > 0.05)); return r.map(([u, v]) => [zz, u, v]); };
      for (const [z, a, b] of [...segs(z0 + e, x0 + e, x1 - e, -1), ...segs(z1 - e, x0 + e, x1 - e, 1)]) { const top = roofY(z) - 0.05;
        /* inner wall finish with real holes where the outer wall has windows (Henry: windows should be see-through from inside too) */
        const wins = OPEN_IN.filter(o => !o.door && o.nz && Math.abs(o.z - z) < 0.6 && o.x - o.w / 2 > a + 0.02 && o.x + o.w / 2 < b - 0.02);
        const band = (y0, y1, c) => { const hs = wins.filter(o => o.y - o.h / 2 < y1 && o.y + o.h / 2 > y0); if (!hs.length) { quad([[a, y0, z], [b, y0, z], [b, y1, z], [a, y1, z]], cmat(c)); return; }
          const sh = new THREE.Shape(); sh.moveTo(a, y0); sh.lineTo(b, y0); sh.lineTo(b, y1); sh.lineTo(a, y1); sh.lineTo(a, y0);
          for (const o of hs) { const ya = Math.max(y0 + 0.01, o.y - o.h / 2), yb = Math.min(y1 - 0.01, o.y + o.h / 2), hl = new THREE.Path(); hl.moveTo(o.x - o.w / 2, ya); hl.lineTo(o.x - o.w / 2, yb); hl.lineTo(o.x + o.w / 2, yb); hl.lineTo(o.x + o.w / 2, ya); hl.lineTo(o.x - o.w / 2, ya); sh.holes.push(hl); }
          const m = new THREE.Mesh(new THREE.ShapeGeometry(sh), cmat(c)); m.material.side = THREE.DoubleSide; m.position.z = z; root.add(m); };
        band(F, F + sp, I.wallLower || I.wallUpper); band(F + sp, top, I.wallUpper || I.wallLower); }
      for (const x of [x0 + e, x1 - e]) { const sh = new THREE.Shape(); sh.moveTo(z0 + e, F); sh.lineTo(z1 - e, F); sh.lineTo(z1 - e, roofY(z1 - e) - 0.05);
        for (const [pz] of [...PROF].reverse()) if (pz > z0 && pz < z1) sh.lineTo(pz, roofY(pz) - 0.05); sh.lineTo(z0 + e, roofY(z0 + e) - 0.05); sh.lineTo(z0 + e, F);
        const m = new THREE.Mesh(new THREE.ShapeGeometry(sh), cmat(I.wallEnd || I.wallLower || '#e8e2d0')); m.rotation.y = -Math.PI / 2; m.position.x = x; root.add(m); } }
    if (I.wallLower || I.wallUpper) { const glassIn = mat({ color: 0xcfe2ee, transparent: true, opacity: 0.18, depthWrite: false }), trimIn = mat({ color: new THREE.Color(I.trim || '#b07a3c') });
      for (const o of OPEN_IN) { const d = 0.11, px = o.x - o.nx * d, pz = o.z - o.nz * d, ry = o.nx ? -o.nx * Math.PI / 2 : (o.nz > 0 ? Math.PI : 0);
        const pane = new THREE.Mesh(new THREE.PlaneGeometry(o.w, o.h), o.door ? mat({ color: new THREE.Color(o.color || '#8a6a4a'), emissive: new THREE.Color(o.color || '#8a6a4a'), emissiveIntensity: 0.35 }) : glassIn); pane.position.set(px, o.y, pz); pane.rotation.y = ry; root.add(pane);
        const fg = new THREE.Group(); fg.position.set(px + o.nx * 0.02, o.y, pz + o.nz * 0.02); fg.rotation.y = ry; root.add(fg);   // trim as a frame (four bars), not a solid board, so the window stays see-through
        for (const [bw, bh, bx, by] of [[o.w + 0.16, 0.08, 0, o.h / 2 + 0.04], [o.w + 0.16, 0.08, 0, -o.h / 2 - 0.04], [0.08, o.h, o.w / 2 + 0.04, 0], [0.08, o.h, -o.w / 2 - 0.04, 0]]) { const bar = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, 0.03), trimIn); bar.position.set(bx, by, 0); fg.add(bar); } } }
    if (I.ceiling) for (let i = 1; i < PROF.length; i++) { const [z0, h0] = PROF[i - 1], [z1, h1] = PROF[i]; const [bx0, bx1] = [Math.min(...BODY.map(b => b[0])), Math.max(...BODY.map(b => b[1]))];
      quad([[bx0, h0 - 0.18, z0], [bx1, h0 - 0.18, z0], [bx1, h1 - 0.18, z1], [bx0, h1 - 0.18, z1]], cmat(I.ceiling)); }
    if (I.frames) { const fm = cmat(I.frames.color || '#3a3d42'); const [bx0, bx1] = [Math.min(...BODY.map(b => b[0])), Math.max(...BODY.map(b => b[1]))]; const zA = BODY[0][2] + 0.25, zB = BODY[0][3] - 0.25;
      for (let x = bx0 + I.frames.spacing; x < bx1 - 1; x += I.frames.spacing) {
        for (const z of [zA, zB]) box(0.3, roofY(z) - F - 0.4, 0.35, fm, x, (F + roofY(z) - 0.4) / 2, z);
        for (let i = 1; i < PROF.length; i++) { const z0 = Math.max(PROF[i - 1][0], zA), z1 = Math.min(PROF[i][0], zB); if (z1 <= z0) continue; const h0 = roofY(z0) - 0.45, h1 = roofY(z1) - 0.45;
          const r = box(0.3, 0.45, Math.hypot(z1 - z0, h1 - h0), fm, x, (h0 + h1) / 2, (z0 + z1) / 2); r.rotation.x = -Math.atan2(h1 - h0, z1 - z0); } } }
    for (const [x0, x1, z0, z1] of BODY) box(x1 - x0 - 0.1, 0.06, z1 - z0 - 0.1, cmat(I.floor || '#8a7a66'), (x0 + x1) / 2, F + 0.03, (z0 + z1) / 2);
    const bannerMat = (bg, k) => { const cv = document.createElement('canvas'); cv.width = 256; cv.height = 160; const c2 = cv.getContext('2d'); const pal = ['#d23b2f', '#2f6fd6', '#f2c12e', '#2e9e57', '#8b3fbf', '#e8742a', '#f4f1e6', '#111111'];
      c2.fillStyle = bg; c2.fillRect(0, 0, 256, 160); c2.strokeStyle = '#f4f1e6'; c2.lineWidth = 6; c2.strokeRect(4, 4, 248, 152);
      for (let i = 0; i < 4; i++) { c2.fillStyle = pal[(k * 3 + i * 5) % pal.length]; if ((k + i) % 2) { c2.beginPath(); c2.arc(40 + ((k * 37 + i * 61) % 180), 70 + ((k * 13 + i * 29) % 60), 14 + ((k + i) % 4) * 6, 0, 7); c2.fill(); } else c2.fillRect(20 + ((k * 29 + i * 47) % 170), 60 + ((k * 17 + i * 23) % 60), 30 + (i * 9) % 30, 18); }
      const words = ['SUMMERFEST', 'OLYMPICS', 'PIRATES', 'WIZARDS', 'AZTECS', 'KNIGHTS', 'SPARTANS', 'NINJAS', 'MARTIANS', 'PATRIOTS', 'ROME', 'SYDNEY'];
      c2.fillStyle = bg === '#f4f1e6' || bg === '#f2c12e' ? '#111' : '#fff'; c2.font = 'bold 30px sans-serif'; c2.textAlign = 'center'; c2.fillText(words[k % words.length], 128, 42); c2.font = 'bold 22px sans-serif'; c2.fillText(String(2001 + (k * 7) % 15), 128, 148);
      const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return new THREE.MeshStandardMaterial({ map: t, emissive: 0xffffff, emissiveMap: t, emissiveIntensity: 0.3, side: THREE.DoubleSide }); };
    let bk = 0; for (const b of I.blocks || []) { if (b.banner) { const bm = bannerMat(b.color, bk++); bm.side = THREE.FrontSide; for (const ry of [0, Math.PI]) { const pl = new THREE.Mesh(new THREE.PlaneGeometry(b.x1 - b.x0, b.y1 - b.y0), bm); pl.rotation.y = ry; pl.position.set((b.x0 + b.x1) / 2, F + (b.y0 + b.y1) / 2, (b.z0 + b.z1) / 2 + (ry ? -0.01 : 0.01)); root.add(pl); } continue; }
      box(b.x1 - b.x0, b.y1 - b.y0, b.z1 - b.z0, b.glass ? mat({ color: 0xcfe2ee, transparent: true, opacity: 0.18, depthWrite: false }) : cmat(b.color), (b.x0 + b.x1) / 2, F + (b.y0 + b.y1) / 2, (b.z0 + b.z1) / 2); }

    /* Henry Nov 16: these halls have triangular trusses (horizontal bottom chord, angled top chords up to the ridge, web members), no arches */
    if (I.trusses) { const T = I.trusses, tm = cmat(T.color || '#7a5530'), zA = BODY[0][2] + 0.2, zB = BODY[0][3] - 0.2, yb = Math.min(roofY(zA), roofY(zB)) - (T.drop || 0.35);
      let rz = PROF[0][0], rh = -1e9; for (const [pz, ph] of PROF) if (ph > rh) { rh = ph; rz = pz; }
      const seg = (x, za, ya, zb, yb2, t = 0.16) => { const r = box(t, t, Math.hypot(zb - za, yb2 - ya), tm, x, (ya + yb2) / 2, (za + zb) / 2); r.rotation.x = -Math.atan2(yb2 - ya, zb - za); };
      for (let x = T.x0; x <= T.x1 + 0.01; x += T.spacing) { const topY = z => roofY(z) - 0.3;
        seg(x, zA, yb, zB, yb, 0.2); seg(x, zA, yb, rz, topY(rz), 0.2); seg(x, rz, topY(rz), zB, yb, 0.2);
        seg(x, rz, yb, rz, topY(rz)); for (const f of [0.5]) { const zl = zA + (rz - zA) * f, zr = rz + (zB - rz) * f; seg(x, zl, yb, rz, topY(rz) * 0.5 + yb * 0.5); seg(x, zr, yb, rz, topY(rz) * 0.5 + yb * 0.5); seg(x, zl, yb, zl, yb + (topY(zl) - yb)); seg(x, zr, yb, zr, yb + (topY(zr) - yb)); } } }
    /* color war banners mounted flat on the sloped ceiling (12 Art Center 360) */
    if (I.ceilingBanners) { const CB = I.ceilingBanners, pal = ['#3fb36b', '#f2c12e', '#e8578f', '#4d8fd6', '#f07c2a', '#9b59b6', '#f4f1e6', '#d23b2f'];
      if (CB.under) { const zA = BODY[0][2] + 0.3, zB = BODY[0][3] - 0.3, yb = Math.min(roofY(BODY[0][2] + 0.2), roofY(BODY[0][3] - 0.2)) - ((I.trusses || {}).drop || 0.35) - 0.13, nz = Math.floor((zB - zA) / 2.45);
        for (let x = CB.x0; x + 1.5 <= CB.x1; x += 1.55) for (let r = 0; r < nz; r++) { const pl = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 2.4), bannerMat(pal[(bk * 5) % pal.length], bk++)); pl.rotation.x = Math.PI / 2;
          pl.position.set(x + 0.75, yb, zA + (zB - zA - nz * 2.45) / 2 + r * 2.45 + 1.2); root.add(pl); } }
      else
      for (let i = 1; i < PROF.length; i++) { const [z0, h0] = PROF[i - 1], [z1, h1] = PROF[i]; const sl = Math.hypot(z1 - z0, h1 - h0); if (sl < 1.6) continue; const nr = Math.floor(sl / 1.6);
        for (let x = CB.x0; x + 2.4 <= CB.x1; x += 2.5) for (let r = 0; r < nr; r++) { const t = (r + 0.5) / nr, zc = z0 + (z1 - z0) * t, hc = h0 + (h1 - h0) * t - 0.24;
          const pl = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.5), bannerMat(pal[(bk * 5) % pal.length], bk++)); pl.position.set(x + 1.2, hc, zc);
          const aS = z1 >= z0 ? Math.atan2(h1 - h0, z1 - z0) : Math.atan2(h0 - h1, z0 - z1); pl.rotation.x = Math.PI / 2 - aS; root.add(pl); } } }
    for (const w of I.walls || []) { const len = Math.hypot(w.x1 - w.x0, w.z1 - w.z0), h = w.h || (Math.min(roofY(w.z0), roofY(w.z1)) - F - 0.1);
      const m = box(len, h, 0.15, cmat(w.color || '#cdbf9f'), (w.x0 + w.x1) / 2, F + h / 2, (w.z0 + w.z1) / 2); m.rotation.y = -Math.atan2(w.z1 - w.z0, w.x1 - w.x0); } }
  root.userData = { cfg };
  return mergeByMaterial(root);
}

// collapse a building's hundreds of small meshes into one mesh per material (fast on phones)
export function mergeByMaterial(root) {
  root.updateMatrixWorld(true); const groups = new Map();
  root.traverse(o => { if (!o.isMesh) return; let g = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone(); g.applyMatrix4(o.matrixWorld);
    for (const k of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].includes(k)) g.deleteAttribute(k);
    if (!g.attributes.normal) g.computeVertexNormals(); if (!g.attributes.uv) g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
    const key = o.material.uuid; if (!groups.has(key)) groups.set(key, { m: o.material, gs: [] }); groups.get(key).gs.push(g); });
  const out = new THREE.Group(); out.name = root.name; out.userData = root.userData;
  for (const { m, gs } of groups.values()) { const merged = mergeGeometries(gs, false); if (merged) out.add(new THREE.Mesh(merged, m)); }
  return out;
}
