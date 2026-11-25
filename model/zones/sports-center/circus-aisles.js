// Circus floor, aisle ceilings and walls, weight-lifting room, backstage room, star-painted doors.
// Part of the Sports Center + Circus zone; called in order by ./index.js. Read ./NOTES.md before changing.
import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';

export function buildCircusAisles(k) {
  const { S, mat, floorTex, woodBoards, tex, quad, inn, cx0, cx1, L, CX, H, NH, SOUTH_OPEN_X } = k;
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
  return { fl };
}
