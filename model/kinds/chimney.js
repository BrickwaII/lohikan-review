// Outdoor object kind 'chimney' (used by EXTRAS entries with type: 'chimney').
import * as THREE from 'three';

export function chimney(e, g) {   // fieldstone chimney (local x = depth, z = width)
    const cv = document.createElement('canvas'); cv.width = cv.height = 128; const c2 = cv.getContext('2d'); c2.fillStyle = '#6e665c'; c2.fillRect(0, 0, 128, 128);
    for (let y = 0; y < 128; y += 16) for (let x = (y / 16) % 2 ? -12 : 0; x < 128; x += 26) { const v = 120 + ((x * 7 + y * 13) % 50); c2.fillStyle = `rgb(${v},${v - 8},${v - 18})`; c2.fillRect(x + 2, y + 2, 22, 12); }
    const tx = new THREE.CanvasTexture(cv); tx.colorSpace = THREE.SRGBColorSpace; tx.wrapS = tx.wrapT = THREE.RepeatWrapping; tx.repeat.set(1, (e.h || 9) / 1.5);
    const ch = new THREE.Mesh(new THREE.BoxGeometry(e.d || 0.9, e.h || 9, e.w || 1.3), new THREE.MeshStandardMaterial({ map: tx, roughness: 0.95 })); ch.position.y = (e.h || 9) / 2 - 0.5; g.add(ch);
    const cap = new THREE.Mesh(new THREE.BoxGeometry((e.d || 0.9) + 0.15, 0.15, (e.w || 1.3) + 0.15), new THREE.MeshStandardMaterial({ color: 0x4a4540 })); cap.position.y = (e.h || 9) - 0.42; g.add(cap);
  }
