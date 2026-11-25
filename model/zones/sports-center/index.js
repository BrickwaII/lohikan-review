// Sports Center + Circus zone (one connected building): builds the whole thing by calling each part in order.
// Parts: hall-exterior, hall-interior, court, canteen, gymnastics, circus-frame, circus-shell, circus-aisles, circus-nave, circus-equipment, dance-studio.
// Read ./NOTES.md (Henry's locked decisions) before changing any part.
import * as THREE from 'three';
import { SC, ASSUMPTIONS } from './data.js';
import { makeKit } from './kit.js';
import { buildHallExterior } from './hall-exterior.js';
import { buildHallInterior } from './hall-interior.js';
import { buildIndoorCourt } from './court.js';
import { buildCanteen } from './canteen.js';
import { buildGymnastics } from './gymnastics.js';
import { buildCircusFrame } from './circus-frame.js';
import { buildCircusShell } from './circus-shell.js';
import { buildCircusAisles } from './circus-aisles.js';
import { buildCircusNave } from './circus-nave.js';
import { buildCircusEquipment } from './circus-equipment.js';
import { buildDanceStudio } from './dance-studio.js';
export { SC, ASSUMPTIONS };

export function buildSportsCenter(renderer, opts = {}) {
  const kit = makeKit(renderer, opts);
  const { S, root, mat } = kit;
  { const fd = new THREE.Mesh(new THREE.BoxGeometry(S.circX1 - S.westX0 + 0.4, 1.6, 2 * S.halfW + 0.4), new THREE.MeshStandardMaterial({ color: 0x6f6b64, roughness: 0.95 })); fd.position.set((S.westX0 + S.circX1) / 2, -0.81, 0); root.add(fd); }
  const hall = { ...kit }, circus = { ...kit };
  Object.assign(hall, buildHallExterior(hall));
  Object.assign(hall, buildHallInterior(hall));
  Object.assign(hall, buildIndoorCourt(hall));
  Object.assign(hall, buildCanteen(hall));
  Object.assign(hall, buildGymnastics(hall));
  Object.assign(circus, buildCircusFrame(circus));
  Object.assign(circus, buildCircusShell(circus));
  Object.assign(circus, buildCircusAisles(circus));
  Object.assign(circus, buildCircusNave(circus));
  Object.assign(circus, buildCircusEquipment(circus));
  Object.assign(circus, buildDanceStudio(circus));
  return root;
}
