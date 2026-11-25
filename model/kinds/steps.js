// Outdoor object kind 'steps' (used by EXTRAS entries with type: 'steps').
import * as THREE from 'three';

export function steps(e) {   // flagstone steps down along local +x by e.drop over e.len (origin = mid-height); low stone walls flank the bottom end (Henry: the stonework)
    const g0 = new THREE.Group(); const fl = new THREE.MeshStandardMaterial({ color: 0x9b958a, roughness: 0.95 }), sw = new THREE.MeshStandardMaterial({ color: 0x7d7468, roughness: 1 });
    const D = e.drop, n = Math.max(2, Math.round(D / 0.17)), L = e.len, W = e.w || 2.4;
    for (let k = 0; k < n; k++) { const top = D / 2 - k * D / n, h = top + D / 2 + 0.3; const t = new THREE.Mesh(new THREE.BoxGeometry(L / n + 0.02, h, W), fl); t.position.set(-L / 2 + (k + 0.5) * L / n, top - h / 2, 0); g0.add(t);
      for (let j = 0; j < 3; j++) { const fs = new THREE.Mesh(new THREE.BoxGeometry(L / n - 0.06, 0.02, W / 3 - 0.06), new THREE.MeshStandardMaterial({ color: [0xa7a196, 0x928b80, 0xb0aa9f][(k + j) % 3], roughness: 0.95 })); fs.position.set(-L / 2 + (k + 0.5) * L / n, top + 0.01, -W / 3 + j * W / 3); g0.add(fs); } }
    for (const sz of [-1, 1]) for (let j = 0; j < 3; j++) { const st = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.55 + (j % 2) * 0.08, 0.5), sw); st.position.set(L / 2 - 0.25 - j * 0.48, -D / 2 + 0.25, sz * (W / 2 + 0.28)); g0.add(st); }
    return g0; }
