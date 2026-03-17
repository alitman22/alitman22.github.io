import SectionTitle from './SectionTitle';

function SkillsSection({ copy }) {
  const toTerminalFileName = (value) => (
    `${String(value || 'skills')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'skills'}.txt`
  );

  const iconBySkill = {
    Linux: 'devicon-linux-plain',
    Ansible: 'devicon-ansible-plain colored',
    Terraform: 'devicon-terraform-plain colored',
    Nomad: 'devicon-nomad-plain colored',
    Bash: 'devicon-bash-plain',
    Python: 'devicon-python-plain colored',
    Systemd: 'fa-solid fa-gears',
    Git: 'devicon-git-plain colored',
    VMware: 'devicon-vsphere-plain',
    'VMware (vSphere/vSAN)': 'devicon-vsphere-plain',
    Kubernetes: 'devicon-kubernetes-plain colored',
    'Kubernetes (K8s)': 'devicon-kubernetes-plain colored',
    AWS: 'devicon-amazonwebservices-plain-wordmark colored',
    'HPE/Dell': 'fa-solid fa-server',
    'HPE / Dell Enterprise Servers': 'fa-solid fa-server',
    'EMC/TrueNAS': 'fa-solid fa-hard-drive',
    'EMC / TrueNAS Storage': 'fa-solid fa-hard-drive',
    Docker: 'devicon-docker-plain colored',
    'Docker Swarm': 'devicon-docker-plain colored',
    OpenStack: 'devicon-openstack-plain colored',
    Postgres: 'devicon-postgresql-plain colored',
    PostgreSQL: 'devicon-postgresql-plain colored',
    MySQL: 'devicon-mysql-plain colored',
    MongoDB: 'devicon-mongodb-plain colored',
    Redis: 'devicon-redis-plain colored',
    Patroni: 'fa-solid fa-database',
    HAProxy: 'devicon-haproxy-plain colored',
    PgBouncer: 'fa-solid fa-network-wired',
    ETCD: 'fa-solid fa-layer-group',
    etcd: 'fa-solid fa-layer-group',
    Grafana: 'devicon-grafana-plain',
    Prometheus: 'devicon-prometheus-original colored',
    'ELK/Graylog': 'devicon-elasticsearch-plain colored',
    'ELK Stack / Graylog': 'devicon-elasticsearch-plain colored',
    Zabbix: 'fa-solid fa-chart-line',
    Percona: 'fa-solid fa-table',
    'Percona Monitoring': 'fa-solid fa-table',
    Loki: 'fa-solid fa-wave-square',
    Alertmanager: 'fa-solid fa-bell',
    pfSense: 'fa-solid fa-shield-halved',
    Fortinet: 'fa-brands fa-fort-awesome',
    Vault: 'devicon-vault-original colored',
    'HashiCorp Vault': 'devicon-vault-original colored',
    OpenLDAP: 'fa-solid fa-users-gear',
    'Elastic SIEM': 'devicon-elasticsearch-plain colored',
    WireGuard: 'fa-solid fa-route',
    BGP: 'fa-solid fa-network-wired',
    GitLab: 'devicon-gitlab-plain colored',
    'GitLab CI': 'devicon-gitlab-plain colored',
    'GitLab CI/CD': 'devicon-gitlab-plain colored',
    Actions: 'devicon-github-original colored',
    'GitHub Actions': 'devicon-github-original colored',
    Bitbucket: 'devicon-bitbucket-original colored',
    'Linux Architecture': 'devicon-linux-plain',
    Nginx: 'devicon-nginx-original colored',
    Backups: 'fa-solid fa-floppy-disk',
    Jenkins: 'devicon-jenkins-line colored',
    ArgoCD: 'fa-solid fa-diagram-project'
  };

  return (
    <section id="skills" className="section reveal">
      <SectionTitle number="03" title={copy.skillsSection.title} />

      <div className="stack-lg">
        <div className="glass-card" data-terminal-file={toTerminalFileName(copy.skillsSection.technicalTitle)}>
          <h4 className="subheading">{copy.skillsSection.technicalTitle}</h4>
          <div className="skills-grid">
            {copy.skillsSection.categories.map((category) => (
              <article key={category.name} className="skills-card">
                <h5>{category.name}</h5>
                <div className="badge-wrap">
                  {category.items.map((item) => (
                    <span key={item} className="skill-badge">
                      <i className={iconBySkill[item] || 'fa-solid fa-microchip'} aria-hidden="true"></i>
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
