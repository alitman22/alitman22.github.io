import SectionTitle from './SectionTitle';
import HighlightedText from './HighlightedText';

function AboutSection({ copy }) {
  const toTerminalFileName = (value) => (
    `${String(value || 'section')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'section'}.txt`
  );

  const aboutHighlights = [
    'resilient, efficient, and secure by design',
    'operational excellence',
    'Linux administration',
    'DevOps practices',
    'network engineering',
    'international tech ecosystem',
    'surekli iyilestirme',
    'regional limitations'
  ];

  const aboutCardHighlights = ['BSc', 'Professional', 'Proficient', 'Native', 'A2', 'Profesyonel', 'İleri Seviye', 'Ana Dil'];
  const iconByMethodology = {
    'Technical Mentorship & Team Scaling': 'fa-solid fa-people-group',
    'Cross-Functional Alignment': 'fa-solid fa-people-arrows',
    'Stakeholder Management': 'fa-solid fa-handshake-angle',
    'Incident Management': 'fa-solid fa-triangle-exclamation',
    'Root Cause Analysis (RCA)': 'fa-solid fa-magnifying-glass-chart',
    'Incident Management & RCA (Root Cause Analysis)': 'fa-solid fa-magnifying-glass-chart',
    'Agile/Scrum Delivery': 'fa-solid fa-diagram-project',
    'Change Management': 'fa-solid fa-arrows-rotate',
    'SLA & Uptime Accountability': 'fa-solid fa-clock-rotate-left'
  };

  return (
    <section id="about" className="section reveal">
      <SectionTitle number="01" title={copy.about.title} />
      <div className="about-grid">
        <div className="glass-card" data-terminal-file={toTerminalFileName(copy.about.title)}>
          {copy.about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="about-paragraph">
              <HighlightedText text={paragraph} highlights={aboutHighlights} />
            </p>
          ))}
        </div>

        <div className="about-aside">
          <div className="glass-card" data-terminal-file={toTerminalFileName(copy.about.cards.education.title)}>
            <h4 className="aside-card-title"><i className="fa-solid fa-graduation-cap" aria-hidden="true"></i>{copy.about.cards.education.title}</h4>
            {copy.about.cards.education.items.map((item) => (
              <p key={item}><HighlightedText text={item} highlights={aboutCardHighlights} /></p>
            ))}
          </div>

          <div className="glass-card" data-terminal-file={toTerminalFileName(copy.about.cards.languages.title)}>
            <h4 className="aside-card-title"><i className="fa-solid fa-language" aria-hidden="true"></i>{copy.about.cards.languages.title}</h4>
            {copy.about.cards.languages.items.map((item) => (
              <p key={item}><HighlightedText text={item} highlights={aboutCardHighlights} /></p>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card about-methodology-card" data-terminal-file={toTerminalFileName(copy.skillsSection.methodologyTitle)}>
        <h4 className="subheading">{copy.skillsSection.methodologyTitle}</h4>
        <div className="methodology-badges" role="list" aria-label={copy.skillsSection.methodologyTitle}>
          {copy.skillsSection.methodologyBadges.map((badge) => (
            <span key={badge} className="methodology-badge" role="listitem">
              <i className={iconByMethodology[badge] || 'fa-solid fa-star'} aria-hidden="true"></i>
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
