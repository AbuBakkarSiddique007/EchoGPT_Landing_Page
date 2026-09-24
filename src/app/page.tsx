import { Navbar } from "@/components/landing/Navbar";

export default function Home() {
  return (
    <div id="top" className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1" />
    </div>
  );
}