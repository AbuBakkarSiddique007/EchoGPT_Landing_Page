import Link from "next/link";
import Image from "next/image";
import {
  ADD_TO_CHROME_HREF,
  API_REFERENCE_HREF,
  DOCS_HREF,
  GITHUB_HREF,
  WEB_APP_HREF,
} from "@/lib/links";

const PRODUCT_LINKS = [
  { label: "Web Chat", href: WEB_APP_HREF },
  { label: "Chrome Extension", href: ADD_TO_CHROME_HREF },
  { label: "Compare Mode", href: "#compare" },
  { label: "Studios", href: "#features" },
  { label: "Pricing", href: "#pricing" },
];

const MODEL_LINKS = [
  { label: "DeepSeek V4", href: "#models" },
  { label: "GPT-5.6", href: "#models" },
  { label: "Gemini 3.8", href: "#models" },
  { label: "Qwen 3.8", href: "#models" },
  { label: "Kimi K3", href: "#models" },
];

const DEV_LINKS = [
  { label: "API Reference", href: API_REFERENCE_HREF },
  { label: "Documentation", href: DOCS_HREF },
  { label: "GitHub", href: GITHUB_HREF },
];

const CONNECT_LINKS = [
  { label: "Discord", href: "https://discord.com/invite/JG8SXMtaeH" },
  { label: "Facebook", href: "https://www.facebook.com/echogptlive" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href?: string }[];
}) {
  return (
    <div>
      <h3 className="font-mono text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) =>
          link.href ? (
            <li key={link.label}>
              <Link
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ) : (
            <li
              key={link.label}
              className="text-sm text-muted-foreground/75"
            >
              {link.label}
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer
      id="footer"
      className="border-t border-border bg-background/40 pb-10"
    >
      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr]">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link
              href="#top"
              aria-label="EchoGPT - Home"
              className="inline-flex items-center gap-2.5 rounded-full focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Image
                src="/logo-echogpt.svg"
                alt="EchoGPT logo"
                width={40}
                height={40}
                className="size-10 rounded-full"
              />
              <span className="font-heading text-lg font-bold tracking-tight text-foreground">
                Echo
                <span className="[background-image:var(--echo-gradient-primary)] bg-clip-text text-transparent">
                  GPT
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-pretty text-sm text-muted-foreground">
              The unified AI workspace by AppifyDevs.
            </p>
            <p className="mt-3 font-mono text-xs text-muted-foreground/80">
              38+ frontier models / one interface.
            </p>
          </div>

          <FooterColumn title="Product" links={PRODUCT_LINKS} />
          <FooterColumn title="Models" links={MODEL_LINKS} />
          <FooterColumn title="Developers" links={DEV_LINKS} />
          <FooterColumn title="Connect" links={CONNECT_LINKS} />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 EchoGPT | Developed by AppifyDevs.</p>
          <p className="font-mono">38+ models / one API / &lt;0.8s</p>
        </div>
      </div>
    </footer>
  );
}