import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="font-bold">Hello world</h1>
      <Link href={"users"}>UsersPage</Link>
    </main>
  );
}
