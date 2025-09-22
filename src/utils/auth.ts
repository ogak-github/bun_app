import { resolve } from "bun";
import Elysia from "elysia";
import { AuthService } from "../modules/auth/auth.service";
import { ResponseModel } from "../common/response.model";

export const authorizationPlugin = new Elysia().macro({
  isAuth: (enabled: true) => ({
    resolve: ({ set, headers }) => {
      const authorization = headers["authorization"];
      if (!authorization) {
        set.status = "Unauthorized";
        return ResponseModel.createResponse({
          message: "Unauthorized Access",
          error: {
            code: set.status,
            details: "Unauthorized",
          },
        });
      }

      const [bearer, token] = authorization.split(" ");

      if (bearer !== "Bearer" || !token) {
        set.status = "Unauthorized";
        return ResponseModel.createResponse({
          message: "Unauthorized Access",
          error: {
            code: set.status,
            details: "Unauthorized",
          },
        });
      }

      try {
        if (token === "GENERATED_TOKEN") {
        }

        set.status = "Unauthorized";
        return ResponseModel.createResponse({
          message: "Unauthorized Access",
          error: {
            code: set.status,
            details: "Unauthorized",
          },
        });
      } catch (err) {
        return ResponseModel.createResponse({
          message: "Internal Server Error",
          error: {
            code: (set.status = "Internal Server Error"),
            details: "Server Side Error",
          },
        });
      }
    },
  }),
});
