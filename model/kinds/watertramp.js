// Outdoor object kind 'watertramp' (used by EXTRAS entries with type: 'watertramp').
import * as THREE from 'three';

export function watertramp(e, g) {
    const R = e.r || 3.0, N = 16, M = c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.7 });
    const tube = new THREE.Mesh(new THREE.TorusGeometry(R + 0.15, 0.35, 10, 48), M(0x2a2a2e)); tube.rotation.x = Math.PI / 2; tube.position.y = 0.2; g.add(tube);
    const mat = new THREE.Mesh(new THREE.CircleGeometry(R - 0.3, 40), M(0x15161a)); mat.rotation.x = -Math.PI / 2; mat.position.y = 0.5; g.add(mat);
    for (let k = 0; k < N; k++) { const a0 = k / N * Math.PI * 2, pad = new THREE.Mesh(new THREE.CylinderGeometry(R + 0.05, R + 0.05, 0.38, 6, 1, true, a0, Math.PI * 2 / N), new THREE.MeshStandardMaterial({ color: k % 2 ? 0x2456c8 : 0xd8262c, roughness: 0.6, side: THREE.DoubleSide })); pad.position.y = 0.62; g.add(pad); }
    const top = new THREE.Mesh(new THREE.RingGeometry(R - 0.3, R + 0.05, 48), M(0xf2c81e)); top.rotation.x = -Math.PI / 2; top.position.y = 0.82; g.add(top);
  }
