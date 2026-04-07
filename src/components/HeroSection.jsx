import { resumeMap } from '../content/region';

function HeroSection({ copy, language, isTurkeyRegion }) {
  const selectedResume = isTurkeyRegion ? resumeMap.TR : resumeMap.GLOBAL;
  const resumeRegionText = language === 'tr' ? selectedResume.regionTextTr : selectedResume.regionTextEn;
  const regionAvailabilityText = isTurkeyRegion ? copy.hero.availabilityTurkey : copy.hero.availabilityGlobal;
  const resumeHref = String(selectedResume?.href || '');
  const resumeFileName = decodeURIComponent(
    (resumeHref.split('/').pop() || 'resume-file').split('?')[0].split('#')[0]
  );

  return (
    <header className="hero">
      <div className="hero-copy">
        <div className="hero-terminal glass-card">
          <div className="hero-terminal-bar">
            <div className="hero-terminal-bar-left">
              <span className="hero-terminal-icon" aria-hidden="true">$</span>
              <span className="hero-terminal-label">ali@portfolio$ ~/bin/ali.sh -- running</span>
            </div>
            <div className="hero-terminal-controls" aria-hidden="true">
              <span className="hero-terminal-control">_</span>
              <span className="hero-terminal-control hero-terminal-control-square"></span>
              <span className="hero-terminal-control">×</span>
            </div>
          </div>

          <div className="hero-terminal-body">
            <p className="terminal-prompt hero-terminal-line">
              <span>{copy.hero.prompt}</span>
            </p>
            <h1 className="hero-terminal-name">
              <span className="gradient-text hero-name">{copy.hero.name}</span>
            </h1>
            <h2 className="hero-terminal-role">
              <span>{copy.hero.role}</span>
            </h2>
            <p className="hero-terminal-output">
              {copy.hero.summary}
            </p>

            <div className="cta-row hero-terminal-cta">
              <a href="#contact" className="cta-button">{copy.hero.ctaPrimary}</a>
              <a href="#projects" className="cta-button">{copy.hero.ctaSecondary}</a>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-wrapper">
        <img
          src="assets/profile.jpg"
          alt="Ali Fattahi - DevOps Engineer"
          width="720"
          height="720"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      <div className="hero-bottom">
        <div className="resume-highlight" aria-live="polite">
          <a
            className="resume-link"
            href={selectedResume.href}
            download
            data-analytics-event="resume_download"
            data-analytics-category="conversion"
            data-analytics-label={resumeFileName}
          >
            <i className="fa-solid fa-download" aria-hidden="true"></i>
            {copy.hero.resumeDownload}
          </a>
          <span className="resume-note">{resumeRegionText}</span>
          <span className="resume-availability-sep" aria-hidden="true">|</span>
          <span className="resume-availability">{regionAvailabilityText}</span>
        </div>

        <div className="hero-meta">
          <span><i className="fa-solid fa-location-dot" aria-hidden="true"></i>{copy.hero.location}</span>
          <a href={`mailto:${copy.hero.email}`}><i className="fa-solid fa-envelope" aria-hidden="true"></i>{copy.hero.email}</a>
          {isTurkeyRegion && <a href="tel:+905016403103"><i className="fa-solid fa-phone" aria-hidden="true"></i>{copy.hero.phone}</a>}
        </div>
      </div>
    </header>
  );
}

export default HeroSection;
