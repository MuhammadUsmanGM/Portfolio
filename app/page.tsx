import Image from "next/image";

import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Skills from "./components/Skills";
import Background from "./components/Background";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-bg transition-colors duration-300">
      <Hero />
      <Projects />
      <About />
      <Skills />
      <Background />
      <Contact />
      <Footer />
    </main>
  );
}
