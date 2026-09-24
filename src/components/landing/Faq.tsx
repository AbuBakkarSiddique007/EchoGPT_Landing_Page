import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS: { question: string; answer: string }[] = [
  {
    question: "What is EchoGPT and how does it give me access to 38+ models?",
    answer:
      "EchoGPT aggregates the world's most capable foundation models under one unified interface, routing your prompt to the best model or letting you pick manually.",
  },
  {
    question: "How does the Chrome Extension work?",
    answer:
      "The extension works anywhere in your browser. Press Alt + E or click the sidebar to summarize articles, compose emails in Gmail, explain code on GitHub, and chat with AI without switching tabs.",
  },
  {
    question: "Can I use EchoGPT for free?",
    answer:
      "Yes! Free users get instant access to the core EchoGPT model and daily query quotas without entering a credit card.",
  },
  {
    question: "Is my private data used to train the models?",
    answer:
      "No. EchoGPT uses enterprise zero-data retention endpoints to ensure your code, documents, and prompts remain 100% private.",
  },
  {
    question: "How do I get an API key?",
    answer:
      "Pro and Developer users can generate API keys directly in the dashboard to integrate EchoGPT into their own applications.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-xs tracking-[0.22em] text-accent-foreground uppercase">
            {"// FAQ"}
          </span>
          <h2 className="text-balance mt-4 text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            Straight answers, zero fluff.
          </h2>
          <p className="text-pretty mt-5 text-base text-muted-foreground sm:text-lg">
            Model access, the Chrome extension, privacy, and API keys - answered
            in plain terms.
          </p>
        </div>

        <div className="relative isolate mt-16">
          <div
            aria-hidden
            className="bg-dot-grid absolute inset-x-0 -top-12 -bottom-16 -z-10 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_45%,#000_25%,transparent_78%)]"
          />
          <Accordion
            className="mx-auto max-w-3xl border-y border-border"
          >
            {FAQS.map((faq) => (
              <AccordionItem
                key={faq.question}
                value={faq.question}
                className="border-border"
              >
                <AccordionTrigger className="rounded-none py-5 text-base hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden">
                  <span className="text-foreground">{faq.question}</span>
                  <span
                    aria-hidden
                    className="ml-auto pl-6 font-mono text-xl leading-none text-accent-foreground transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-45"
                  >
                    +
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 pr-6 text-muted-foreground lg:pr-16">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}