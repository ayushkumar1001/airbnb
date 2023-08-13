import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1>Lucifer.ai</h1>
      <p>An open source AI for the masses</p>
      <Button>Get Started</Button>
    </div>
  );
}
