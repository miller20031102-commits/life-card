/**
 * 人生副本｜一次性解鎖碼後台
 * 用法：
 * 1. 建立 Google Sheet，工作表名稱設為 UnlockCodes。
 * 2. 第一列放：code, status, soldTo, soldAt, usedAt, roleId, resultId, note
 * 3. 匯入 admin/codes_sheet_import.csv。
 * 4. Apps Script 貼上本檔，部署為 Web App。
 * 5. 執行身分選「我」，存取權選「任何人」。
 */

const SHEET_NAME = 'UnlockCodes';
const VALID_STATUS = ['UNUSED', 'SOLD'];

function doGet(e) {
  const callback = e && e.parameter && e.parameter.callback;
  let payload;
  try {
    const action = String(e.parameter.action || '').toLowerCase();
    if (action === 'redeem') payload = redeem_(e.parameter);
    else if (action === 'health') payload = { ok: true, message: 'LifeQuest backend is alive.' };
    else payload = { ok: false, message: '未知的 action。' };
  } catch (err) {
    payload = { ok: false, message: '後台錯誤：' + err.message };
  }
  return output_(payload, callback);
}

function redeem_(params) {
  const code = normalize_(params.code);
  const roleId = String(params.roleId || '').trim();
  const resultId = String(params.resultId || '').trim();
  if (!code) return { ok: false, message: '請輸入解鎖碼。' };
  if (!roleId || !resultId) return { ok: false, message: '缺少角色結果資料，請重新產生角色卡後再解鎖。' };

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheet_();
    const values = sheet.getDataRange().getValues();
    if (values.length < 2) return { ok: false, message: '後台尚未匯入解鎖碼。' };

    const header = values[0].map(h => String(h).trim());
    const col = columnMap_(header);
    if (col.code === -1 || col.status === -1) {
      return { ok: false, message: 'Google Sheet 欄位錯誤，請確認第一列有 code 和 status。' };
    }

    for (let i = 1; i < values.length; i++) {
      const rowCode = normalize_(values[i][col.code]);
      if (rowCode !== code) continue;

      const status = String(values[i][col.status] || '').trim().toUpperCase();
      if (status === 'USED') {
        const usedAt = col.usedAt >= 0 ? values[i][col.usedAt] : '';
        return { ok: false, message: '這組解鎖碼已經使用過，不能重複解鎖。', usedAt: String(usedAt || '') };
      }
      if (!VALID_STATUS.includes(status)) {
        return { ok: false, message: '這組解鎖碼目前不可使用，請聯絡站主。' };
      }

      const row = i + 1;
      const now = new Date();
      sheet.getRange(row, col.status + 1).setValue('USED');
      if (col.usedAt >= 0) sheet.getRange(row, col.usedAt + 1).setValue(now);
      if (col.roleId >= 0) sheet.getRange(row, col.roleId + 1).setValue(roleId);
      if (col.resultId >= 0) sheet.getRange(row, col.resultId + 1).setValue(resultId);
      if (col.note >= 0) sheet.getRange(row, col.note + 1).setValue('Redeemed by website');
      return { ok: true, message: '解鎖成功。', roleId, resultId };
    }
    return { ok: false, message: '找不到這組解鎖碼，請確認是否輸入正確。' };
  } finally {
    lock.releaseLock();
  }
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['code', 'status', 'soldTo', 'soldAt', 'usedAt', 'roleId', 'resultId', 'note']);
  }
  return sheet;
}

function columnMap_(header) {
  const find = name => header.findIndex(h => h.toLowerCase() === name.toLowerCase());
  return {
    code: find('code'), status: find('status'), soldTo: find('soldTo'), soldAt: find('soldAt'),
    usedAt: find('usedAt'), roleId: find('roleId'), resultId: find('resultId'), note: find('note')
  };
}

function normalize_(value) {
  return String(value || '').trim().toUpperCase().replace(/\s+/g, '');
}

function output_(payload, callback) {
  const json = JSON.stringify(payload);
  if (callback) {
    return ContentService.createTextOutput(callback + '(' + json + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}

function setupDemoSheet() {
  const sheet = getSheet_();
  sheet.clear();
  sheet.appendRow(['code', 'status', 'soldTo', 'soldAt', 'usedAt', 'roleId', 'resultId', 'note']);
  sheet.appendRow(['LQ-DEMO-0001', 'UNUSED', '', '', '', '', '', 'demo code']);
}
