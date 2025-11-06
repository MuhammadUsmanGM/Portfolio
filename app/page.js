"use client";
import { useState, useEffect } from 'react';
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
import Contact from './components/Contact';

export default function Home() {
  const [activeModal, setActiveModal] = useState(null);
  usePortfolio();

  const openModal = (modalType) => {
    setActiveModal(modalType);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  // Privacy Policy Content
  const PrivacyPolicyContent = () => (
    <div className="modal-content">
      <h2>Privacy Policy</h2>
      <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>
      
      <h3>Information We Collect</h3>
      <p>We may collect information when you contact us through our contact form, including your name, email address, message content, and timestamp of submission. This information is stored in our MongoDB database.</p>
      
      <h3>How We Use Your Information</h3>
      <p>We use the information we collect to respond to your inquiries, provide requested services, and improve our offerings. Contact form submissions are stored in our secure MongoDB database for record-keeping purposes.</p>
      
      <h3>Data Storage and Security</h3>
      <p>All personal data collected through our contact form is stored in secure MongoDB databases with appropriate security measures. We implement appropriate security measures to protect against unauthorized access to or unauthorized alteration, disclosure, or destruction of data.</p>
      
      <h3>Third-Party Disclosure</h3>
      <p>We do not sell, trade, or otherwise transfer your personally identifiable information to third parties unless we provide users with advance notice. This does not include trusted third parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to maintain the confidentiality of your information.</p>
      
      <h3>Data Retention</h3>
      <p>We retain contact form submissions in our MongoDB database for as long as necessary to fulfill the purposes outlined in this privacy policy unless a longer retention period is required by law.</p>
      
      <h3>Changes to Our Privacy Policy</h3>
      <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
      
      <div className="modal-actions">
        <button onClick={closeModal} className="modal-btn">Close</button>
      </div>
    </div>
  );

  // Terms of Service Content
  const TermsOfServiceContent = () => (
    <div className="modal-content">
      <h2>Terms of Service</h2>
      <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>
      
      <h3>Use License</h3>
      <p>Permission is granted to temporarily download one copy of the materials on Muhammad Usman's website for personal, non-commercial transitory viewing only.</p>
      
      <h3>Data Collection and Storage</h3>
      <p>By using our contact forms, you consent to the collection and storage of your personal information including name, email address, and message content in our MongoDB database. This information is handled in accordance with our Privacy Policy and is used solely to respond to your inquiries.</p>
      
      <h3>Disclaimer</h3>
      <p>The materials on Muhammad Usman's website are provided on an 'as is' basis. Muhammad Usman makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
      
      <h3>Limitations</h3>
      <p>In no event shall Muhammad Usman or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Muhammad Usman's website.</p>
      
      <h3>Accuracy of Materials</h3>
      <p>The materials appearing on Muhammad Usman's website could include technical, typographical, or photographic errors. Muhammad Usman does not warrant that any of the materials on its website are accurate, complete or current.</p>
      
      <h3>User Responsibilities</h3>
      <p>When using our contact forms, users agree not to submit any information that is knowingly false, inaccurate, or misleading. Users are responsible for ensuring that any personal information provided is accurate and up-to-date.</p>
      
      <div className="modal-actions">
        <button onClick={closeModal} className="modal-btn">Close</button>
      </div>
    </div>
  );

  // Cookies Policy Content
  const CookiesPolicyContent = () => (
    <div className="modal-content">
      <h2>Cookies Policy</h2>
      <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>
      
      <h3>What Are Cookies</h3>
      <p>As is common practice with almost all professional websites, this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it, and why we sometimes need to store these cookies.</p>
      
      <h3>How We Use Cookies</h3>
      <p>We use cookies for various purposes, including tracking site usage, remembering your preferences, and improving our services. We do not use cookies to store personal information.</p>
      
      <h3>Information Collected Through Forms</h3>
      <p>While we do not use cookies to store personal information from contact forms, the information you submit through our contact forms (name, email, message) is collected and stored in our MongoDB database. This information is processed solely to respond to your inquiries.</p>
      
      <h3>Disabling Cookies</h3>
      <p>You can prevent the setting of cookies by adjusting the settings on your browser. Be aware that disabling cookies will affect the functionality of this and many other websites.</p>
      
      <h3>Third-Party Data Collection</h3>
      <p>In addition to cookies, we may collect personal information through our contact forms. This information is stored in our secure MongoDB database and is not shared with third parties without your explicit consent.</p>
      
      <div className="modal-actions">
        <button onClick={closeModal} className="modal-btn">Close</button>
      </div>
    </div>
  );

  return (
    <div className="container">
      <video
        className="back-vid"
        src="/videos/galaxy.webm"
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
          src="/videos/blackhole.webm"
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
              <div className="tech-item" data-tech="Next.js">
                <Image src="/images/next.svg" alt="Next.js" loading="lazy" width={60} height={60}/>
                <span className="tech-name">Next.js</span>
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
              <div className="tech-item" data-tech="Next.js">
                <Image src="/images/next.svg" alt="Next.js" loading="lazy" width={60} height={60}/>
                <span className="tech-name">Next.js</span>
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
            Passionate about working with{' '}
            <span className="highlight">cutting-edge technologies</span> to build
            scalable, efficient, and user-friendly applications. Always learning
            and adapting to the latest industry standards.
          </p>
        </div>
      </section>

      <Contact />

      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-info">
            <h3 className="footer-logo">Muhammad Usman</h3>
            <p className="footer-tagline">Agentic AI Developer & UI/UX Specialist</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Navigation</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Connect</h4>
              <ul>
                <li><a href="mailto:muhammadusman5965etc@gmail.com">Email</a></li>
                <li><a href="https://github.com/MuhammadUsmanGM" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://www.linkedin.com/in/muhammad-usman-099704390?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="tel:+923256550687">Phone</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Legal</h4>
              <ul>
                <li><a href="#" onClick={(e) => { e.preventDefault(); openModal('privacy'); }}>Privacy Policy</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); openModal('terms'); }}>Terms of Service</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); openModal('cookies'); }}>Cookies</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>©️ {new Date().getFullYear()} Muhammad Usman. All rights reserved.</p>
          <div className="social-links">
            <a href="mailto:muhammadusman5965etc@gmail.com" aria-label="Email">
              <i className="bx bxl-telegram"></i>
            </a>
            <a href="https://github.com/MuhammadUsmanGM" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <i className="bx bxl-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/muhammad-usman-099704390?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="bx bxl-linkedin-square"></i>
            </a>
          </div>
        </div>
      </footer>

      {/* Modals for legal pages */}
      {activeModal === 'privacy' && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <PrivacyPolicyContent />
          </div>
        </div>
      )}

      {activeModal === 'terms' && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <TermsOfServiceContent />
          </div>
        </div>
      )}

      {activeModal === 'cookies' && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <CookiesPolicyContent />
          </div>
        </div>
      )}
    </div>
  )
}