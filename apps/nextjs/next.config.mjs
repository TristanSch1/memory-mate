// Importing env files here to validate on build
import "./src/env.mjs";
import "@memory-mate/auth/env.mjs";
import nextI18n from "./next-i18next.config.js";

const { i18n } = nextI18n;

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  i18n,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@memory-mate/api",
    "@memory-mate/auth",
    "@memory-mate/db",
  ],
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default config;
