import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => readFileSync(join(root, rel), "utf8");

const tokens = read("src/styles/tokens.css");
const globals = read("src/app/globals.css");
const layout = read("src/app/layout.tsx");
const button = read("src/components/ui/button.tsx");

const checks = [
  {
    name: "tokens.css exists and defines --echo-brand-600 brand violet #7650ec",
    fn: () => assert.match(tokens.toLowerCase(), /--echo-brand-600:\s*#7650ec/),
  },
  {
    name: "tokens.css defines electric blue --echo-azure #4979fb",
    fn: () => assert.match(tokens.toLowerCase(), /--echo-azure:\s*#4979fb/),
  },
  {
    name: "tokens.css defines all four aurora accents",
    fn: () => {
      for (const hex of ["#f7306e", "#00aeff", "#eb78f9", "#f1a455"]) {
        assert.match(tokens.toLowerCase(), new RegExp(hex));
      }
    },
  },
  {
    name: "default (dark) theme background is EchoGPT void #09080e",
    fn: () => assert.match(tokens.toLowerCase(), /--bg-app:\s*#09080e/),
  },
  {
    name: "PRD_01 surfaces and text tokens are present",
    fn: () => {
      for (const needle of ["--bg-sidebar", "--bg-surface", "--bg-input", "--border-subtle", "--text-primary: #f8fafc", "--text-secondary: #94a3b8", "--text-accent: #a78bfa"]) {
        assert.match(tokens.toLowerCase(), new RegExp(needle.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
      }
    },
  },
  {
    name: "tokens.css is portable: contains no @import statements",
    fn: () => assert.doesNotMatch(tokens, /@import/),
  },
  {
    name: "tokens.css supports data-theme light and oled variants",
    fn: () => {
      assert.match(tokens, /\[data-theme="light"\]/);
      assert.match(tokens, /\[data-theme="oled"\]/);
    },
  },
  {
    name: "shadcn contract remaps --primary to brand violet",
    fn: () => assert.match(globals, /--primary:\s*var\(--echo-brand-600\)/),
  },
  {
    name: "shadcn --background maps to --bg-app (void)",
    fn: () => assert.match(globals, /--background:\s*var\(--bg-app\)/),
  },
  {
    name: "shadcn --ring maps to --echo-azure",
    fn: () => assert.match(globals, /--ring:\s*var\(--echo-azure\)/),
  },
  {
    name: "shadcn --border maps to --border-subtle",
    fn: () => assert.match(globals, /--border:\s*var\(--border-subtle\)/),
  },
  {
    name: "shadcn chart tokens use aurora palette",
    fn: () => {
      for (const needle of ["--echo-brand-600", "--echo-azure", "--echo-aurora-magenta", "--echo-aurora-cyan"]) {
        assert.ok(globals.match(/--chart-[1-5]:\s*var\((--[a-z0-9-]+)\)/g)?.some((m) => m.includes(needle)), `missing chart alias ${needle}`);
      }
    },
  },
  {
    name: "self-referential --font-sans bug is fixed in globals.css",
    fn: () => assert.deepStrictEqual(globals.match(/--font-sans:\s*var\(--font-sans\)/g), null),
  },
  {
    name: "utility fonts map to Plus Jakarta Sans and JetBrains Mono variables",
    fn: () => {
      assert.match(globals, /--font-sans:\s*var\(--font-plus-jakarta-sans\)/);
      assert.match(globals, /--font-mono:\s*var\(--font-jetbrains-mono\)/);
    },
  },
  {
    name: "brand/aurora utility aliases exposed via @theme",
    fn: () => {
      for (const alias of ["--color-brand", "--color-azure", "--color-flare", "--color-neon"]) {
        assert.ok(globals.includes(alias), `missing @theme alias ${alias}`);
      }
    },
  },
  {
    name: "layout.tsx loads Plus Jakarta Sans and JetBrains Mono from next/font/google",
    fn: () => {
      assert.match(layout, /import\s*\{\s*Plus_Jakarta_Sans\s*,\s*JetBrains_Mono\s*\}\s*from\s*"next\/font\/google"/);
    },
  },
  {
    name: "layout.tsx metadata no longer says Create Next App",
    fn: () => assert.doesNotMatch(layout, /Create Next App/),
  },
  {
    name: "button.tsx default variant consumes --primary via bg-primary",
    fn: () => assert.match(button, /default:\s*"bg-primary/),
  },
];

let failed = 0;
for (const { name, fn } of checks) {
  try {
    fn();
    console.log(`PASS  ${name}`);
  } catch (err) {
    failed += 1;
    console.log(`FAIL  ${name}`);
    console.log(`      ${err.message}`);
  }
}

console.log(`\n${checks.length - failed}/${checks.length} checks passed`);
if (failed > 0) {
  console.error(`${failed} check(s) failed`);
  process.exit(1);
}