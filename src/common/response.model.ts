import { t } from "elysia";

export namespace ResponseModel {
  export const pagination = t.Optional(
    t.Object({
      limit: t.Optional(t.Number()),
      offset: t.Optional(t.Number()),
      page: t.Optional(t.Number({ description: "Current page" })),
      has_next_page: t.Optional(t.Boolean()),
      has_prev_page: t.Optional(t.Boolean()),
    }),
  );

  export const apiResponse = t.Object({
    success: t.Boolean({ default: true }),
    message: t.Optional(
      t.String({ description: "Return message of the API response" }),
    ),
    data: t.Optional(t.Any({ description: "return API data" })),
    error: t.Optional(
      t.Object({
        code: t.String(),
        message: t.Optional(t.String()),
      }),
    ),
    meta: t.Optional(
      t.Object({
        pagination: pagination,
        total_items: t.Optional(t.Number()),
        response_time: t.Optional(t.Number()),
      }),
    ),
  });

  export type ApiResponse = typeof apiResponse.static;

  /// Helper
  export function createResponse<T>(params: {
    data?: T;
    message?: string;
    error?: { code: string; message?: string };
    meta?: ResponseModel.ApiResponse["meta"];
  }): ResponseModel.ApiResponse {
    return {
      success: !params.error,
      message: params.message,
      data: params.data,
      error: params.error,
      meta: params.meta,
    };
  }
}
