import type { NextResponse } from "next/server";

import type { Middleware } from "./types";

export interface WithErrorHandlingOptions {
  errorFactory: (
    error: unknown,
    options: Omit<WithErrorHandlingOptions, "errorFactory">
  ) => NextResponse;
  errorStatus?: number;
}

// Importing NextResponse from next/server causes the app to crash
export const makeDefaultErrorFactory =
  ({ ResponseObj }: { ResponseObj: typeof NextResponse }) =>
  (
    error: unknown,
    { errorStatus = 500 }: Omit<WithErrorHandlingOptions, "errorFactory"> = {}
  ) =>
    ResponseObj.json(error, { status: errorStatus });

export const withErrorHandling =
  ({ errorFactory, errorStatus = 500 }: WithErrorHandlingOptions): Middleware =>
  async (request, next) => {
    try {
      return await next();
    } catch (e) {
      const endpointName = `${request.method} ${request.nextUrl.pathname}`;
      console.error(`API error: ${endpointName}`, e);
      return errorFactory(e, { errorStatus });
    }
  };
