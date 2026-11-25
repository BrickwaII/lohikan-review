// Outdoor object kind 'ropeswing' (used by EXTRAS entries with type: 'ropeswing').
import * as THREE from 'three';

export function ropeswing(e, g) {   /* lakeside rope swing: two tall leaning timber poles along local z with a crossbar, a hanging rope with a knot/bar, and a small wooden launch platform on the shore side (-x); local +x faces the water */
    const M = c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.85 }), wood = M(0x6b5a44), H = e.h || 8, S = (e.span || 5) / 2;
    for (const sz of [-1, 1]) { const L = Math.hypot(H, 0.5); const p = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.2, L, 8), wood); p.position.set(0, H / 2, sz * (S + 0.25)); p.rotation.x = sz * Math.atan2(0.5, H); g.add(p); }
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 2 * S + 0.6, 8), wood); bar.rotation.x = Math.PI / 2; bar.position.set(0, H - 0.1, 0); g.add(bar);
    const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, H - 2.2, 5), M(0xd8cfb4)); rope.position.set(0.6, H - 0.1 - (H - 2.2) / 2, 0); rope.rotation.z = Math.atan2(0.6, H - 2.2); g.add(rope);
    const knot = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.6), M(0x8a7a5a)); knot.position.set(1.2, 2.1, 0); g.add(knot);
    const deck = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.12, 1.6), M(0x7a6448)); deck.position.set(-0.4, 0.55, 0); g.add(deck);
    for (const [dx, dz] of [[-1, -0.7], [-1, 0.7], [0.2, -0.7], [0.2, 0.7]]) { const lg = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.6, 0.12), wood); lg.position.set(dx + 0.05, 0.25, dz); g.add(lg); }
  }
