// Outdoor object kind 'courts' (used by EXTRAS entries with type: 'courts').
import * as THREE from 'three';

export function courts(e, g) {   // outdoor basketball courts (colours from the 14 Basketball 360): terracotta surround and keys, sage-green green playing surfaces, white lines, hoops at both ends, chain-link fence
    const W = e.w, D = e.d, n = e.n || 3, pad = e.pad || 0.15, M = c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.85 });
    const base = new THREE.Mesh(new THREE.BoxGeometry(W, pad + 1, D), M(e.surround || 0xc0735f)); base.position.y = pad / 2 - 0.5; g.add(base);
    const cw = W / n, pw = Math.min(15, cw - 2.4), pl = Math.min(28, D - 2.4);
    if (e.lanes) { const lc = document.createElement('canvas'); lc.width = 1024; lc.height = Math.round(1024 * D / W); const l2 = lc.getContext('2d'); const sx = lc.width / W;   /* 37 Skate Park 360: red lane arcs wrapping around each court on the green surround */
      l2.clearRect(0, 0, lc.width, lc.height); l2.strokeStyle = '#c0605a'; l2.lineWidth = 2.2 * sx;
      for (let i = 0; i < n; i++) { const cx = (cw * (i + 0.5)) * sx, cy = lc.height / 2; for (const sg of [-1, 1]) { l2.beginPath(); l2.ellipse(cx, cy + sg * (pl / 2 - 3) * sx, (pw / 2 + 0.6) * sx, 6.5 * sx, 0, sg < 0 ? Math.PI : 0, sg < 0 ? 2 * Math.PI : Math.PI); l2.stroke(); } }
      l2.strokeStyle = '#ffffff'; l2.lineWidth = 0.12 * sx; for (let i = 0; i < n; i++) { const cx = (cw * (i + 0.5)) * sx, cy = lc.height / 2; for (const sg of [-1, 1]) { l2.beginPath(); l2.ellipse(cx, cy + sg * (pl / 2 - 3) * sx, (pw / 2 + 1.7) * sx, 7.6 * sx, 0, sg < 0 ? Math.PI : 0, sg < 0 ? 2 * Math.PI : Math.PI); l2.stroke(); } }
      const lt = new THREE.CanvasTexture(lc); lt.colorSpace = THREE.SRGBColorSpace; const lp = new THREE.Mesh(new THREE.PlaneGeometry(W, D), new THREE.MeshStandardMaterial({ map: lt, transparent: true, roughness: 0.85, polygonOffset: true, polygonOffsetFactor: -1 })); lp.rotation.x = -Math.PI / 2; lp.position.y = pad + 0.005; g.add(lp); }
    const lines = document.createElement('canvas'); lines.width = 256; lines.height = 480; const x = lines.getContext('2d');
    x.fillStyle = '#6f8f6c'; x.fillRect(0, 0, 256, 480); x.strokeStyle = '#f4f4f0'; x.lineWidth = 4; x.strokeRect(4, 4, 248, 472); x.beginPath(); x.moveTo(4, 240); x.lineTo(252, 240); x.stroke();
    x.beginPath(); x.arc(128, 240, 30, 0, 7); x.stroke(); for (const [yy, sg] of [[4, 1], [476, -1]]) { x.fillStyle = '#c0735f'; x.fillRect(98, yy, 60, sg * 97); x.strokeRect(98, Math.min(yy, yy + sg * 97), 60, 97); x.beginPath(); x.arc(128, yy + sg * 97, 30, 0, 7); x.stroke(); x.beginPath(); x.arc(128, yy + sg * 26, 112, sg > 0 ? 0 : Math.PI, sg > 0 ? Math.PI : 2 * Math.PI); x.stroke(); }
    const t = new THREE.CanvasTexture(lines); t.colorSpace = THREE.SRGBColorSpace;
    for (let i = 0; i < n; i++) { const cx = -W / 2 + cw * (i + 0.5);
      const c = new THREE.Mesh(new THREE.PlaneGeometry(pw, pl), new THREE.MeshStandardMaterial({ map: t, roughness: 0.8 })); c.rotation.x = -Math.PI / 2; c.position.set(cx, pad + 0.01, 0); g.add(c);
      if (e.hoops !== false) for (const sg of [-1, 1]) { const z = sg * (pl / 2 + 0.4);
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 3.3, 8), M(0x2c3e50)); post.position.set(cx, pad + 1.65, z); g.add(post);
        const bb = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.05, 0.05), M(0xf2f2f2)); bb.position.set(cx, pad + 3.35, z - sg * 0.55); g.add(bb);
        const rim = new THREE.Mesh(new THREE.TorusGeometry(0.23, 0.02, 6, 16), M(0xe0601b)); rim.rotation.x = Math.PI / 2; rim.position.set(cx, pad + 3.05, z - sg * 0.85); g.add(rim); } }
    const fence = new THREE.MeshStandardMaterial({ color: 0x8c949a, metalness: 0.5, roughness: 0.6, transparent: true, opacity: 0.35, side: THREE.DoubleSide, depthWrite: false });
    for (const [fx, fz, fw, rot] of [[0, -D / 2, W, 0], [0, D / 2, W, 0], [-W / 2, 0, D, Math.PI / 2], [W / 2, 0, D, Math.PI / 2]]) { const f = new THREE.Mesh(new THREE.PlaneGeometry(fw, 3.0), fence); f.position.set(fx, pad + 1.5, fz); f.rotation.y = rot; g.add(f); }
    for (let i = 0; i <= n; i++) for (const sg of [-1, 1]) { const pz = sg * D / 2, px = -W / 2 + cw * i; const fp = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 3.1, 6), M(0x6d7479)); fp.position.set(px, pad + 1.55, pz); g.add(fp); }
    /* light poles with twin flood heads at two fence corners (14 Basketball 360) */
    for (const [lx, lz] of [[-W / 2, -D / 2], [W / 2, D / 2]]) { const lp = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.13, 9, 8), M(0x8c949a)); lp.position.set(lx, pad + 4.5, lz); g.add(lp);
      for (const sg of [-1, 1]) { const hd = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.35, 0.3), M(0xd8dadb)); hd.position.set(lx + sg * 0.35, pad + 9.0, lz); g.add(hd); } }
    /* skate-park features on the court: quarter pipes, launch ramps, grind boxes and rails */
    for (const [rx, rz, rdeg, kind, o = {}] of e.ramps || []) { const rg = new THREE.Group(); rg.position.set(rx, pad, rz); rg.rotation.y = THREE.MathUtils.degToRad(rdeg); const wood = M(0xb88a5a), side = M(0x2a2a2a), steel = M(0xb8bcc0), grey = M(0x6f7478);
      const qp = (R, W, mat, x0, flip) => { const sh = new THREE.Shape(); sh.moveTo(0, 0); for (let k = 0; k <= 12; k++) { const t = k / 12 * Math.PI / 2; sh.lineTo(R - R * Math.cos(t), R - R * Math.sin(t)); } sh.lineTo(R, R); sh.lineTo(R + 0.6, R); sh.lineTo(R + 0.6, 0); sh.lineTo(0, 0);
        const ge = new THREE.ExtrudeGeometry(sh, { depth: W, bevelEnabled: false }); ge.translate(0, 0, -W / 2); const m = new THREE.Mesh(ge, [side, mat]); if (flip) { m.scale.x = -1; side.side = THREE.DoubleSide; mat.side = THREE.DoubleSide; } m.position.x = x0; rg.add(m);
        const cope = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, W, 8), steel); cope.rotation.x = Math.PI / 2; cope.position.set(x0 + (flip ? -R : R), R, 0); rg.add(cope); };
      if (kind === 'half') { const R = o.r || 1.6, W = o.w || 5, F = o.flat || 3; qp(R, W, grey, F / 2, false); qp(R, W, grey, -F / 2, true); const fb = new THREE.Mesh(new THREE.BoxGeometry(F, 0.05, W), grey); fb.position.y = 0.025; rg.add(fb); }   /* Henry: the half pipe on the west side */
      else if (kind === 'qtall') { const R = o.r || 2.2, W = o.w || 2.4; qp(R, W, wood, -1.1, false);
        if (o.rail) { const xr = -1.1 + R + 0.5; for (const z of [-W / 2 + 0.05, 0, W / 2 - 0.05]) { const p = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.0, 0.06), steel); p.position.set(xr, R + 0.5, z); rg.add(p); }   // Henry Nov 25: guard rails around the deck
          const t = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, W, 8), steel); t.rotation.x = Math.PI / 2; t.position.set(xr, R + 1.0, 0); rg.add(t); } }
      else if (kind === 'doublehalf') {   // Henry Nov 25: two half pipes joined in the middle; walls (south, middle, north) heights from o.rs, o.rm, o.rn
        const Rs = o.rs || 2.4, Rm = o.rm || 2.4, Rn = o.rn || 3.0, F = o.flat || 3.5, W = o.w || 6;
        qp(Rs, W, grey, -Rm - F, true); qp(Rm, W, grey, -Rm, false); qp(Rm, W, grey, Rm, true); qp(Rn, W, grey, Rm + F, false);
        for (const xc of [-Rm - F / 2, Rm + F / 2]) { const fb = new THREE.Mesh(new THREE.BoxGeometry(F, 0.05, W), grey); fb.position.set(xc, 0.025, 0); rg.add(fb); } }
      else if (kind === 'funbox') { const L = o.l || 4, Wd = o.w || 2.2, H = o.h || 0.6; const top = new THREE.Mesh(new THREE.BoxGeometry(L, H, Wd), [side, side, wood, side, side, side]); top.position.y = H / 2; rg.add(top);
        for (const sg of [-1, 1]) { const sh = new THREE.Shape(); sh.moveTo(0, 0); sh.lineTo(1.6, H); sh.lineTo(1.6, 0); sh.lineTo(0, 0); const ge = new THREE.ExtrudeGeometry(sh, { depth: Wd, bevelEnabled: false }); ge.translate(-1.6, 0, -Wd / 2); const m = new THREE.Mesh(ge, [side, wood]); if (sg > 0) { m.scale.x = -1; side.side = THREE.DoubleSide; wood.side = THREE.DoubleSide; } m.position.x = sg * -L / 2 - (sg > 0 ? 0 : 0); m.position.x = sg < 0 ? -L / 2 : L / 2; rg.add(m); }
        const rl = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, L + 2.4, 8), steel); rl.rotation.z = Math.PI / 2; rl.position.set(0, H + 0.35, Wd / 2 - 0.15); rg.add(rl);
        for (const dx of [-(L / 2 + 1.0), L / 2 + 1.0]) { const lg = new THREE.Mesh(new THREE.BoxGeometry(0.06, H + 0.35, 0.06), steel); lg.position.set(dx, (H + 0.35) / 2, Wd / 2 - 0.15); rg.add(lg); } }
      else if (kind === 'quarter') { const sh = new THREE.Shape(); sh.moveTo(0, 0); for (let k = 0; k <= 8; k++) { const t = k / 8 * Math.PI / 2; sh.lineTo(1.8 - 1.8 * Math.cos(t), 1.8 - 1.8 * Math.sin(t)); } sh.lineTo(1.8, 1.8); sh.lineTo(2.1, 1.8); sh.lineTo(2.1, 0); sh.lineTo(0, 0);
        const ge = new THREE.ExtrudeGeometry(sh, { depth: 2.4, bevelEnabled: false }); ge.translate(-1.05, 0, -1.2); rg.add(new THREE.Mesh(ge, [side, wood])); }
      else if (kind === 'launch') { const sh = new THREE.Shape(); sh.moveTo(0, 0); sh.lineTo(1.8, 0.6); sh.lineTo(1.8, 0); sh.lineTo(0, 0); const ge = new THREE.ExtrudeGeometry(sh, { depth: 1.4, bevelEnabled: false }); ge.translate(-0.9, 0, -0.7); rg.add(new THREE.Mesh(ge, [side, wood])); }
      else if (kind === 'box') { const bx = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.4, 1.0), side); bx.position.y = 0.2; rg.add(bx); }
      else { const r = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 3.2, 8), steel); r.rotation.z = Math.PI / 2; r.position.y = 0.45; rg.add(r); for (const dx of [-1.4, 1.4]) { const l = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.45, 0.4), steel); l.position.set(dx, 0.22, 0); rg.add(l); } }
      g.add(rg); }
  }
