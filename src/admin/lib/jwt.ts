import { ADMIN_CONFIG } from "../config";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export interface JwtPayload {
  sub: string;
  name?: string;
  iat: number;
  exp: number;
}

function toBase64Url(bytes: Uint8Array): string {
  let bin = "";
  bytes.forEach((b) => {
    bin += String.fromCharCode(b);
  });
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(input: string): Uint8Array {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "="
  );
  const bin = atob(padded);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function encodePart(value: object): string {
  return toBase64Url(encoder.encode(JSON.stringify(value)));
}

export async function signJwt(
  payload: Omit<JwtPayload, "iat" | "exp">,
  secret = ADMIN_CONFIG.jwt.secret,
  expiresInSeconds = ADMIN_CONFIG.jwt.expiresInSeconds
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const body: JwtPayload = { ...payload, iat: now, exp: now + expiresInSeconds };
  const header = { alg: "HS256", typ: "JWT" };
  const unsigned = `${encodePart(header)}.${encodePart(body)}`;
  const key = await hmacKey(secret);
  const signature = new Uint8Array(
    await crypto.subtle.sign("HMAC", key, encoder.encode(unsigned))
  );
  return `${unsigned}.${toBase64Url(signature)}`;
}

export async function verifyJwt(
  token: string,
  secret = ADMIN_CONFIG.jwt.secret
): Promise<JwtPayload | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [header, body, signature] = parts;
    const key = await hmacKey(secret);
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      fromBase64Url(signature).buffer as ArrayBuffer,
      encoder.encode(`${header}.${body}`)
    );
    if (!valid) return null;
    const payload = JSON.parse(decoder.decode(fromBase64Url(body))) as JwtPayload;
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
