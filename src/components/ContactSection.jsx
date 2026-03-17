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

  return (
    <section
      id="contact"
      className="section glass-card contact-section reveal"
      data-terminal-file={toTerminalFileName(copy.contact.headingMain)}
    >
      <p className="terminal-prompt">{copy.contact.headingTop}</p>
      <h3 className="gradient-text">{copy.contact.headingMain}</h3>
      <p className="contact-copy">
        <HighlightedText text={isTurkeyRegion ? copy.contact.tr : copy.contact.global} highlights={contactHighlights} />
      </p>
      <div className="cta-row">
        <a href="mailto:alit.fattahi@gmail.com" className="cta-button">
          <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>
          {copy.contact.sayHello}
        </a>
        <a href="https://www.linkedin.com/in/alit-fattahi/" target="_blank" rel="noopener noreferrer" className="cta-button">
          <i className="fa-brands fa-linkedin" aria-hidden="true"></i>
          {copy.contact.linkedin}
        </a>
      </div>
    </section>
  );
}

export default ContactSection;
