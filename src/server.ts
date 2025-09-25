// NOTE: You can add logger like pino, since this app will run with multiple thread

// src/server.ts
import { Elysia } from "elysia";
import { authController } from "./modules/auth/auth.controller";
import { ResponseModel } from "./common/response.model";
import { authorizationPlugin, permissionPlugin } from "./utils/auth";
import serverTiming from "@elysiajs/server-timing";

export const app = new Elysia()
  // for auditing performance bottlenecks using Server Timing API
  .use(serverTiming())
  // authorization macro => add isAuth: true, for secured path

  // Global error formatter: onError receives { code, error }
  .onError(({ code, error }: any) => {
    const isValidation = code === "VALIDATION";
    if (isValidation) {
      return ResponseModel.createResponse({
        error: {
          code: error?.code ?? "INTERNAL_ERROR",
          message:
            error?.customError ?? error?.message ?? "Something went wrong",
        },
      });
    }
  })
  .use(authorizationPlugin)
  // health
  .get("/", () => {
    return { message: "Server is running" };
  })
  .get(
    "/staff",
    () => {
      return { message: "Hello, Staff" };
    },
    {
      isAuth: true,
    },
  )
  .use(permissionPlugin)
  .get(
    "/secure",
    () => {
      return { message: "Access Allowed" };
    },
    {
      isAuth: true,
      isAdmin: true,
    },
  )

  // mount modules (1 Elysia instance per module / controller)
  .use(authController);
