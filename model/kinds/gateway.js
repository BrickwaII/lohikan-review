// Outdoor object kind 'gateway' (used by EXTRAS entries with type: 'gateway').
import * as THREE from 'three';

export function gateway(e, g) {   // timber gateway: two posts, crossbeam, hanging name board, split-rail fence either side (local x along the fence)
    const M = c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.95 }), wd = M(0x5a4634), span = 3.2, ph = 3.4;
    for (const sx of [-1, 1]) { const p = new THREE.Mesh(new THREE.BoxGeometry(0.22, ph, 0.22), wd); p.position.set(sx * span / 2, ph / 2, 0); g.add(p); }
    const beam = new THREE.Mesh(new THREE.BoxGeometry(span + 1.0, 0.2, 0.2), wd); beam.position.set(0, ph - 0.1, 0); g.add(beam);
    const cv = document.createElement('canvas'); cv.width = 256; cv.height = 64; const c2 = cv.getContext('2d'); c2.fillStyle = '#3b2f26'; c2.fillRect(0, 0, 256, 64); c2.fillStyle = '#e8e2d2'; c2.font = 'bold 34px Georgia, serif'; c2.textAlign = 'center'; c2.fillText(e.text || '', 128, 44);
    const tx = new THREE.CanvasTexture(cv); tx.colorSpace = THREE.SRGBColorSpace;
    const board = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.48, 0.06), [wd, wd, wd, wd, new THREE.MeshStandardMaterial({ map: tx }), new THREE.MeshStandardMaterial({ map: tx })]); board.position.set(0, ph - 0.62, 0); g.add(board);
    for (const sx of [-1, 1]) { const run = (e.fence || [8, 8])[sx < 0 ? 0 : 1], x0 = sx * span / 2;
      for (let d = 0; d <= run + 0.01; d += 2.4) { const fp = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.15, 0.14), wd); fp.position.set(x0 + sx * d, 0.57, 0); g.add(fp); }
      for (const y of [0.45, 0.95]) { const r = new THREE.Mesh(new THREE.BoxGeometry(run, 0.09, 0.09), wd); r.position.set(x0 + sx * run / 2, y, 0); g.add(r); } }
  }
