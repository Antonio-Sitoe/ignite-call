import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-full items-center justify-center">
      <div>
        <input type="text" className="border" />
        <Link
          className="flex flex-row justify-center items-center p-3 gap-2 w-96 h-12 bg-gray-600 rounded-md"
          href="/register?username=dsds"
        >
          Ir
        </Link>
      </div>
    </main>
  );
}
