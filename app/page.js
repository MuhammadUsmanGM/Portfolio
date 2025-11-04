"use client";
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePortfolio } from './usePortfolio';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Info from './components/Info';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Sidebar from './components/Sidebar';

export default function Home() {
  usePortfolio();

  return (
    <div className="container">
      <video
        className="back-vid"
        src="/videos/galaxy.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      ></video>

      <Header />
      <Sidebar />

      <div className="blackhole-box" data-aos="fade-down" data-aos-duration="2000">
        <video
          src="/videos/blackhole.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        ></video>
      </div>

      <Hero />
      <About />
      <Info />
      <Projects />
      <Skills />

      <section className="tech-stack-section" id="tech-stack">
        <h1 className="section-title autoDisplay"><span className="gradient">Tech Stack</span> 🚀</h1>
        <div className="tech-scroll-container">
          <div className="tech-scroll-wrapper">
            <div className="tech-scroll-track" id="techScrollTrack">
              {/* First set */}
              <div className="tech-item" data-tech="HTML5">
                <Image src="/images/html.svg" alt="HTML5" loading="lazy" width={50} height={50}/>
                <span className="tech-name">HTML5</span>
              </div>
              <div className="tech-item" data-tech="CSS3">
                <Image src="/images/css.svg" alt="CSS3" loading="lazy" width={50} height={50}/>
                <span className="tech-name">CSS3</span>
              </div>
              <div className="tech-item" data-tech="JavaScript">
                <Image src="/images/js.png" alt="JavaScript" loading="lazy" width={50} height={50}/>
                <span className="tech-name">JavaScript</span>
              </div>
              <div className="tech-item" data-tech="React">
                <Image src="/images/react.svg" alt="React" loading="lazy" width={50} height={50}/>
                <span className="tech-name">React</span>
              </div>
              <div className="tech-item" data-tech="Node.js">
                <Image src="/images/node.svg" alt="Node.js" loading="lazy" width={50} height={50}/>
                <span className="tech-name">Node.js</span>
              </div>
              <div className="tech-item" data-tech="MongoDB">
                <Image src="/images/mongodb.svg" alt="MongoDB" loading="lazy" width={50} height={50}/>
                <span className="tech-name">MongoDB</span>
              </div>
              <div className="tech-item" data-tech="Supabase">
                <Image src="/images/supaBase.png" alt="Supabase" loading="lazy" width={50} height={50}/>
                <span className="tech-name">Supabase</span>
              </div>
              <div className="tech-item" data-tech="Git">
                <Image
                  src="/images/git-svgrepo-com.svg"
                  alt="Git"
                  loading="lazy"
                  width={50}
                  height={50}
                />
                <span className="tech-name">Git</span>
              </div>
              <div className="tech-item" data-tech="Python">
                <Image src="/images/python.svg" alt="Python" loading="lazy" width={50} height={50}/>
                <span className="tech-name">Python</span>
              </div>
              <div className="tech-item" data-tech="NPM">
                <Image src="/images/npm.svg" alt="NPM" loading="lazy" width={50} height={50}/>
                <span className="tech-name">NPM</span>
              </div>
              <div className="tech-item" data-tech="TypeScript">
                <Image src="/images/openai.svg" alt="TypeScript" loading="lazy" width={50} height={50}/>
                <span className="tech-name">OpenAI SDK</span>
              </div>
              <div className="tech-item" data-tech="Linux">
                <Image src="/images/linux.svg" alt="Linux" loading="lazy" width={50} height={50}/>
                <span className="tech-name">Linux</span>
              </div>
              <div className="tech-item" data-tech="C++">
                <Image src="/images/cpp.svg" alt="C++" loading="lazy" width={50} height={50}/>
                <span className="tech-name">C++</span>
              </div>
              <div className="tech-item" data-tech="github">
                <Image src="/images/github.png" alt="github" loading="lazy" width={50} height={50}/>
                <span className="tech-name">Github</span>
              </div>
              <div className="tech-item" data-tech="tailwindcss">
                <Image src="/images/tailwindcss.svg" alt="tailwindcss" loading="lazy" width={50} height={50}/>
                <span className="tech-name">Tailwind CSS</span>
              </div>

              {/* duplicate to see seamless flow */}
              <div className="tech-item" data-tech="HTML5">
                <Image src="/images/html.svg" alt="HTML5" loading="lazy" width={50} height={50}/>
                <span className="tech-name">HTML5</span>
              </div>
              <div className="tech-item" data-tech="CSS3">
                <Image src="/images/css.svg" alt="CSS3" loading="lazy" width={50} height={50}/>
                <span className="tech-name">CSS3</span>
              </div>
              <div className="tech-item" data-tech="JavaScript">
                <Image src="/images/js.png" alt="JavaScript" loading="lazy" width={50} height={50}/>
                <span className="tech-name">JavaScript</span>
              </div>
              <div className="tech-item" data-tech="React">
                <Image src="/images/react.svg" alt="React" loading="lazy" width={50} height={50}/>
                <span className="tech-name">React</span>
              </div>
              <div className="tech-item" data-tech="Node.js">
                <Image src="/images/node.svg" alt="Node.js" loading="lazy" width={50} height={50}/>
                <span className="tech-name">Node.js</span>
              </div>
              <div className="tech-item" data-tech="MongoDB">
                <Image src="/images/mongodb.svg" alt="MongoDB" loading="lazy" width={50} height={50}/>
                <span className="tech-name">MongoDB</span>
              </div>
              <div className="tech-item" data-tech="Supabase">
                <Image src="/images/supaBase.png" alt="Supabase" loading="lazy" width={50} height={50}/>
                <span className="tech-name">Supabase</span>
              </div>
              <div className="tech-item" data-tech="Git">
                <Image
                  src="/images/git-svgrepo-com.svg"
                  alt="Git"
                  loading="lazy"
                  width={50}
                  height={50}
                />
                <span className="tech-name">Git</span>
              </div>
              <div className="tech-item" data-tech="Python">
                <Image src="/images/python.svg" alt="Python" loading="lazy" width={50} height={50}/>
                <span className="tech-name">Python</span>
              </div>
              <div className="tech-item" data-tech="NPM">
                <Image src="/images/npm.svg" alt="NPM" loading="lazy" width={50} height={50}/>
                <span className="tech-name">NPM</span>
              </div>
              <div className="tech-item" data-tech="TypeScript">
                <Image src="/images/openai.svg" alt="TypeScript" loading="lazy" width={50} height={50}/>
                <span className="tech-name">OpenAI Agent SDK</span>
              </div>
              <div className="tech-item" data-tech="Linux">
                <Image src="/images/linux.svg" alt="Linux" loading="lazy" width={50} height={50}/>
                <span className="tech-name">Linux</span>
              </div>
              <div className="tech-item" data-tech="C++">
                <Image src="/images/cpp.svg" alt="C++" loading="lazy" width={50} height={50}/>
                <span className="tech-name">C++</span>
              </div>
              <div className="tech-item" data-tech="github">
                <Image src="/images/github.png" alt="github" loading="lazy" width={50} height={50}/>
                <span className="tech-name">Github</span>
              </div>
              <div className="tech-item" data-tech="tailwindcss">
                <Image src="/images/tailwindcss.svg" alt="tailwindcss" loading="lazy" width={50} height={50}/>
                <span className="tech-name">Tailwind CSS</span>
              </div>

            </div>
          </div>
        </div>
        <div className="tech-description-container">
          <h2 className="tech-subtitle">Technologies I Work With</h2>
          <p className="tech-description">
            Passionate about working with
            <span className="highlight">cutting-edge technologies</span> to build
            scalable, efficient, and user-friendly applications. Always learning
            and adapting to the latest industry standards.
          </p>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <h1 className="section-title"><span className="gradient">Let's Talk</span> 😊</h1>

        <div className="social-box">
          <a href="tel:+923256550687"
            ><i className="bx bxs-phone"></i> +92 325 6550687</a
          >
          <a href="mailto:muhammadusman5965etc@gmail.com"
            ><i className="bx bxl-telegram"></i> Email Me</a
          >
          <a href="#"><i className="bx bxl-linkedin-square"></i> LinkedIn</a>
          <div className="social-icons">
            <a href="#"><i className="bx bxl-youtube"></i></a>
            <a href="#"><i className="bx bxl-twitter"></i></a>
            <a href="#"><i className="bx bxl-facebook-circle"></i></a>
          </div>
        </div>

        <div className="contact-box">
          <form id="contactForm">
            <p>
              Whether you're building a new web experience, enhancing your current platform, or exploring AI-powered projects, I'm here to help make it happen.
            </p>

            <p>Full Name</p>
            <input
              placeholder="Your Full Name"
              type="text"
              name="name"
              required
            />

            <p>Email Address</p>
            <input
              placeholder="Your Email"
              type="email"
              name="email"
              required
            />

            <p>Your Message</p>
            <input
              className="input-message"
              type="text"
              name="message"
              placeholder="Share your thoughts..."
              required
            />

            <button type="submit">
              Send Message <i className="bx bx-mail-send"></i>
            </button>
            <p id="formStatus"></p>
          </form>
        </div>
      </section>

      <section className="footer">
        <h1>©️Muhammad Usman 2025, Made with ❤️ by Muhammad Usman</h1>
        <div className="box-icons">
          <p>
            <a href="mailto:muhammadusman5965etc@gmail.com"
              ><i className="bx bxl-telegram"></i
            ></a>
          </p>
          <p>
            <a
              href="https://github.com/MuhammadUsmanGM"
              target="_blank"
              rel="noopener noreferrer"
              ><i className="bx bxl-github"></i
            ></a>
          </p>
          <p>
            <a href="#"><i className="bx bxl-linkedin-square"></i></a>
          </p>
        </div>
      </section>
    </div>
  )
}