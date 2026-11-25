// Outdoor object kind 'pool' (used by EXTRAS entries with type: 'pool').
import * as THREE from 'three';
import { PALETTE } from '../core/materials.js';

export function pool(e, g) {   // outdoor pool: deck, recessed water with brick coping, lane rope, slide, lifeguard chair, benches, chain-link fence
    const P0 = new THREE.Group(); P0.position.y = e.lift || 0; g.add(P0); const W = e.w, D = e.d, [PW, PD] = e.water, PX = e.waterX || 0, M = c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.85 });
    const dm = M(0xc9b79c), x0 = PX - PW / 2, x1 = PX + PW / 2;   /* deck as a frame round the water so the water shows */
    for (const [cx, cz, w, d] of [[(-W / 2 + x0) / 2, 0, x0 + W / 2, D], [(x1 + W / 2) / 2, 0, W / 2 - x1, D], [PX, (-D / 2 - PD / 2) / 2, PW, D / 2 - PD / 2], [PX, (D / 2 + PD / 2) / 2, PW, D / 2 - PD / 2]]) { const dk = new THREE.Mesh(new THREE.BoxGeometry(w, 0.6, d), dm); dk.position.set(cx, -0.25, cz); P0.add(dk); }
    const basin = new THREE.Mesh(new THREE.BoxGeometry(PW, 0.2, PD), M(0x3fa9c2)); basin.position.set(PX, -1.6, 0); P0.add(basin);
    const water = new THREE.Mesh(new THREE.PlaneGeometry(PW, PD), new THREE.MeshStandardMaterial({ color: 0x5fd0dc, emissive: 0x2a9fb0, emissiveIntensity: 0.35, roughness: 0.15, metalness: 0.1 })); water.rotation.x = -Math.PI / 2; water.position.set(PX, -0.05, 0); P0.add(water);
    const brick = M(0xa8402e); for (const [bx, bz, bw, bd] of [[PX, -PD / 2 - 0.3, PW + 1.2, 0.6], [PX, PD / 2 + 0.3, PW + 1.2, 0.6], [PX - PW / 2 - 0.3, 0, 0.6, PD], [PX + PW / 2 + 0.3, 0, 0.6, PD]]) { const b2 = new THREE.Mesh(new THREE.BoxGeometry(bw, 0.08, bd), brick); b2.position.set(bx, 0.06, bz); P0.add(b2); }
    for (const lz of [-PD / 6, PD / 6]) { const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, PW, 8), new THREE.MeshStandardMaterial({ color: 0x2f5fc4 })); rope.rotation.z = Math.PI / 2; rope.position.set(PX, 0.0, lz); P0.add(rope); }
    const wht = M(0xf2f2f2), red = M(0xb3342a);
    /* slide, center stand and lifeguard tower placed from the 22 Pool Program 360 (bearing + dip from camera at map 1612.7,1605.1) */
    { const sl = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.12, 2.9), wht); sl.position.set(-4.35, 1.35, -7.5); sl.rotation.x = 0.71; P0.add(sl);
      for (const sx of [-0.42, 0.42]) { const rl = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.25, 2.9), wht); rl.position.set(-4.35 + sx, 1.5, -7.5); rl.rotation.x = 0.71; P0.add(rl);
        const lp = new THREE.Mesh(new THREE.BoxGeometry(0.07, 2.4, 0.07), wht); lp.position.set(-4.4 + sx * 0.8, 1.2, -9.1); lp.rotation.x = -0.12; P0.add(lp); }
      for (let k = 1; k <= 6; k++) { const rg = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.05, 0.05), wht); rg.position.set(-4.4, k * 0.36, -9.1 - (k * 0.36 - 1.2) * 0.12); P0.add(rg); }
      const pl = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.08, 0.6), wht); pl.position.set(-4.4, 2.3, -8.9); P0.add(pl); }
    { const sx0 = 0.1, sz0 = -7.9; for (const dx of [-0.3, 0.3]) { const lg = new THREE.Mesh(new THREE.BoxGeometry(0.06, 2.1, 0.06), wht); lg.position.set(sx0 + dx, 1.05, sz0); P0.add(lg); }
      for (let k = 1; k <= 5; k++) { const rg = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.04, 0.04), wht); rg.position.set(sx0, k * 0.36, sz0); P0.add(rg); }
      const seat = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.06, 0.5), wht); seat.position.set(sx0, 2.1, sz0 + 0.15); P0.add(seat); }
    { const tx0 = 16.8, tz0 = 1.9, g2 = new THREE.Group(); g2.position.set(tx0, 0, tz0); P0.add(g2);
      for (const dx of [-0.75, 0.75]) for (const dz of [-0.75, 0.75]) { const lg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.9, 0.1), wht); lg.position.set(dx * 0.85, 0.95, dz * 0.85); lg.rotation.z = -dx * 0.08; lg.rotation.x = dz * 0.08; g2.add(lg); }
      for (const y of [0.5, 1.1]) for (const dz of [-0.65, 0.65]) { const br = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.06, 0.06), wht); br.position.set(0, y, dz); g2.add(br); }
      const deck = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.1, 1.3), wht); deck.position.set(0, 1.9, 0); g2.add(deck);
      for (const [rx, rz, rw, rd] of [[0, -0.62, 1.3, 0.05], [0, 0.62, 1.3, 0.05], [0.62, 0, 0.05, 1.3]]) { const rr = new THREE.Mesh(new THREE.BoxGeometry(rw, 0.05, rd), wht); rr.position.set(rx, 2.55, rz); g2.add(rr);
        for (const t of [-0.6, 0.6]) { const pp = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.65, 0.05), wht); pp.position.set(rw > rd ? t : rx, 2.22, rw > rd ? rz : t); g2.add(pp); } }
      const ch2 = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.5, 0.55), M(0xf4f4f0)); ch2.position.set(0.1, 2.2, 0); g2.add(ch2);
      for (let k = 1; k <= 5; k++) { const st = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, 0.9), wht); st.position.set(0.95 - k * 0.04, k * 0.34, 0); g2.add(st); } }
    for (const [bx, bz, ry] of [[-W / 2 + 1.5, -3, Math.PI / 2], [-W / 2 + 1.5, 3, Math.PI / 2], [W / 2 - 1.5, -3, Math.PI / 2], [W / 2 - 1.5, 3, Math.PI / 2], [PX - 6, D / 2 - 1.2, 0], [PX + 6, D / 2 - 1.2, 0]]) { const bn = new THREE.Group(); bn.position.set(bx, 0, bz); bn.rotation.y = ry;
      const seat = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.06, 0.45), red); seat.position.y = 0.45; bn.add(seat); const back = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.4, 0.06), red); back.position.set(0, 0.75, -0.22); bn.add(back); P0.add(bn); }
    const fence = new THREE.MeshStandardMaterial({ color: 0x5a6266, metalness: 0.4, roughness: 0.6, transparent: true, opacity: 0.3, side: THREE.DoubleSide, depthWrite: false });
    for (const [fx, fz, fw, rot] of [[0, -D / 2, W, 0], [0, D / 2, W, 0], [-W / 2, 0, D, Math.PI / 2], [W / 2, 0, D, Math.PI / 2]]) { const f = new THREE.Mesh(new THREE.PlaneGeometry(fw, 1.8), fence); f.position.set(fx, 0.95, fz); f.rotation.y = rot; P0.add(f); }
      /* v8 (Henry, pool 360): the 4 benches stand on the far (east) end deck past the end of the pool, in a row, facing back along the lanes toward the pool */
    for (const bz of [-7.2, -2.4, 2.4, 7.2]) { const bw = M(PALETTE.wood.bench), bx = PX + PW / 2 + 3.4;
      const seat = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.06, 2.4), bw); seat.position.set(bx, 0.45, bz); P0.add(seat);
      const back = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.45, 2.4), bw); back.position.set(bx + 0.22, 0.72, bz); back.rotation.z = 0.12; P0.add(back);
      for (const lz of [-1.05, 1.05]) { const leg = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.45, 0.06), bw); leg.position.set(bx, 0.22, bz + lz); P0.add(leg); } }
  }
