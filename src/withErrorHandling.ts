import { NextResponse } from "next/server";

import type { Middleware } from "./types";

export interface WithErrorHandlingOptions {
  errorFactory?: (
    error: unknown,
    options: Omit<WithErrorHandlingOptions, "errorFactory">
  ) => NextResponse;
  errorStatus?: number;
}

const defaultErrorFactory = (
  error: unknown,
  { errorStatus = 500 }: Omit<WithErrorHandlingOptions, "errorFactory"> = {}
) => NextResponse.json(error, { status: errorStatus });

export const withErrorHandling =
  ({
    errorFactory = defaultErrorFactory,
    errorStatus = 500,
  }: WithErrorHandlingOptions = {}): Middleware =>
  async (request, next) => {
    try {
      return await next();
    } catch (e) {
      const endpointName = `${request.method} ${request.nextUrl.pathname}`;
      console.error(`API error: ${endpointName}`, e);
      return errorFactory(e, { errorStatus });
    }
  };
