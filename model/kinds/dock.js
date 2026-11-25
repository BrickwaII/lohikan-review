// Outdoor object kind 'dock' (used by EXTRAS entries with type: 'dock').
import * as THREE from 'three';

export function dock(e, g) {   /* wooden dock boards along map-offset segments (angleDeg 0: local x = dx, z = -dy), with posts into the water */
    const W = e.wid || 2.4, Y = e.deck || 0.35, deckM = new THREE.MeshStandardMaterial({ color: 0xb59a74, roughness: 0.9 }), postM = new THREE.MeshStandardMaterial({ color: 0x5a4632 });
    for (const [[ax, ay], [bx, by]] of e.segs) { const x1 = ax, z1 = -ay, x2 = bx, z2 = -by, L = Math.hypot(x2 - x1, z2 - z1);
      const dk = new THREE.Mesh(new THREE.BoxGeometry(L + W * 0.5, 0.18, W), deckM); dk.position.set((x1 + x2) / 2, Y, (z1 + z2) / 2); dk.rotation.y = -Math.atan2(z2 - z1, x2 - x1); g.add(dk);
      for (let t = 0; t <= 1.001; t += Math.max(0.15, 2.5 / L)) for (const sd of [-1, 1]) { const nx = -(z2 - z1) / L, nz = (x2 - x1) / L; const po = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1.6, 6), postM); po.position.set(x1 + (x2 - x1) * t + sd * nx * (W / 2 - 0.15), Y - 0.7, z1 + (z2 - z1) * t + sd * nz * (W / 2 - 0.15)); g.add(po); } }
  }
