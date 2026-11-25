// Outdoor object kind 'lamellaroof' (used by EXTRAS entries with type: 'lamellaroof').
import * as THREE from 'three';

export function lamellaroof(e, g) {   // open pavilion with a low roof and a shallow curved wooden lamella underside (local x along len, z across dep; posts on the open sides)
    const L = e.len, D = e.dep, H = e.h || 3.5, RISE = e.rise || 0.8, M = c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.9, side: THREE.DoubleSide }), post = M(0x6a4c32);
    const fl = new THREE.Mesh(new THREE.BoxGeometry(L, 0.5, D), M(e.mesh ? 0x9a948a : 0x8f8b84)); fl.position.y = -0.2; g.add(fl);
    const roof = new THREE.Mesh(new THREE.BoxGeometry(L + 0.6, 0.2, D + 0.6), M(0x6f7173)); roof.position.y = H + 0.1; if (!e.mesh) g.add(roof);
    if (e.mesh) { const bm = M(0x7a5a3a); for (let z = -D / 2 + 0.3; z <= D / 2; z += 1.4) { const b = new THREE.Mesh(new THREE.BoxGeometry(L, 0.14, 0.08), bm); b.position.set(0, H - 0.12, Math.min(z, D / 2 - 0.2)); g.add(b); }
      for (let x = -L / 2 + 0.2; x <= L / 2; x += 4) for (const dz of [-1, 1]) { const br = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 1.6), bm); br.position.set(Math.min(x, L / 2 - 0.2), H - 0.7, D / 2 - 0.2 - 0.55); br.rotation.x = 0.7; g.add(br); } }
    const open = e.open || ['+z'];
    if (e.backWall) { const bw = new THREE.Mesh(new THREE.PlaneGeometry(L, H), new THREE.MeshStandardMaterial({ color: e.backWall, roughness: 0.9, emissive: e.backWall, emissiveIntensity: 0.2 })); bw.position.set(0, H / 2, -D / 2 + 0.08); g.add(bw); }   /* 360: pale green painted wall inside the pavilion */
    if (open.includes('+z')) for (let x = -L / 2 + 0.2; x <= L / 2; x += 4) { const p = new THREE.Mesh(new THREE.BoxGeometry(0.22, H, 0.22), post); p.position.set(Math.min(x, L / 2 - 0.2), H / 2, D / 2 - 0.2); g.add(p); }
    for (const sx of [-1, 1]) if (open.includes(sx < 0 ? '-x' : '+x')) for (let z = -D / 2 + 2; z < D / 2; z += 3) { const p = new THREE.Mesh(new THREE.BoxGeometry(0.22, H, 0.22), post); p.position.set(sx * (L / 2 - 0.2), H / 2, z); g.add(p); }
    const R = (D * D / 4 + RISE * RISE) / (2 * RISE), HALF = Math.asin(D / 2 / R);
    const cv = document.createElement('canvas'); cv.width = 512; cv.height = 512; const c2 = cv.getContext('2d'); c2.fillStyle = '#5a3a20'; c2.fillRect(0, 0, 512, 512);
    for (const dir of [1, -1]) for (let i = -8; i <= 16; i++) { c2.strokeStyle = '#a8743e'; c2.lineWidth = 10; c2.beginPath(); c2.moveTo(i * 64, 0); c2.lineTo(i * 64 + dir * 512, 512); c2.stroke(); }
    const tx = new THREE.CanvasTexture(cv); tx.colorSpace = THREE.SRGBColorSpace; tx.wrapS = tx.wrapT = THREE.RepeatWrapping; tx.repeat.set(L / 5, 2);
    if (e.flat) { const cl = new THREE.Mesh(new THREE.PlaneGeometry(L, D), e.mesh ? new THREE.MeshStandardMaterial({ color: 0x1e2224, transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false }) : new THREE.MeshStandardMaterial({ color: 0x8a6a48, roughness: 0.9, side: THREE.DoubleSide, emissive: 0x3a2412, emissiveIntensity: 0.4 }));   /* Henry + 12 Art Center 360: the covered strip is dark shade mesh over a timber pergola */ cl.rotation.x = Math.PI / 2; cl.position.y = H - 0.05; g.add(cl);
      for (let x = -L / 2 + 2; x < L / 2; x += 4) { const jb = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.25, D), new THREE.MeshStandardMaterial({ color: 0x6e4a2a })); jb.position.set(x, H - 0.2, 0); g.add(jb); } }
    const vg = new THREE.CylinderGeometry(R, R, L, 32, 1, true, -HALF, 2 * HALF); vg.rotateZ(Math.PI / 2);
    const vault = new THREE.Mesh(vg, new THREE.MeshStandardMaterial({ map: tx, side: THREE.DoubleSide, roughness: 0.85, emissive: 0x3a2412, emissiveIntensity: 0.45 })); vault.rotateX(-Math.PI / 2); vault.position.y = H - 0.05 - R; if (!e.flat) g.add(vault);
    /* 12 Art Center 360: painted color war banners cover about half the lamella vault (flat against it, one or two across the width); the rest is bare wood */
    const cols = ['#3fb36b', '#f2c12e', '#e8578f', '#4d8fd6', '#f07c2a', '#9b59b6', '#f4f1e6', '#d23b2f'], words = ['BLAST FROM THE PAST', 'HONK HONK INC', 'OLYMPICS', 'SUMMERFEST', 'WIZARDS', 'PIRATES', 'AZTECS', 'KNIGHTS', 'MARTIANS', 'SPARTANS', 'NINJAS', 'PATRIOTS'];
    const NB = e.murals || 0, cover = Math.min(L * 0.55, NB * 2.6), segL = cover / Math.max(1, NB);
    for (let k = 0; k < NB; k++) for (let h2 = 0; h2 < 2; h2++) { const mc = document.createElement('canvas'); mc.width = 256; mc.height = 160; const m2 = mc.getContext('2d'); const kk = k * 2 + h2, bg = cols[(kk * 3) % cols.length];
      m2.fillStyle = bg; m2.fillRect(0, 0, 256, 160); m2.strokeStyle = '#ffffff'; m2.lineWidth = 5; m2.strokeRect(3, 3, 250, 154);
      for (let q = 0; q < 9; q++) { m2.fillStyle = cols[(kk + q * 3 + 1) % cols.length]; if (q % 3) { m2.beginPath(); m2.arc(20 + (q * 53 + kk * 31) % 216, 50 + (q * 37 + kk * 17) % 90, 8 + (q * 7) % 18, 0, 7); m2.fill(); } else m2.fillRect(20 + (q * 41 + kk * 23) % 200, 60 + (q * 29) % 70, 34, 16); }
      m2.fillStyle = (bg === '#f4f1e6' || bg === '#f2c12e') ? '#111' : '#fff'; m2.font = 'bold 26px sans-serif'; m2.textAlign = 'center'; m2.fillText(words[kk % words.length], 128, 36); m2.font = 'bold 20px sans-serif'; m2.fillText(String(2001 + (kk * 5) % 21), 128, 148);
      const mt = new THREE.CanvasTexture(mc); mt.colorSpace = THREE.SRGBColorSpace; mt.wrapS = THREE.RepeatWrapping; mt.repeat.x = -1; mt.offset.x = 1;   /* seen from below: mirror so the lettering reads */
      const a0 = h2 ? 0 : -HALF, sg = new THREE.CylinderGeometry(R - 0.03, R - 0.03, segL - 0.15, 12, 1, true, a0 + 0.01, HALF - 0.02); sg.rotateZ(Math.PI / 2);
      const bn = new THREE.Mesh(sg, new THREE.MeshStandardMaterial({ map: mt, side: THREE.DoubleSide, emissive: 0xffffff, emissiveMap: mt, emissiveIntensity: 0.3 })); bn.rotateX(-Math.PI / 2); bn.position.set(-L / 2 + 0.5 + (k + 0.5) * segL, H - 0.05 - R, 0); g.add(bn); }
  }
