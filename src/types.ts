import type { NextRequest, NextResponse } from "next/server";

export type RequestHandler<
  T extends NextRequest,
  TParams = Record<string, unknown>
> = (request: T, params: TParams) => Promise<NextResponse>;

export type NextHandler = () => Promise<NextResponse>;

export type Middleware<
  T extends NextRequest,
  TParams = Record<string, unknown>
> = (request: T, next: NextHandler, params: TParams) => Promise<NextResponse>;
