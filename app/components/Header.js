import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header data-aos="fade-down" data-aos-duration="2000">
      <div className="left">
        <Image src="/images/grid1.png" alt="logo" width={40} height={40} />
        <h2><span style={{color: "#72a1dea2"}}>Muhammad</span>&nbsp;Usman</h2>
      </div>

      <ul>
        <li><Link href="#about">About</Link></li>
        <li><Link href="#skills">Skills</Link></li>
        <li><Link href="#projects">Projects</Link></li>
        <li><Link href="#tech-stack">Tech Stack</Link></li>
      </ul>

      <a href="/Usman  Agentic AI Developer Resume.pdf" download className="cv-download-btn-link">
        <button className="cv-download-btn">
          <i className="bx bx-download"></i>
          <span>Download CV</span>
        </button>
      </a>

      <div
        className="menu-icon"
        role="button"
        aria-label="Open menu"
        tabIndex="0"
      >
        <i className="bx bx-menu"></i>
      </div>
    </header>
  );
}
