// lower-office: outdoor objects (built by model/kinds/<type>.js)
// map = position on the camp map; see notes in ./NOTES.md before changing anything here.
export const EXTRAS = [
  // Amphitheater stage shell (LiDAR b046 crown ~5.3 m above the ground; Ghost photos IMG_8253/IMG_8328 looking SE → it opens to the NW). Sizes estimated from the photos.
  { type: 'bandshell', name: 'Amphitheater stage', map: [1490.4, 1469.3],   /* Henry: it was already in the right place */ angleDeg: -35, r: 3.0, depth: 5, spring: 2.2, floorH: 0.45, apronR: 3.3, wingL: 4.5, wingR: 2.2, wingH: 2.7, backDepth: 2.2, doorW: 1.0 },   // Henry: no benches; right wall shorter; half-round apron flush with the stage; open-air backstage behind (no roof) with an open entryway on each side; no fire pit
  { type: 'steps', name: 'Lower Office lawn steps', map: [1463.7, 1489.0], angleDeg: -31, len: 3.2, drop: 0.7, w: 2.8, stone: true },   /* Henry (17 Amphitheater 360): stone steps from the Lower Office lawn down to the road; bearing ~115 deg, ~4 m from the 360 camera */
  { type: 'benches', name: 'Amphitheater hill benches', map: [1459.0, 1491.8], angleDeg: 0, list: [[-2.3, -8.7, 115], [-3.7, -9.3, 115], [-5.3, -9.6, 115], [-7.3, -10.1, 115]] },   /* Henry: red benches on top of the hill looking down at the amphitheater (seen right of the steps in the 360) */
  { type: 'chimney', name: 'Lower Office chimney', map: [1426.1, 1495.75], angleDeg: 0, h: 10.8, w: 1.4, d: 0.9 },   /* 36 Mountain Boarding 360: stone chimney rising up the west gable of the Lower Office above the deck */
];
