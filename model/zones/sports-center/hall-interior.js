// Sports Center hall inside: ceilings, gym wall/ceiling, exposed rafters, trusses, wall boards and banner band, cabin murals, ceiling lights.
// Part of the Sports Center + Circus zone; called in order by ./index.js. Read ./NOTES.md before changing.
import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';

export function buildHallInterior(k) {
  const { S, rnd, mat, T, woodBoards, tex, holedWall, quad, inn, x0, x1, H, NWIN } = k;
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
  return { R, rise, cy, ceilY, GZ, gx0, gx1, fl, ceilPiece, woodCeil, roofU, TB, tm, tseg, muralTex, panelTex };
}
