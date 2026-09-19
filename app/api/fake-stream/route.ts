// app/api/fake-stream/route.ts
export async function GET() {
  const encoder = new TextEncoder();
  const words = "Sure, here's how streaming works in a chat interface".split(
    " ",
  );

  const stream = new ReadableStream({
    async start(controller) {
      for (const word of words) {
        controller.enqueue(encoder.encode(word + " "));
        await new Promise((r) => setTimeout(r, 200)); // simulate token delay
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain" },
  });
}
