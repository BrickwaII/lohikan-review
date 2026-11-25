// Circus floor mats, aerial apparatus lines, indoor flying trapeze rig.
// Part of the Sports Center + Circus zone; called in order by ./index.js. Read ./NOTES.md before changing.
import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';

export function buildCircusEquipment(k) {
  const { S, mat, T, inn, cx0, CX, NH } = k;
    // mats
    const blue = mat({ color: 0x2a5ac8 }), red = mat({ color: 0xd2302c }), yel = mat({ color: 0xf2c51f });
    const box = (w, h, d, m, x, z, ry = 0) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x, h / 2, z); b.rotation.y = ry; inn.add(b); };
    /* layout from the circus 360 (07 Circus): the camera spot near CX+2.5, z 0.7 is bare concrete; mats sit on the south half */
    box(10, 0.06, 2.6, blue, CX + 7, 4.8, 0.35); box(2.6, 0.35, 1.6, red, CX + 5, 4.2, 0.35); box(2.6, 0.35, 1.6, red, CX + 9, 5.6, 0.2);
    box(7, 0.06, 3, blue, CX - 3, 5.5, -0.3); box(2.4, 0.4, 1.6, red, CX - 2, 5.2, -0.3);
    box(3, 0.06, 4, yel, CX - 12, 6.5, 0); box(2.6, 0.5, 3.2, red, CX - 12, 6.5, 0);
    box(2.2, 0.3, 1.4, red, CX + 12, 2.5, 0.1); box(4, 0.06, 2.2, blue, CX + 12, 2.5, 0.1);

    // aerial apparatus hanging from the vault: silks, lyra hoops, static trapezes
    const lineM = new THREE.LineBasicMaterial({ color: 0xdddddd });
    const line = (a, b) => inn.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([a, b]), lineM));
    const top = (x, z) => S.clereTop - 0.1;   /* rigging hangs from the truss bottom chords */
    /* Henry: no hanging equipment for now (silks/hoops get raised and lowered); only the flying trapeze, which is always up */
    // indoor flying trapeze along the north side (board at the west end, net, fly bar, catch trap)
    {
      const steel = mat({ color: 0xbfc4c8, metalness: 0.6, roughness: 0.35 });
      const z0 = -NH + 4.0, xB = cx0 + 4.5, xC = xB + 19, netH = 2.4, boardH = 7.0, barH = 9.2;
      const netTex = T(256, 256, (g, w, h) => { g.clearRect(0, 0, w, h); g.strokeStyle = '#111'; g.lineWidth = 4; for (let i = 0; i <= w; i += 32) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, h); g.stroke(); g.beginPath(); g.moveTo(0, i); g.lineTo(w, i); g.stroke(); } }, 26, 6);
      const net = new THREE.Mesh(new THREE.PlaneGeometry(xC - xB + 6, 7), new THREE.MeshStandardMaterial({ map: netTex, transparent: true, side: THREE.DoubleSide, roughness: 1 }));
      net.rotateX(-Math.PI / 2); net.position.set((xB + xC) / 2, netH, z0); inn.add(net);
      for (const x of [xB - 3, xC + 3]) for (const dz of [-3.5, 3.5]) { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, netH + 0.6, 8), steel); p.position.set(x, (netH + 0.6) / 2, z0 + dz); inn.add(p); }
      const board = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.12, 1.6), mat({ color: 0x9a7a4a })); board.position.set(xB - 1.2, boardH, z0); inn.add(board);
      for (const dz of [-0.7, 0.7]) { const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, boardH, 8), steel); leg.position.set(xB - 1.8, boardH / 2, z0 + dz); inn.add(leg); }
      const ladM = mat({ color: 0xe0532a }), lad = new THREE.Group();
      for (const dz of [-0.25, 0.25]) { const r = new THREE.Mesh(new THREE.BoxGeometry(0.06, boardH, 0.06), ladM); r.position.set(0, boardH / 2, dz); lad.add(r); }
      for (let y = 0.3; y < boardH; y += 0.3) { const st = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.5), ladM); st.position.set(0, y, 0); lad.add(st); }
      lad.position.set(xB - 2.6, 0, z0); lad.rotation.z = 0.12; inn.add(lad);
      const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.9, 8), steel); bar.rotation.x = Math.PI / 2; bar.position.set(xB + 1.5, boardH - 0.8, z0); inn.add(bar);
      for (const dz of [-0.45, 0.45]) line(new THREE.Vector3(xB + 5, top(xB + 5, z0), z0 + dz), new THREE.Vector3(xB + 1.5, boardH - 0.8, z0 + dz));
      const cbar = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 2.4), steel); cbar.position.set(xC, barH, z0); inn.add(cbar);
      for (const dz of [-1.1, 1.1]) line(new THREE.Vector3(xC, barH, z0 + dz), new THREE.Vector3(xC, top(xC, z0 + dz), z0 + dz));
      for (const [x, z] of [[xB - 3, z0 - 3.5], [xB - 3, z0 + 3.5], [xC + 3, z0 - 3.5], [xC + 3, z0 + 3.5]]) line(new THREE.Vector3(x, netH + 0.6, z), new THREE.Vector3(x + (x < CX ? -3 : 3), 0, z + (z < z0 ? -2 : 2)));
    }
  return { blue, red, yel, box, lineM, line, top };
}
