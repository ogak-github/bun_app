import Elysia from "elysia";
import { ResponseModel } from "../common/response.model";
import jwt from "@elysiajs/jwt";
import { jwtConfig } from "../lib/jwt_config";

export const authorizationPlugin = new Elysia({ name: "authorization" })
  .use(jwtConfig)
  .macro({
    isAuth: (enabled: true) => ({
      resolve: async ({ set, headers, jwt }) => {
        const authHeader = Object.keys(headers).find(
          (k) => k.toLowerCase() === "authorization",
        );

        const unauthorizedResult = ResponseModel.createResponse({
          error: {
            code: "401",
            message: "Unauthorized",
          },
        });

        const authorization = authHeader ? headers[authHeader] : undefined;
        if (!authorization) {
          set.status = 401;
          throw unauthorizedResult;
        }

        const [bearer, token] = authorization.split(" ");
        if (bearer !== "Bearer" || !token) {
          set.status = 401;
          throw unauthorizedResult;
        }

        const profile = await jwt.verify(token);
        if (!profile) {
          set.status = 401;
          throw unauthorizedResult;
        }

        return true;
      },
    }),
  });

// export const auth = new Elysia({ name: "auth" })
//   // step 1: derive user dari header
//   .derive(({ headers, jwt }) => {
//     const token = headers.authorization?.replace("Bearer ", "");
//     if (!token) return { user: null };

//     try {
//       const decoded = jwtVerify(
//         token,
//         process.env.JWT_SECRET || "secret",
//       ) as User;
//       return { user: decoded };
//     } catch {
//       return { user: null };
//     }
//   })
//   // step 2: macro guard
//   .macro({
//     isAuth: (enabled: boolean = true) => ({
//       resolve: ({ user, set }) => {
//         if (enabled && !user) {
//           set.status = 401;
//           throw { message: "Unauthorized" };
//         }
//       },
//     }),
//     role: (expected: string) => ({
//       resolve: ({ user, set }) => {
//         if (!user) {
//           set.status = 401;
//           throw { message: "Unauthorized" };

//         }
//         if (user.role !== expected) {
//           set.status = 403;
//           throw { message: "Forbidden" };
//         }
//       },
//     }),
//   });
