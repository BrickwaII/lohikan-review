// Outdoor object kind 'riflery' (used by EXTRAS entries with type: 'riflery').
import * as THREE from 'three';

export function riflery(e, g) {   /* covered firing line at local x=0 shooting toward +x; target backstop at x = len */
    const M = c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.85 }), wood = M(0x6b4a30), L = e.len || 16;
    for (const [px, pz] of [[-1.6, -3], [-1.6, 3], [0.6, -3], [0.6, 3]]) { const p = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.6, 0.18), wood); p.position.set(px, 1.3, pz); g.add(p); }
    const rf = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.12, 7.0), M(0x55595c)); rf.position.set(-0.5, 2.65, 0); rf.rotation.z = 0.08; g.add(rf);
    const bench = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.08, 6.0), wood); bench.position.set(0.3, 0.75, 0); g.add(bench);
    for (const lz of [-2.4, -0.8, 0.8, 2.4]) { const mt = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.05, 0.9), M(0x2f4a7a)); mt.position.set(-0.6, 0.03, lz); g.add(mt); }
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2.4, 8.0), M(0x5a4632)); back.position.set(L + 1.2, 1.2, 0); g.add(back);
    for (const lz of [-2.4, -0.8, 0.8, 2.4]) { const fr = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.6, 0.6), M(0xf2f0ea)); fr.position.set(L, 1.1, lz); g.add(fr);
      const bull = new THREE.Mesh(new THREE.CircleGeometry(0.12, 16), M(0x111111)); bull.rotation.y = -Math.PI / 2; bull.position.set(L - 0.05, 1.1, lz); g.add(bull);
      const st = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.8, 0.06), wood); st.position.set(L, 0.4, lz); g.add(st); }
  }
