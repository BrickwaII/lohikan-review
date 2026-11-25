// Facade kept so existing imports keep working. The model now lives in:
//   core/building.js  - the building kit (builds any building from a config)
//   kinds/<type>.js   - one builder per outdoor-object kind (pool, fence, benches, ...)
//   zones/<zone>/     - the data for each area of camp (positions, sizes, Henry's decisions) + NOTES.md
export { buildCampBuilding } from './core/building.js';
export { buildExtra } from './kinds/index.js';
export { EXTRAS, BUILDINGS } from './zones/index.js';
