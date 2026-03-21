export const en = {
  meta: {
    title: 'Ali Fattahi | DevOps & Infrastructure Engineer'
  },
  nav: {
    about: 'About',
    experience: 'Experience',
    skills: 'Skills',
    study: 'Study',
    projects: 'Projects',
    contact: 'Get In Touch'
  },
  hero: {
    prompt: 'Hello World, whoami',
    name: 'Ali Fattahi',
    role: 'Senior DevOps Engineer\nIT Infrastructure Architect',
    summary:
      'Building resilient, scalable infrastructure through automation and DevOps best practices. I transform complex technical challenges into elegant, high-performance solutions that power mission-critical systems.',
    ctaPrimary: 'Get In Touch',
    ctaSecondary: 'View Projects',
    location: 'Antalya, Türkiye',
    email: 'alit.fattahi@gmail.com',
    phone: '(+90) 501 640 3103',
    resumeLabel: 'Resume:',
    resumeDownload: 'Download Resume'
  },
  about: {
    title: 'About Me',
    paragraphs: [
      'I am a Senior DevOps Engineer and Infrastructure Architect with over a decade of experience designing, scaling, and securing enterprise IT environments. My expertise bridges the gap between deep physical infrastructure and modern cloud-native orchestration. I approach every challenge with a strict engineering philosophy: understand the core bottleneck, architect for high availability, and automate relentlessly.',
      'Throughout my career, I have navigated the extremes of infrastructure demands, from managing petabytes of storage in premier national datacenters to stripping microsecond latency out of high-frequency trading networks. My foundation in Network Engineering (BSc) allows me to troubleshoot and optimize at the packet level, while my DevOps expertise ensures those systems deploy rapidly, reliably, and consistently at scale.',
      'Currently based in Antalya, Türkiye, I am actively operating within the global tech ecosystem. I am focused on bringing my blend of bare-metal resilience and automated cloud architecture to forward-thinking engineering teams that refuse to compromise on performance.'
    ],
    cards: {
      education: {
        title: 'Education',
        items: [
          'BSc, Network Engineering',
          'University of Applied Science and Technology',
          'BSc, Software Engineering',
          'Azad University of IRAN'
        ]
      },
      languages: {
        title: 'Languages',
        items: [
          'English (Professional)',
          'Turkish (Proficient)',
          'Farsi (Native)',
          'Azerbaijani (Native)',
          'Currently learning Dutch (A2)'
        ]
      }
    }
  },
  experience: {
    title: 'Journey',
    jobs: [
      {
        role: 'DevOps & Linux System Administrator',
        company: 'Dannie.cc',
        period: 'Nov 2025 - Mar 2026 (Antalya, Türkiye) - Company Liquidation',
        bullets: [
          'Cut CI/CD pipeline runtime across dev, staging, and production by 40%, accelerating development and deployment cycles.',
          'Built a comprehensive monitoring stack for ERP systems and VMs to identify performance bottlenecks and reduce troubleshooting time.',
          'Designed a multi-region network connecting Russia, Lithuania, and Türkiye branches, ensuring reliable data transfer.',
          'Standardized technical documentation and network maps for hybrid infrastructure to streamline troubleshooting.',
          'Led Türkiye branch network upgrade to meet IATF standards, achieving successful certification audit passage.'
        ]
      },
      {
        role: 'Linux System Administrator',
        company: 'Hermes Capital',
        period: 'Feb 2021 - Oct 2025 (Tehran, Iran)',
        bullets: [
          'Orchestrated a high-availability Linux infrastructure (250+ Linux VMs, 200+TB storage) for seamless and performant operations.',
          'Cut monthly operational spending by 38% through strategic infrastructure upgrades and smarter resource allocation.',
          'Enhanced team project delivery speed by ~55% after recruiting and training 4 junior engineers to full productivity.',
          'Ensured IT systems met government standards, critical for securing 6 key security and trade permits.',
          'Streamlined 41 micro-service deployments via automation, cutting times by over half while eliminating manual error.',
          'Managed a full infrastructure co-location migration, cutting service latency by 97% (from ~9ms to ~270us).',
          'Reduced trading and order execution latency by 22% via Linux kernel adjustments and network fine-tuning.',
          'Reduced average troubleshooting time by 18% through more precise system alerts and faster issue identification.',
          'Improved troubleshooting consistency and identified new automation opportunities by developing structured runbooks.',
          'Ensured servers and network devices performed reliably by managing lifecycle upkeep and health checks.'
        ]
      },
      {
        role: 'Offshore IT Systems Engineer',
        company: 'Persia Telecom Co.',
        period: 'Jan 2017 - Apr 2023 (Persian Gulf)',
        bullets: [
          'Engineered and maintained critical IT infrastructure for maritime fleet, ensuring seamless offshore operations.',
          'Improved vessel-to-shore connectivity by refining IT methods and automating monitoring workflows.',
          'Delivered tailored technology solutions meeting unique operational requirements of each vessel.',
          'Built collaborative environments within diverse international workforces emphasizing effective communication.'
        ]
      },
      {
        role: 'Linux System Administrator',
        company: 'Brieflands',
        period: 'Feb 2016 - May 2017 (Tehran, Iran)',
        bullets: [
          'Scaled and maintained multi-region server environments across 5 countries, supporting international medical platforms and a 7-person dev team.',
          'Managed distributed LeaseWeb co-hosting and 14TB of in-house backups, ensuring 99.8% uptime across 5 international regions.',
          'Orchestrated a 12-node Docker Swarm cluster for 25+ services, reducing deployment and scaling times by 40%.',
          'Resolved 300+ infrastructure tickets via Redmine as sole sysadmin with average turnaround under 12 hours.'
        ]
      },
      {
        role: 'Datacenter Operations Specialist',
        company: 'AFRANET',
        period: 'Feb 2014 - May 2015 (Tehran, Iran)',
        bullets: [
          'Provided prompt technical support, enhancing efficiency of customer support teams.',
          'Developed comprehensive documentation on standards like TIA-942, BICSI, and ISO 27001.',
          'Analyzed and presented strategic insights that drove datacenter operation enhancements.'
        ]
      }
    ]
  },
  skillsSection: {
    title: 'Core Expertise',
    technicalTitle: 'Technical Skills',
    categories: [
      {
        name: 'Infrastructure as Code (IaC)',
        items: ['Terraform', 'Ansible']
      },
      {
        name: 'Containerization & Orchestration',
        items: ['Kubernetes (K8s)', 'Docker', 'Docker Swarm', 'Nomad']
      },
      {
        name: 'Cloud & Virtualization',
        items: ['AWS', 'VMware (vSphere/vSAN)', 'OpenStack']
      },
      {
        name: 'CI/CD & Version Control',
        items: ['GitLab CI/CD', 'GitHub Actions', 'Jenkins', 'ArgoCD', 'Git', 'Bitbucket']
      },
      {
        name: 'Observability, Monitoring & Logging',
        items: ['Prometheus', 'Grafana', 'ELK Stack / Graylog', 'Loki', 'Alertmanager', 'Zabbix', 'Percona Monitoring']
      },
      {
        name: 'Databases & High Availability',
        items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Patroni', 'HAProxy', 'PgBouncer', 'etcd']
      },
      {
        name: 'Networking & Security',
        items: ['BGP', 'pfSense', 'Fortinet', 'HashiCorp Vault', 'OpenLDAP', 'WireGuard', 'Elastic SIEM']
      },
      {
        name: 'Operating Systems & Scripting',
        items: ['Linux Architecture', 'Bash', 'Python', 'Systemd']
      },
      {
        name: 'Datacenter & Hardware Infrastructure',
        items: ['HPE / Dell Enterprise Servers', 'EMC / TrueNAS Storage']
      }
    ],
    methodologyTitle: 'Leadership & Methodology',
    methodologyBadges: [
      'Technical Mentorship & Team Scaling',
      'Cross-Functional Alignment',
      'Stakeholder Management',
      'Incident Management',
      'Root Cause Analysis (RCA)',
      'Agile/Scrum Delivery',
      'Change Management',
      'SLA & Uptime Accountability'
    ]
  },
  study: {
    title: 'Current Focus & Certifications',
    intro:
      'In infrastructure, stagnation is a liability. My ongoing technical development focuses strictly on cloud-native orchestration, advanced architectural design, and mastering the tools that drive enterprise scalability.',
    certificationsTitle: 'Active Certification Tracks',
    certificationsTarget: 'Target: Q2 2026',
    certifications: [
      {
        name: 'Certified Kubernetes Administrator (CKA)',
        description: 'Deepening expertise in cluster architecture, advanced scheduling, and production-grade troubleshooting.'
      },
      {
        name: 'AWS Certified Solutions Architect - Associate',
        description: 'Solidifying cloud-native design patterns, high availability, and cost-optimized infrastructure deployment.'
      }
    ],
    deepDivesTitle: 'Current Technical Deep Dives',
    deepDives: [
      {
        name: 'Advanced Orchestration',
        description: 'Refining Kubernetes multi-node deployments and stateful applications.'
      },
      {
        name: 'Infrastructure as Code (IaC)',
        description: 'Optimizing automated provisioning pipelines using Terraform and Ansible for zero-downtime environments.'
      },
      {
        name: 'Low-Latency Networking',
        description: 'Continuous labbing of kernel bypass techniques and high-frequency routing optimizations.'
      }
    ]
  },
  projectsSection: {
    title: 'Featured Projects',
    kicker: 'Architecture & Automation in Practice',
    problemLabel: 'Problem',
    solutionLabel: 'Solution',
    toolsLabel: 'Toolset used',
    openLinkLabel: 'Open on GitHub',
    intro:
      'Below is a curated selection of infrastructure designs, automation tools, and CI/CD workflows. These repositories reflect real-world, production-grade scenarios I have architected and navigated throughout my career. They demonstrate my hands-on approach to solving complex operational bottlenecks, enforcing security by design, and building highly available systems from the ground up.',
    items: [
      {
        title: 'Networking',
        subtitle: 'Multi-Layer Secure Network Design',
        image: 'assets/projects/network-hft.png',
        imageAlt: 'Low-latency networking architecture diagram for HFT project',
        problem:
          'High-frequency trading environments lose real advantage when network latency, jitter, and timing drift are not controlled across the full path.',
        solution:
          'This project designs a low-latency network architecture around clean traffic paths, kernel-bypass-aware tuning, multicast optimization, and precise time synchronization so market data and order flow stay deterministic.',
        tools: ['Linux networking', 'Kernel bypass', 'Multicast tuning', 'PTP time sync', 'Low-latency routing'],
        href: 'https://github.com/alitman22/network-architecture-for-HFT'
      },
      {
        title: 'Ansible',
        subtitle: 'Kafka Cluster Installation',
        image: 'assets/projects/ansible-kafka.png',
        imageAlt: 'Ansible Kafka cluster automation overview diagram',
        problem:
          'Most Kafka installation tutorials stop at a basic running cluster and miss production surrounding needs like deep metrics visibility, developer-friendly management UI, and controlled external broker access through firewalls.',
        solution:
          'This implementation extends beyond vanilla playbooks by automating JMX Exporter integration for Kafka beans and metrics, deploying Redpanda Console for visual day-to-day operations, and configuring NAT-based broker access for secure external connectivity. With idempotent Ansible orchestration, the cluster is delivered out of the box as reliable, observable, developer-manageable, and straightforward to expand.',
        tools: ['Ansible', 'Kafka', 'Zookeeper', 'JMX Exporter', 'Redpanda Console', 'NAT broker access'],
        href: 'https://github.com/alitman22/kafka-deployment-configuration'
      },
      {
        title: 'Docker',
        subtitle: 'Ray Cluster Deployment',
        image: 'assets/projects/docker-ray.png',
        imageAlt: 'Docker Ray cluster deployment overview diagram',
        problem:
          'A small data team needed a Ray cluster they could trust without becoming infrastructure experts. Standard setups were not enough because jobs had to keep running reliably even when node capacity changed during the day or workers dropped out of the cluster.',
        solution:
          'This deployment provides a transparent but production-ready Ray runtime where cluster membership and resource changes are handled gracefully. When a node becomes unavailable or loses capacity, workloads are drained and rescheduled to healthy nodes instead of crashing. The result is robust job execution that finishes with usable outputs, reducing headless unfinished jobs caused by shifting resource allocation.',
        tools: ['Docker', 'Ray', 'Python', 'Container networking', 'Distributed compute'],
        href: 'https://github.com/alitman22/ray-vmware-cluster'
      },
      {
        title: 'Database',
        subtitle: 'HA PostgreSQL with Patroni',
        image: 'assets/projects/postgres-patroni.png',
        imageAlt: 'PostgreSQL and Patroni high-availability architecture diagram',
        problem:
          'The platform started with a single-node PostgreSQL setup that worked initially, but growing data importance and heavier dashboard query load began to disrupt write performance and introduced a clear availability risk.',
        solution:
          'The solution migrates to a Patroni-based HA PostgreSQL topology with etcd consensus and HAProxy traffic control, enabling practical read/write role separation and stronger resilience across separate storage locations. By directing panel and reporting queries toward read paths while protecting write paths, Grafana refreshes remain smooth and write workloads stay stable under load.',
        tools: ['PostgreSQL', 'Patroni', 'etcd', 'HAProxy', 'High availability'],
        href: 'https://github.com/alitman22/ha-postgres-patroni-etcd-haproxy'
      },
      {
        title: 'Python',
        subtitle: 'Systemd Services Health Monitoring',
          image: 'assets/projects/systemd-monitoring.png',
          imageAlt: 'Systemd services health monitoring infographic',
        problem:
            'A Java microservices platform with mixed service profiles needed reliable state tracking across 84 systemd service units in 2 clusters. The team could not capture restart and state-change events accurately with basic pull-based tooling like node_exporter.',
        solution:
          'This push-based monitor subscribes to D-Bus systemd events and tracks service lifecycle transitions in real time across both clusters. It escalates important incidents to Telegram, publishes state time series to Prometheus Pushgateway, and enables Grafana visualization for operational trend analysis. This removed service-state blind spots and eliminated missing state information, so all Java service units stay continuously observable and operational actions are based on complete state data.',
        tools: ['Python', 'D-Bus', 'systemd', 'Linux monitoring', 'Service automation'],
        href: 'https://github.com/alitman22/Systemd-Monitoring-DBUS'
      },
      {
        title: 'Monitoring',
        subtitle: 'Centralized Monitoring Solution',
          image: 'assets/projects/prometheus-grafana.png',
          imageAlt: 'Monitoring with Prometheus and Grafana architecture infographic',
        problem:
          'Installing one Prometheus and one Grafana instance is straightforward, but building complete environment awareness is not. Without broad metric collection across all exporters and sources, teams miss critical signals from SSL certificate health to deep resource indicators like CPU costop and disk write latency.',
        solution:
          'This solution centralizes metrics from a wide exporter/gatherer ecosystem into a single observability pipeline, then visualizes them in Grafana with clear operational dashboards. It significantly improves end-to-end awareness, provides precise and actionable insights, strengthens alerting quality, and reduces time to detection for production issues.',
        tools: ['Prometheus', 'Grafana', 'Exporters', 'Pushgateway', 'Alerting', 'Observability'],
        href: 'https://github.com/alitman22/full-stack-monitoring'
      },
      {
        title: 'Security',
        subtitle: 'pfSense Cluster Implementation',
        image: 'assets/projects/pfsense-security.png',
        imageAlt: 'pfSense cluster security implementation overview',
        problem:
          'The infrastructure initially relied on a single FortiGate firewall layer. As multi-VLAN segmentation, large rule sets, and LACP striping across the cluster grew in complexity, a more flexible secondary security and inter-VLAN routing layer became necessary without introducing excessive cost.',
        solution:
          'This implementation deploys pfSense in HA mode as a secondary security tier, handling inter-VLAN routing and granular access policy control while preserving high availability. Although HA significantly increases setup complexity, the design uses HP DL160 servers to extend resiliency at both software and hardware layers for enterprise-grade operation.',
        tools: ['pfSense', 'CARP', 'Inter-VLAN routing', 'LACP', 'Firewall policy', 'HP DL160'],
        href: 'https://github.com/alitman22/pfsense-ha-enterprise'
      },
      {
        title: 'Tools',
        subtitle: 'Job Match Radar Browser Extension',
        image: 'assets/projects/job-match-radar.png',
        imageAlt: 'Job search automation solution overview',
        problem:
          'When scanning large volumes of job listings or content, most pages are only partially relevant, forcing teams to manually evaluate each one against complex criteria and wasting time on low-fit opportunities.',
        solution:
          'This open-source Chrome extension (MV3) uses a weighted keyword-matching model with group and phrase-level signals to score page relevance consistently and explainably. It offers a quick popup for fast actions and a full settings UI for deep configuration, optional LLM-assisted keyword expansion, and data export for integration into automation workflows.',
        tools: ['JavaScript', 'Chrome Extension', 'MV3', 'Storage APIs', 'Content Scripts', 'LLM Integration'],
        href: 'https://github.com/alitman22/job-match-radar-extension'
      }
    ]
  },
  contact: {
    headingTop: "What's Next?",
    headingMain: "Let's Connect",
    global:
      "I build high-performance infrastructure defined by excellence, automation, and rock-solid reliability. I am currently seeking new opportunities to bring these skills to innovative teams in Germany or the Netherlands. If you're looking for an engineer to help drive your success, let's talk.",
    tr:
      "I'm a Turkish Work Permit holder available for immediate transfer and ready for remote-first or to move to cities like Istanbul or Ankara for on-site jobs. If you're building infrastructure that demands excellence, automation, and rock-solid reliability, I'd be excited to discuss how I can contribute to your team's success.",
    sayHello: 'Say Hello',
    linkedin: 'LinkedIn Profile'
  },
  footer: {
    designed: 'Designed & Customized by Ali Fattahi',
    built: 'Built by AI - 2026 - v2.15.1'
  }
};
