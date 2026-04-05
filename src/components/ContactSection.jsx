import HighlightedText from './HighlightedText';

function ContactSection({ copy, isTurkeyRegion }) {
  const toTerminalFileName = (value) => (
    `${String(value || 'contact')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'contact'}.txt`
  );

  const contactHighlights = [
    'high-performance infrastructure',
    'automation',
    'rock-solid reliability',
    'new opportunities',
    'Germany',
    'Netherlands',
    'Turkish Work Permit holder',
    'remote-first',
    'immediate transfer',
    'yuksek performansli',
    'otomasyon',
    'guvenilirlik'
  ];

  const contactParagraphs = String(isTurkeyRegion ? copy.contact.tr : copy.contact.global)
    .split(/(?<=[.!?])\s+/u)
    .filter(Boolean);

  return (
    <section
      id="contact"
      className="section glass-card contact-section reveal"
      data-terminal-file={toTerminalFileName(copy.contact.headingMain)}
    >
      <div className="contact-content">
        <div className="contact-heading">
          <p className="terminal-prompt">{copy.contact.headingTop}</p>
          <h3 className="gradient-text contact-title">{copy.contact.headingMain}</h3>
        </div>

        <div className="contact-body">
          <div className="contact-copy-stack">
            {contactParagraphs.map((paragraph, index) => (
              <p key={paragraph} className={`contact-copy${index === 0 ? ' contact-copy--lead' : ''}`}>
                <HighlightedText text={paragraph} highlights={contactHighlights} />
              </p>
            ))}
          </div>

          <div className="cta-row">
            <a href="mailto:alit.fattahi@gmail.com" className="cta-button cta-button-primary">
              <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>
              {copy.contact.sayHello}
            </a>
            <a href="https://www.linkedin.com/in/alit-fattahi/" target="_blank" rel="noopener noreferrer" className="cta-button cta-button-secondary">
              <i className="fa-brands fa-linkedin" aria-hidden="true"></i>
              {copy.contact.linkedin}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
