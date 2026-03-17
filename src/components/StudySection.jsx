import SectionTitle from './SectionTitle';
import HighlightedText from './HighlightedText';

function StudySection({ copy }) {
  const toTerminalFileName = (value) => (
    `${String(value || 'study')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'study'}.txt`
  );

  const focusHighlights = [
    'cloud-native orchestration',
    'advanced architectural design',
    'enterprise scalability',
    'bulut tabanli orkestrasyon',
    'ileri duzey mimari tasarim',
    'kurumsal olceklenebilirlik'
  ];

  const certificationHighlights = [
    'AWS Certified Cloud Practitioner',
    'AWS Solutions Architect Associate',
    'AWS Certified Solutions Architect - Associate',
    'Certified Kubernetes Administrator',
    'Certified Kubernetes Administrator (CKA)',
    'Network+',
    'LPIC 1',
    'LPIC 2',
    'CCNP Encor',
    'DevOps Foundations'
  ];

  return (
    <section id="study" className="section reveal">
      <SectionTitle number="04" title={copy.study.title} />

      <div className="stack-lg">
        <div className="glass-card" data-terminal-file={toTerminalFileName(copy.study.title)}>
          <p className="study-intro"><HighlightedText text={copy.study.intro} highlights={focusHighlights} /></p>
        </div>

        <div className="glass-card" data-terminal-file={toTerminalFileName(copy.study.certificationsTitle)}>
          <h4 className="subheading">{copy.study.certificationsTitle}</h4>
          <p className="study-updated">{copy.study.certificationsTarget}</p>
          <ul className="timeline-bullets">
            {copy.study.certifications.map((item) => (
              <li key={item.name}>
                <strong><HighlightedText text={item.name} highlights={certificationHighlights} /></strong>
                {': '}
                <HighlightedText text={item.description} highlights={focusHighlights} />
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card" data-terminal-file={toTerminalFileName(copy.study.deepDivesTitle)}>
          <h4 className="subheading">{copy.study.deepDivesTitle}</h4>
          <ul className="timeline-bullets">
            {copy.study.deepDives.map((item) => (
              <li key={item.name}>
                <strong>{item.name}</strong>
                {': '}
                <HighlightedText text={item.description} highlights={focusHighlights} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default StudySection;
