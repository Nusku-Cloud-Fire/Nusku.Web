import { createHmac, timingSafeEqual } from "node:crypto";

// Server only. One format for both the emailed link and the session cookie:
// `purpose` stops a link token from being replayed as a cookie and vice versa.
export const LINK_TTL = 15 * 60;
export const SESSION_TTL = 7 * 24 * 3600;

type Purpose = "link" | "session";

export function getAuthSecret(): string | null {
  const secret = process.env.DOCS_AUTH_SECRET;
  return secret && Buffer.byteLength(secret, "utf8") >= 32 ? secret : null;
}

function sign(payloadB64: string, secret: string) {
  return createHmac("sha256", secret).update(payloadB64).digest("base64url");
}

export function signToken(email: string, purpose: Purpose, ttlSeconds: number): string {
  const secret = getAuthSecret();
  if (!secret) throw new Error("DOCS_AUTH_SECRET is not configured");
  const payload = { e: email, p: purpose, x: Math.floor(Date.now() / 1000) + ttlSeconds };
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${payloadB64}.${sign(payloadB64, secret)}`;
}

/** Never throws: any malformed input is simply "not valid". */
export function verifyToken(token: string, purpose: Purpose): { email: string } | null {
  try {
    const secret = getAuthSecret();
    if (!secret || typeof token !== "string") return null;
    const parts = token.split(".");
    if (parts.length !== 2) return null;
    const [payloadB64, sig] = parts;

    const expected = Buffer.from(sign(payloadB64, secret));
    const given = Buffer.from(sig);
    // timingSafeEqual throws on different lengths, so check first.
    if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;

    const payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8"));
    if (
      !payload ||
      typeof payload.e !== "string" ||
      payload.p !== purpose ||
      typeof payload.x !== "number" ||
      payload.x <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }
    return { email: payload.e };
  } catch {
    return null;
  }
}
