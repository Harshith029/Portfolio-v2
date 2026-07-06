import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const bp = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Harshith Pali — AI Engineer",
    short_name: "harshith.dev",
    description: "AI engineer and full-stack developer building production AI systems.",
    start_url: `${bp}/`,
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [{ src: `${bp}/icon.svg`, sizes: "any", type: "image/svg+xml" }],
  };
}
