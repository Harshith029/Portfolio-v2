import { Providers } from "@/components/Providers";
import { BootVerify } from "@/components/BootVerify";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CursorGlow } from "@/components/CursorGlow";
import { CommandPalette } from "@/components/CommandPalette";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { About } from "@/components/About";
import { Research } from "@/components/Research";
import { Skills } from "@/components/Skills";
import { AdversaryConsole } from "@/components/AdversaryConsole";
import { Journey } from "@/components/Journey";
import { Achievements } from "@/components/Achievements";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <Providers>
      <BootVerify />
      <SmoothScroll />
      <CursorGlow />
      <CommandPalette />
      <Nav />
      <main>
        <Hero />
        <Projects />
        <About />
        <Research />
        <Skills />
        <AdversaryConsole />
        <Journey />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </Providers>
  );
}
