const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
export function genCode(len = 6) {
  let s = "";
  for (let i = 0; i < len; i++) s += alphabet[Math.floor(Math.random() * alphabet.length)];
  return s;
}

export function isValidUrl(url) {
  try { new URL(url); return true; } catch { return false; }
}

export function minutesFromNow(n) {
  const now = Date.now();
  return { createdAt: now, expiresAt: now + n * 60 * 1000 };
}

export function isExpired(item) {
  return Date.now() > item.expiresAt;
}

