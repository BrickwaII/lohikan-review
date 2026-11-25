// Outdoor object kind 'tenniscourts' (used by EXTRAS entries with type: 'tenniscourts').
import * as THREE from 'three';

export function tenniscourts(e, g) {   // tennis complex: green surround, blue courts with white lines and nets, outer chain-link fence + a divider, corner light poles
    const W = e.w, D = e.d, M = c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.85 });
    const base = new THREE.Mesh(new THREE.BoxGeometry(W, 1.0, D), M(0x2f4a33)); base.position.y = -0.05; g.add(base);   // top at +0.45: the north row sits ~0.15 m higher (Henry: back courts looked cut off)
    const cv = document.createElement('canvas'); cv.width = 512; cv.height = 240; const c2 = cv.getContext('2d'); c2.fillStyle = '#22406e'; c2.fillRect(0, 0, 512, 240); c2.strokeStyle = '#f4f4f0'; c2.lineWidth = 4;
    const px = 512 / 26, X0 = (26 - 23.77) / 2 * px, Y0 = (12 - 10.97) / 2 * 240 / 12, sx = 23.77 * px, sy = 10.97 * 240 / 12, sing = 1.37 * 240 / 12, svc = 6.4 * px;
    c2.strokeRect(X0, Y0, sx, sy); c2.beginPath(); c2.moveTo(X0, Y0 + sing); c2.lineTo(X0 + sx, Y0 + sing); c2.moveTo(X0, Y0 + sy - sing); c2.lineTo(X0 + sx, Y0 + sy - sing);
    c2.moveTo(256 - svc, Y0 + sing); c2.lineTo(256 - svc, Y0 + sy - sing); c2.moveTo(256 + svc, Y0 + sing); c2.lineTo(256 + svc, Y0 + sy - sing); c2.moveTo(256 - svc, 120); c2.lineTo(256 + svc, 120); c2.stroke();
    const tx = new THREE.CanvasTexture(cv); tx.colorSpace = THREE.SRGBColorSpace; const cm = new THREE.MeshStandardMaterial({ map: tx, roughness: 0.8 });
    const netM = new THREE.MeshStandardMaterial({ color: 0x111111, transparent: true, opacity: 0.7, side: THREE.DoubleSide });
    for (const [x, z, rot] of e.courts || []) { const cg = new THREE.Group(); cg.position.set(x, 0.46, z); cg.rotation.y = THREE.MathUtils.degToRad(rot);
      const c = new THREE.Mesh(new THREE.PlaneGeometry(26, 12), cm); c.rotation.x = -Math.PI / 2; cg.add(c);
      const net = new THREE.Mesh(new THREE.PlaneGeometry(12.8, 0.95), netM); net.rotation.y = Math.PI / 2; net.position.y = 0.48; cg.add(net);
      for (const sz of [-1, 1]) { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.07, 6), M(0x222222)); p.position.set(0, 0.53, sz * 6.4); cg.add(p); }
      g.add(cg); }
    const fence = new THREE.MeshStandardMaterial({ color: 0x5a6266, metalness: 0.4, roughness: 0.6, transparent: true, opacity: 0.35, side: THREE.DoubleSide, depthWrite: false });
    const runs = [[0, -D / 2, W, 0], [0, D / 2, W, 0], [-W / 2, 0, D, Math.PI / 2], [W / 2, 0, D, Math.PI / 2]]; if (e.divider !== undefined) runs.push([0, e.divider, W, 0]);
    for (const [fx, fz, fw, rot] of runs) { const f = new THREE.Mesh(new THREE.PlaneGeometry(fw, 3.0), fence); f.position.set(fx, 1.6, fz); f.rotation.y = rot; g.add(f);
      const n = Math.round(fw / 3); for (let k = 0; k <= n; k++) { const t = -fw / 2 + fw * k / n, fp = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 3.1, 6), M(0x4a5054)); fp.position.set(rot ? fx : fx + t, 1.55, rot ? fz + t : fz); g.add(fp); } }
    for (const [lx, lz] of [[-W / 2, -D / 2], [W / 2, -D / 2], [-W / 2, D / 2], [W / 2, D / 2]]) { const lp = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.13, 9, 8), M(0x8c949a)); lp.position.set(lx, 4.5, lz); g.add(lp);
      const hd = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.35, 0.3), M(0xd8dadb)); hd.position.set(lx, 9.0, lz); g.add(hd); }
  }
