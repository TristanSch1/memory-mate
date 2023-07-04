import type { Config } from "tailwindcss";

import baseConfig from "@memory-mate/tailwind-config";

export default {
  content: ["./src/**/*.tsx"],
  presets: [baseConfig],
} satisfies Config;
