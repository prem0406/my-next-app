import Link from "next/link";

export default function Home() {
  return (
    <div className="px-20 pt-10">
      <p className="text-center text-xl font-bold">Home Page</p>
      <div className="flex flex-col mt-4 gap-y-4">
        <Link href="/products" className="text-blue-500">
          Go to Product Page
        </Link>
        <Link href="/stream-demo" className="text-blue-500">
          Go to Stream Demo Page
        </Link>
      </div>
    </div>
  );
}
