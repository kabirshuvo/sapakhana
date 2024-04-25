import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/modeToggle";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <nav>
        <ModeToggle />
      </nav>
      <h1>Sapakhana With shadcn</h1>

      <Button variant={"default"}>ShadCN Button</Button>
    </main>
  );
}
