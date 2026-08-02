import { SignJWT, jwtVerify } from "jose";
 
const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "neyshabur-chess-secret"
);
 
export async function createSession(adminId: string) {
  return await new SignJWT({ adminId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}
 
export async function verifySession(token: string) {
  const { payload } = await jwtVerify(token, secret);
  return payload;
}
 