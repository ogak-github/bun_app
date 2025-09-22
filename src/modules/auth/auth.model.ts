// src/modules/auth/model.ts
import { t } from "elysia";
import { ResponseModel } from "../../common/response.model";

export namespace AuthModel {
  export const loginBody = t.Object({
    username: t.String({ error: "username required" }),
    password: t.String({ error: "password required" }),
  });
  export type LoginBody = typeof loginBody.static;

  export const loginResponse = ResponseModel.apiResponse;
}
