const KEY = "urls";

export function loadAll() {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
  catch { return []; }
}

export function saveAll(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function upsert(item) {
  const all = loadAll();
  const i = all.findIndex(x => x.shortCode === item.shortCode);
  if (i >= 0) all[i] = item; else all.unshift(item);
  saveAll(all);
}

export function byCode(code) {
  return loadAll().find(x => x.shortCode === code);
}

