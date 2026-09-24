import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center justify-center gap-4 sm:items-start">
          <h1 className="text-5xl font-extrabold tracking-tight text-black dark:text-white sm:text-7xl">
            EchoGPT
          </h1>
          <p className="text-lg text-zinc-700 dark:text-zinc-400 sm:text-xl">
            A simple and intuitive AI-powered chatbot that helps you with your
            daily tasks.
          </p>
          <Button>Get Started</Button>
        </div>
      </main>
    </div>
  );
}
