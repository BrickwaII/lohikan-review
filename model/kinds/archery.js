// Outdoor object kind 'archery' (used by EXTRAS entries with type: 'archery').
import * as THREE from 'three';

export function archery(e, g) {   // archery range along local +x: shooting line at -len/2, target board at +len/2 facing the shooters
    const L = e.len || 20, M = c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.85, side: THREE.DoubleSide }), wd = M(0x6b5236);
    const board = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.7, 6.5), M(0xeeeeea)); board.position.set(L / 2, 1.05, 0); g.add(board);
    for (const sx of [-1, 1]) { const p = new THREE.Mesh(new THREE.BoxGeometry(0.15, 2.0, 0.15), wd); p.position.set(L / 2 + 0.2, 1.0, sx * 3.1); g.add(p); }
    for (let k = 0; k < 4; k++) { const cv = document.createElement('canvas'); cv.width = cv.height = 128; const c2 = cv.getContext('2d'); for (const [r, col] of [[64, '#f4f4f0'], [52, '#222'], [40, '#2b6cc4'], [28, '#d4302c'], [16, '#f2c12e']]) { c2.fillStyle = col; c2.beginPath(); c2.arc(64, 64, r, 0, 7); c2.fill(); }
      const tx = new THREE.CanvasTexture(cv); tx.colorSpace = THREE.SRGBColorSpace; const t = new THREE.Mesh(new THREE.CircleGeometry(0.5, 24), new THREE.MeshStandardMaterial({ map: tx, side: THREE.DoubleSide })); t.rotation.y = -Math.PI / 2; t.position.set(L / 2 - 0.17, 1.15, -2.4 + k * 1.6); g.add(t); }
    for (let k = 0; k < 6; k++) { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.9, 6), M(0x8a7a5a)); p.position.set(-L / 2, 0.45, -5 + k * 2); g.add(p); }
    const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 10, 4), M(0xe8e0c8)); rope.rotation.x = Math.PI / 2; rope.position.set(-L / 2, 0.85, 0); g.add(rope);
    for (const y of [0.5, 1.0]) { const r = new THREE.Mesh(new THREE.BoxGeometry(L, 0.09, 0.09), wd); r.position.set(0, y, 5.5); g.add(r); }
    for (let k = 0; k <= 8; k++) { const fp = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.15, 0.14), wd); fp.position.set(-L / 2 + k * L / 8, 0.57, 5.5); g.add(fp); }
    if (e.shed) { const [sx, sz] = e.shed; const sh = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.3, 2.4), M(0x5a3e2a)); sh.position.set(sx, 1.15, sz); g.add(sh);
      const rf = new THREE.Mesh(new THREE.ConeGeometry(2.1, 0.7, 4), M(0x3a3a3a)); rf.rotation.y = Math.PI / 4; rf.position.set(sx, 2.65, sz); g.add(rf);
      const dr = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.9), M(0xf2f0ea)); dr.position.set(sx + 1.21, 0.95, sz); dr.rotation.y = Math.PI / 2; g.add(dr); }

  }
