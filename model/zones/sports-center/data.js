// Camp Lohikan — Sports Center (west: gymnastics/sports hall, east: Circus building, built 2008)
// Local frame: x = east (m), y = up, z = south. Origin = E 475172, N 4633315 (UTM 18N), at floor level.
// Dimensions from 2019 LiDAR cross-sections; finishes from the 360° tour + ~1,100 camp photos.
// Sports Center + Circus zone data: SC = the building's measured dimensions (local frame, metres).

export const SC = {
  E0: 475172, N0: 4633315,
  westX0: -44, westX1: 10,      // west section 54 m (green roof)
  circX0: 10, circX1: 44,       // circus section 34 m (grey roof)
  halfW: 20.5,                  // outer walls at N 4633294.5 / 4633335.5
  westEave: 2.8, westRidge: 11.0,
  aisleEave: 3.0, aisleTop: 5.5, // circus side aisles (lean-to roofs)
  naveHalf: 12.5,               // clerestory walls at N 4633302.5 / 4633327.5
  clereTop: 11.0, ridge: 15.7, vaultRise: 2.3,
};

export const ASSUMPTIONS = [
  'Shape and heights come from the 2019 LiDAR (±0.3 m). Finishes come from the 360° tour and ~20 photos you confirmed in the photo review, 2001–2023.',
  'Sports Center (from you): the arena (indoor basketball court / hockey rink) is walled off from the canteen and from the gymnastics room.',
  'Court area (from your confirmed photos): blue painted floor with white court lines and an orange multi-use ring, roller-hockey goals, a curved wood-slat ceiling with trusses, flags of many countries hanging overhead, and banners/murals on the walls. The court runs east–west in the west part of the hall; that orientation is a guess.',
  'Canteen (Ghost photo IMG_8314 + you): a long drop-ceiling room along the south wall, walled off from the arena (two doorways), booths, ping-pong tables and foosball, with the snack counter at the east end by your Canteen pin. Doorway positions are guesses.',
  'Floor (you): grey concrete with white lines everywhere in the arena — it is an indoor basketball court / hockey rink.',
  'Circus south wall (you): closed, with an entrance near the Sports Center and doors into the weight-lifting area toward the east end. The weight room layout is a guess.',
  'Gymnastics room (from the gymnastics 360°): a long room along the north wall, west of your Gymnastics pin, with a white curved ceiling, windows along the outer wall, a tall cream/yellow board partition, blue mats, a rod floor, beams and bars. Its exact length and door position are guesses.',
  'Wall shared by the Sports Center and the circus (from the circus 360° looking west): the bottom ~4.6 m across the nave is open framing with posts, low wooden knee walls and benches, and one walk-through bay, so you can see the Sports Center flags through it. Above that is a blue board band, then star panels up to the vault. The number of bays and which one is the walk-through are estimates.',
  'Circus nave: a curved lamella (diamond-lattice) wooden vault under a plain gable roof. Posts alternate red and yellow with blue X-braces, the walls are navy with white stars, and a band of clerestory windows runs under the vault.',
  'The indoor flying trapeze runs along the north side, with the board at the west end. Its exact length and heights are estimates.',
  'Dance studio (360° photo): curved white ceiling, cream walls with wood-trimmed windows on both long sides, one giant mirror along the whole south wall (facing the circus) over a low step, wood floor, ballet barre, white doors, blue benches. Entered from the circus north aisle (a "DANCE" sign is visible there in the circus 360°); its exact position is a guess.',
  'Exterior: dark brown board siding. The circus roof is grey and the Sports Center roof is green (2025 drone video). White X barn doors and a "SPORTS CENTER" sign on the west end.',
];
