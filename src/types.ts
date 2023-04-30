import type { NextRequest, NextResponse } from "next/server";

export type RequestData = Record<string, unknown>;

export type RequestHandler<
  T extends NextRequest = NextRequest,
  TParams = Record<string, unknown>
> = (request: T, params: TParams) => Promise<NextResponse>;

export type NextHandler = () => Promise<NextResponse>;

export type Middleware<
  TExtraData extends RequestData = RequestData,
  TParams = Record<string, unknown>
> = (
  request: NextRequest & Partial<TExtraData>,
  next: NextHandler,
  params: TParams
) => Promise<NextResponse>;
