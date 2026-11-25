// buildExtra: builds one EXTRAS entry by dispatching on its type to model/kinds/<type>.js
import * as THREE from 'three';
import * as K_steps from './steps.js';
import * as K_benches from './benches.js';
import * as K_flagpole from './flagpole.js';
import * as K_bandshell from './bandshell.js';
import * as K_tetherball from './tetherball.js';
import * as K_courts from './courts.js';
import * as K_sandcourt from './sandcourt.js';
import * as K_bungee from './bungee.js';
import * as K_pavilion from './pavilion.js';
import * as K_gaga from './gaga.js';
import * as K_closet from './closet.js';
import * as K_entrance from './entrance.js';
import * as K_gateway from './gateway.js';
import * as K_arena from './arena.js';
import * as K_lamellaroof from './lamellaroof.js';
import * as K_signboard from './signboard.js';
import * as K_fence from './fence.js';
import * as K_tenniscourts from './tenniscourts.js';
import * as K_pool from './pool.js';
import * as K_archery from './archery.js';
import * as K_ballfield from './ballfield.js';
import * as K_dirttrack from './dirttrack.js';
import * as K_riflery from './riflery.js';
import * as K_dock from './dock.js';
import * as K_iceberg from './iceberg.js';
import * as K_buoyline from './buoyline.js';
import * as K_watertramp from './watertramp.js';
import * as K_tent from './tent.js';
import * as K_skilift from './skilift.js';
import * as K_chimney from './chimney.js';
import * as K_ropeswing from './ropeswing.js';
import * as K_waterslide from './waterslide.js';
import * as K_ropescourse from './ropescourse.js';
import * as K_soccergoal from './soccergoal.js';
import * as K_footbridge from './footbridge.js';
import * as K_woodstairs from './woodstairs.js';
const K = { ...K_steps, ...K_benches, ...K_flagpole, ...K_bandshell, ...K_tetherball, ...K_courts, ...K_sandcourt, ...K_bungee, ...K_pavilion, ...K_gaga, ...K_closet, ...K_entrance, ...K_gateway, ...K_arena, ...K_lamellaroof, ...K_signboard, ...K_fence, ...K_tenniscourts, ...K_pool, ...K_archery, ...K_ballfield, ...K_dirttrack, ...K_riflery, ...K_dock, ...K_iceberg, ...K_buoyline, ...K_watertramp, ...K_tent, ...K_skilift, ...K_chimney, ...K_ropeswing, ...K_waterslide, ...K_ropescourse, ...K_soccergoal, ...K_footbridge, ...K_woodstairs };

export function buildExtra(e) {
  if (e.type === 'steps') { const r = K.steps(e); if (r !== undefined) return r; }
  if (e.type === 'benches') { const r = K.benches(e); if (r !== undefined) return r; }
  const g = new THREE.Group();
  if (e.type === 'footbridge') { const r = K.footbridge(e, g); if (r !== undefined) return r; }
  if (e.type === 'woodstairs') { const r = K.woodstairs(e, g); if (r !== undefined) return r; }
  if (e.type === 'flagpole') { const r = K.flagpole(e, g); if (r !== undefined) return r; }
  if (e.type === 'bandshell') { const r = K.bandshell(e, g); if (r !== undefined) return r; }
  if (e.type === 'tetherball') { const r = K.tetherball(e, g); if (r !== undefined) return r; }
  if (e.type === 'courts') { const r = K.courts(e, g); if (r !== undefined) return r; }
  if (e.type === 'sandcourt') { const r = K.sandcourt(e, g); if (r !== undefined) return r; }
  if (e.type === 'bungee') { const r = K.bungee(e, g); if (r !== undefined) return r; }
  if (e.type === 'pavilion' && e.octagon) { const r = K.pavilion_octagon(e, g); if (r !== undefined) return r; }
  if (e.type === 'pavilion' && !e.octagon) { const r = K.pavilion(e, g); if (r !== undefined) return r; }
  if (e.type === 'gaga') { const r = K.gaga(e, g); if (r !== undefined) return r; }
  if (e.type === 'closet') { const r = K.closet(e, g); if (r !== undefined) return r; }
  if (e.type === 'entrance') { const r = K.entrance(e, g); if (r !== undefined) return r; }
  if (e.type === 'gateway') { const r = K.gateway(e, g); if (r !== undefined) return r; }
  if (e.type === 'arena') { const r = K.arena(e, g); if (r !== undefined) return r; }
  if (e.type === 'lamellaroof') { const r = K.lamellaroof(e, g); if (r !== undefined) return r; }
  if (e.type === 'signboard') { const r = K.signboard(e, g); if (r !== undefined) return r; }
  if (e.type === 'fence') { const r = K.fence(e, g); if (r !== undefined) return r; }
  if (e.type === 'tenniscourts') { const r = K.tenniscourts(e, g); if (r !== undefined) return r; }
  if (e.type === 'pool') { const r = K.pool(e, g); if (r !== undefined) return r; }
  if (e.type === 'archery') { const r = K.archery(e, g); if (r !== undefined) return r; }
  if (e.type === 'ballfield') { const r = K.ballfield(e, g); if (r !== undefined) return r; }
  if (e.type === 'dirttrack') { const r = K.dirttrack(e, g); if (r !== undefined) return r; }
  if (e.type === 'riflery') { const r = K.riflery(e, g); if (r !== undefined) return r; }
  if (e.type === 'dock') { const r = K.dock(e, g); if (r !== undefined) return r; }
  if (e.type === 'iceberg') { const r = K.iceberg(e, g); if (r !== undefined) return r; }
  if (e.type === 'buoyline') { const r = K.buoyline(e, g); if (r !== undefined) return r; }
  if (e.type === 'watertramp') { const r = K.watertramp(e, g); if (r !== undefined) return r; }
  if (e.type === 'tent') { const r = K.tent(e, g); if (r !== undefined) return r; }
  if (e.type === 'skilift') { const r = K.skilift(e, g); if (r !== undefined) return r; }
  if (e.type === 'chimney') { const r = K.chimney(e, g); if (r !== undefined) return r; }
  if (e.type === 'ropeswing') { const r = K.ropeswing(e, g); if (r !== undefined) return r; }
  if (e.type === 'waterslide') { const r = K.waterslide(e, g); if (r !== undefined) return r; }
  if (e.type === 'ropescourse') { const r = K.ropescourse(e, g); if (r !== undefined) return r; }
  if (e.type === 'soccergoal') { const r = K.soccergoal(e, g); if (r !== undefined) return r; }
  return g;
}
