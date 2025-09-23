import { Elysia, t } from "elysia";
import { AuthService } from "./auth.service";
import { AuthModel } from "./auth.model";
import { ResponseModel } from "../../common/response.model";
import { authorizationPlugin } from "../../utils/auth";

export const authController = new Elysia({ prefix: "/auth" })
  .use(authorizationPlugin)
  .post(
    "/login",
    async ({ body }) => {
      const startTime = Date.now();

      const response = await AuthService.login(body);

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
