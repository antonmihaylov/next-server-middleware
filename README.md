# Next Server Middleware

A simple type-safe express-like middleware for Next.js api routes using app directory and next/server.

## Installation

```bash
npm install next-server-middleware
```

or

```bash
yarn add next-server-middleware
```

or

```bash
pnpm add next-server-middleware
```


## Usage
1. Create a middleware function 

Similar to express, a middleware function is a function that takes a request and a next function and can affect the request and response.
What's different is that we don't get the response as a parameter, but only get it after awaiting next, which is in line with how new Next.js api routes work.
```ts
// withLogging.ts
export const withLogging = (): Middleware<NextRequest, NextRequest> => async (request, next) => {
  const endpointName = `${request.method} ${request.nextUrl.pathname}`
  console.log(`API request: ${endpointName}`)
  const response = await next(request)
  console.log(`API response: ${endpointName} ${response.status}`)
  return response
}
```


2. Add middlewares to your api route using `withMiddlewares`
```ts
// app/api/hello.ts
import { withMiddlewares } from 'next-server-middleware'

import { withLogging } from './withLogging'

export const GET = withMiddlewares(
  withLogging(), 
  (request) =>  NextResponse.json({hello: 'world',})
)
````


## Example middlewares

- Error handling: [src/withErrorHandling.ts](src/withErrorHandling.ts)
- Auth: [examples/withAuth.ts](examples/withAuth.ts)