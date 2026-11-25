// Outdoor object kind 'tetherball' (used by EXTRAS entries with type: 'tetherball').
import * as THREE from 'three';

export function tetherball(e, g) {   // pole, rope and ball on a worn dirt circle
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(3.0, 3.0, 0.06, 40), new THREE.MeshStandardMaterial({ color: 0x9a7b55, roughness: 1 })); pad.position.y = 0.03; g.add(pad);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 3.0, 10), new THREE.MeshStandardMaterial({ color: 0xc9c9c9, metalness: 0.6, roughness: 0.4 })); pole.position.y = 1.5; g.add(pole);
    const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 1.9, 4), new THREE.MeshStandardMaterial({ color: 0xeeeeee })); rope.position.set(0.25, 2.05, 0); rope.rotation.z = 0.27; g.add(rope);
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.11, 14, 10), new THREE.MeshStandardMaterial({ color: 0xe8d23a, roughness: 0.6 })); ball.position.set(0.5, 1.12, 0); g.add(ball);
  }
