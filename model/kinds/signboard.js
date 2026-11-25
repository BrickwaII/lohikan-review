// Outdoor object kind 'signboard' (used by EXTRAS entries with type: 'signboard').
import * as THREE from 'three';

export function signboard(e, g) {   // flat sign board facing local +z, lettered both sides
    const cv = document.createElement('canvas'); cv.width = 512; cv.height = 72; const c2 = cv.getContext('2d'); c2.fillStyle = '#3a2a1e'; c2.fillRect(0, 0, 512, 72); c2.fillStyle = '#f2efe6'; c2.font = 'bold 44px Georgia, serif'; c2.textAlign = 'center'; c2.fillText(e.text || '', 256, 52);
    const tx = new THREE.CanvasTexture(cv); tx.colorSpace = THREE.SRGBColorSpace;
    const bd = new THREE.Mesh(new THREE.BoxGeometry(e.w || 4, e.h || 0.6, 0.08), new THREE.MeshStandardMaterial({ map: tx, emissive: 0x222222, emissiveIntensity: 0.3 })); bd.position.y = e.y || 3; g.add(bd);
  }
