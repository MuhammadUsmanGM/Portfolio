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

      <div className="box-icons">
        <p>
          <a href="mailto:muhammadusman5965etc@gmail.com" aria-label="Email">
            <i className="bx bxl-telegram"></i>
          </a>
        </p>
        <p>
          <a
            href="https://github.com/MuhammadUsmanGM"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bx bxl-github"></i>
          </a>
        </p>
      </div>

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
