// fields: outdoor objects (built by model/kinds/<type>.js)
// map = position on the camp map; see notes in ./NOTES.md before changing anything here.
export const EXTRAS = [
  { type: 'ballfield', name: 'Baseball & softball field', map: [1704.5, 1737.5], angleDeg: 90, r: 44, base: 20, w: 80, d: 80, lift: 0.3 },   /* 27 Baseball & Softball 360 + NAIP 2019: big skinned dirt infield fanning north from home plate, backstop behind home; base distance is an estimate */
  { type: 'soccergoal', name: 'Lacrosse goal (west)', map: [1765, 1834], angleDeg: 0, small: true },
  { type: 'soccergoal', name: 'Lacrosse goal (east)', map: [1815, 1834], angleDeg: 180, small: true },   /* Henry Nov 16: lacrosse is on the Upper Field (35 Lacrosse 360); goal spots are a guess */
  { type: 'fence', name: 'Lower Field fence', map: [1886.0, 1602.0], angleDeg: 0, chain: true, h: 1.8, lines: [[[-56, -30], [56, -30], [56, 30]]] },   /* Henry: metal fence along the south edge of the soccer field, wrapping up the east side */
  { type: 'soccergoal', name: 'Soccer goal (west)', map: [1832, 1602], angleDeg: 0 },
  { type: 'soccergoal', name: 'Soccer goal (east)', map: [1936, 1602], angleDeg: 180 },
];
