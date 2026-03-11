import Image from "next/image";

import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-bg transition-colors duration-300">
      <Hero />
      <Projects />
      <About />
    </main>
  );
}
