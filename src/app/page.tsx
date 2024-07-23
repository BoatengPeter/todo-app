import { Button } from "~/components/ui/button";
import Header from "./_components/Header";

export default function HomePage() {
  return (
    <main className="w-full h-full">
      <Header />
      <h1 className="text-3xl font-semibold text-slate-700">StAy of ToP of your TaSks </h1>
      <div className="w-full grid place-items-center">

        <Button>start for free</Button>
      </div>
    </main>
  );
}
