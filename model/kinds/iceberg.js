// Outdoor object kind 'iceberg' (used by EXTRAS entries with type: 'iceberg').
import * as THREE from 'three';

export function iceberg(e, g) {   /* white inflatable climbing iceberg: lopsided cone with a steep climbing face */
    const ig = new THREE.ConeGeometry(2.6, 3.2, 7, 1); ig.translate(0, 1.4, 0); const pa = ig.attributes.position; for (let i = 0; i < pa.count; i++) { const x = pa.getX(i), y = pa.getY(i); if (x > 0) pa.setX(i, x * (0.55 + 0.45 * (1 - y / 3.2))); }
    ig.computeVertexNormals(); g.add(new THREE.Mesh(ig, new THREE.MeshStandardMaterial({ color: 0xf2f4f6, roughness: 0.4, flatShading: true })));
    for (let k = 0; k < 10; k++) { const h = new THREE.Mesh(new THREE.SphereGeometry(0.09, 6, 4), new THREE.MeshStandardMaterial({ color: [0x2a6fd6, 0xd8262c, 0xf2c81e][k % 3] })); h.position.set(1.0 + (k % 2) * 0.3, 0.4 + k * 0.28, (k % 3 - 1) * 0.6); g.add(h); }
  }
