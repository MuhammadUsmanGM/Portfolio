import Image from "next/image";

import Hero from "./components/Hero";
import Projects from "./components/Projects";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-bg transition-colors duration-300">
      <Hero />
      <Projects />
      {/* Additional sections like Skills, About, etc. will go here */}
    </main>
  );
}
