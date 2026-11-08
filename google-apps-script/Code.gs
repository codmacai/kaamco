/**
 * KAAM-CO — website leads → Google Sheets
 *
 * Each form writes to its own tab (created automatically on first lead):
 *   Manpower   ← "I Need Manpower"
 *   Work       ← "I Am Looking for Work"
 *   Supply     ← "I Want to Supply Manpower"
 *   Enquiries  ← contact form
 *
 * Setup: see README.md → "Google Sheets".
 */

// Must match SHEETS_SECRET in the website's environment variables.
const SECRET = "PASTE-THE-SAME-TEXT-AS-SHEETS_SECRET";

// Every lead is emailed here the moment it is saved. Add more addresses with commas.
const NOTIFY_EMAIL = "sales@kaam-co.com, shahammoidu616@gmail.com";

const TITLES = {
  Manpower: "New manpower requirement",
  Work: "New worker registration",
  Supply: "New supplier / contractor registration",
  Enquiries: "New website enquiry",
};

function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return reply({ ok: false, error: "bad json" });
  }
  if (body.secret !== SECRET) return reply({ ok: false, error: "unauthorized" });

  const allowed = ["Manpower", "Work", "Supply", "Enquiries"];
  if (allowed.indexOf(body.sheet) === -1) return reply({ ok: false, error: "unknown sheet" });

  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(body.sheet) || ss.insertSheet(body.sheet);
    const row = body.row || {};

    // Grow the header row when a form sends a new field.
    const headers = sheet.getLastColumn() ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] : [];
    Object.keys(row).forEach(function (k) {
      if (headers.indexOf(k) === -1) headers.push(k);
    });
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold").setBackground("#f2a33a");
    sheet.setFrozenRows(1);

    // Store everything as text so phone numbers keep their digits and "+".
    const values = headers.map(function (h) {
      const v = row[h] == null ? "" : String(row[h]);
      return /^[+=\-@]/.test(v) || /^\d{6,}$/.test(v) ? "'" + v : v;
    });
    sheet.appendRow(values);
  } finally {
    lock.releaseLock();
  }

  // Saved first, so an email problem never loses the lead.
  notifyByEmail(body.sheet, body.row || {});
  return reply({ ok: true });
}

function notifyByEmail(sheetName, row) {
  if (!NOTIFY_EMAIL) return;
  const title = TITLES[sheetName] || "New lead";
  const keys = Object.keys(row).filter(function (k) { return row[k]; });
  const esc = function (v) {
    return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };
  const rowsHtml = keys.map(function (k) {
    return '<tr><td style="padding:8px 12px;color:#5b6573;border-bottom:1px solid #eee;white-space:nowrap">' + esc(k) +
      '</td><td style="padding:8px 12px;font-weight:600;border-bottom:1px solid #eee">' + esc(row[k]) + "</td></tr>";
  }).join("");
  const mobile = String(row.Mobile || "").replace(/\D/g, "").slice(-10);
  const actions = mobile
    ? '<p style="margin:20px 0 0"><a href="tel:+91' + mobile + '" style="background:#f2a33a;color:#111;padding:10px 16px;text-decoration:none;font-weight:700">Call ' + mobile +
      '</a> &nbsp; <a href="https://wa.me/91' + mobile + '" style="background:#1fa855;color:#fff;padding:10px 16px;text-decoration:none;font-weight:700">WhatsApp</a></p>'
    : "";
  try {
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: "KAAM-CO · " + title + " · " + (row["Reference ID"] || ""),
      body: [title, ""].concat(keys.map(function (k) { return k + ": " + row[k]; })).join("\n"),
      htmlBody:
        '<div style="font-family:Arial,sans-serif;max-width:560px">' +
        '<p style="margin:0 0 4px;color:#b46c0d;font-size:12px;letter-spacing:.1em;text-transform:uppercase">' + esc(sheetName) + "</p>" +
        '<h2 style="margin:0 0 16px">' + esc(title) + "</h2>" +
        '<table style="border-collapse:collapse;width:100%;font-size:14px">' + rowsHtml + "</table>" + actions +
        '<p style="margin:24px 0 0;color:#8a93a0;font-size:12px">Saved in the "' + esc(sheetName) + '" tab of your leads sheet.</p></div>',
      name: "KAAM-CO Website",
    });
  } catch (err) {
    console.error("Email failed: " + err);
  }
}

/** Select testEmail in the toolbar and click Run to receive a sample email. */
function testEmail() {
  notifyByEmail("Work", { "Reference ID": "TEST", Name: "Test worker — ignore", Mobile: "9876543210", City: "Bengaluru" });
}


function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
