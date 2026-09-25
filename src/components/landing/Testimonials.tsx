import Image from "next/image";
import { Star } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Echo Compare replaced three browser tabs and a lot of second-guessing. Watch DeepSeek and GPT-5.6 work the same refactor, side by side, and the best answer gets obvious fast.",
    name: "Mariana Rocha",
    role: "Senior Backend Engineer",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    quote:
      "The Chrome sidepanel is my daily driver. I summarize articles and drafts in seconds without leaving the page I am working on.",
    name: "Ken Okonjo",
    role: "Startup Founder",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote:
      "I used to cross-check every claim across four chat apps. EchoGPT puts all 38+ models in one interface, so the verification loop finally ended.",
    name: "Sofia Lindgren",
    role: "Content Researcher",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    quote:
      "The developer-grade API is the sleeper feature. One unified endpoint answers to every frontier model - our integration took an afternoon.",
    name: "Ji-woo Park",
    role: "Staff Frontend Engineer",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    quote:
      "Sub-second first-token latency changes how we plan sprints. We prototype against the full model roster instead of guessing which one is right.",
    name: "Aisha Bello",
    role: "Product Manager",
    avatar: "https://randomuser.me/api/portraits/women/79.jpg",
  },
  {
    quote:
      "The collapsible reasoning timeline makes it easy to trust the output. I can see how the model thought before I pass it downstream.",
    name: "Lukas Novak",
    role: "Data Scientist",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-xs tracking-[0.22em] text-accent-foreground uppercase">
            {"// Testimonials"}
          </span>
          <h2 className="text-balance mt-4 text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            Loved by builders, researchers, and founders.
          </h2>
          <p className="text-pretty mt-5 text-base text-muted-foreground sm:text-lg">
            From the first message to the full API - here is what the community
            says after switching.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-sm text-muted-foreground">
          <span className="font-mono text-base font-semibold text-foreground">
            4.9/5
          </span>
          <span aria-hidden className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className="size-4 fill-current text-ember"
              />
            ))}
          </span>
          <span>Rating on Chrome Store</span>
          <span aria-hidden className="text-foreground/30">
            -
          </span>
          <span>50,000+ Active Users</span>
        </div>

        <div className="relative isolate mt-14">
          <div
            aria-hidden
            className="bg-dot-grid absolute inset-x-0 -top-12 -bottom-16 -z-10 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_45%,#000_25%,transparent_78%)]"
          />
          <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((testimonial) => (
              <figure
                key={testimonial.name}
                className="flex h-full flex-col rounded-lg border border-border bg-card p-7 transition-colors duration-300 hover:border-[var(--border-strong)]"
              >
                <span
                  aria-hidden
                  className="font-mono text-lg leading-none text-accent-foreground"
                >
                  {"\u201C"}</span>
                <blockquote className="text-pretty mt-3 flex-1 text-sm text-foreground/80">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-6 flex min-w-0 items-center gap-3 border-t border-border pt-5">
                  <span className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 font-mono text-sm font-semibold text-accent-foreground ring-1 ring-border">
                    <Image
                      src={testimonial.avatar}
                      alt={`${testimonial.name} profile photo`}
                      width={80}
                      height={80}
                      className="rounded-full object-cover"
                    />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}