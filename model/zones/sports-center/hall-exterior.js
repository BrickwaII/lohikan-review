// Sports Center hall outside: roof, siding, west gable with the barn doors and SPORTS CENTER sign, west-end doors/windows, concrete walk + benches, south and north wall windows.
// Part of the Sports Center + Circus zone; called in order by ./index.js. Read ./NOTES.md before changing.
import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';

export function buildHallExterior(k) {
  const { S, mat, T, siding, greenRoof, tex, holedWall, glassMat, quad, ext } = k;
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
  return { x0, x1, H, GZM, NWIN, sh, gw, doorM, xM, sign, winM };
}
