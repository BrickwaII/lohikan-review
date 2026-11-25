// Circus nave walls: bays (counts measured from the 360), open bays, braces, blue band, window band, star band, posts, rafters, trusses.
// Part of the Sports Center + Circus zone; called in order by ./index.js. Read ./NOTES.md before changing.
import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';

export function buildCircusNave(k) {
  const { S, mat, starWall, clere, woodBoards, tex, quad, inn, cx0, cx1, L, CX, H, NH } = k;
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
  return { NB, openBays, openH, BR };
}
