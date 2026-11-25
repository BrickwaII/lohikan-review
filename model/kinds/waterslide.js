// Outdoor object kind 'waterslide' (used by EXTRAS entries with type: 'waterslide').
import * as THREE from 'three';

export function waterslide(e, g) {   // chute along local +x from the top at the origin, dropping e.drop over e.len
    const L = e.len || 9, DR = e.drop || 3, T0 = e.top || 0.75, M = c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.6, side: THREE.DoubleSide });
    for (const sz of [-1, 1]) { const col = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, T0 + 1.6, 14), M(0x1f5a3a)); col.position.set(-0.3, (T0 + 1.6) / 2, sz * 1.0); g.add(col); }
    const ang = Math.atan2(DR, L), len = Math.hypot(L, DR);
    const chute = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, len, 16, 1, true, Math.PI, Math.PI), M(0x2f6fd6)); chute.rotation.z = Math.PI / 2 - ang; chute.position.set(L / 2, T0 - DR / 2, 0); g.add(chute);
    for (const sz of [-1, 1]) { const lip = new THREE.Mesh(new THREE.BoxGeometry(len, 0.08, 0.12), M(0xf2c12e)); lip.position.set(L / 2, T0 + 0.03 - DR / 2, sz * 0.75); lip.rotation.z = -ang; g.add(lip); }
    if (T0 > 1) { const pf = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.15, 2.2), M(0x7a6448)); pf.position.set(-0.5, T0 - 0.1, 0); g.add(pf); for (let k = 0; k < Math.ceil(T0 / 0.25); k++) { const st = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.06, 0.9), M(0x7a6448)); st.position.set(-1.4 - k * 0.25, T0 - 0.1 - (k + 1) * 0.25, 0); g.add(st); } }
    const rock = M(0x8a857c); for (const [rx, rz, r] of [[-1.5, -2.2, 0.9], [-1.0, 2.4, 1.1], [1.5, -2.0, 0.8], [2.5, 2.1, 0.7], [-2.6, 0.4, 0.8], [5, -1.8, 0.6]]) { const b2 = new THREE.Mesh(new THREE.DodecahedronGeometry(r, 0), rock); b2.position.set(rx, r * 0.4 - (rx > 0 ? rx / L * DR : 0), rz); b2.scale.y = 0.6; g.add(b2); }
  }
