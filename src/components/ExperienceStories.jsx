import SectionTitle from './SectionTitle';
import { motion } from 'framer-motion';

function ExperienceStories({ copy }) {
  const isTurkish = copy?.nav?.about === 'Hakkımda';

  const ctaLabel = isTurkish
    ? "GitHub'da Tüm Vaka ve Scriptleri Aç"
    : 'Open Full Case Study on GitHub';

  const hookLabel = isTurkish
    ? 'Postmortem + Scriptler + Çözüm Adımları'
    : 'Postmortem + Scripts + Remediation Steps';

  const troubleshootingLabel = isTurkish
    ? 'Tam Troubleshooting Yolculuğu:'
    : 'Full Troubleshooting Journey:';

  const investigationLabel = isTurkish ? 'İnceleme' : 'Investigation';
  const immediateFixLabel = isTurkish ? 'Acil Müdahale' : 'Immediate Fix';
  const futureProofingLabel = isTurkish ? 'Kalıcı Önlem' : 'Future Proofing';

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return '#ff4444';
      case 'high':
        return '#ff9500';
      case 'medium':
        return '#ffb700';
      default:
        return '#4CAF50';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return 'fa-circle-exclamation';
      case 'high':
        return 'fa-triangle-exclamation';
      case 'medium':
        return 'fa-circle-info';
      default:
        return 'fa-lightbulb';
    }
  };

  const toShort = (text, max = 170) => {
    if (!text) return '';
    const clean = String(text).trim();
    if (clean.length <= max) return clean;
    return `${clean.slice(0, max).trim()}...`;
  };

  return (
    <section id="experience-stories" className="section reveal">
      <SectionTitle number="06" title={copy.experienceStories.title} />

      <div className="stack-lg">
        <div className="glass-card" data-terminal-file="experience-stories.txt">
          <p className="stories-kicker">{copy.experienceStories.kicker}</p>
          <p className="story-paragraph">{copy.experienceStories.intro}</p>
        </div>

        <div className="stories-grid">
          {copy.experienceStories.items.map((story, index) => (
            <motion.div
              key={index}
              className="story-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="story-compact">
                <div className="story-header">
                  <div className="story-header-main">
                    <span className="story-severity">
                      <i
                        className={`fa-solid ${getSeverityIcon(story.severity)}`}
                        style={{ color: getSeverityColor(story.severity) }}
                      ></i>
                      <span className="severity-label">{story.severity}</span>
                    </span>
                    <h3 className="story-title">{story.title}</h3>
                    <p className="story-subtitle">{story.subtitle}</p>
                    <p className="story-teaser">{toShort(story.problem || story.background)}</p>
                  </div>
                </div>

                {story.investigation && story.investigation.length > 0 && (
                  <div className="story-troubleshoot-path">
                    <div className="tshooting-label">{troubleshootingLabel}</div>
                    <div className="tshooting-flowchart">
                      <div className="flowchart-investigation">
                        {story.investigation.map((step, idx) => (
                          <div key={`inv-${idx}`} className="flowchart-item investigation-step" data-index={idx}>
                            <div className="flowchart-node">
                              <div className="step-node">{idx + 1}</div>
                            </div>
                            <div className="flowchart-content">
                              <div className="step-box">
                                <div className="step-phase">{investigationLabel}</div>
                                <p className="step-description">{toShort(step, 75)}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {(story.remediationImmediate || story.remediationPermanent) && (
                        <div className="flowchart-resolution">
                          {story.remediationImmediate && (
                            <div className="flowchart-item remediation-phase">
                              <div className="flowchart-node">
                                <div className="step-node remediation-immediate">⚡</div>
                              </div>
                              <div className="flowchart-content">
                                <div className="step-box remediation-box">
                                  <div className="step-phase">{immediateFixLabel}</div>
                                  <p className="step-description">{toShort(story.remediationImmediate, 85)}</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {story.remediationPermanent && (
                            <div className="flowchart-item permanent-phase">
                              <div className="flowchart-node">
                                <div className="step-node remediation-permanent">✓</div>
                              </div>
                              <div className="flowchart-content">
                                <div className="step-box permanent-box">
                                  <div className="step-phase">{futureProofingLabel}</div>
                                  <p className="step-description">{toShort(story.remediationPermanent, 85)}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {story.repoLink && (
                  <div className="story-cta">
                    <span className="story-hook-chip">
                      <i className="fa-solid fa-bolt" aria-hidden="true"></i>
                      {hookLabel}
                    </span>
                    <a
                      href={story.repoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="story-link-button"
                      data-analytics-event="project_link_click"
                      data-analytics-category="outbound"
                      data-analytics-label={story.title}
                    >
                      <i className="fa-brands fa-github" aria-hidden="true"></i>
                      {ctaLabel}
                      <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExperienceStories;
