// Canteen (south side of the hall): booths, ping-pong tables, counter, drop ceiling.
// Part of the Sports Center + Circus zone; called in order by ./index.js. Read ./NOTES.md before changing.
import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';

export function buildCanteen(k) {
  const { S, mat, T, woodBoards, tex, quad, inn, H, roofU } = k;
    // canteen (Ghost photo IMG_8314, looking west along it): a long room on the south side with a white drop ceiling, windows in the outer wall,
    // wooden booths along both sides, ping-pong tables down the middle and foosball; the inner side is open between posts above the booth backs.
    { const cz0 = 11.6, cz1 = H - 0.15, cx0 = S.westX0 + 0.25, cx1 = S.westX1 - 0.3, ch = 2.75, wood = mat({ color: 0x8a6440 }), cream = mat({ color: 0xe8e2c8, emissive: 0x6b675a, emissiveIntensity: 0.5 });
      const ceil = new THREE.Mesh(new THREE.PlaneGeometry(cx1 - cx0, cz1 - cz0), mat({ map: T(256, 256, (g, w, h) => { g.fillStyle = '#efede6'; g.fillRect(0, 0, w, h); g.strokeStyle = '#c9c6bd'; g.lineWidth = 3; for (let k = 0; k <= w; k += 64) { g.beginPath(); g.moveTo(k, 0); g.lineTo(k, h); g.stroke(); g.beginPath(); g.moveTo(0, k); g.lineTo(w, k); g.stroke(); } }), emissive: 0x777777, emissiveIntensity: 0.6, side: THREE.DoubleSide }));
      ceil.material.map.wrapS = ceil.material.map.wrapT = THREE.RepeatWrapping; ceil.material.map.repeat.set((cx1 - cx0) / 2.4, (cz1 - cz0) / 2.4); ceil.rotation.x = Math.PI / 2; ceil.position.set((cx0 + cx1) / 2, ch, (cz0 + cz1) / 2); inn.add(ceil);
      for (let x = cx0 + 3; x < cx1 - 1; x += 3.5) { const fx = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.04, 0.2), mat({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.9 })); fx.position.set(x, ch - 0.03, (cz0 + cz1) / 2); inn.add(fx); }
      inn.add(quad([cx0, 0, cz1 - 0.02], [cx1, 0, cz1 - 0.02], [cx1, ch, cz1 - 0.02], [cx0, ch, cz1 - 0.02], cream, [1, 1]));                          // cream inner face of the outer wall
      for (const xe of [cx0, cx1]) inn.add(quad([xe, 0, cz0], [xe, 0, cz1], [xe, ch, cz1], [xe, ch, cz0], cream, [1, 1]));
      // Henry 9:08 AM: the wall between the court and the canteen is only ~4 ft (1.2 m) high, so the canteen is in plain view from the court; two walk-through gaps
      const SX0 = -15.0, SX1 = 0.3, SZ = 15.2, MZ = (cz0 + cz1) / 2;   /* Henry 1:18 PM: the candy canteen room is the room against the south wall next to the bathrooms (nothing at the west end) */ const SXOLD = cx0 - 1;   /* candy-canteen room at the WEST end, against the south wall, half the canteen depth (length ~9 m is an estimate) */
      { const dw = [[-24, 1.8], [-4, 1.8]], wallTop = roofU(cz0) - 0.05, armWood = mat({ map: tex(woodBoards, 1, 1) }), KW = 1.2;
        let xs = cx0; const pieces = [];
        for (const [dc, w] of dw) { pieces.push([xs, dc - w / 2]); xs = dc + w / 2; } pieces.push([xs, cx1]);
        for (const [xa, xb] of pieces) { const kw = new THREE.Mesh(new THREE.BoxGeometry(xb - xa, KW, 0.15), cream); kw.position.set((xa + xb) / 2, KW / 2, cz0); inn.add(kw);
          const cap = new THREE.Mesh(new THREE.BoxGeometry(xb - xa, 0.06, 0.25), wood); cap.position.set((xa + xb) / 2, KW + 0.03, cz0); inn.add(cap); }
        inn.add(quad([cx0, ch, cz0 - 0.02], [cx1, ch, cz0 - 0.02], [cx1, wallTop, cz0 - 0.02], [cx0, wallTop, cz0 - 0.02], armWood, [3, 1]));   /* boards close the space above the drop ceiling */
        const tim = mat({ color: 0xc9a27a });   /* big diagonal timber braces (Ghost IMG_8313) */
        for (const [bx, dir] of [[-3.4, 1], [0.2, -1]]) { const len = Math.hypot(1.6, ch); const br = new THREE.Mesh(new THREE.BoxGeometry(0.25, len, 0.2), tim); br.position.set(bx + dir * 0.8, ch / 2, cz0 + 0.2); br.rotation.z = dir * Math.atan2(1.6, ch); inn.add(br); } }
      /* Ghost IMG_8314: square posts carrying a beam along the inner edge of each booth row (east of the candy room) */
      const RX0b = -15.0; for (const pz of [cz1 - 2.0, cz0 + 2.0]) { const bx0 = cx0 + 1.0, bx1 = pz > (cz0 + cz1) / 2 ? RX0b - 0.5 : cx1 - 3; const beam = new THREE.Mesh(new THREE.BoxGeometry(bx1 - bx0, 0.25, 0.18), mat({ color: 0x6e6450 })); beam.position.set((bx0 + bx1) / 2, ch - 0.13, pz); inn.add(beam);
        for (let x = bx0 + 0.2; x < bx1; x += 4.8) { const po = new THREE.Mesh(new THREE.BoxGeometry(0.15, ch, 0.15), mat({ color: 0x8a7656 })); po.position.set(x, ch / 2, pz); inn.add(po); } }
      inn.add(quad([cx1 - 0.05, 0, cz0], [cx1 - 0.05, 0, cz1], [cx1 - 0.05, ch, cz1], [cx1 - 0.05, ch, cz0], cream, [1, 1]));   /* east end wall */
      /* Henry 1:10 PM markup: a row of rooms against the south wall at the east end — an unnamed room, then the women's and the men's bathrooms on the corner */
      const RZ = 15.2, RX0 = -15.0, RX1 = cx1, rooms = [[0.3, 7.0, 'WOMEN'], [7.0, RX1, 'MEN']];
      { const rw = mat({ color: 0xe8e2c8, emissive: 0x6b675a, emissiveIntensity: 0.5 });
        inn.add(quad([0.3, 0, RZ], [RX1, 0, RZ], [RX1, ch, RZ], [0.3, ch, RZ], rw, [1, 1])); inn.add(quad([RX0, 0, RZ], [RX0, 0, cz1], [RX0, ch, cz1], [RX0, ch, RZ], rw, [1, 1]));
        for (const [a2, b2, lbl] of rooms) { if (a2 > 0.3) inn.add(quad([a2, 0, RZ], [a2, 0, cz1], [a2, ch, cz1], [a2, ch, RZ], rw, [1, 1]));
          const dx = (a2 + b2) / 2; const dr = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 2.05), mat({ color: 0x8a6a4a })); dr.rotation.y = Math.PI; dr.position.set(dx, 1.03, RZ - 0.03); inn.add(dr);
          if (lbl) { const sg = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.3), mat({ map: T(96, 32, (g2, w, h) => { g2.fillStyle = '#f4f2ec'; g2.fillRect(0, 0, w, h); g2.fillStyle = '#222'; g2.font = 'bold 18px sans-serif'; g2.textAlign = 'center'; g2.fillText(lbl, w / 2, 23); }) })); sg.rotation.y = Math.PI; sg.position.set(dx, 2.3, RZ - 0.04); inn.add(sg); } } }
      /* the candy canteen room: walls to the drop ceiling, 4 service windows in its north wall where kids line up, a door on its east side, shelves of candy and drinks inside */
      { const rw = mat({ color: 0xe8e2c8, emissive: 0x6b675a, emissiveIntensity: 0.5 }), dark = mat({ color: 0x2a2018 });
        const wins = [0, 1, 2, 3].map(k => SX0 + 1.4 + k * 2.0), ww = 1.1, sill = 0.95, wh = 0.9;
        let xa = SX0; for (const wx of wins) { inn.add(quad([xa, 0, SZ], [wx - ww / 2, 0, SZ], [wx - ww / 2, ch, SZ], [xa, ch, SZ], rw, [1, 1])); inn.add(quad([wx - ww / 2, 0, SZ], [wx + ww / 2, 0, SZ], [wx + ww / 2, sill, SZ], [wx - ww / 2, sill, SZ], rw, [1, 1]));
          inn.add(quad([wx - ww / 2, sill + wh, SZ], [wx + ww / 2, sill + wh, SZ], [wx + ww / 2, ch, SZ], [wx - ww / 2, ch, SZ], rw, [1, 1]));
          const ledge = new THREE.Mesh(new THREE.BoxGeometry(ww + 0.2, 0.05, 0.4), wood); ledge.position.set(wx, sill, SZ); inn.add(ledge); xa = wx + ww / 2; }
        inn.add(quad([xa, 0, SZ], [SX1, 0, SZ], [SX1, ch, SZ], [xa, ch, SZ], rw, [1, 1]));
        inn.add(quad([SX1, 0, SZ], [SX1, 0, cz1], [SX1, ch, cz1], [SX1, ch, SZ], rw, [1, 1]));
        const door = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 2.05), mat({ color: 0x8a6a4a })); door.rotation.y = Math.PI; door.position.set(SX1 - 1.0, 1.03, SZ - 0.03); inn.add(door);
        const ctr = new THREE.Mesh(new THREE.BoxGeometry(SX1 - SX0 - 0.6, 0.95, 0.6), wood); ctr.position.set((SX0 + SX1) / 2, 0.47, SZ + 0.45); inn.add(ctr);
        const candy = ['#e8434a', '#f2c12e', '#3fb36b', '#4d8fd6', '#f07c2a', '#9b59b6'];
        for (let sh = 0; sh < 3; sh++) for (let k = 0; k < 10; k++) { const bx = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.28, 0.3), mat({ color: new THREE.Color(candy[(k + sh) % candy.length]) })); bx.position.set(SX0 + 0.8 + k * 0.82, 0.9 + sh * 0.5, cz1 - 0.3); inn.add(bx); }
        const fridge = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.9, 0.7), mat({ color: 0xdfe3e6 })); fridge.position.set(SX1 - 0.6, 0.95, cz1 - 0.5); inn.add(fridge);
        const menu = new THREE.Mesh(new THREE.PlaneGeometry(4, 0.6), mat({ map: T(320, 48, (g, w, h) => { g.fillStyle = '#1d2a1d'; g.fillRect(0, 0, w, h); g.fillStyle = '#fff'; g.font = 'bold 30px sans-serif'; g.textAlign = 'center'; g.fillText('CANTEEN', w / 2, 36); }) }));
        menu.rotation.y = Math.PI; menu.position.set((SX0 + SX1) / 2, 2.25, SZ - 0.03); inn.add(menu); }
      for (let x = cx0 + 2.5; x < cx1 - 1; x += 3.2) { const w = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9), mat({ color: 0xdfeefa, emissive: 0xbfd8ea, emissiveIntensity: 0.6 })); w.rotation.y = Math.PI; w.position.set(x, 1.6, cz1 - 0.05); inn.add(w); }
      for (const [bz, face] of [[cz1 - 0.9, -1], [cz0 + 0.9, 1]]) for (let x = cx0 + 1.5; x < cx1 - 5.5; x += 2.4) { if (bz > (cz0 + cz1) / 2 && x > RX0 - 1.2) continue; if (bz < (cz0 + cz1) / 2 && x > -19) continue;   /* Henry 1:30 PM: no booths in the canteen area */ if (bz < (cz0 + cz1) / 2 && Math.abs(x + 24) < 1.6 || bz < (cz0 + cz1) / 2 && Math.abs(x + 4) < 1.6) continue;      // booths: table + two high-backed benches
        const t = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.06, 1.2), wood); t.position.set(x, 0.75, bz); inn.add(t);
        for (const dx of [-0.85, 0.85]) { const back = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.25, 1.3), wood); back.position.set(x + dx, 0.62, bz); inn.add(back); const seat = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.06, 1.3), wood); seat.position.set(x + dx * 0.72, 0.45, bz); inn.add(seat); } }
      /* Henry 9:08 AM: the ping-pong tables down the middle of the canteen are always there (the circus picnic tables were off-season storage and stay out) */
      for (let k = 0; k < 8; k++) { const px = cx0 + 4.0 + k * 4.6, pz = MZ + 0.4;
        if (px > -19.5) break;
        const pt = new THREE.Mesh(new THREE.BoxGeometry(2.74, 0.05, 1.52), mat({ color: 0x5b7a6d })); pt.position.set(px, 0.76, pz); inn.add(pt);
        const net = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.15, 1.6), mat({ color: 0x222222 })); net.position.set(px, 0.86, pz); inn.add(net);
        for (const dx of [-1, 1]) for (const dz of [-0.6, 0.6]) { const lg = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.74, 0.06), wood); lg.position.set(px + dx * 1.2, 0.37, pz + dz); inn.add(lg); } }
      /* pool table at the west end of the ping-pong row (2010 'Canteen Gameroom' web photo + Instagram 903895361570379740) */
      for (const px of [-40.2, -30.5]) { const pz = 14.0; const felt = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.12, 1.4), mat({ color: 0x1f6b4a })); felt.position.set(px, 0.8, pz); inn.add(felt);
        const body = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.55, 1.6), mat({ color: 0x6b4426 })); body.position.set(px, 0.5, pz); inn.add(body); }
      /* Henry 1:10-1:11 PM: arcade machines stand in front of the candy canteen room (along the low court wall, facing south); the DJ booth is in the middle of the space, facing west */
      { const cab = mat({ color: 0x1b1b22 }), scr = mat({ color: 0x3a7bd5, emissive: 0x3a7bd5, emissiveIntensity: 0.8 }), mq = ['#e8434a', '#f2c12e', '#3fb36b', '#9b59b6', '#f07c2a'];
        for (let k = 0; k < 5; k++) { const x = SX0 + 2.0 + k * 0.85; const c = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.8, 0.75), cab); c.position.set(x, 0.9, cz0 + 0.55); inn.add(c);
          const sc = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.42), scr); sc.position.set(x, 1.35, cz0 + 0.93); inn.add(sc);
          const mk = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.18), mat({ color: new THREE.Color(mq[k]), emissive: new THREE.Color(mq[k]), emissiveIntensity: 0.6 })); mk.position.set(x, 1.7, cz0 + 0.93); inn.add(mk); }
        const dx = -15.3, dz = 13.6;   /* platform against the west end of the room row, DJ faces west */
        const plat = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.35, 2.6), wood); plat.position.set(dx, 0.17, dz); inn.add(plat);
        const desk = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.95, 1.8), cab); desk.position.set(dx - 1.0, 0.35 + 0.47, dz); inn.add(desk);
        const deck = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.06, 1.2), mat({ color: 0x555555 })); deck.position.set(dx - 1.0, 1.33, dz); inn.add(deck);
        for (const sz of [-1.25, 1.25]) { const spk = new THREE.Mesh(new THREE.BoxGeometry(0.45, 1.0, 0.5), cab); spk.position.set(dx - 1.6, 0.35 + 0.5, dz + sz); inn.add(spk); } }
            for (const fx of [-1.5, 3.0]) { const fb = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.32, 0.75), mat({ color: 0x3d2c1e })); fb.position.set(fx, 0.82, cz0 + 2.6); inn.add(fb);
        for (const dx of [-0.6, 0.6]) for (const dz of [-0.3, 0.3]) { const lg = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.66, 0.07), mat({ color: 0x3d2c1e })); lg.position.set(fx + dx, 0.33, cz0 + 2.6 + dz); inn.add(lg); } }
    }
  return {  };
}
