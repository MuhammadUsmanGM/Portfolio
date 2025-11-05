import Image from 'next/image';

export default function Projects() {
  return (
    <section className="my-project" id="projects">
      <h1 className="section-title autoDisplay"><span className="gradient">My Projects</span> 👨‍💻</h1>
      
      <div className="projects-container">
        <div className="project-wrapper">
          <div className="project-slider" id="projectSlider">
            {/* Project 1 */}
            <div className="project-card active">
              <div className="project-vidbox autoBlur">
                <video
                  loop
                  id="projectVideo1"
                  data-src="/videos/portfolio.webm"
                  muted
                  playsInline
                  poster="/images/post.png"
                ></video>
              </div>
              <div className="project-info fadein-left">
                <h1>Modern <span className="gradient">Portfolio</span> Website</h1>
                <p>
                  A sleek and responsive portfolio website highlighting projects and
                  developer skills.
                </p>
                <button
                  className="project-btn"
                  data-project="portfolio"
                  onClick={() => window.location.reload()}
                >
                  <i className="bx bx-link-external"></i> You're Here!
                </button>
              </div>
            </div>

            {/* Project 2 */}
            <div className="project-card">
              <div className="project-vidbox autoBlur">
                <video
                  loop
                  id="projectVideo2"
                  data-src="/videos/newsletter.webm"
                  muted
                  playsInline
                  poster="/images/newletter_img.png"
                ></video>
                <div className="hover-sign"></div>
              </div>
              <div className="project-info fadein-left">
                <h1>AI <span className="gradient">Newsletter</span> Website</h1>
                <p>
                  An interactive and responsive site to get updated about the
                  ai updates.
                </p>
                <a href="https://news-letter-umber-five.vercel.app/" target="_blank" rel="noopener noreferrer">
                  <button
                    className="project-btn"
                    data-project="newsletter"
                  >
                    <i className="bx bx-link-external"></i> Join Newsletter
                  </button>
                </a>
              </div>
            </div>
        
            {/* Project 3 */}
            <div className="project-card">
              <div className="project-vidbox autoBlur">
                <video
                  loop
                  id="projectVideo3"
                  data-src="/videos/Chatup.webm"
                  muted
                  playsInline
                  poster="/images/Chatup_img.png"
                ></video>
                <div className="hover-sign"></div>
              </div>
              <div className="project-info fadein-left">
                <h1>Advanced <span className="gradient">ChatUp</span> Application</h1>
                <p>
                  Advanced chat application with AI integration, user authentication, and persistent chat history using MongoDB.
                </p>
                <button
                  className="project-btn"
                  data-project="chatup"
                  aria-disabled="true"
                  tabIndex="0"
                >
                  <i className="bx bx-link-external"></i> Not Deployed Yet
                </button>
              </div>
            </div>
          </div>
          <button className="nav-btn prev-btn" id="prevProject">
            <i className="bx bx-chevron-left"></i>
          </button>
          <button className="nav-btn next-btn" id="nextProject">
            <i className="bx bx-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
