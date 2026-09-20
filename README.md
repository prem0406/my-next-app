# My Next App

A small Next.js app demonstrating core App Router features, data fetching, streaming, and cache revalidation patterns.

## Included demos

- Home page with links to the main example pages
- Product listing page using the FakeStore API
- Product detail page with delayed fetch and Suspense fallback
- Counter page showing a client-side state example with hydration-safe date rendering
- Streaming demo that reads chunks from a fake SSE-like stream endpoint
- Revalidation API route for cache invalidation

## Project structure

```bash
app/
  api/
    fake-stream/route.ts
    revalidate/route.ts
  components/
    StreamDemo.tsx
  counter/page.tsx
  products/page.tsx
  products/[id]/page.tsx
  stream-demo/page.tsx
  page.tsx
```

## Getting started

Install dependencies:

```bash
npm install
```

Run the app in development mode:

```bash
npm run dev
```

Then open: http://localhost:3000

## Available scripts

```bash
npm run dev     # start the Next.js dev server
npm run build   # production build
npm run start   # run the built app
npm run lint    # run ESLint
```

## Features in detail

### Product pages

The products page fetches data from FakeStore and renders a list of products. Each item links to a dynamic product detail page.

### Streaming demo

The streaming page uses a client component that requests `/api/fake-stream` and appends the response as chunks arrive.

### Cache revalidation

The API route at `/api/revalidate` accepts a JSON payload like this:

```json
{
  "path": "/products",
  "secret": "your-secret-value"
}
```

It requires the `REVALIDATE_SECRET` environment variable to be set before the request is accepted.

## Environment variable

For the revalidation endpoint:

```bash
REVALIDATE_SECRET=your-secret-value
```

## Notes

This app is intended as a learning/demo project for:

- App Router routing
- Server components and Suspense
- Streaming responses
- Basic API route usage
- Cache invalidation in Next.js
