// This is common result for success or error from Services

import { t } from "elysia";

export namespace ResultModel {
  export const result = t.Object({
    success: t.Boolean(),
    data: t.Optional(t.Any()),
    error: t.Optional(t.Any()),
  });

  export type Result = typeof result.static;
}
