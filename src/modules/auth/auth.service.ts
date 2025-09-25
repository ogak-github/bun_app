import { ResultModel } from "../../common/result.model";
import type { AuthModel } from "./auth.model";

export abstract class AuthService {
  static async login(
    { username, password }: AuthModel.LoginBody,
    sign: (payload: Record<string, string | number>) => Promise<string>,
  ): Promise<ResultModel.Result> {
    try {
      if (username === "bulys" && password === "secrets") {
        const user = {
          username: "bulys",
          full_name: "Bun Elysia",
        };
        const token = await sign(user);

        return {
          success: true,
          data: {
            user,
            token,
          },
        };
      } else if (username === "notelys" && password === "secrets") {
        const user = {
          username: "notelys",
          full_name: "Not Bun Elysia",
        };
        const token = await sign(user);

        return {
          success: true,
          data: {
            user,
            token,
          },
        };
      } else {
        return {
          success: false,
          error: "Invalid credentials",
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }
}
