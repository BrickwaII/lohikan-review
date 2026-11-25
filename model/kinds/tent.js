// Outdoor object kind 'tent' (used by EXTRAS entries with type: 'tent').
import * as THREE from 'three';

export function tent(e, g) {   /* frame tent over a flagstone patio: local x along the length, z across */
    const P0 = new THREE.Group(); P0.position.y = e.lift || 0; g.add(P0); const L = e.len || 19, D = e.dep || 12, eh = 2.4, ph = 4.6;
    const cv = document.createElement('canvas'); cv.width = 256; cv.height = 64; const c2 = cv.getContext('2d');
    for (let k = 0; k < 4; k++) { c2.fillStyle = (e.stripes && k % 2) ? '#c8202a' : '#f6f4ef'; c2.fillRect(k * 64, 0, 64, 64); }
    const tt = new THREE.CanvasTexture(cv); tt.colorSpace = THREE.SRGBColorSpace; tt.wrapS = tt.wrapT = THREE.RepeatWrapping;
    const pv = document.createElement('canvas'); pv.width = pv.height = 128; const p2 = pv.getContext('2d'); p2.fillStyle = '#6d675e'; p2.fillRect(0, 0, 128, 128);
    for (let y = 0; y < 128; y += 22) for (let x = (y / 22) % 2 ? -14 : 0; x < 128; x += 30) { const v = 130 + ((x * 11 + y * 7) % 60); p2.fillStyle = `rgb(${v},${v - 6},${v - 16})`; p2.fillRect(x + 2, y + 2, 26 + ((x + y) % 7), 18); }
    const pt = new THREE.CanvasTexture(pv); pt.colorSpace = THREE.SRGBColorSpace; pt.wrapS = pt.wrapT = THREE.RepeatWrapping; pt.repeat.set((L + 1) / 3, (D + 1) / 3);
    const pat = new THREE.Mesh(new THREE.PlaneGeometry(L + 1, D + 1), new THREE.MeshStandardMaterial({ map: pt, roughness: 0.95 })); pat.rotation.x = -Math.PI / 2; pat.position.y = 0.05; P0.add(pat);
    const cloth = new THREE.MeshStandardMaterial({ map: tt, roughness: 0.8, side: THREE.DoubleSide, emissive: 0xffffff, emissiveMap: tt, emissiveIntensity: 0.35 });
    const geo = new THREE.BufferGeometry(), hx = L / 2, hz = D / 2, rx = hx - hz * 0.6;   /* hip roof: ridge along x */
    const v = [-hx, eh, -hz, hx, eh, -hz, rx, ph, 0, -rx, ph, 0,   hx, eh, hz, -hx, eh, hz, -rx, ph, 0, rx, ph, 0,   hx, eh, -hz, hx, eh, hz, rx, ph, 0,   -hx, eh, hz, -hx, eh, -hz, -rx, ph, 0];
    const uv = [0, 0, L / 4, 0, (rx + hx) / 4, 1, (hx - rx) / 4, 1,   0, 0, L / 4, 0, (hx - rx) / 4, 1, (rx + hx) / 4, 1,   0, 0, D / 4, 0, D / 8, 1,   0, 0, D / 4, 0, D / 8, 1];
    geo.setAttribute('position', new THREE.Float32BufferAttribute(v, 3)); geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); geo.setIndex([0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 11, 12, 13]); geo.computeVertexNormals();
    P0.add(new THREE.Mesh(geo, cloth));
    const val = new THREE.MeshStandardMaterial({ map: tt, roughness: 0.8, side: THREE.DoubleSide });
    for (const [sx, sz, len, ry] of [[0, -hz, L, 0], [0, hz, L, 0], [-hx, 0, D, Math.PI / 2], [hx, 0, D, Math.PI / 2]]) { const vl = new THREE.Mesh(new THREE.PlaneGeometry(len, 0.35), val); vl.position.set(sx, eh - 0.17, sz); vl.rotation.y = ry; P0.add(vl); }
    const pm = new THREE.MeshStandardMaterial({ color: 0xd8d8d8, metalness: 0.3, roughness: 0.5 });
    for (let x = -hx; x <= hx + 0.01; x += L / 6) for (const z of [-hz, hz]) { const po = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, eh, 6), pm); po.position.set(x, eh / 2, z); P0.add(po); }
    for (let z = -hz + D / 4; z < hz - 0.1; z += D / 4) for (const x of [-hx, hx]) { const po = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, eh, 6), pm); po.position.set(x, eh / 2, z); P0.add(po); }
  }
