// Outdoor object kind 'closet' (used by EXTRAS entries with type: 'closet').
import * as THREE from 'three';

export function closet(e, g) {   // free-standing wooden storage closet with a door
    const c = new THREE.Mesh(new THREE.BoxGeometry(e.w, e.h, e.d), new THREE.MeshStandardMaterial({ color: 0x4a3426, roughness: 0.9 })); c.position.y = e.h / 2; g.add(c);
    const rf = new THREE.Mesh(new THREE.BoxGeometry(e.w + 0.15, 0.08, e.d + 0.15), new THREE.MeshStandardMaterial({ color: 0x2e241c })); rf.position.y = e.h + 0.04; g.add(rf);
    const dl = new THREE.Mesh(new THREE.BoxGeometry(0.02, e.h - 0.3, 0.02), new THREE.MeshStandardMaterial({ color: 0x1e1610 })); dl.position.set(0, (e.h - 0.3) / 2 + 0.1, e.d / 2 + 0.01); g.add(dl);
    return g; }
