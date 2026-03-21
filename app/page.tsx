import dynamic from "next/dynamic";
import Hero from "./components/Hero";

const Projects = dynamic(() => import("./components/Projects"), { ssr: true });
const About = dynamic(() => import("./components/About"), { ssr: true });
const Skills = dynamic(() => import("./components/Skills"), { ssr: true });
const Background = dynamic(() => import("./components/Background"), { ssr: true });
const Contact = dynamic(() => import("./components/Contact"), { ssr: true });
const Footer = dynamic(() => import("./components/Footer"), { ssr: true });

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
