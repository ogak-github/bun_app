import { Elysia, t } from "elysia";
import { AuthService } from "./auth.service";
import { AuthModel } from "./auth.model";
import { ResponseModel } from "../../common/response.model";
import { authorizationPlugin } from "../../utils/auth";
import jwt from "@elysiajs/jwt";
import { jwtConfig } from "../../lib/jwt_config";

export const authController = new Elysia({ prefix: "/auth" })
  .use(authorizationPlugin)
  .use(jwtConfig)
  .post(
    "/login",
    async ({ body, jwt }) => {
      const startTime = Date.now();

      const response = await AuthService.login(body, jwt.sign);

      if (response.success === true) {
        return ResponseModel.createResponse({
          message: "Login Success",
          data: response.data,
        });
      } else {
        return ResponseModel.createResponse({
          error: {
            code: "AUTH_FAILED",
            message: response.error,
          },
        });
      }
    },
    {
      body: AuthModel.loginBody,
      response: ResponseModel.apiResponse,
    },
  )
  .get(
    "/profile",
    ({ body }) => {
      return {
        message: "You allowed to visit profile",
      };
    },
    {
      isAuth: true,
    },
  );
