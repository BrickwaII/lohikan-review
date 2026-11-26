// dining: outdoor objects (built by model/kinds/<type>.js)
// map = position on the camp map; see notes in ./NOTES.md before changing anything here.
export const EXTRAS = [
  { type: 'flagpole', name: 'Flagpole (left)', map: [1390.6, 1541.3], height: 8 },
  { type: 'flagpole', name: 'Flagpole (right)', map: [1393.8, 1540.7], height: 8 },
  { type: 'tent', name: 'Dining Hall tent', map: [1353.75, 1527.5], angleDeg: -10.1, len: 19, dep: 12, w: 20, d: 13, stripes: true },   /* Henry Nov 16: frame tent south of the Dining Hall over a stone patio, white or red/white striped; NAIP 2010/2015 show a ~19 x 12 m red/white striped tent here, 2019 just the patio with red tables */
  { type: 'woodstairs', name: 'Stairs from the road down to the Dining Hall', map: [1378.0, 1553.8], angleDeg: -118, len: 9.0, w: 1.6, dzTop: 1.24, dzBot: -0.73, lift: 0.3 },   /* Henry Nov 25 (road tour stop 12): a stairway from the road down the bank to the Dining Hall. Line follows the pin (SSW from the road); look is a guess */
];
