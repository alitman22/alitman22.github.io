import SectionTitle from './SectionTitle';
import HighlightedText from './HighlightedText';

function ExperienceSection({ copy }) {
  const toTerminalFileName = (value) => (
    `${String(value || 'experience')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'experience'}.txt`
  );

  const experienceHighlights = [
    'CI/CD pipeline',
    'CI/CD surelerini',
    'CI/CD sürelerini',
    'monitoring stack',
    'monitoring sureclerini',
    'monitoring süreçlerini',
    'multi-region network',
    'multi-region ag tasarimi',
    'multi-region ağ tasarımı',
    'IATF standards',
    'IATF standartlarina',
    'IATF standartlarına',
    'high-availability Linux infrastructure',
    'yuksek erisilebilirlikli Linux altyapisini',
    'yüksek erişilebilirlikli Linux altyapısını',
    'Linux VMs',
    'storage',
    'Linux kernel',
    'micro-service deployments',
    'micro-service deployment surecini',
    'micro-service deployment sürecini',
    'co-location migration',
    'co-location gecisini',
    'co-location geçişini',
    'Docker Swarm cluster',
    'uptime',
    'kesintisiz ve yuksek performansli operasyonlar',
    'kesintisiz ve yüksek performanslı operasyonlar',
    'operasyon maliyetlerini',
    'sorun giderme surelerini',
    'sorun giderme sürelerini',
    'servis gecikmesini',
    'servis gecikmesini %97',
    'islem ve emir gerceklesme gecikmesini',
    'işlem ve emir gerçekleşme gecikmesini',
    'ortalama sorun giderme suresini',
    'ortalama sorun giderme süresini',
    'ISO 27001',
    'TIA-942',
    'BICSI',
    'ERP systems',
    'ERP sistemleri',
    'runbooks'
  ];

  return (
    <section id="experience" className="section reveal">
      <SectionTitle number="02" title={copy.experience.title} />
      <div className="timeline-list">
        {copy.experience.jobs.map((job) => (
          <article
            key={`${job.company}-${job.period}`}
            className="glass-card timeline-card"
            data-terminal-file={toTerminalFileName(job.company)}
          >
            <h4 className="timeline-role">{job.role}</h4>
            <p className="timeline-meta">{job.company} | {job.period}</p>
            <ul className="timeline-bullets">
              {job.bullets.map((bullet) => (
                <li key={bullet}>
                  <HighlightedText
                    text={bullet}
                    highlights={experienceHighlights}
                    highlightMetrics
                  />
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ExperienceSection;
