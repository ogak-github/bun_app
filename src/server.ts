// src/server.ts
import { Elysia, status } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { authController } from "./modules/auth/auth.controller";
import { ResponseModel } from "./common/response.model";
import { authorizationPlugin } from "./utils/auth";

const app = new Elysia()
  .use(authorizationPlugin)
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

  // health
  .get("/", () => {
    return { message: "Server is running" };
  })
  .get(
    "/secure",
    () => {
      return { message: "Access Allowed" };
    },
    {
      isAuth: true,
    },
  )

  // mount modules (1 Elysia instance per module / controller)
  .use(authController)
  .listen(3000);

console.log("🚀 Server: http://localhost:3000");
