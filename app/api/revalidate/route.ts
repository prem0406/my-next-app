// app/api/revalidate/route.ts

/**
 * This hook can be used to revalidate a specific path in your Next.js application.
 * It is typically used in conjunction with a secret to ensure that only authorized requests can trigger the revalidation process.
 *
 * Usage:
 * 1. Set an environment variable `REVALIDATE_SECRET` with a secret value.
 * 2. Make a POST request to this endpoint with a JSON body containing the `path` to revalidate and the `secret`.
 *
 * Example request body:
 * {
 *   "path": "/products",
 *   "secret": "your-secret-value"
 * }
 *
 *
 * curl -X POST http://localhost:3000/api/revalidate   -H "Content-Type: application/json"   -d '{"path": "/products", "secret": "my-test-secret"}'
 */

import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const { path, secret } = await req.json();

  // Basic protection so randoms can't hit your endpoint
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  if (!path) {
    return NextResponse.json({ message: "Missing path" }, { status: 400 });
  }

  revalidatePath(path);

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
