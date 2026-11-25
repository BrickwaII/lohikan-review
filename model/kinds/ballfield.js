// Outdoor object kind 'ballfield' (used by EXTRAS entries with type: 'ballfield').
import * as THREE from 'three';

export function ballfield(e, g) {   // diamond with home plate at the origin, field toward local +x: dirt fan, chalk foul lines, bases, mound, backstop fence
    const P0 = new THREE.Group(); P0.position.y = e.lift || 0; g.add(P0); const R = e.r || 40, B = e.base || 20, M = c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.95, side: THREE.DoubleSide });
    const fan = new THREE.Mesh(new THREE.CircleGeometry(R, 48, -Math.PI / 4, Math.PI / 2), M(0xc9ad80)); fan.rotation.x = -Math.PI / 2; fan.position.y = 0.04; P0.add(fan);
    const home = new THREE.Mesh(new THREE.CircleGeometry(4, 24), M(0xc9ad80)); home.rotation.x = -Math.PI / 2; home.position.y = 0.04; P0.add(home);
    const chalk = M(0xf4f4f0); for (const sg of [-1, 1]) { const ln = new THREE.Mesh(new THREE.PlaneGeometry(R * 1.6, 0.12), chalk); ln.rotation.x = -Math.PI / 2; ln.rotation.z = sg * Math.PI / 4; ln.position.set(Math.cos(sg * Math.PI / 4) * R * 0.8, 0.06, -Math.sin(sg * Math.PI / 4) * R * 0.8); P0.add(ln); }
    const d = B / Math.SQRT2; for (const [bx, bz] of [[d, -d], [2 * d, 0], [d, d]]) { const bs = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.08, 0.4), chalk); bs.position.set(bx, 0.08, bz); P0.add(bs); }
    const plate = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.04, 0.45), chalk); plate.position.set(0, 0.06, 0); P0.add(plate);
    const mound = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.8, 0.2, 24), M(0xb89a6c)); mound.position.set(d, 0.1, 0); P0.add(mound);
    const fence = new THREE.MeshStandardMaterial({ color: 0x5a6266, metalness: 0.4, roughness: 0.6, transparent: true, opacity: 0.35, side: THREE.DoubleSide, depthWrite: false });
    const bk = new THREE.Mesh(new THREE.CylinderGeometry(9, 9, 4, 24, 1, true, Math.PI / 2 + 0.5, Math.PI - 1.0), fence); bk.position.set(2, 2, 0); P0.add(bk);
  }
