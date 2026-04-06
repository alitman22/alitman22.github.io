import { useState, useEffect } from 'react';
import SectionTitle from './SectionTitle';
import ProjectThumbnail from './ProjectThumbnail';

function getOptimizedProjectImagePath(image) {
  if (!image || !image.startsWith('assets/projects/')) {
    return image;
  }

  return image
    .replace('assets/projects/', 'assets/projects/thumbs/')
    .replace(/\.(png|jpe?g|webp)$/i, '.webp');
}

function ProjectVisual({ projectTitle, darkMode, image, imageAlt }) {
  const optimizedImage = getOptimizedProjectImagePath(image);
  const [imageSource, setImageSource] = useState(optimizedImage || image || '');
  const [useFallback, setUseFallback] = useState(!optimizedImage && !image);

  useEffect(() => {
    setImageSource(optimizedImage || image || '');
    setUseFallback(!optimizedImage && !image);
  }, [image, optimizedImage]);

  if (!useFallback && imageSource) {
    return (
      <img
        src={imageSource}
        alt={imageAlt || `${projectTitle} project visual`}
        className="project-thumb"
        loading="lazy"
        decoding="async"
        sizes="(max-width: 900px) 100vw, 480px"
        onError={() => {
          if (imageSource !== image && image) {
            setImageSource(image);
            return;
          }

          setUseFallback(true);
        }}
      />
    );
  }

  return (
    <ProjectThumbnail
      projectTitle={projectTitle}
      darkMode={darkMode}
      className="project-thumb"
    />
  );
}

function ProjectsSection({ copy, darkMode }) {
  const [isLargeScreen, setIsLargeScreen] = useState(
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 901px)').matches : true
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 901px)');
    const handler = (e) => setIsLargeScreen(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toTerminalFileName = (value) => (
    `${String(value || 'projects')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'projects'}.txt`
  );

  const iconByTool = {
    Ansible: 'devicon-ansible-plain colored',
    Kafka: 'fa-solid fa-stream',
    Zookeeper: 'fa-solid fa-sitemap',
    Linux: 'devicon-linux-plain',
    'Linux networking': 'devicon-linux-plain',
    'Configuration automation': 'fa-solid fa-sliders',
    Docker: 'devicon-docker-plain colored',
    Ray: 'fa-solid fa-network-wired',
    Python: 'devicon-python-plain colored',
    'Container networking': 'fa-solid fa-diagram-project',
    'Distributed compute': 'fa-solid fa-server',
    PostgreSQL: 'devicon-postgresql-plain colored',
    Patroni: 'fa-solid fa-database',
    etcd: 'fa-solid fa-layer-group',
    HAProxy: 'devicon-haproxy-plain colored',
    'High availability': 'fa-solid fa-arrows-rotate',
    'D-Bus': 'fa-solid fa-wave-square',
    systemd: 'fa-solid fa-gears',
    'Linux monitoring': 'fa-solid fa-heart-pulse',
    'Service automation': 'fa-solid fa-gears',
    Prometheus: 'devicon-prometheus-original colored',
    Grafana: 'devicon-grafana-plain',
    Exporters: 'fa-solid fa-chart-line',
    Alerting: 'fa-solid fa-bell',
    Observability: 'fa-solid fa-binoculars',
    pfSense: 'fa-solid fa-shield-halved',
    CARP: 'fa-solid fa-shield',
    'VLAN segmentation': 'fa-solid fa-code-branch',
    'Firewall policy': 'fa-solid fa-fire',
    'IDS/IPS': 'fa-solid fa-user-shield',
    'Kernel bypass': 'fa-solid fa-bolt',
    'Multicast tuning': 'fa-solid fa-tower-broadcast',
    'PTP time sync': 'fa-solid fa-clock',
    'Low-latency routing': 'fa-solid fa-route'
  };

  const toShortDescription = (text) => {
    if (!text) return '';
    const firstSentence = String(text).split('. ')[0]?.trim();
    if (!firstSentence) return String(text);
    return firstSentence.endsWith('.') ? firstSentence : `${firstSentence}.`;
  };

  return (
    <section id="projects" className="section reveal">
      <SectionTitle number="05" title={copy.projectsSection.title} />

      <div className="stack-lg">
        <div className="glass-card" data-terminal-file={toTerminalFileName(copy.projectsSection.title)}>
          <p className="projects-kicker">{copy.projectsSection.kicker}</p>
          <p className="study-paragraph">{copy.projectsSection.intro}</p>
        </div>

        <div className="projects-grid">
          {copy.projectsSection.items.map((project) => {
            const content = (
              <details className="project-disclosure" open={isLargeScreen || undefined}>
                <summary className="project-summary">
                  <span className="project-summary-main">
                    <span className="project-summary-media" aria-hidden="true">
                      <ProjectVisual
                        projectTitle={project.title}
                        darkMode={darkMode}
                        image={project.image}
                        imageAlt={project.imageAlt}
                      />
                    </span>
                    <span className="project-summary-copy">
                      <span className="project-summary-subtitle">{project.subtitle}</span>
                      <span className="project-summary-text">{toShortDescription(project.problem)}</span>
                    </span>
                  </span>
                  <span className="project-summary-toggle" aria-hidden="true">
                    <i className="fa-solid fa-chevron-down"></i>
                  </span>
                </summary>

                <div className="project-expanded">
                  <div className="project-layout">
                    <div className="project-media-column">
                      <div className="project-media project-media-inline">
                        {project.href ? (
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noreferrer"
                            className="project-media-link"
                            aria-label={`Go to ${project.subtitle} project in GitHub`}
                          >
                            <ProjectVisual
                              projectTitle={project.title}
                              darkMode={darkMode}
                              image={project.image}
                              imageAlt={project.imageAlt}
                            />
                            <span className="project-media-footnote">Go to project in GitHub</span>
                          </a>
                        ) : (
                          <ProjectVisual
                            projectTitle={project.title}
                            darkMode={darkMode}
                            image={project.image}
                            imageAlt={project.imageAlt}
                          />
                        )}
                      </div>
                    </div>

                    <div className="project-copy">
                      <div className="project-head">
                        <div>
                          <span className="project-subtitle">{project.subtitle}</span>
                        </div>
                        <span className="project-link-mark">
                          <i className={project.href ? 'fa-brands fa-github' : 'fa-solid fa-diagram-project'} aria-hidden="true"></i>
                          {project.href ? 'GitHub' : 'Concept'}
                        </span>
                      </div>

                      <div className="project-details">
                        <section className="project-detail-block">
                          <h4 className="project-detail-title project-detail-title--problem">
                            <i className="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
                            {copy.projectsSection.problemLabel}
                          </h4>
                          <p className="project-description">{project.problem}</p>
                        </section>

                        {Array.isArray(project.challenges) && project.challenges.length > 0 && (
                          <section className="project-detail-block">
                            <h4 className="project-detail-title project-detail-title--challenges">
                              <i className="fa-solid fa-mountain" aria-hidden="true"></i>
                              {copy.projectsSection.challengesLabel}
                            </h4>
                            <ul className="project-challenges" aria-label={`${project.title} challenges`}>
                              {project.challenges.map((challenge) => (
                                <li key={challenge}>{challenge}</li>
                              ))}
                            </ul>
                          </section>
                        )}

                        <section className="project-detail-block">
                          <h4 className="project-detail-title project-detail-title--solution">
                            <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                            {copy.projectsSection.solutionLabel}
                          </h4>
                          <p className="project-description">{project.solution}</p>
                        </section>

                      </div>
                    </div>
                  </div>

                  <section className="project-toolset-bar">
                    <div className="project-tools" aria-label={`${project.title} tools`}>
                      {project.tools.map((tool) => (
                        <span key={tool} className="project-tool-badge">
                          <i className={iconByTool[tool] || 'fa-solid fa-wrench'} aria-hidden="true"></i>
                          <span>{tool}</span>
                        </span>
                      ))}
                    </div>
                  </section>
                </div>
              </details>
            );

            return (
              <article key={project.title} className="project-card">
                {content}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
