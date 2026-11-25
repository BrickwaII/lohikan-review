// Indoor basketball court: floor, court lines, hoops, hanging flags, dasher boards.
// Part of the Sports Center + Circus zone; called in order by ./index.js. Read ./NOTES.md before changing.
import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';

export function buildIndoorCourt(k) {
  const { mat, T, inn, x0, x1, H, GZ, fl, TB } = k;
    // ---- open hall: basketball court (west) + canteen (east, south wall) ----
    fl(x0 + 0.2, x1 - 0.2, GZ, H - 0.2, mat({ color: 0x6c7076, roughness: 0.9 }));   /* blue-grey (2010 rink photo, 2020 IG) */          // grey concrete (Henry: always grey with white lines — indoor basketball court / hockey rink)
    const courtTex = T(1024, 560, (g, w, h) => { g.clearRect(0, 0, w, h);
      g.strokeStyle = '#ffffff'; g.lineWidth = 6; g.strokeRect(16, 16, w - 32, h - 32); g.beginPath(); g.moveTo(w / 2, 16); g.lineTo(w / 2, h - 16); g.stroke(); g.beginPath(); g.arc(w / 2, h / 2, 64, 0, 7); g.stroke();
      for (const sx of [16, w - 16]) { const d = sx < w / 2 ? 1 : -1; g.strokeRect(Math.min(sx, sx + d * 200), h / 2 - 64, 200, 128); g.beginPath(); g.arc(sx + d * 200, h / 2, 64, 0, 7); g.stroke();
        g.beginPath(); g.arc(sx, h / 2, 240, d > 0 ? -1.35 : Math.PI - 1.35, d > 0 ? 1.35 : Math.PI + 1.35); g.stroke(); }
      g.strokeStyle = '#ffffff'; g.lineWidth = 4; g.beginPath(); g.arc(w / 2, h / 2, 140, 0, 7); g.stroke(); });   // hockey circle, also white
    const courtL = 28, courtW = 15.2, ccx = -21, ccz = 2.0;
    { const c = new THREE.Mesh(new THREE.PlaneGeometry(courtL, courtW), new THREE.MeshStandardMaterial({ map: courtTex, transparent: true, roughness: 0.6 })); c.rotation.x = -Math.PI / 2; c.position.set(ccx, 0.03, ccz); inn.add(c); }
    for (const d of [-1, 1]) {
      const hx = ccx + d * (courtL / 2 - 0.2);
      /* Henry + IG 3754170343943659788: the hoops hang from the rafters on a steel frame (no floor poles) */
      { const st = mat({ color: 0x6a6a6a }), yTop = TB - 0.1, yB = 3.85;
        for (const dz of [-0.6, 0.6]) { const v = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, yTop - yB, 6), st); v.position.set(hx + d * 0.1, (yTop + yB) / 2, ccz + dz); inn.add(v);
          const len = Math.hypot(1.6, yTop - yB), br = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, len, 6), st); br.position.set(hx + d * 0.9, (yTop + yB) / 2, ccz + dz); br.rotation.z = d * Math.atan2(1.6, yTop - yB); inn.add(br); }
        const top = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 1.4), st); top.position.set(hx + d * 0.1, yB, ccz); inn.add(top); }
      const bb = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.05, 1.8), mat({ color: 0xffffff })); bb.position.set(hx, 3.35, ccz); inn.add(bb);
      const sq = new THREE.Mesh(new THREE.PlaneGeometry(0.59, 0.45), mat({ color: 0xd2302c })); sq.rotation.y = d > 0 ? -Math.PI / 2 : Math.PI / 2; sq.position.set(hx - d * 0.03, 3.2, ccz); inn.add(sq);
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.23, 0.02, 6, 24), mat({ color: 0xff5a1f })); rim.rotation.x = Math.PI / 2; rim.position.set(hx - d * 0.3, 3.05, ccz); inn.add(rim);
      // roller-hockey goal
      const goal = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.2, 1.8), mat({ color: 0xd8302c, wireframe: true })); goal.position.set(hx - d * 1.6, 0.6, ccz + 4.5); inn.add(goal);
    }
    // flags of many countries hanging from the rafters down the middle of the hall (wayback 2003 wint_14, 2010 400RollerHockey08, IG 3754170343943659788)
    { const tri = (c, horiz) => (g, w, h) => { for (let i = 0; i < 3; i++) { g.fillStyle = c[i]; if (horiz) g.fillRect(0, i * h / 3, w, h / 3 + 1); else g.fillRect(i * w / 3, 0, w / 3 + 1, h); } };
      const cross = (bg, fg, inner) => (g, w, h) => { g.fillStyle = bg; g.fillRect(0, 0, w, h); g.fillStyle = fg; g.fillRect(w * 0.3, 0, w * 0.16, h); g.fillRect(0, h * 0.42, w, h * 0.16); if (inner) { g.fillStyle = inner; g.fillRect(w * 0.34, 0, w * 0.08, h); g.fillRect(0, h * 0.46, w, h * 0.08); } };
      const F = [
        cross('#006aa7', '#fecc00'), cross('#ba0c2f', '#fff', '#00205b'), (g, w, h) => { g.fillStyle = '#fff'; g.fillRect(0, 0, w, h); g.fillStyle = '#bc002d'; g.beginPath(); g.arc(w / 2, h / 2, h * 0.3, 0, 7); g.fill(); },
        (g, w, h) => { g.fillStyle = '#d52b1e'; g.fillRect(0, 0, w, h); g.fillStyle = '#fff'; g.fillRect(w * 0.42, h * 0.2, w * 0.16, h * 0.6); g.fillRect(w * 0.3, h * 0.42, w * 0.4, h * 0.16); },
        (g, w, h) => { g.fillStyle = '#d52b1e'; g.fillRect(0, 0, w, h); g.fillStyle = '#fff'; g.fillRect(w * 0.25, 0, w * 0.5, h); g.fillStyle = '#d52b1e'; g.beginPath(); g.moveTo(w / 2, h * 0.2); g.lineTo(w * 0.6, h * 0.6); g.lineTo(w * 0.4, h * 0.6); g.fill(); g.fillRect(w * 0.48, h * 0.55, w * 0.04, h * 0.25); },
        (g, w, h) => { g.fillStyle = '#fff'; g.fillRect(0, 0, w, h); g.fillStyle = '#ce1124'; g.fillRect(w * 0.43, 0, w * 0.14, h); g.fillRect(0, h * 0.4, w, h * 0.2); },
        (g, w, h) => { g.fillStyle = '#009c3b'; g.fillRect(0, 0, w, h); g.fillStyle = '#ffdf00'; g.beginPath(); g.moveTo(w * 0.08, h / 2); g.lineTo(w / 2, h * 0.1); g.lineTo(w * 0.92, h / 2); g.lineTo(w / 2, h * 0.9); g.fill(); g.fillStyle = '#002776'; g.beginPath(); g.arc(w / 2, h / 2, h * 0.22, 0, 7); g.fill(); },
        (g, w, h) => { g.fillStyle = '#012169'; g.fillRect(0, 0, w, h); g.strokeStyle = '#fff'; g.lineWidth = h * 0.18; g.beginPath(); g.moveTo(0, 0); g.lineTo(w, h); g.moveTo(w, 0); g.lineTo(0, h); g.stroke(); g.strokeStyle = '#c8102e'; g.lineWidth = h * 0.07; g.stroke(); g.fillStyle = '#fff'; g.fillRect(w * 0.42, 0, w * 0.16, h); g.fillRect(0, h * 0.36, w, h * 0.28); g.fillStyle = '#c8102e'; g.fillRect(w * 0.45, 0, w * 0.1, h); g.fillRect(0, h * 0.41, w, h * 0.18); },
        tri(['#009246', '#fff', '#ce2b37']), tri(['#000', '#dd0000', '#ffce00'], true), tri(['#002395', '#fff', '#ed2939']), tri(['#c60b1e', '#ffc400', '#c60b1e'], true),
        (g, w, h) => { for (let i = 0; i < 9; i++) { g.fillStyle = i % 2 ? '#fff' : '#0d5eaf'; g.fillRect(0, i * h / 9, w, h / 9 + 1); } g.fillStyle = '#0d5eaf'; g.fillRect(0, 0, w * 0.4, h * 5 / 9); g.fillStyle = '#fff'; g.fillRect(w * 0.16, 0, w * 0.08, h * 5 / 9); g.fillRect(0, h * 2 / 9, w * 0.4, h / 9); },
        tri(['#169b62', '#fff', '#ff883e']), tri(['#006847', '#fff', '#ce1126']), tri(['#ae1c28', '#fff', '#21468b'], true), (g, w, h) => { g.fillStyle = '#fff'; g.fillRect(0, 0, w, h / 2); g.fillStyle = '#dc143c'; g.fillRect(0, h / 2, w, h / 2); },
        (g, w, h) => { for (let i = 0; i < 13; i++) { g.fillStyle = i % 2 ? '#fff' : '#b22234'; g.fillRect(0, i * h / 13, w, h / 13 + 1); } g.fillStyle = '#3c3b6e'; g.fillRect(0, 0, w * 0.4, h * 7 / 13); },
        tri(['#000', '#ffce00', '#ff0000']), tri(['#fff', '#0039a6', '#d52b1e'], true), tri(['#74acdf', '#fff', '#74acdf'], true)];
      let k = 0; for (let fx = x0 + 3; fx < x1 - 2; fx += 1.9, k++) { const fz = k % 2 ? 0.9 : -0.9;
        const ft = T(120, 80, F[(k * 7) % F.length]); const f = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.0), mat({ map: ft, side: THREE.DoubleSide, emissive: 0x333333, emissiveIntensity: 0.4 }));
        f.position.set(fx, TB - 0.75, fz); f.rotation.y = Math.PI / 2 + (k % 2 ? 1 : -1) * 0.12; inn.add(f);
        const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.6, 4), mat({ color: 0x3a2a1a })); rod.rotation.x = Math.PI / 2; rod.position.set(fx, TB - 0.2, fz); inn.add(rod); } }
    // low brown rink boards (dasher boards) along the hall walls below the murals (2003/2010 rink photos, IG 2358606171873347822)
    { const dash = mat({ color: 0x5a3a24, roughness: 0.8 }); const db = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.15, 11.6 - GZ), dash); db.position.set(x0 + 0.24, 0.58, (11.6 + GZ) / 2); inn.add(db); }
  return { courtTex, courtL, courtW, ccx, ccz };
}
