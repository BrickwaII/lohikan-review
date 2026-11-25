// Outdoor object kind 'bungee' (used by EXTRAS entries with type: 'bungee').
import * as THREE from 'three';

export function bungee(e, g) {   // bungee trampoline (Ghost photo p00301): one tall centre mast, diagonal arms in an X out to ground anchors, trampolines around it
    const H = e.h || 8, R = e.r || 4.2, M = c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.6, metalness: 0.35 });
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.14, H, 10), M(0xbfc4c8)); mast.position.y = H / 2; g.add(mast);
    for (let k = 0; k < 4; k++) { const a = Math.PI / 4 + k * Math.PI / 2, ax = Math.cos(a), az = Math.sin(a);
      const L = Math.hypot(R * 1.6, H * 0.85); const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, L, 8), M(0xbfc4c8));
      arm.position.set(ax * R * 0.8, H * 0.85 / 2, az * R * 0.8); arm.lookAt(ax * R * 1.6, 0, az * R * 1.6); arm.rotateX(Math.PI / 2);
      arm.position.set(ax * R * 0.8, H * 0.85 / 2, az * R * 0.8); arm.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(-ax * R * 1.6, H * 0.85, -az * R * 1.6).normalize()); g.add(arm);
      const tx = Math.cos(a) * R * 0.75, tz = Math.sin(a) * R * 0.75;
      const mat = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 0.06, 24), M(0x1d1d1d)); mat.position.set(tx, 0.7, tz); g.add(mat);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.08, 6, 24), M(0x2d6cb5)); ring.rotation.x = Math.PI / 2; ring.position.set(tx, 0.72, tz); g.add(ring);
      /* 29 Bungee 360: a curved bow arm rises from near the mast foot out over each trampoline, with a vertical pole at the trampoline's outer edge; bungee cords hang from the bow tip (no vertical cables) */
      const tipX = Math.cos(a) * R * 0.85, tipZ = Math.sin(a) * R * 0.85, tipY = H * 0.95;
      const bow = new THREE.QuadraticBezierCurve3(new THREE.Vector3(-Math.cos(a) * 0.9, 0, -Math.sin(a) * 0.9), new THREE.Vector3(Math.cos(a) * R * 0.1, tipY * 1.05, Math.sin(a) * R * 0.1), new THREE.Vector3(tipX, tipY, tipZ));
      g.add(new THREE.Mesh(new THREE.TubeGeometry(bow, 24, 0.07, 8, false), M(0xbfc4c8)));
      const op = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, H * 0.8, 8), M(0xbfc4c8)); op.position.set(Math.cos(a) * R * 1.35, H * 0.4, Math.sin(a) * R * 1.35); g.add(op);
      for (const sg of [-1, 1]) { const from = new THREE.Vector3(tipX, tipY, tipZ), to = new THREE.Vector3(tx - Math.sin(a) * sg * 0.25, 2.4, tz + Math.cos(a) * sg * 0.25);
        const len = from.distanceTo(to), cord = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, len, 4), M(0xd9c23a)); cord.position.copy(from).add(to).multiplyScalar(0.5); cord.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), to.clone().sub(from).normalize()); g.add(cord); } }
  }
