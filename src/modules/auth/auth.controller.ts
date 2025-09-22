// src/modules/auth/index.ts
import { Elysia, t } from "elysia";
import { AuthService } from "./auth.service";
import { AuthModel } from "./auth.model";
import { ResponseModel } from "../../common/response.model";
import { authorizationPlugin } from "../../utils/auth";

export const authController = new Elysia({ prefix: "/auth" })
  .mount(authorizationPlugin)
  .post(
    "/login",
    async ({ body }) => {
      const startTime = Date.now();

      const response = await AuthService.login(body);

      if (response.success === true) {
        return ResponseModel.createResponse({
          message: "Login Success",
          data: response.data,
          meta: {
            response_time: Date.now() - startTime,
          },
        });
      } else {
        return ResponseModel.createResponse({
          message: "Login Failed",
          error: {
            code: "AUTH_FAILED",
            details: response.error,
          },
          meta: {
            response_time: Date.now() - startTime,
          },
        });
      }
    },
    {
      body: AuthModel.loginBody,
      response: ResponseModel.apiResponse,
    },
  );
