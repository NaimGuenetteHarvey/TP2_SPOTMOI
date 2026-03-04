import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";


const nextConfig: NextConfig = {};

// Ici
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);