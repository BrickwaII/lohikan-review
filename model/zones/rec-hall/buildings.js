// rec-hall: buildings (built by model/core/building.js)
// map = position on the camp map; see notes in ./NOTES.md before changing anything here.
export const BUILDINGS = [
  {
    id: 'rec_hall', name: 'Rec Hall', lidar: 'b024',
    map: [1484.5, 1647.2], angleDeg: 172.2, groundZ: 459.26,
    len: 38.8, wid: 23.2, floor: 0.3, eave: 5.1, ridge: 6.8,
    profile: [[-11.6, 5.1], [0, 6.8], [11.6, 5.1]],
    roof: 'metal', siding: 'brown', trim: 'white', windows: { spacing: 2.6, h: 0.7, sill: 1.0 },
    body: [[-19.1, 19.1, -11.2, 11.2]],
    porches: [],
    vents: [],
    doors: [{ side: +1, along: 10, w: 1.8 }, { side: -1, along: -10, w: 1.8 }],
    assumptions: [
      'Size 38.8 × 23.2 m, low-pitched gable (eaves 5.1 m, ridge 6.8 m) from raw 2019 LiDAR inside the building outline (b024).',
      'Light-coloured metal roof with the ridge along the long side (NAIP 2010, 2015, 2019); a loop driveway circles it.',
      'The walls (brown boards), doors and windows are guesses; no clear exterior photo has been matched yet.',
      'From the 360° panorama ("26 Fencing"): a steel building with dark grey arched steel frames and a white panel ceiling; cream lower walls with a row of small windows, a dark grey upper band; a speckled light epoxy floor; a low stage with a wood front and a black curtain in a cream proscenium wall, doors on each side of it, a mural and a lighting truss; metal bleachers and a big wall fan at the far end; double glass doors on the long side near the stage. Frame spacing (~9.5 m) and door positions are estimates.',
      'Inside (Henry): white floor; a black raised stage on the west end; behind it a small backstage / music-production room; above the stage the black box theater (formerly the old dance room). Stage height 1.0 m, depths and the mezzanine height (3.4 m) are estimates. The Ghost photo of a stage with the "L" emblem under a wooden arched ceiling is probably this room. Fencing used the hall; the circus did too before 2008.',
    ],
    // local +x = west for this building. Interior from the "26 Fencing" 360° panorama + Henry.
    interior: { floor: '#ddd2c2', wallLower: '#e3e0c8', wallUpper: '#4c5258', split: 1.9, wallEnd: '#ebe6d6', ceiling: '#efe9da', frames: { spacing: 9.5, color: '#3d4148' },
      /* Henry Nov 23: ~30 ft from the back of the stage to the back (west) wall. Right of the stage (seen from the hall) is a small light/sound tech area,
         behind it (west) a stairway up to the black box theater; a stair down leads to the hallway to backstage and the music area (rock band room + a smaller
         sound-booth room with a window). The black box and music-area layouts are NOT known: the music rooms here are placeholders. */
      blocks: [ { x0: 5.3, x1: 10.3, z0: -5.2, z1: 5.2, y0: 0, y1: 0.8, color: '#b98b55' },          // stage (wood front, low)
                { x0: 5.35, x1: 10.3, z0: -5.15, z1: 5.15, y0: 0.8, y1: 0.83, color: '#161616' },     // black stage deck
                { x0: 7.4, x1: 19.0, z0: -11.1, z1: 11.1, y0: 4.2, y1: 4.4, color: '#2a2a2a' },      // black box theater floor (above stage + back area)
                { x0: 7.2, x1: 7.5, z0: -5.0, z1: 5.0, y0: 0.83, y1: 4.2, color: '#0d0d0d' },       // black curtain
                { x0: -18.6, x1: -15.4, z0: -7, z1: 7, y0: 0, y1: 0.45, color: '#9ea3a6' },          // bleachers (3 rows)
                { x0: -18.6, x1: -16.5, z0: -7, z1: 7, y0: 0.45, y1: 0.9, color: '#9ea3a6' },
                { x0: -18.6, x1: -17.6, z0: -7, z1: 7, y0: 0.9, y1: 1.35, color: '#9ea3a6' },
                { x0: 5.7, x1: 5.9, z0: -5.5, z1: 5.5, y0: 4.6, y1: 4.75, color: '#222222' },       // lighting truss
                { x0: 7.6, x1: 9.4, z0: 6.0, z1: 7.2, y0: 0, y1: 1.0, color: '#2e2e2e' },          // light/sound tech desk, right of the stage
                { x0: 7.4, x1: 7.5, z0: 5.6, z1: 7.8, y0: 0, y1: 1.1, color: '#d8d2c2' },          // tech area low wall
                { x0: 7.60, x1: 10.3, z0: 8.2, z1: 9.6, y0: 0.00, y1: 0.30, color: '#6b5a48' },
                { x0: 7.79, x1: 10.3, z0: 8.2, z1: 9.6, y0: 0.30, y1: 0.60, color: '#6b5a48' },
                { x0: 7.98, x1: 10.3, z0: 8.2, z1: 9.6, y0: 0.60, y1: 0.90, color: '#6b5a48' },
                { x0: 8.17, x1: 10.3, z0: 8.2, z1: 9.6, y0: 0.90, y1: 1.20, color: '#6b5a48' },
                { x0: 8.36, x1: 10.3, z0: 8.2, z1: 9.6, y0: 1.20, y1: 1.50, color: '#6b5a48' },
                { x0: 8.55, x1: 10.3, z0: 8.2, z1: 9.6, y0: 1.50, y1: 1.80, color: '#6b5a48' },
                { x0: 8.74, x1: 10.3, z0: 8.2, z1: 9.6, y0: 1.80, y1: 2.10, color: '#6b5a48' },
                { x0: 8.93, x1: 10.3, z0: 8.2, z1: 9.6, y0: 2.10, y1: 2.40, color: '#6b5a48' },
                { x0: 9.12, x1: 10.3, z0: 8.2, z1: 9.6, y0: 2.40, y1: 2.70, color: '#6b5a48' },
                { x0: 9.31, x1: 10.3, z0: 8.2, z1: 9.6, y0: 2.70, y1: 3.00, color: '#6b5a48' },
                { x0: 9.50, x1: 10.3, z0: 8.2, z1: 9.6, y0: 3.00, y1: 3.30, color: '#6b5a48' },
                { x0: 9.69, x1: 10.3, z0: 8.2, z1: 9.6, y0: 3.30, y1: 3.60, color: '#6b5a48' },
                { x0: 9.88, x1: 10.3, z0: 8.2, z1: 9.6, y0: 3.60, y1: 3.90, color: '#6b5a48' },
                { x0: 10.07, x1: 10.3, z0: 8.2, z1: 9.6, y0: 3.90, y1: 4.20, color: '#6b5a48' },
                { x0: 13.0, x1: 19.2, z0: -3.0, z1: 3.0, y0: 0, y1: 0.03, color: '#b98a6a' },        // music room carpet (placeholder layout)
                { x0: 13.0, x1: 19.2, z0: -3.0, z1: 3.0, y0: 2.7, y1: 2.76, color: '#a07a50' },      // acoustic ceiling
                { x0: 13.06, x1: 13.12, z0: -0.7, z1: 0.7, y0: 1.2, y1: 2.0, color: '#d9c49a' } ],   // window into the sound booth
      walls: [ { x0: 7.4, z0: -11.1, x1: 7.4, z1: -5.2, color: '#ebe6d6' }, { x0: 7.4, z0: 5.2, x1: 7.4, z1: 5.6, color: '#ebe6d6' },   // proscenium wall
               { x0: 7.4, z0: -5.2, x1: 7.4, z1: 5.2, h: 5.0, color: '#ebe6d6' },
               { x0: 10.3, z0: -11.1, x1: 10.3, z1: 8.0, h: 4.2, color: '#1c1c1c' },   // back of the stage
               { x0: 13.0, z0: -3.0, x1: 13.0, z1: 3.0, h: 2.7, color: '#141414' }, { x0: 13.0, z0: -3.0, x1: 19.2, z1: -3.0, h: 2.7, color: '#141414' }, { x0: 13.0, z0: 3.0, x1: 19.2, z1: 3.0, h: 2.7, color: '#141414' },   // rock band room (black foam), placeholder
               { x0: 10.3, z0: -2.0, x1: 13.0, z1: -2.0, h: 2.7, color: '#d8d2c2' }, { x0: 10.3, z0: 2.0, x1: 13.0, z1: 2.0, h: 2.7, color: '#d8d2c2' } ] },   // sound booth, placeholder
  },
];
