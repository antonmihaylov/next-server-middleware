import type { NextRequest } from "next/server";

import type {
  Middleware,
  NextHandler,
  RequestHandler,
  RequestData,
} from "./types";

export function withMiddlewares<
  TReqData1 extends RequestData,
  TReqData2 extends RequestData,
  TReqData3 extends RequestData,
  TReqData4 extends RequestData,
  TReqData5 extends RequestData,
  TReqData6 extends RequestData,
  TReqData7 extends RequestData,
  TReqData8 extends RequestData,
  TParams = Record<string, unknown>
>(
  middleware1: Middleware<TReqData1, TParams>,
  middleware2: Middleware<TReqData2, TParams>,
  middleware3: Middleware<TReqData3, TParams>,
  middleware4: Middleware<TReqData4, TParams>,
  middleware5: Middleware<TReqData5, TParams>,
  middleware6: Middleware<TReqData6, TParams>,
  middleware7: Middleware<TReqData7, TParams>,
  middleware8: Middleware<TReqData8, TParams>,
  handler: RequestHandler<
    NextRequest &
      TReqData1 &
      TReqData2 &
      TReqData3 &
      TReqData4 &
      TReqData5 &
      TReqData6 &
      TReqData7 &
      TReqData8,
    TParams
  >
): RequestHandler<NextRequest, TParams>;

export function withMiddlewares<
  TReqData1 extends RequestData,
  TReqData2 extends RequestData,
  TReqData3 extends RequestData,
  TReqData4 extends RequestData,
  TReqData5 extends RequestData,
  TReqData6 extends RequestData,
  TReqData7 extends RequestData,
  TParams = Record<string, unknown>
>(
  middleware1: Middleware<TReqData1, TParams>,
  middleware2: Middleware<TReqData2, TParams>,
  middleware3: Middleware<TReqData3, TParams>,
  middleware4: Middleware<TReqData4, TParams>,
  middleware5: Middleware<TReqData5, TParams>,
  middleware6: Middleware<TReqData6, TParams>,
  middleware7: Middleware<TReqData7, TParams>,
  handler: RequestHandler<
    NextRequest &
      TReqData1 &
      TReqData2 &
      TReqData3 &
      TReqData4 &
      TReqData5 &
      TReqData6 &
      TReqData7,
    TParams
  >
): RequestHandler<NextRequest, TParams>;

export function withMiddlewares<
  TReqData1 extends RequestData,
  TReqData2 extends RequestData,
  TReqData3 extends RequestData,
  TReqData4 extends RequestData,
  TReqData5 extends RequestData,
  TReqData6 extends RequestData,
  TParams = Record<string, unknown>
>(
  middleware1: Middleware<TReqData1, TParams>,
  middleware2: Middleware<TReqData2, TParams>,
  middleware3: Middleware<TReqData3, TParams>,
  middleware4: Middleware<TReqData4, TParams>,
  middleware5: Middleware<TReqData5, TParams>,
  middleware6: Middleware<TReqData6, TParams>,
  handler: RequestHandler<
    NextRequest &
      TReqData1 &
      TReqData2 &
      TReqData3 &
      TReqData4 &
      TReqData5 &
      TReqData6,
    TParams
  >
): RequestHandler<NextRequest, TParams>;

export function withMiddlewares<
  TReqData1 extends RequestData,
  TReqData2 extends RequestData,
  TReqData3 extends RequestData,
  TReqData4 extends RequestData,
  TReqData5 extends RequestData,
  TParams = Record<string, unknown>
>(
  middleware1: Middleware<TReqData1, TParams>,
  middleware2: Middleware<TReqData2, TParams>,
  middleware3: Middleware<TReqData3, TParams>,
  middleware4: Middleware<TReqData4, TParams>,
  middleware5: Middleware<TReqData5, TParams>,
  handler: RequestHandler<
    NextRequest & TReqData1 & TReqData2 & TReqData3 & TReqData4 & TReqData5,
    TParams
  >
): RequestHandler<NextRequest, TParams>;

export function withMiddlewares<
  TReqData1 extends RequestData,
  TReqData2 extends RequestData,
  TReqData3 extends RequestData,
  TReqData4 extends RequestData,
  TParams = Record<string, unknown>
>(
  middleware1: Middleware<TReqData1, TParams>,
  middleware2: Middleware<TReqData2, TParams>,
  middleware3: Middleware<TReqData3, TParams>,
  middleware4: Middleware<TReqData4, TParams>,
  handler: RequestHandler<
    NextRequest & TReqData1 & TReqData2 & TReqData3 & TReqData4,
    TParams
  >
): RequestHandler<NextRequest, TParams>;

export function withMiddlewares<
  TReqData1 extends RequestData,
  TReqData2 extends RequestData,
  TReqData3 extends RequestData,
  TParams = Record<string, unknown>
>(
  middleware1: Middleware<TReqData1, TParams>,
  middleware2: Middleware<TReqData2, TParams>,
  middleware3: Middleware<TReqData3, TParams>,
  handler: RequestHandler<
    NextRequest & TReqData1 & TReqData2 & TReqData3,
    TParams
  >
): RequestHandler<NextRequest, TParams>;

export function withMiddlewares<
  TReqData1 extends RequestData,
  TReqData2 extends RequestData,
  TParams = Record<string, unknown>
>(
  middleware1: Middleware<TReqData1, TParams>,
  middleware2: Middleware<TReqData2, TParams>,
  handler: RequestHandler<NextRequest & TReqData1 & TReqData2, TParams>
): RequestHandler<NextRequest, TParams>;

export function withMiddlewares<TParams = Record<string, unknown>>(
  middleware1: Middleware<Record<string, unknown>, TParams>,
  handler: RequestHandler<NextRequest, TParams>
): RequestHandler<NextRequest, TParams>;

export function withMiddlewares(
  ...middlewaresInput: Array<Middleware | RequestHandler>
): RequestHandler {
  const [handler] = middlewaresInput.splice(-1, 1) as [RequestHandler];
  const middlewares = middlewaresInput as Array<Middleware>;

  return async (
    request: NextRequest,
    params: Record<string, unknown> | undefined
  ) => {
    params ??= {} as Record<string, unknown>;

    let next: NextHandler = () => handler(request, params!);

    for (let i = middlewares.length - 1; i >= 0; i--) {
      const middleware = middlewares[i];
      next = middleware.bind(null, request as never, next, params);
    }

    return next();
  };
}

export * from "./types";
export * from "./withErrorHandling";
