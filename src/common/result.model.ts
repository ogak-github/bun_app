// This is common result for success or error from Services
// If success true show data, if success false show error instead.

import { t } from "elysia";

export namespace ResultModel {
  export const result = t.Object({
    success: t.Boolean(),
    data: t.Optional(t.Any()),
    error: t.Optional(t.Any()),
  });

  export type Result = typeof result.static;
}
