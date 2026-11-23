/**
 * Camp Lohikan review — backend for the no-login review site.
 * Stores each reviewer's notes in the "reviews" sheet, Henry's settings (statuses, hidden views,
 * gallery picks, 360 turns) in the "admin" sheet, and reviewer photos in a Drive folder.
 *
 * Setup: paste into Extensions > Apps Script of a new Google Sheet, change ADMIN_KEY,
 * then Deploy > New deployment > Web app (Execute as: Me, Who has access: Anyone).
 */
const ADMIN_KEY = 'CHANGE-ME';                 // your passcode for "Henry's tools" on the site
const PHOTO_FOLDER = 'Lohikan review photos';  // Drive folder for reviewer uploads
const CHUNK = 45000;                           // characters per cell (Sheets limit is 50,000)

function doGet(e) {
  const rows = sheet_('reviews').getDataRange().getValues();
  const reviews = [];
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i]; if (!r[0]) continue;
    try { reviews.push({ id: String(r[0]), at: r[3], data: JSON.parse(r.slice(4).join('') || '{}') }); } catch (err) {}
  }
  const a = sheet_('admin').getRange(1, 1, 1, 20).getValues()[0].join('');
  return out_({ ok: true, reviews: reviews, admin: a ? JSON.parse(a) : {} });
}

function doPost(e) {
  let b;
  try { b = JSON.parse(e.postData.contents); } catch (err) { return out_({ ok: false, error: 'bad json' }); }
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    if (b.action === 'save') return out_(save_(b));
    if (b.action === 'photo') return out_(photo_(b));
    if (b.action === 'checkkey') return out_({ ok: b.key === ADMIN_KEY && ADMIN_KEY !== 'CHANGE-ME', error: 'key' });
    if (b.action === 'admin') {
      if (b.key !== ADMIN_KEY || ADMIN_KEY === 'CHANGE-ME') return out_({ ok: false, error: 'key' });
      const s = JSON.stringify(b.data || {}), sh = sheet_('admin');
      sh.getRange(1, 1, 1, 20).clearContent();
      const parts = chunks_(s); sh.getRange(1, 1, 1, parts.length).setValues([parts]);
      return out_({ ok: true });
    }
    return out_({ ok: false, error: 'unknown action' });
  } finally { lock.releaseLock(); }
}

function save_(b) {
  if (!/^r[a-z0-9]{6,40}$/.test(b.id || '') || typeof b.token !== 'string' || b.token.length < 12) return { ok: false, error: 'id' };
  const s = JSON.stringify(b.data || {});
  if (s.length > CHUNK * 15) return { ok: false, error: 'too big' };
  const sh = sheet_('reviews'), rows = sh.getDataRange().getValues(), hash = hash_(b.token);
  let row = -1;
  for (let i = 1; i < rows.length; i++) if (String(rows[i][0]) === b.id) { row = i + 1; if (rows[i][1] !== hash) return { ok: false, error: 'token' }; }
  if (row < 0) { row = Math.max(2, rows.length + 1); }
  const d = b.data || {}, parts = chunks_(s);
  sh.getRange(row, 1, 1, 20).clearContent();
  sh.getRange(row, 1, 1, 4 + parts.length).setValues([[b.id, hash, String(d.name || '').slice(0, 60), new Date()].concat(parts)]);
  return { ok: true };
}

function photo_(b) {
  const sh = sheet_('reviews'), rows = sh.getDataRange().getValues(), hash = hash_(String(b.token || ''));
  let known = false; for (let i = 1; i < rows.length; i++) if (String(rows[i][0]) === b.id && rows[i][1] === hash) known = true;
  if (!known) { const r = save_({ id: b.id, token: b.token, data: {} }); if (!r.ok) return r; }
  if (typeof b.b64 !== 'string' || b.b64.length > 14000000) return { ok: false, error: 'photo too big' };
  const it = DriveApp.getFoldersByName(PHOTO_FOLDER), folder = it.hasNext() ? it.next() : DriveApp.createFolder(PHOTO_FOLDER);
  const blob = Utilities.newBlob(Utilities.base64Decode(b.b64), 'image/jpeg', (b.id + '_' + Date.now() + '_' + String(b.name || 'photo')).replace(/[^\w.\-]/g, '_') + '.jpg');
  const f = folder.createFile(blob); f.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return { ok: true, fileId: f.getId() };
}

function sheet_(name) {
  const ss = SpreadsheetApp.getActive();
  let sh = ss.getSheetByName(name);
  if (!sh) { sh = ss.insertSheet(name); if (name === 'reviews') sh.appendRow(['id', 'token hash', 'name', 'updated', 'data (JSON, may continue in next columns)']); }
  return sh;
}
function chunks_(s) { const p = []; for (let i = 0; i < s.length; i += CHUNK) p.push(s.slice(i, i + CHUNK)); return p.length ? p : ['']; }
function hash_(t) { return Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, t)); }
function out_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
