// Outdoor object kind 'culvert' (EXTRAS type: 'culvert'): corrugated metal pipe carrying a creek under a road.
// Runs along local +x, length e.len, diameter e.d (default 0.9 m). Origin = road surface at the middle; the pipe top sits
// e.cover (default 0.25 m) below it, so only the two open ends show where the creek banks drop away.
import * as THREE from 'three';

export function culvert(e, g) {
  const L = e.len || 10, D = e.d || 0.9, cover = e.cover ?? 0.25;
  const cv = document.createElement('canvas'); cv.width = 64; cv.height = 8; const c = cv.getContext('2d');
  for (let i = 0; i < 64; i++) { const v = 150 + 60 * Math.sin(i / 64 * Math.PI * 2 * 4); c.fillStyle = `rgb(${v},${v},${v + 4})`; c.fillRect(i, 0, 1, 8); }
  const tex = new THREE.CanvasTexture(cv); tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(L / 0.68 / 4, 1);   // ~68 mm corrugation pitch, exaggerated
  const m = new THREE.MeshStandardMaterial({ map: tex, color: 0xb9bcbf, metalness: 0.6, roughness: 0.55, side: THREE.DoubleSide });
  const pipe = new THREE.Mesh(new THREE.CylinderGeometry(D / 2, D / 2, L, 20, 1, true), m);
  pipe.rotation.z = Math.PI / 2; pipe.position.set(0, -cover - D / 2, 0); g.add(pipe);
  for (const s of [-1, 1]) {   // rolled rims at the open ends
    const rim = new THREE.Mesh(new THREE.TorusGeometry(D / 2, 0.035, 6, 20), m); rim.rotation.y = Math.PI / 2; rim.position.set(s * L / 2, -cover - D / 2, 0); g.add(rim);
  }
  return g;
}
