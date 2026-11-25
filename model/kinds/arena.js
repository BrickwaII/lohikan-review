// Outdoor object kind 'arena' (used by EXTRAS entries with type: 'arena').
import * as THREE from 'three';

export function arena(e, g) {   // open-sided riding ring (11 Equestrian Barn 360): posts each side, 2-rail wooden fence, dirt floor, curved wooden lamella ceiling; local x along the length
    const x0 = e.x0, x1 = e.x1, HW = e.hw, EH = e.eave || 6, RISE = e.rise || 4, L = x1 - x0, CX = (x0 + x1) / 2, M = c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.9 });
    const dirt = new THREE.Mesh(new THREE.BoxGeometry(L, 0.6, 2 * HW), M(0x8a7064)); dirt.position.set(CX, -0.2, 0); g.add(dirt);
    const wood = M(0x7a5a3c), post = M(0x5e4632);
    for (let x = x0 + 0.2; x <= x1 + 0.01; x += 4.0) for (const sz of [-1, 1]) { const p = new THREE.Mesh(new THREE.BoxGeometry(0.25, EH, 0.25), post); p.position.set(Math.min(x, x1 - 0.2), EH / 2, sz * (HW - 0.2)); g.add(p);
      const kb = new THREE.Mesh(new THREE.BoxGeometry(0.15, 2.2, 0.15), post); kb.position.set(Math.min(x, x1 - 0.2), EH - 0.8, sz * (HW - 0.9)); kb.rotation.x = sz * 0.6; g.add(kb); }
    for (const sz of [-1, 1]) for (const y of [0.6, 1.25]) { const r = new THREE.Mesh(new THREE.BoxGeometry(L, 0.12, 0.08), wood); r.position.set(CX, y, sz * (HW - 0.45)); g.add(r); }
    const R = (HW * HW + RISE * RISE) / (2 * RISE), HALF = Math.asin(HW / R);
    const cv = document.createElement('canvas'); cv.width = 512; cv.height = 512; const c2 = cv.getContext('2d'); c2.fillStyle = '#8a5a2e'; c2.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 16; i++) { c2.strokeStyle = '#e0a868'; c2.lineWidth = 6; c2.beginPath(); c2.moveTo(0, i * 32 + 16); c2.lineTo(512, i * 32 + 16); c2.stroke(); }   // purlins/planks along the length
    const tx = new THREE.CanvasTexture(cv); tx.colorSpace = THREE.SRGBColorSpace; tx.wrapS = tx.wrapT = THREE.RepeatWrapping; tx.repeat.set(L / 6, 4);
    { /* Henry (v5 rework): a triangular (gable) roof, no arches; trusses like the circus: flat bottom chord, triangular top, much more frequent */
      const tw = new THREE.MeshStandardMaterial({ color: 0xd9a868, roughness: 0.8, emissive: 0x6a4420, emissiveIntensity: 0.35 });
      const top = z => EH + RISE * (1 - Math.abs(z) / HW);
      const mem = (x, za, ya, zb, yb, t) => { const m = new THREE.Mesh(new THREE.BoxGeometry(t, t, Math.hypot(zb - za, yb - ya) + 0.04), tw); m.position.set(x, (ya + yb) / 2, (za + zb) / 2); m.rotation.x = -Math.atan2(yb - ya, zb - za); g.add(m); };
      for (let x = x0 + 0.6; x < x1 - 0.3; x += 1.22) {
        mem(x, -HW, EH, HW, EH, 0.14); mem(x, -HW, EH, 0, top(0) - 0.1, 0.13); mem(x, 0, top(0) - 0.1, HW, EH, 0.13); mem(x, 0, EH, 0, top(0) - 0.1, 0.09);
        for (const zq of [-HW / 2, HW / 2]) { mem(x, zq, EH, zq, top(zq) - 0.1, 0.08); mem(x, zq, EH, 0, (EH + top(0)) / 2, 0.08); } } }
    if (e.endDoor) { const dw = e.endDoor.w || 3.6, dh = e.endDoor.h || 3.8, dz = e.endDoor.z || 0;   // Henry: the big door in the end wall into the stall barn
      /* v8 (Henry): the door stands open (daylight down the stall-barn aisle) and the end wall runs right down to the ground */
      const op = new THREE.Mesh(new THREE.PlaneGeometry(dw, dh), new THREE.MeshStandardMaterial({ color: 0xe6eef2, emissive: 0xcfdde6, emissiveIntensity: 0.9, side: THREE.DoubleSide })); op.rotation.y = Math.PI / 2; op.position.set(x1 - 0.16, dh / 2, dz); g.add(op);
      for (const [za, zb] of [[-HW, dz - dw / 2 - 0.2], [dz + dw / 2 + 0.2, HW]]) { const sk = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.2, zb - za), M(0x2b2520)); sk.position.set(x1 - 0.1, 1.1, (za + zb) / 2); g.add(sk); }
      for (const sz of [-1, 1]) { const jamb = new THREE.Mesh(new THREE.BoxGeometry(0.2, dh + 0.2, 0.2), M(0xcfc6b4)); jamb.position.set(x1 - 0.12, (dh + 0.2) / 2, dz + sz * (dw / 2 + 0.1)); g.add(jamb); }
      const hd2 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, dw + 0.4), M(0xcfc6b4)); hd2.position.set(x1 - 0.12, dh + 0.1, dz); g.add(hd2); }
    for (const sz of [-1, 1]) { const sl = Math.hypot(HW, RISE); const pl = new THREE.Mesh(new THREE.PlaneGeometry(L, sl + 0.4), new THREE.MeshStandardMaterial({ map: tx, side: THREE.DoubleSide, roughness: 0.8, emissive: 0x7a4c24, emissiveIntensity: 0.7 }));
      pl.rotation.x = -Math.PI / 2 + sz * Math.atan2(RISE, HW); pl.position.set(CX, EH + RISE / 2 + 0.05, sz * HW / 2); g.add(pl); }   // gable roof planes
    for (const jx of [CX - 8, CX + 6]) for (const sz of [-1, 1]) { const st = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1.5, 0.6), M(0xf2f2f2)); st.position.set(jx, 0.75, sz * 1.8); g.add(st); }
    for (const jx of [CX - 8, CX + 6]) { const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 3.6, 6), M(0xf2f2f2)); pole.rotation.x = Math.PI / 2; pole.position.set(jx, 0.9, 0); g.add(pole); }
  }
