import { NextResponse } from "next/server";

import type { Middleware, RequestData } from "../src";
import { withErrorHandling, withMiddlewares } from "../src";

export interface AuthData extends RequestData {
  authToken: string;
}

export const withAuth = (): Middleware<AuthData> => async (request, next) => {
  const authToken = request.headers.get("authorization");

  if (!authToken) {
    return NextResponse.json(
      { error: "No authorization token provided" },
      { status: 401 }
    );
  }

  request.authToken = authToken;

  return next();
};

// Usage:
export const GET = withMiddlewares(
  withErrorHandling(),
  withAuth(),
  async (request) => {
    console.log(request.authToken);
    return NextResponse.json({ message: "Hello world!" });
  }
);
