// Outdoor object kind 'gaga' (used by EXTRAS entries with type: 'gaga').
import * as THREE from 'three';

export function gaga(e, g) {   // octagonal gaga pit: low wooden walls round a dirt floor
    const R = e.r || 3.5, h = e.h || 0.8, M = c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.95, side: THREE.DoubleSide });
    const fl = new THREE.Mesh(new THREE.CylinderGeometry(R - 0.02, R - 0.02, 1.2, 8), M(0xc4ad83)); fl.rotation.y = Math.PI / 8; fl.position.y = -0.12; g.add(fl);   // Henry: sand like the volleyball court, a touch darker
    const wall = new THREE.Mesh(new THREE.CylinderGeometry(R, R, h, 8, 1, true), M(0x7a5c3e)); wall.rotation.y = Math.PI / 8; wall.position.y = h / 2; g.add(wall);
    const cap = new THREE.Mesh(new THREE.TorusGeometry(R, 0.06, 4, 8), M(0x5e4630)); cap.rotation.x = Math.PI / 2; cap.rotation.z = Math.PI / 8; cap.position.y = h; g.add(cap);
  }
