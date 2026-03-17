import SectionTitle from './SectionTitle';
import ProjectThumbnail from './ProjectThumbnail';

function ProjectsSection({ copy, darkMode }) {
  const toTerminalFileName = (value) => (
    `${String(value || 'projects')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'projects'}.txt`
  );

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
              <>
                <div className="project-media">
                  <ProjectThumbnail
                    projectTitle={project.title}
                    darkMode={darkMode}
                    className="project-thumb"
                  />
                </div>
                <div className="project-head">
                  <span className="project-title">{project.title}</span>
                  <span className="project-link-mark">
                    <i className={project.href ? 'fa-brands fa-github' : 'fa-solid fa-diagram-project'} aria-hidden="true"></i>
                    {project.href ? 'GitHub' : 'Concept'}
                  </span>
                </div>
                <span className="project-subtitle">{project.subtitle}</span>
                <p className="project-description">{project.description}</p>
              </>
            );

            if (project.href) {
              return (
                <a
                  key={project.title}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="project-card project-card-link"
                >
                  {content}
                </a>
              );
            }

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
