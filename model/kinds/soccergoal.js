// Outdoor object kind 'soccergoal' (used by EXTRAS entries with type: 'soccergoal').
import * as THREE from 'three';

export function soccergoal(e, g) {   // full-size goal (7.3 × 2.44 m) with a net box behind it, facing local +x
    const M = new THREE.MeshStandardMaterial({ color: e.small ? 0xe8682a : 0xf4f4f4, roughness: 0.5 }), W = e.small ? 1.83 : 7.32, H = e.small ? 1.83 : 2.44, D = e.small ? 1.6 : 2.0;   /* small: 6 x 6 ft lacrosse goal */
    for (const z of [-W / 2, W / 2]) { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, H, 8), M); p.position.set(0, H / 2, z); g.add(p);
      const b = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, Math.hypot(D, H), 6), M); b.position.set(-D / 2, H / 2, z); b.rotation.z = Math.atan2(D, H); g.add(b); }
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, W, 8), M); bar.rotation.x = Math.PI / 2; bar.position.set(0, H, 0); g.add(bar);
    const net = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.3, side: THREE.DoubleSide, depthWrite: false });
    const back = new THREE.Mesh(new THREE.PlaneGeometry(W, H * 0.6), net); back.rotation.y = Math.PI / 2; back.position.set(-D, H * 0.3, 0); g.add(back);
    const top = new THREE.Mesh(new THREE.PlaneGeometry(D, W), net); top.rotation.x = -Math.PI / 2; top.rotation.z = 0; top.position.set(-D / 2, H, 0); top.scale.set(1, 1, 1); g.add(top);
  }
