// Outdoor object kind 'buoyline' (used by EXTRAS entries with type: 'buoyline').
import * as THREE from 'three';

export function buoyline(e, g) {   /* floats on a rope along map-offset points (angleDeg 0) */
    const fm = new THREE.MeshStandardMaterial({ color: 0x2456c8, roughness: 0.5 }), wm = new THREE.MeshStandardMaterial({ color: 0xf4f4f4, roughness: 0.5 });
    for (let i = 1; i < e.pts.length; i++) { const [ax, ay] = e.pts[i - 1], [bx, by] = e.pts[i], L = Math.hypot(bx - ax, by - ay);
      for (let t = 0; t < L; t += 1.2) { const f = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), (Math.round(t / 1.2) % 4) ? fm : wm); f.position.set(ax + (bx - ax) * t / L, 0.08, -(ay + (by - ay) * t / L)); g.add(f); } }
  }
