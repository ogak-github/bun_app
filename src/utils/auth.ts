import Elysia from "elysia";
import { ResponseModel } from "../common/response.model";
import jwt, { type JWTPayloadInput, type JWTPayloadSpec } from "@elysiajs/jwt";
import { jwtConfig } from "../lib/jwt_config";
import bearer from "@elysiajs/bearer";

export abstract class JWTFactory {
  constructor(
    private jwt: {
      sign: (payload: Record<string, any>) => Promise<string>;
      verify: (token: string) => Promise<any>;
    },
  ) {}

  async sign(payload: Record<string, any>) {
    try {
      return await this.jwt.sign(payload);
    } catch (e) {
      console.error("JWT sign error:", e);
    }
  }

  async verify(token: string) {
    try {
      return await this.jwt.verify(token);
    } catch (e) {
      console.error("JWT verify error:", e);
      throw new Error("Invalid token");
    }
  }
}

export const authorizationPlugin = new Elysia({ name: "authorization" })
  .use(jwtConfig)
  .use(bearer())
  .macro({
    isAuth: (enabled: Boolean) => ({
      resolve: async ({ set, jwt, bearer }) => {
        if (!enabled) {
          console.log("auth disabled");
          return;
        }
        const unauthorizedResult = ResponseModel.createResponse({
          error: {
            code: "401",
            message: "Unauthorized",
          },
        });

        if (!bearer) {
          set.status = 401;
          throw unauthorizedResult;
        }

        const profile = await jwt.verify(bearer);

        if (!profile) {
          set.status = 401;
          throw unauthorizedResult;
        }

        return;

        // const authHeader = Object.keys(headers).find(
        //   (k) => k.toLowerCase() === "authorization",
        // );

        // const authorization = authHeader ? headers[authHeader] : undefined;
        // if (!authorization) {
        //   set.status = 401;
        //   throw unauthorizedResult;
        // }

        // const [bearer, token] = authorization.split(" ");
        // if (bearer !== "Bearer" || !token) {
        //   set.status = 401;
        //   throw unauthorizedResult;
        // }

        // const profile = await jwt.verify(token);
        // if (!profile) {
        //   set.status = 401;
        //   throw unauthorizedResult;
        // }

        // return true;
      },
    }),
  });
