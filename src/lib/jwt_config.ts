import { jwt } from "@elysiajs/jwt";

/**
 * Config for JWT.
 * You can add expiration (exp) token,
 * Change config jwt here.
 * Contoh: exp: '7d'
 * Need more jwtConfig ? create new one with different name
 */
export const jwtConfig = jwt({
  name: "jwt",
  secret: process.env.JWT_SECRET ?? "dev-secret",
  exp: "1d",
});
