// Outdoor object kind 'entrance' (used by EXTRAS entries with type: 'entrance').
import * as THREE from 'three';

export function entrance(e, g) {   // camp entrance: big CAMP LOHIKAN sign on two posts beside the road, a small guard booth and a red/white gate arm across the road (local x along the road)
    const M = c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.9 }), wd = M(0x5a4634), RW = e.roadW || 6;
    const cv = document.createElement('canvas'); cv.width = 512; cv.height = 160; const c2 = cv.getContext('2d'); c2.fillStyle = '#2f4a2c'; c2.fillRect(0, 0, 512, 160); c2.strokeStyle = '#e8d9a8'; c2.lineWidth = 8; c2.strokeRect(8, 8, 496, 144);
    c2.fillStyle = '#f2e6c0'; c2.font = 'bold 64px serif'; c2.textAlign = 'center'; c2.fillText('CAMP LOHIKAN', 256, 92); c2.font = '28px serif'; c2.fillText('Lake Como, PA', 256, 134);
    const tx = new THREE.CanvasTexture(cv); tx.colorSpace = THREE.SRGBColorSpace; const sm = new THREE.MeshStandardMaterial({ map: tx });
    const sg = new THREE.Group(); sg.position.set(-3, 0, RW / 2 + 2.5); g.add(sg);
    for (const sx of [-1.9, 1.9]) { const p = new THREE.Mesh(new THREE.BoxGeometry(0.25, 2.6, 0.25), wd); p.position.set(sx, 1.3, 0); sg.add(p); }
    const bd = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.15, 0.12), [wd, wd, wd, wd, sm, sm]); bd.position.set(0, 1.9, 0); bd.rotation.y = Math.PI / 2 * 0; sg.add(bd); sg.rotation.y = Math.PI / 2 - 0.5;
    const bth = new THREE.Group(); bth.position.set(4, 0, -(RW / 2 + 1.8)); g.add(bth);
    const body = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.4, 2.0), M(0xf1eee6)); body.position.y = 1.2; bth.add(body);
    const roof = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.18, 2.4), M(0x3b3b3b)); roof.position.y = 2.5; bth.add(roof);
    for (const [x, z] of [[0, 1.01], [1.11, 0]]) { const w = new THREE.Mesh(new THREE.BoxGeometry(x ? 0.04 : 1.4, 0.8, x ? 1.2 : 0.04), new THREE.MeshStandardMaterial({ color: 0xbfd8e6, transparent: true, opacity: 0.4 })); w.position.set(x, 1.55, z); bth.add(w); }
    const arm = new THREE.Group(); arm.position.set(4.8, 1.0, -(RW / 2 + 0.4)); g.add(arm);
    const pst = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.0, 0.3), M(0x444444)); pst.position.y = -0.5; arm.add(pst);
    for (let k = 0; k < 6; k++) { const seg = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.1, (RW + 0.4) / 6), M(k % 2 ? 0xffffff : 0xd8262b)); seg.position.set(0, 0, (k + 0.5) * (RW + 0.4) / 6); arm.add(seg); }
    return g; }
