import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col w-screen h-screen items-center justify-center gap-4">
        <h1 className="text-6xl">Joelbanken</h1>

        <Link href="/createaccount">
          <button className="btn">Join</button>
        </Link>
      </div>
    </div>
  );
}
