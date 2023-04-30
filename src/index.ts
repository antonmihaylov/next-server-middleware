import type { NextRequest, NextResponse } from "next/server";

import { Middleware, RequestHandler } from "./types";

export function withMiddlewares<
  T1 extends NextRequest,
  T2 extends NextRequest,
  T3 extends NextRequest,
  T4 extends NextRequest,
  T5 extends NextRequest,
  T6 extends NextRequest,
  T7 extends NextRequest,
  T8 extends NextRequest
>(
  middleware1: Middleware<NextRequest, T1>,
  middleware2: Middleware<T1, T2>,
  middleware3: Middleware<T2, T3>,
  middleware4: Middleware<T3, T4>,
  middleware5: Middleware<T4, T5>,
  middleware6: Middleware<T5, T6>,
  middleware7: Middleware<T6, T7>,
  middleware8: Middleware<T7, T8>,
  handler: RequestHandler<T8>
): RequestHandler<NextRequest>;

export function withMiddlewares<
  T1 extends NextRequest,
  T2 extends NextRequest,
  T3 extends NextRequest,
  T4 extends NextRequest,
  T5 extends NextRequest,
  T6 extends NextRequest,
  T7 extends NextRequest
>(
  middleware1: Middleware<NextRequest, T1>,
  middleware2: Middleware<T1, T2>,
  middleware3: Middleware<T2, T3>,
  middleware4: Middleware<T3, T4>,
  middleware5: Middleware<T4, T5>,
  middleware6: Middleware<T5, T6>,
  middleware7: Middleware<T6, T7>,
  handler: RequestHandler<T7>
): RequestHandler<NextRequest>;

export function withMiddlewares<
  T1 extends NextRequest,
  T2 extends NextRequest,
  T3 extends NextRequest,
  T4 extends NextRequest,
  T5 extends NextRequest,
  T6 extends NextRequest
>(
  middleware1: Middleware<NextRequest, T1>,
  middleware2: Middleware<T1, T2>,
  middleware3: Middleware<T2, T3>,
  middleware4: Middleware<T3, T4>,
  middleware5: Middleware<T4, T5>,
  middleware6: Middleware<T5, T6>,
  handler: RequestHandler<T6>
): RequestHandler<NextRequest>;

export function withMiddlewares<
  T1 extends NextRequest,
  T2 extends NextRequest,
  T3 extends NextRequest,
  T4 extends NextRequest,
  T5 extends NextRequest
>(
  middleware1: Middleware<NextRequest, T1>,
  middleware2: Middleware<T1, T2>,
  middleware3: Middleware<T2, T3>,
  middleware4: Middleware<T3, T4>,
  middleware5: Middleware<T4, T5>,
  handler: RequestHandler<T5>
): RequestHandler<NextRequest>;

export function withMiddlewares<
  T1 extends NextRequest,
  T2 extends NextRequest,
  T3 extends NextRequest,
  T4 extends NextRequest
>(
  middleware1: Middleware<NextRequest, T1>,
  middleware2: Middleware<T1, T2>,
  middleware3: Middleware<T2, T3>,
  middleware4: Middleware<T3, T4>,
  handler: RequestHandler<T4>
): RequestHandler<NextRequest>;

export function withMiddlewares<
  T1 extends NextRequest,
  T2 extends NextRequest,
  T3 extends NextRequest
>(
  middleware1: Middleware<NextRequest, T1>,
  middleware2: Middleware<T1, T2>,
  middleware3: Middleware<T2, T3>,
  handler: RequestHandler<T3>
): RequestHandler<NextRequest>;

export function withMiddlewares<T1 extends NextRequest, T2 extends NextRequest>(
  middleware1: Middleware<NextRequest, T1>,
  middleware2: Middleware<T1, T2>,
  handler: RequestHandler<T2>
): RequestHandler<NextRequest>;

export function withMiddlewares<T1 extends NextRequest>(
  middleware1: Middleware<NextRequest, T1>,
  handler: RequestHandler<T1>
): RequestHandler<NextRequest>;

export function withMiddlewares(
  ...middlewares: Array<Middleware<NextRequest, NextRequest>>
): RequestHandler<NextRequest> {
  const [handler] = middlewares.splice(-1, 1) as [RequestHandler<NextRequest>];
  return async (request: NextRequest) => {
    let next: RequestHandler<NextRequest> = handler;

    for (let i = middlewares.length - 1; i >= 0; i--) {
      const middleware = middlewares[i];
      next = middleware.bind(null, request, next);
    }

    return next(request);
  };
}

export * from "./types";
export * from "./withErrorHandling";
