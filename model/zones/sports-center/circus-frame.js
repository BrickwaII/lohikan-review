// Circus frame constants: extents, nave half-width, south opening, window rows.
// Part of the Sports Center + Circus zone; called in order by ./index.js. Read ./NOTES.md before changing.
import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';

export function buildCircusFrame(k) {
  const { S } = k;

  // ---------- CIRCUS SECTION ----------
  const cx0 = S.circX0, cx1 = S.circX1, L = cx1 - cx0, CX = (cx0 + cx1) / 2, H = S.halfW, NH = S.naveHalf;
  const SOUTH_OPEN_X = cx1 - 21.2;
  const WIN_ROWS = [[4.0, 5.0], [S.clereTop - 3.0, S.clereTop - 1.0]];   /* end-wall window rows: low row above the opening, high row level with the clerestory */
  const R = (NH * NH + S.vaultRise * S.vaultRise) / (2 * S.vaultRise), HALF = Math.asin(NH / R);
  return { cx0, cx1, L, CX, H, NH, SOUTH_OPEN_X, WIN_ROWS, R, HALF };
}
