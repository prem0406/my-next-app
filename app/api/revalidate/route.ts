// app/api/revalidate/route.ts

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
