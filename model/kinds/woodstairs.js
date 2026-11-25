// Outdoor object kind 'woodstairs' (EXTRAS type: 'woodstairs').
// Timber hillside stairs going DOWN along local +x: top tread at e.dzTop, bottom at e.dzBot (both relative to the origin,
// which sits on the ground at the middle). Landscape-timber risers with gravel treads plus a simple post-and-rail handrail.
import * as THREE from 'three';

export function woodstairs(e, g) {
  const lift = e.lift ?? 0.25, L = e.len, W = e.w || 1.6, top = (e.dzTop ?? 0.8) + lift, bot = (e.dzBot ?? -0.8) + lift, D = top - bot;   // lift: treads sit above the smoothed terrain so they read
  const n = Math.max(2, Math.round(D / (e.rise || 0.18)));
  const timber = new THREE.MeshStandardMaterial({ color: e.color || 0x6e4f33, roughness: 0.95 });
  const tread = new THREE.MeshStandardMaterial({ color: 0x8c8070, roughness: 1 });
  const zAt = x => top - D * (x / L + 0.5);
  for (let k = 0; k < n; k++) {
    const x0 = -L / 2 + k * L / n, x1 = x0 + L / n, h = top - (k + 1) * D / n;
    const fill = new THREE.Mesh(new THREE.BoxGeometry(L / n, 0.6, W), tread);
    fill.position.set((x0 + x1) / 2, h - 0.3, 0); g.add(fill);
    const riser = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.6 + D / n, W + 0.1), timber);
    riser.position.set(x0 + 0.07, h - 0.3 + D / n / 2, 0); g.add(riser);
  }
  if (e.rail !== false) for (const s of (e.rails || [1])) {
    const np = Math.max(2, Math.round(L / 1.8) + 1);
    for (let k = 0; k < np; k++) {
      const x = -L / 2 + 0.2 + k * (L - 0.4) / (np - 1), z = zAt(x);
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.3, 0.1), timber); p.position.set(x, z + 0.35, s * (W / 2 + 0.1)); g.add(p);
    }
    const run = Math.hypot(L - 0.4, D * (L - 0.4) / L), r = new THREE.Mesh(new THREE.BoxGeometry(run, 0.07, 0.07), timber);
    r.position.set(0, (top + bot) / 2 + 0.95, s * (W / 2 + 0.1)); r.rotation.z = -Math.atan2(D, L); g.add(r);
  }
  return g;
}
