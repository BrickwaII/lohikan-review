// Outdoor object kind 'bandshell' (used by EXTRAS entries with type: 'bandshell').
import * as THREE from 'three';

export function bandshell(e, g) {   // Amphitheater stage: half-barrel shell opening toward local -x, side entryways to a backstage area, half-round apron flush with the stage
    const r = e.r || 3.0, d = e.depth || 5, s = e.spring || 2.2, fh = e.floorH || 0.45, M = o => new THREE.MeshStandardMaterial({ roughness: 0.9, side: THREE.DoubleSide, ...o });
    const tex = (w, h, f) => { const c = document.createElement('canvas'); c.width = w; c.height = h; f(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; };
    const add = (geo, m, x, y, z) => { const o = new THREE.Mesh(geo, m); o.position.set(x, y, z); g.add(o); return o; };
    const wood = M({ color: 0xb59468 }), dark = M({ color: 0x2b231d }), deck = M({ color: 0x7a4a30 }), inside = M({ color: 0x1c1714 });
    add(new THREE.BoxGeometry(d, fh, 2 * r), deck, 0, fh / 2, 0);                                            // stage floor inside the shell
    const apR = e.apronR || r + 0.3; add(new THREE.CylinderGeometry(apR, apR, fh, 40, 1, false, Math.PI, Math.PI), deck, -d / 2, fh / 2, 0);   // half-round apron, flush with the stage
    const slats = tex(512, 256, (x, w, h) => { x.fillStyle = '#9a7650'; x.fillRect(0, 0, w, h); for (let i = 0; i < w; i += 16) { x.fillStyle = 'rgba(40,25,15,.55)'; x.fillRect(i, 0, 3, h); } });
    const vault = add(new THREE.CylinderGeometry(r, r, d, 32, 1, true, 0, Math.PI), M({ map: slats, side: THREE.BackSide }), 0, fh + s, 0); vault.rotation.z = Math.PI / 2;
    const outer = add(new THREE.CylinderGeometry(r + 0.15, r + 0.15, d, 32, 1, true, 0, Math.PI), M({ color: 0x241d18, side: THREE.FrontSide }), 0, fh + s, 0); outer.rotation.z = Math.PI / 2;
    // side walls under the springline, each with an open entryway (no door) near the front leading backstage
    const dw = e.doorW || 1.0, dh = Math.min(s - 0.1, 2.1), d0 = -d / 2 + 0.5, d1 = d0 + dw;
    for (const z of [-r, r]) { const sg = Math.sign(z);
      add(new THREE.BoxGeometry(d0 + d / 2, s, 0.15), wood, (-d / 2 + d0) / 2, fh + s / 2, z);
      add(new THREE.BoxGeometry(d / 2 - d1, s, 0.15), wood, (d1 + d / 2) / 2, fh + s / 2, z);
      add(new THREE.BoxGeometry(dw, s - dh, 0.15), wood, (d0 + d1) / 2, fh + dh + (s - dh) / 2, z);
    }
    const rim = new THREE.Mesh(new THREE.TorusGeometry(r + 0.08, 0.12, 6, 32, Math.PI), dark); rim.rotation.y = Math.PI / 2; rim.position.set(-d / 2, fh + s, 0); g.add(rim);
    const sun = tex(512, 512, (x, w, h) => { x.fillStyle = '#efe9da'; x.fillRect(0, 0, w, h); const cx = w / 2, cy = h * 0.58;
      for (let i = 0; i < 40; i++) { const a = i / 40 * Math.PI * 2; x.fillStyle = i % 2 ? '#2a3f9a' : '#e2b230'; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(a) * 240, cy + Math.sin(a) * 240); x.lineTo(cx + Math.cos(a + 0.16) * 240, cy + Math.sin(a + 0.16) * 240); x.fill(); }
      x.fillStyle = '#efe9da'; x.beginPath(); x.arc(cx, cy, 120, 0, 7); x.fill(); x.lineWidth = 14; x.strokeStyle = '#2a3f9a'; x.stroke(); x.strokeStyle = '#e2b230'; x.lineWidth = 8; x.beginPath(); x.arc(cx, cy, 175, 0, 7); x.stroke();
      x.fillStyle = '#e2b230'; x.font = 'bold 150px Georgia'; x.textAlign = 'center'; x.fillText('L', cx, cy + 50); x.fillStyle = '#2a3f9a'; x.font = 'bold 40px Georgia'; x.fillText('1957', cx, cy + 100); });
    const sh = new THREE.Shape(); sh.moveTo(-r, 0); sh.lineTo(r, 0); sh.lineTo(r, s); sh.absarc(0, s, r, 0, Math.PI, false); sh.lineTo(-r, 0);
    const bg = new THREE.ShapeGeometry(sh, 24); const uv = bg.attributes.uv, pp = bg.attributes.position; for (let i = 0; i < uv.count; i++) uv.setXY(i, (pp.getX(i) + r) / (2 * r), pp.getY(i) / (s + r));
    const back = new THREE.Mesh(bg, M({ map: sun })); back.rotation.y = -Math.PI / 2; back.position.set(d / 2, fh, 0); g.add(back);
    { const bk = new THREE.Mesh(new THREE.BoxGeometry(0.08, s + r, 2 * r), M({ color: 0x5a3e28 })); bk.position.set(d / 2 + 0.07, fh + (s + r) / 2, 0); g.add(bk); }   // Henry: the L isn't visible from behind: plain boards behind the sunburst
    // backstage enclosure: the board wing walls are its front; side walls, back wall and a flat roof around/behind the shell
    const emb = tex(256, 256, (x, w, h) => { x.fillStyle = '#ffffff'; x.fillRect(0, 0, w, h); x.fillStyle = '#efefef'; x.beginPath(); x.arc(128, 128, 120, 0, 7); x.fill(); x.lineWidth = 10; x.strokeStyle = '#111'; x.stroke();
      x.fillStyle = '#111'; x.beginPath(); x.arc(128, 128, 60, Math.PI / 2, Math.PI * 1.5); x.fill(); x.font = 'bold 22px sans-serif'; x.textAlign = 'center'; x.fillText('CAMP LOHIKAN', 128, 50); x.fillText('THEATER', 128, 225); });
    const wh = e.wingH || 2.7, xw = -d / 2 + 0.6, xb = d / 2 + (e.backDepth ?? 0.6), roof = M({ color: 0x3a3836 });
    const wL = e.wingL ?? e.wing ?? 4.5, wR = e.wingR ?? e.wing ?? 4.5;   // -z and +z wing lengths
    for (const [sg, wl] of [[-1, wL], [1, wR]]) { const zo = sg * (r + 0.15 + wl);
      add(new THREE.BoxGeometry(0.15, wh, wl), dark, xw, wh / 2, sg * (r + 0.15 + wl / 2));                  // front (wing) wall
      add(new THREE.BoxGeometry(xb - xw, wh, 0.15), dark, (xw + xb) / 2, wh / 2, zo);                         // side wall
      const sg2 = add(new THREE.PlaneGeometry(1.2, 1.2), M({ map: emb }), xw - 0.09, 1.7, sg * (r + 0.15 + Math.min(1.2, wl / 2))); sg2.rotation.y = -Math.PI / 2; }
    const zl = -(r + 0.15 + wL), zr = r + 0.15 + wR;
    // backstage floor: wooden planks (gappier than the smooth stage), all the way round behind the shell
    const planks = tex(256, 256, (x, w, h) => { x.fillStyle = '#3a2a1e'; x.fillRect(0, 0, w, h); for (let y = 0; y < h; y += 32) { x.fillStyle = `rgb(${120 + (y * 7) % 30},${84 + (y * 5) % 20},${56 + (y * 3) % 14})`; x.fillRect(0, y + 3, w, 26); for (let k = 0; k < 3; k++) { x.fillStyle = 'rgba(30,20,12,.5)'; x.fillRect(((y * 37 + k * 90) % w), y + 3, 3, 26); } } });
    planks.wrapS = planks.wrapT = THREE.RepeatWrapping; planks.repeat.set((xb - xw) / 2.5, (zr - zl) / 2.5);
    add(new THREE.BoxGeometry(xb - xw, fh * 0.9, zr - zl), M({ map: planks }), (xw + xb) / 2, fh * 0.45 - 0.02, (zl + zr) / 2);
    add(new THREE.BoxGeometry(0.15, wh, zr - zl), dark, xb, wh / 2, (zl + zr) / 2);                             // back wall
    if (e.firePit) add(new THREE.CylinderGeometry(0.8, 0.9, 0.3, 16), M({ color: 0x5b5752 }), -d / 2 - 6.5, 0.15, 0);
  }
