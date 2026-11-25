// activities: outdoor objects (built by model/kinds/<type>.js)
// map = position on the camp map; see notes in ./NOTES.md before changing anything here.
export const EXTRAS = [
  { type: 'archery', name: 'Archery range', map: [1486.2, 1728.2], angleDeg: 149, len: 20, shed: [-11.6, -7.9], w: 22, d: 10 },   /* 25 Archery 360: shooting line with a rope on posts, white target backboard with 4 targets ~20 m away, small brown shed with a white door, split-rail fence; orientation inferred from Cooking appearing in the photo, so position is approximate */
  /* ATV track moved to paths.json (draped dirt surfaces traced on the NAIP 2015 aerial, Nov 17) */
  { type: 'riflery', name: 'Riflery range', map: [1456.0, 1697.0], angleDeg: 163.3, len: 16, w: 26, d: 14 },   /* Henry Nov 16: riflery is in a clearing in the woods north-west of the Rec Hall, reached by "the shortcut" from the back of Arts & Crafts. Layout (covered firing line at the path end, targets ~50 ft downrange) is a guess */
  { type: 'ropescourse', name: 'Rock climbing & ropes course', map: [1458.0, 1872.0], angleDeg: 35, w: 20, d: 16 },   /* 15 Outdoor Adventure + 16 Rock Climbing 360s; Henry 1:00 PM: in the woods at the end of a winding trail (~200-300 ft) from the NW side of Cabin 19; exact spot under the canopy is an estimate */
];
