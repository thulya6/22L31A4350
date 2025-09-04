import { useEffect, useMemo, useState } from "react";
import { flog } from "../logger";
import { genCode, isValidUrl, minutesFromNow, isExpired } from "../utils";
import { loadAll, saveAll, upsert } from "../storage";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [validity, setValidity] = useState(30);
  const [custom, setCustom] = useState("");  
  const [list, setList] = useState(() => loadAll());
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  useEffect(() => saveAll(list), [list]);

  const activeList = useMemo(
    () => list.map(x => ({ ...x, expired: isExpired(x) })), [list]
  );

  function unique(code) {
    return !list.some(x => x.shortCode === code);
  }

  function createShort() {
    // Basic validations
    if (!isValidUrl(originalUrl)) {
      flog("warn", "api", "Invalid URL entered");
      alert("Please enter a valid URL (include http/https).");
      return;
    }
    let code = (custom || "").trim();
    if (code) {
      const ok = /^[a-zA-Z0-9]+$/.test(code) && code.length <= 20;
      if (!ok) {
        flog("warn", "api", "Invalid custom shortcode");
        alert("Custom shortcode must be alphanumeric and <= 20 chars.");
        return;
      }
      if (!unique(code)) {
        flog("warn", "api", `Duplicate shortcode attempt: ${code}`);
        alert("Shortcode already exists. Try another.");
        return;
      }
    } else {
      // auto-generate until unique
      do { code = genCode(6); } while (!unique(code));
    }

    const mins = Number(validity) > 0 ? Number(validity) : 30; // default 30
    const { createdAt, expiresAt } = minutesFromNow(mins);

    const item = {
      shortCode: code,
      originalUrl,
      createdAt,
      expiresAt,
      validity: mins,
      clicks: 0
    };
    upsert(item);
    setList(loadAll());
    setOriginalUrl("");
    setValidity("");
    setCustom("");

    flog("info", "api", `Created short URL ${code} -> ${originalUrl}`);
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="home">
      <section className="card">
        <h2>Create a short URL</h2>
        <div className="form">
          <input
            placeholder="https://example.com/really/long/url"
            value={originalUrl}
            onChange={e => setOriginalUrl(e.target.value)}
          />
          <input
            placeholder="Validity minutes (default 30)"
            value={validity}
            onChange={e => setValidity(e.target.value)}
            type="number"
            min="1"
          />
          <input
            placeholder="Custom shortcode (optional)"
            value={custom}
            onChange={e => setCustom(e.target.value)}
          />
          <button onClick={createShort}>Shorten</button>
        </div>
      </section>

      <section className="card">
        <h3>Your links</h3>
        {activeList.length === 0 ? (
          <p>No links yet.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Short</th>
                <th>Original</th>
                <th>Clicks</th>
                <th>Expiry</th>
                <th>Copy</th>
              </tr>
            </thead>
            <tbody>
              {activeList.map((x) => {
                const shortUrl = `${origin}/${x.shortCode}`;
                const minsLeft = Math.max(0, Math.ceil((x.expiresAt - Date.now()) / 60000));
                return (
                  <tr key={x.shortCode} className={x.expired ? "expired" : ""}>
                    <td><a href={`/${x.shortCode}`}>{x.shortCode}</a></td>
                    <td className="truncate" title={x.originalUrl}>{x.originalUrl}</td>
                    <td>{x.clicks}</td>
                    <td>{x.expired ? "Expired" : `${minsLeft} min`}</td>
                    <td><button onClick={() => copyToClipboard(shortUrl)}>Copy</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
