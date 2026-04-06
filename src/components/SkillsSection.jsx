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
    Ubuntu: 'devicon-ubuntu-plain colored',
    RedHat: 'devicon-redhat-plain colored',
    FreeBSD: 'devicon-freebsd-plain colored',
    'Windows Server': 'fa-brands fa-windows',
    'Cisco IOS': 'fa-solid fa-network-wired',
    'Photon OS': 'fa-solid fa-circle-nodes',
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
    HPE: 'fa-solid fa-server',
    DELL: 'fa-solid fa-server',
    SuperMicro: 'fa-solid fa-microchip',
    Cisco: 'fa-solid fa-network-wired',
    Fiber: 'fa-solid fa-plug',
    'Rack Design': 'fa-solid fa-layer-group',
    'EMC/TrueNAS': 'fa-solid fa-hard-drive',
    'EMC / TrueNAS Storage': 'fa-solid fa-hard-drive',
    EMC: 'fa-solid fa-hard-drive',
    'Cabling Standards': 'fa-solid fa-ethernet',
    Docker: 'devicon-docker-plain colored',
    'Docker Swarm': 'devicon-docker-plain colored',
    OpenStack: 'devicon-openstack-plain colored',
    DigitalOcean: 'devicon-digitalocean-plain colored',
    Hetzner: 'fa-solid fa-cloud',
    LeaseWeb: 'fa-solid fa-server',
    Postgres: 'devicon-postgresql-plain colored',
    PostgreSQL: 'devicon-postgresql-plain colored',
    MySQL: 'devicon-mysql-plain colored',
    MongoDB: 'devicon-mongodb-plain colored',
    Redis: 'devicon-redis-plain colored',
    ClickHouse: 'devicon-clickhouse-plain colored',
    Patroni: 'fa-solid fa-database',
    HAProxy: 'fa-solid fa-route',
    PgBouncer: 'fa-solid fa-network-wired',
    ETCD: 'fa-solid fa-layer-group',
    etcd: 'fa-solid fa-layer-group',
    Grafana: 'devicon-grafana-plain',
    Prometheus: 'devicon-prometheus-original colored',
    'ELK/Graylog': 'devicon-elasticsearch-plain colored',
    'ELK Stack': 'devicon-elasticsearch-plain colored',
    Graylog: 'fa-solid fa-file-lines',
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
    Backups: 'fa-solid fa-floppy-disk',
    Jenkins: 'devicon-jenkins-line colored',
    ArgoCD: 'fa-solid fa-diagram-project'
    ,
    // Containerization & Orchestration
    Podman: 'fa-brands fa-docker',
    Containerd: 'fa-solid fa-cube',
    // Observability, Monitoring & Logging
    OpenTelemetry: 'fa-solid fa-satellite-dish',
    Jaeger: 'fa-solid fa-bug',
    Fluentd: 'fa-solid fa-water',
    // Databases & High Availability
    GraphQL: 'devicon-graphql-plain colored',
    // Networking & Security
    Istio: 'fa-solid fa-water',
    Linkerd: 'fa-solid fa-link',
    Consul: 'fa-solid fa-compass'
    ,
    // Message Queues & Middlewares
    Kafka: 'devicon-apachekafka-original colored',
    RabbitMQ: 'devicon-rabbitmq-original colored',
    PaceMaker: 'fa-solid fa-heart-pulse',
    Corosync: 'fa-solid fa-circle-nodes',
    // Webservers & API tools
    Apache: 'devicon-apache-plain colored',
    Nginx: 'devicon-nginx-original colored',
    Traefik: 'fa-solid fa-road-barrier',
    Squid: 'fa-solid fa-fish',
    Caddy: 'fa-solid fa-leaf',
    Kong: 'fa-solid fa-crown',
    PostMan: 'fa-solid fa-paper-plane',
    // MLOps & DataScience Tools
    'Apache Airflow': 'devicon-apacheairflow-original colored',
    'Ray Cluster': 'fa-solid fa-bolt',
    Spark: 'devicon-apachespark-original colored',
    Hazelcast: 'fa-solid fa-cubes'
  };

  return (
    <section id="skills" className="section reveal">
      <SectionTitle number="03" title={copy.skillsSection.title} />

      <div className="stack-lg">
        <div className="glass-card" data-terminal-file={toTerminalFileName(copy.skillsSection.technicalTitle)}>
          <div className="skills-grid">
            {copy.skillsSection.categories.map((category, idx) => (
              <div key={idx} className="skill-category-card">
                <h5 className="category-title">{category.name}</h5>
                <div className="skill-badges">
                  {category.items.map((skill, i) => (
                    <span key={i} className="skill-badge">
                      {iconBySkill[skill] && (
                        <i className={iconBySkill[skill]} aria-hidden="true"></i>
                      )}
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
