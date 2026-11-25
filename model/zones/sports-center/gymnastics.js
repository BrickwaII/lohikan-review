// Gymnastics room (walled off, north side): partition + murals, end walls, doors, windows, tumble track, mats, beams, bars.
// Part of the Sports Center + Circus zone; called in order by ./index.js. Read ./NOTES.md before changing.
import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';

export function buildGymnastics(k) {
  const { mat, T, tex, holedWall, glassMat, quad, inn, H, ceilY, GZ, gx0, gx1, fl } = k;
    // ---- gymnastics room (walled off): partition to the ceiling, white ceiling, blue mats, rod floor, beams, bars ----
    { const ph = ceilY(GZ) - 0.05;
      const partTex = T(256, 256, (g, w, h) => { g.fillStyle = '#efe6c4'; g.fillRect(0, 0, w, h); g.fillStyle = '#e9b73a'; g.fillRect(0, 0, w, h * 0.35); for (let x = 0; x < w; x += 32) { g.fillStyle = 'rgba(120,90,40,.35)'; g.fillRect(x, 0, 3, h); } });
      /* Instagram 3855568119322750579 / 1248737213601453088 / 3728789413217285297: the hall side of the wall is covered with years of painted plywood cabin murals ('WANTED', years, logos), three rows high */
      { const mw = gx1 - gx0, rows = 4, ph2 = 1.55, cols = Math.round(mw / 2.45);   /* Henry: color war banners ~5 ft tall x 8 ft wide */
        const muralWall = T(2048, 384, (g, w, h) => { const pal = ['#d23b2f', '#f2c12e', '#2f6fd6', '#2e9e57', '#e8742a', '#8b3fbf', '#f4f1e6', '#1d1d1d', '#7fc6e8', '#c8a04a'];
          const cw = w / cols, rh = h / rows; let sd = 11; const rr = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
          const words = ['MADRID \'01', 'PARIS 2002', 'SYDNEY', 'OLYMPICS \'07', 'PATRIOTS', 'AZTECS', 'WIZARDS', 'MARTIANS', 'SUMMERFEST', 'KNIGHTS \'07', 'MONSOON', 'NEW ORLEANS', 'BARBARIANS', 'ROME', 'WANTED', 'SPARTANS', 'PIRATES', 'NINJAS'];
          for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const x = c * cw, y = r * rh; g.fillStyle = pal[(rr() * pal.length) | 0]; g.fillRect(x + 1, y + 1, cw - 2, rh - 2);
            g.fillStyle = pal[(rr() * pal.length) | 0]; if (rr() < 0.5) { g.beginPath(); g.arc(x + cw / 2, y + rh * 0.55, rh * 0.25, 0, 7); g.fill(); } else g.fillRect(x + cw * 0.15, y + rh * 0.35, cw * 0.7, rh * 0.4);
            if (rr() < 0.6) { g.fillStyle = rr() < 0.5 ? '#111' : '#fff'; g.font = `bold ${Math.round(rh * 0.16)}px sans-serif`; g.textAlign = 'center'; g.fillText(words[(rr() * words.length) | 0], x + cw / 2, y + rh * 0.24); } } });
        const mm = new THREE.Mesh(new THREE.PlaneGeometry(mw, rows * ph2), mat({ map: muralWall, emissive: 0x222222, emissiveIntensity: 0.3 })); mm.position.set((gx0 + gx1) / 2, 1.2 + rows * ph2 / 2, GZ + 0.09); inn.add(mm); }
      for (const side of [1, -1]) inn.add(quad([gx0, 0, GZ + side * 0.05], [gx1, 0, GZ + side * 0.05], [gx1, ph, GZ + side * 0.05], [gx0, ph, GZ + side * 0.05], mat({ map: tex(partTex, 1, 1) }), [4, ph]));
      // east end wall of the room with a door
      const eh = ceilY(-H + 0.5);
      const mint = mat({ color: 0xa9d8c0, roughness: 0.9 }), zm = (-H + 0.1 + GZ) / 2;   /* v8 (Henry): both end walls smooth mint, door in the middle with a window either side */
      const endHoles = [[zm - 0.55, 0.0, zm + 0.55, 2.15], [zm - 2.6, 1.0, zm - 1.4, 2.0], [zm + 1.4, 1.0, zm + 2.6, 2.0]];
      for (const xe of [gx1, gx0]) { const ew = holedWall(-H + 0.1, GZ, 0, ph, 0, endHoles.map(([a, b, c, d]) => [a, b, c, d]), mint); ew.position.z = 0; ew.rotation.y = -Math.PI / 2; ew.position.x = xe; inn.add(ew);
        for (const dz of [-2.0, 2.0]) { const gl = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.0), glassMat()); gl.rotation.y = Math.PI / 2; gl.position.set(xe, 1.5, zm + dz); inn.add(gl);
          for (const [hh, ww, dy, dzz] of [[0.08, 1.3, 0.54, 0], [0.08, 1.3, -0.54, 0], [1.1, 0.08, 0, 0.62], [1.1, 0.08, 0, -0.62]]) { const f = new THREE.Mesh(new THREE.BoxGeometry(0.14, hh, ww), mat({ color: 0xf2f0ea })); f.position.set(xe, 1.5 + dy, zm + dz + dzz); inn.add(f); } } }
      const door = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 2.2), mat({ color: 0xf2f0ea })); door.position.set(gx1 - 3, 1.1, GZ + 0.08); inn.add(door);   /* door through the partition into the hall */
      fl(gx0, gx1, -H + 0.2, GZ, mat({ color: 0xc9a77c }), 0.025);
      fl(gx0 + 1, gx1 - 1, -H + 1, GZ - 0.6, mat({ color: 0x2f62c8 }), 0.06);
      { const TX = -22.5, TZ = GZ - 0.35 - 1.3, TL = 17;   /* Henry (v6): tumble track right against the tall partition, ending ~4 m east of the 360 camera */
        const top = new THREE.Mesh(new THREE.BoxGeometry(TL, 0.45, 1.9), mat({ color: 0x1b1b1b })); top.position.set(TX, 0.225, TZ); inn.add(top);
        const red = mat({ color: 0xc8262a }); for (const dz of [-1.12, 1.12]) { const e = new THREE.Mesh(new THREE.BoxGeometry(TL + 0.7, 0.62, 0.36), red); e.position.set(TX, 0.31, TZ + dz); inn.add(e); }
        for (const dx of [-(TL / 2 + 0.2), TL / 2 + 0.2]) { const e = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.62, 2.6), red); e.position.set(TX + dx, 0.31, TZ); inn.add(e); } }
      /* Henry (v6): the doors at both ends of the gym room (white), plus the partition door seen from the gym side */
      for (const [x, z, ry] of [[gx1 - 0.06, zm, -Math.PI / 2], [gx0 + 0.06, zm, Math.PI / 2]]) { const d = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 2.1), mat({ color: 0xf2f0ea, side: THREE.DoubleSide })); d.rotation.y = ry; d.position.set(x, 1.05, z); inn.add(d);
        const fr = new THREE.Mesh(new THREE.PlaneGeometry(1.16, 2.2), mat({ color: 0x8a6440, side: THREE.DoubleSide })); fr.rotation.y = ry; fr.position.set(x + (ry < 0 ? 0.01 : -0.01), 1.1, z); inn.add(fr); }
      { const d2 = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 2.2), mat({ color: 0xf2f0ea })); d2.rotation.y = Math.PI; d2.position.set(gx1 - 3, 1.1, GZ - 0.08); inn.add(d2); }
      for (const z of [-19, -18]) { const bm = new THREE.Mesh(new THREE.BoxGeometry(5, 0.1, 0.1), mat({ color: 0xa47b52 })); bm.position.set(-34, 1.2, z); inn.add(bm);
        for (const dx of [-2, 2]) { const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.2, 6), mat({ color: 0x6b6b6b })); leg.position.set(-34 + dx, 0.6, z); inn.add(leg); } }
      for (const z of [-13, -12.3]) { const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 3.5, 6), mat({ color: 0xc9a46c })); bar.rotation.z = Math.PI / 2; bar.position.set(-6, 1.7, z); inn.add(bar); }
      for (let k = 0; k < 10; k++) { const wm = new THREE.Mesh(new THREE.BoxGeometry(1.85, 1.9, 0.12), mat({ color: k % 3 ? 0x2f62c8 : 0x2a58b8 })); wm.position.set(-27 + k * 1.9, 0.95, GZ - 0.15); wm.visible = (-27 + k * 1.9) > -13.5; inn.add(wm); }   /* row of blue wall mats along the partition */
      // windows along the north outer wall (seen in the gymnastics 360°)
      /* v8: the old opaque window panels are gone; the north windows are real openings (NWIN) */
    }
  return {  };
}
