import Image from "next/image";

import Hero from "./components/Hero";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-bg transition-colors duration-300">
      <Hero />
      {/* Additional sections like Work, Skills, etc. will go here */}
    </main>
  );
}
