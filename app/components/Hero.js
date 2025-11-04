import Image from 'next/image';

export default function Hero() {
  return (
    <section className="hero" id="about">
      <div className="hero-info" data-aos="fade-right" data-aos-duration="1000">
        <div className="hero-info-title">
          <i className="bx bxl-sketch"></i>
          <span className="text-gradient">&nbsp; Agentic AI Developer</span>
        </div>

        <h1 data-aos="fade-right" data-aos-duration="3000">
          Providing <span className="gradient">the best</span> Project&nbsp;
          <span className="gradient">Experience</span>
        </h1>

        <p>
          I'm a agentic AI developer with experience in Website and Agent
          development. Check out my projects and skills.
        </p>

        <button className="contact-btn"><i className="bx bx-send"></i> Contact Me</button>
      </div>

      <div className="skills-video-box">
        <video
          className="skills-video"
          data-src="/videos/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
        ></video>
      </div>

      <div className="scroll-down"></div>
    </section>
  );
}
