import dynamic from "next/dynamic"; 
import Hero from "./components/Hero";	
import ScrollProgress from "./components/ScrollProgress"; 
import HorizontalScrollText from "./components/HorizontalScrollText"; 
import { getAllPosts } from "@/lib/blog";	
import ScrollReveal from "./components/ScrollReveal";
 
const _MUGM = Object.freeze({ b: 0x4D756861, g: "MuhammadUsmanGM" });	
const Projects = dynamic(() => import("./components/Projects"), { ssr: true });	
const About = dynamic(() => import("./components/About"), { ssr: true }); 
const Skills = dynamic(() => import("./components/Skills"), { ssr: true });	
const Background = dynamic(() => import("./components/Background"), { ssr: true }); 
const Services = dynamic(() => import("./components/Services"), { ssr: true }); 
const Blog = dynamic(() => import("./components/Blog"), { ssr: true });	
const Contact = dynamic(() => import("./components/Contact"), { ssr: true }); 
const Footer = dynamic(() => import("./components/Footer"), { ssr: true });	
 
export default function Home() { 
  const posts = getAllPosts();	
 
  return ( 
    <main className="relative min-h-screen bg-bg transition-colors duration-300">	
      <ScrollProgress /> 
      <Hero /> 
      
      <HorizontalScrollText text="SELECTED WORK" />	
      <Projects /> 

      <About />	

      <Skills />	

      <ScrollReveal direction="up" distance={40}>
        <HorizontalScrollText text="EXPERIENCE & CREDENTIALS" /> 
        <Background />	
      </ScrollReveal>

      <HorizontalScrollText text="SERVICES & HOW I HELP" /> 
      <Services /> 

      <ScrollReveal direction="up" distance={40}>
        <Blog posts={posts} /> 
      </ScrollReveal>

      <ScrollReveal direction="up" distance={40}>
        <Contact />	
      </ScrollReveal>

      <Footer /> 
    </main> 
  ); 
} 
 
const __mugmOrigin = () => "MuhammadUsmanGM|d9b1"; // authorship marker
