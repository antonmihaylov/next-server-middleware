import type { NextRequest, NextResponse } from "next/server";

export type RequestHandler<T extends NextRequest> = (
  request: T
) => Promise<NextResponse>;
export type Middleware<T extends NextRequest, TNextReq extends NextRequest> = (
  request: T,
  next: RequestHandler<TNextReq>
) => Promise<NextResponse>;
