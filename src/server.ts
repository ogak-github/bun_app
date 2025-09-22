// src/server.ts
import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { authController } from "./modules/auth/auth.controller";
import { ResponseModel } from "./common/response.model";
import { authorizationPlugin } from "./utils/auth";

const app = new Elysia()
  .use(authorizationPlugin)
  // Global error formatter: onError receives { code, error }
  .onError(({ code, error }: any) => {
    const isValidation = code === "VALIDATION";
    const isUnauthorized = code === "Unauthorized";
    const statusCode = error?.status ?? (isValidation ? 400 : 500);
    return ResponseModel.createResponse({
      error: {
        code: statusCode,
        details: error?.customError,
      },
    });

    return ResponseModel.createResponse({
      message: "Unauthorized Access",
      error: {
        code: statusCode,
        details: error?.status,
      },
    });
  })

  // health
  .get("/", ({ set }) => {
    return { set: set.status };
  })
  .get(
    "/secure",
    ({ set, headers }) => {
      return { set: set.status };
    },
    {
      isAuth: true,
    },
  )

  // mount modules (1 Elysia instance per module / controller)
  .use(authController)
  .listen(3000);

console.log("🚀 Server: http://localhost:3000");
