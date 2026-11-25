// Circus building outside + end walls: aisle roofs, clerestory walls and windows, east end opening and posts, window rows, gable boards, shared west wall with the Sports Center.
// Part of the Sports Center + Circus zone; called in order by ./index.js. Read ./NOTES.md before changing.
import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';

export function buildCircusShell(k) {
  const { S, root, mat, T, siding, greyRoof, starWall, clere, woodBoards, tex, quad, ext, inn, cx0, cx1, L, CX, H, NH, SOUTH_OPEN_X, WIN_ROWS } = k;
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
  return { endProfile };
}
