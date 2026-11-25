// Outdoor object kind 'benches' (used by EXTRAS entries with type: 'benches').
import * as THREE from 'three';

export function benches(e) {   // park benches (red slats, pale legs) at map offsets [dx, dy, facingDeg (compass bearing the sitter looks toward)]
    const g0 = new THREE.Group(); const red = new THREE.MeshStandardMaterial({ color: 0xb24a3c, roughness: 0.8 }), leg = new THREE.MeshStandardMaterial({ color: 0xe8e2d4, roughness: 0.8 });
    for (const [dx, dy, face] of e.list) { const b = new THREE.Group(); b.position.set(dx, 0, -dy); b.rotation.y = -THREE.MathUtils.degToRad(face);
      const seat = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.06, 0.45), red); seat.position.set(0, 0.45, 0); b.add(seat);
      const bk = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.4, 0.05), red); bk.position.set(0, 0.75, 0.22); bk.rotation.x = 0.15; b.add(bk);
      for (const lx of [-0.8, 0.8]) { const l = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.45, 0.5), leg); l.position.set(lx, 0.22, 0.02); b.add(l); }
      g0.add(b); }
    return g0; }
