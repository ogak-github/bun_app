import Elysia from "elysia";
import { ResponseModel } from "../common/response.model";
import { jwtConfig } from "../lib/jwt_config";
import bearer from "@elysiajs/bearer";
import { Profiler } from "react";

export const authorizationPlugin = new Elysia({ name: "authorization" })
  .use(jwtConfig)
  .use(bearer())
  .macro({
    isAuth: {
      resolve: async ({ set, jwt, bearer }) => {
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

        return {
          auth: profile,
        };
      },
    },
  })
  .macro("isAdmin", {
    isAuth: true,
    beforeHandle: ({ auth }) => {
      if (auth.username === "bulys") {
        return;
      } else {
        throw ResponseModel.createResponse({
          message: "You are not allowed to access",
          error: {
            code: "403",
            message: "Forbidden",
          },
        });
      }
    },
  });
