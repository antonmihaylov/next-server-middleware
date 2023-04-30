import type { NextRequest } from "next/server";

import type { Middleware, NextHandler, RequestHandler } from "./types";

export function withMiddlewares<
  T1 extends NextRequest,
  T2 extends NextRequest,
  T3 extends NextRequest,
  T4 extends NextRequest,
  T5 extends NextRequest,
  T6 extends NextRequest,
  T7 extends NextRequest,
  T8 extends NextRequest,
  TParams = Record<string, unknown>
>(
  middleware1: Middleware<NextRequest, TParams>,
  middleware2: Middleware<T1, TParams>,
  middleware3: Middleware<T2, TParams>,
  middleware4: Middleware<T3, TParams>,
  middleware5: Middleware<T4, TParams>,
  middleware6: Middleware<T5, TParams>,
  middleware7: Middleware<T6, TParams>,
  middleware8: Middleware<T7, TParams>,
  handler: RequestHandler<T8, TParams>
): RequestHandler<NextRequest, TParams>;

export function withMiddlewares<
  T1 extends NextRequest,
  T2 extends NextRequest,
  T3 extends NextRequest,
  T4 extends NextRequest,
  T5 extends NextRequest,
  T6 extends NextRequest,
  T7 extends NextRequest,
  TParams = Record<string, unknown>
>(
  middleware1: Middleware<NextRequest, TParams>,
  middleware2: Middleware<T1, TParams>,
  middleware3: Middleware<T2, TParams>,
  middleware4: Middleware<T3, TParams>,
  middleware5: Middleware<T4, TParams>,
  middleware6: Middleware<T5, TParams>,
  middleware7: Middleware<T6, TParams>,
  handler: RequestHandler<T7, TParams>
): RequestHandler<NextRequest, TParams>;

export function withMiddlewares<
  T1 extends NextRequest,
  T2 extends NextRequest,
  T3 extends NextRequest,
  T4 extends NextRequest,
  T5 extends NextRequest,
  T6 extends NextRequest,
  TParams = Record<string, unknown>
>(
  middleware1: Middleware<NextRequest, TParams>,
  middleware2: Middleware<T1, TParams>,
  middleware3: Middleware<T2, TParams>,
  middleware4: Middleware<T3, TParams>,
  middleware5: Middleware<T4, TParams>,
  middleware6: Middleware<T5, TParams>,
  handler: RequestHandler<T6, TParams>
): RequestHandler<NextRequest, TParams>;

export function withMiddlewares<
  T1 extends NextRequest,
  T2 extends NextRequest,
  T3 extends NextRequest,
  T4 extends NextRequest,
  T5 extends NextRequest,
  TParams = Record<string, unknown>
>(
  middleware1: Middleware<NextRequest, TParams>,
  middleware2: Middleware<T1, TParams>,
  middleware3: Middleware<T2, TParams>,
  middleware4: Middleware<T3, TParams>,
  middleware5: Middleware<T4, TParams>,
  handler: RequestHandler<T5, TParams>
): RequestHandler<NextRequest, TParams>;

export function withMiddlewares<
  T1 extends NextRequest,
  T2 extends NextRequest,
  T3 extends NextRequest,
  T4 extends NextRequest,
  TParams = Record<string, unknown>
>(
  middleware1: Middleware<NextRequest, TParams>,
  middleware2: Middleware<T1, TParams>,
  middleware3: Middleware<T2, TParams>,
  middleware4: Middleware<T3, TParams>,
  handler: RequestHandler<T4, TParams>
): RequestHandler<NextRequest, TParams>;

export function withMiddlewares<
  T1 extends NextRequest,
  T2 extends NextRequest,
  T3 extends NextRequest,
  TParams = Record<string, unknown>
>(
  middleware1: Middleware<NextRequest, TParams>,
  middleware2: Middleware<T1, TParams>,
  middleware3: Middleware<T2, TParams>,
  handler: RequestHandler<T3, TParams>
): RequestHandler<NextRequest, TParams>;

export function withMiddlewares<
  T1 extends NextRequest,
  T2 extends NextRequest,
  TParams = Record<string, unknown>
>(
  middleware1: Middleware<NextRequest, TParams>,
  middleware2: Middleware<T1, TParams>,
  handler: RequestHandler<T2, TParams>
): RequestHandler<NextRequest, TParams>;

export function withMiddlewares<
  T1 extends NextRequest,
  TParams = Record<string, unknown>
>(
  middleware1: Middleware<NextRequest, TParams>,
  handler: RequestHandler<T1, TParams>
): RequestHandler<NextRequest, TParams>;

export function withMiddlewares(
  ...middlewaresInput: Array<
    Middleware<NextRequest> | RequestHandler<NextRequest>
  >
): RequestHandler<NextRequest> {
  const [handler] = middlewaresInput.splice(-1, 1) as [
    RequestHandler<NextRequest>
  ];
  const middlewares = middlewaresInput as Array<Middleware<NextRequest>>;

  return async (
    request: NextRequest,
    params: Record<string, unknown> | undefined
  ) => {
    params ??= {} as Record<string, unknown>;

    let next: NextHandler = () => handler(request, params!);

    for (let i = middlewares.length - 1; i >= 0; i--) {
      const middleware = middlewares[i];
      next = middleware.bind(null, request, next, params);
    }

    return next();
  };
}

export * from "./types";
export * from "./withErrorHandling";
