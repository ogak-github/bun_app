import jwt from "@elysiajs/jwt";
import { ResultModel } from "../../common/result.model";
import type { AuthModel } from "./auth.model";

export abstract class AuthService {
  static async login({
    username,
    password,
  }: AuthModel.LoginBody): Promise<ResultModel.Result> {
    try {
      if (username === "bulys" && password === "secrets") {
        return {
          success: true,
          data: {
            user: {
              username: "bulys",
              full_name: "Bun Elysia",
            },
            token: "GENERATED_TOKEN",
          },
        };
      } else {
        return {
          success: false,
          error: "Invalid username or password",
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  static async verifyAuth({ token }: { token: string }): Promise<Boolean> {
    if (token == "GENERATED_TOKEN") {
      return true;
    }
    return false;
  }
}
