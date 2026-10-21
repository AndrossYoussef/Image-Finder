/**
 * Image Finder public read-only image library.
 * Uses Google Apps Script's built-in DriveApp service (no Cloud project/API key).
 * Deploy as a Web app executing as the owner, accessible to anyone.
 */
const CONFIGURED_FOLDER_ID = '19MQRXfFORhtffu2oZn-XfkXGaI1J5btv';
const MAX_PARENT_DEPTH = 30;

function doGet(e) {
  const p = (e && e.parameter) || {};
  const callback = String(p.callback || '');
  if (!/^[A-Za-z_$][A-Za-z0-9_$]{0,80}$/.test(callback)) {
    return ContentService.createTextOutput('Invalid or missing JSONP callback.').setMimeType(ContentService.MimeType.TEXT);
  }
  try {
    let result;
    if (p.action === 'library') result = listLibrary_();
    else if (p.action === 'image') result = getImage_(String(p.id || ''));
    else result = {ok:false, error:'Unknown action. Use action=library or action=image.'};
    return jsonp_(callback, result);
  } catch (err) {
    return jsonp_(callback, {ok:false, error:String(err && err.message || err)});
  }
}

function listLibrary_() {
  const root = DriveApp.getFolderById(CONFIGURED_FOLDER_ID);
  const images = [];
  walkFolder_(root, '', images);
  images.sort((a,b) => a.relPath.localeCompare(b.relPath));
  return {ok:true, folderName:root.getName(), images:images};
}

function walkFolder_(folder, parentPath, out) {
  const path = parentPath ? parentPath + '/' + folder.getName() : '';
  const files = folder.getFiles();
  while (files.hasNext()) {
    const f = files.next();
    if (f.isTrashed()) continue;
    const mime = f.getMimeType() || '';
    if (!mime.toLowerCase().startsWith('image/')) continue;
    out.push({
      id:f.getId(), name:f.getName(), mimeType:mime, size:f.getSize(),
      modifiedTime:f.getLastUpdated().toISOString(),
      relPath:path ? path + '/' + f.getName() : f.getName(),
      thumbnailUrl:'https://drive.google.com/thumbnail?id=' + encodeURIComponent(f.getId()) + '&sz=w1600'
    });
  }
  const folders = folder.getFolders();
  while (folders.hasNext()) walkFolder_(folders.next(), path, out);
}

function getImage_(id) {
  if (!id || !/^[A-Za-z0-9_-]{10,}$/.test(id)) return {ok:false,error:'Invalid image id.'};
  const file = DriveApp.getFileById(id);
  if (!isInsideConfiguredFolder_(file)) return {ok:false,error:'That file is not in the configured public image folder.'};
  const mime = file.getMimeType() || '';
  if (!mime.toLowerCase().startsWith('image/')) return {ok:false,error:'The requested file is not an image.'};
  return {ok:true,name:file.getName(),mimeType:mime,base64:Utilities.base64Encode(file.getBlob().getBytes())};
}

function isInsideConfiguredFolder_(file) {
  const seen = {};
  let parents = file.getParents();
  for (let depth=0; depth<MAX_PARENT_DEPTH && parents.hasNext(); depth++) {
    const parent = parents.next();
    const id = parent.getId();
    if (id === CONFIGURED_FOLDER_ID) return true;
    if (seen[id]) continue;
    seen[id] = true;
    parents = parent.getParents();
  }
  return false;
}

function jsonp_(callback, data) {
  return ContentService.createTextOutput(callback + '(' + JSON.stringify(data) + ');')
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}
