import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { flog } from "../logger";
import { byCode, upsert } from "../storage";
import { isExpired } from "../utils";

export default function RedirectPage() {
  const { shortCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const item = byCode(shortCode);

    if (!item) {
      flog("warn", "middleware", `Redirect: code not found ${shortCode}`);
      navigate("/?error=not_found");
      return;
    }

    if (isExpired(item)) {
      flog("error", "middleware", `Redirect: expired ${shortCode}`);
      navigate("/?error=expired");
      return;
    }

    item.clicks = (item.clicks || 0) + 1;
    upsert(item);

    flog("info", "middleware", `Redirect success ${shortCode} -> ${item.originalUrl}`);
    window.location.replace(item.originalUrl);
  }, [shortCode, navigate]);

  return (
    <div style={{ padding: 24 }}>
      <h2>Redirecting…</h2>
      <p>If you are not redirected automatically, <a href="/">go back</a>.</p>
    </div>
  );
}
