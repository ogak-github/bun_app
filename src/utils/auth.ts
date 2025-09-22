import { resolve } from "bun";
import Elysia from "elysia";
import { AuthService } from "../modules/auth/auth.service";
import { ResponseModel } from "../common/response.model";
import jwt from "@elysiajs/jwt";

export const authorizationPlugin = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET ?? "dev-secret", // put in env in real apps
    }),
  )
  .macro({
    isAuth: (enabled: true) => ({
      resolve: ({ set, headers, jwt }) => {
        const authHeader = Object.keys(headers).find(
          (k) => k.toLowerCase() === "authorization",
        );

        const authorization = authHeader ? headers[authHeader] : undefined;
        if (!authorization) {
          throw {
            status: 401,
            customError: "Unauthorized",
          };
        }

        const [bearer, token] = authorization.split(" ");
        if (bearer !== "Bearer" || !token) {
          throw {
            status: 401,
            customError: "Invalid Token",
          };
        }

        if (token !== "GENERATED_TOKEN") {
          throw {
            status: 401,
            customError: "Invalid Token",
          };
        }

        return true;
      },
    }),
  });

type User = {
  id: string;
  role: string;
};

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
