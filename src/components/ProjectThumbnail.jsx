const THEME = {
  dark: {
    bgStart: '#081220',
    bgEnd: '#12365a',
    panel: 'rgba(9, 18, 32, 0.42)',
    panelStrong: 'rgba(8, 18, 32, 0.62)',
    stroke: 'rgba(173, 216, 255, 0.18)',
    grid: 'rgba(147, 197, 253, 0.08)',
    text: '#e6f4ff',
    chip: 'rgba(255, 255, 255, 0.08)'
  },
  light: {
    bgStart: '#edf5ff',
    bgEnd: '#d9e8fb',
    panel: 'rgba(255, 255, 255, 0.62)',
    panelStrong: 'rgba(255, 255, 255, 0.82)',
    stroke: 'rgba(38, 88, 152, 0.16)',
    grid: 'rgba(38, 88, 152, 0.08)',
    text: '#17345e',
    chip: 'rgba(23, 52, 94, 0.08)'
  }
};

const PROJECTS = {
  Networking: {
    accentA: '#2dd4bf', accentB: '#60a5fa', motif: 'network',
    prompt: 'Clean technical illustration of low-latency networking: connected nodes, secure path lines, subtle shield geometry, layered control-plane panels, no text.',
    references: [
      'unDraw search direction: network, web search, cloud infrastructure',
      'ManyPixels style direction: Azureline or Chromablue technical scenes with abstract nodes',
      'SVG Repo search direction: network topology, cyber security, routing diagram'
    ]
  },
  Ansible: {
    accentA: '#f97316', accentB: '#facc15', motif: 'automation',
    prompt: 'Modern DevOps automation scene: task cards linked in sequence, orchestration flow, idempotent playbook feel, abstract ops dashboard, no labels.',
    references: [
      'unDraw search direction: coding assistant, system update, open source code',
      'ManyPixels style direction: presentation or analyst scenes adapted to orchestration flow',
      'SVG Repo search direction: automation workflow, config management, orchestration'
    ]
  },
  VMware: {
    accentA: '#34d399', accentB: '#22c55e', motif: 'vmware',
    prompt: 'Infrastructure virtualization artwork: stacked compute blocks, shared storage layer, resilient cluster topology, soft glass panels, no text.',
    references: [
      'unDraw search direction: cloudflare dev, progressive web app, code contribution',
      'ManyPixels style direction: data center or 3D model scenes for virtualized infrastructure',
      'SVG Repo search direction: server rack, virtualization, hypervisor cluster'
    ]
  },
  Docker: {
    accentA: '#38bdf8', accentB: '#6366f1', motif: 'docker',
    prompt: 'Container platform thumbnail: modular container blocks, shipping-inspired cluster silhouette, horizontal lanes, clean engineering illustration, no text.',
    references: [
      'unDraw search direction: my app, system update, code contribution',
      'ManyPixels style direction: coding or under construction scenes with modular blocks',
      'SVG Repo search direction: container, kubernetes, shipping box infrastructure'
    ]
  },
  Database: {
    accentA: '#14b8a6', accentB: '#0ea5e9', motif: 'database',
    prompt: 'High-availability database illustration: layered storage cylinders, replication rings, synchronized data planes, polished abstract infra visual, no text.',
    references: [
      'unDraw search direction: database, calculator, business decisions',
      'ManyPixels style direction: analyst or science scenes adapted to data layers',
      'SVG Repo search direction: database cluster, storage, replication'
    ]
  },
  Python: {
    accentA: '#fbbf24', accentB: '#3b82f6', motif: 'python',
    prompt: 'Python systems tooling illustration: dual-form logic shapes, automation signals, service monitoring cues, minimalist engineering composition, no text.',
    references: [
      'unDraw search direction: coding assistant, open source code, code contribution',
      'ManyPixels style direction: coding 5 or presentation scenes with scripting feel',
      'SVG Repo search direction: python, scripting, backend automation'
    ]
  },
  Bash: {
    accentA: '#22c55e', accentB: '#10b981', motif: 'terminal',
    prompt: 'Shell tooling thumbnail: terminal glass panel, command flow arrows, script lines, operational clarity, compact clean visual without labels.',
    references: [
      'unDraw search direction: open source code, coding assistant, system update',
      'ManyPixels style direction: coding or analyst scenes with terminal adaptation',
      'SVG Repo search direction: terminal, shell, command line'
    ]
  },
  Monitoring: {
    accentA: '#a78bfa', accentB: '#22d3ee', motif: 'monitoring',
    prompt: 'Observability illustration: telemetry curves, alert spikes, dashboard grid, live metrics feeling, modern abstract SVG scene, no text.',
    references: [
      'unDraw search direction: goals, target audience, business decisions',
      'ManyPixels style direction: analyst or presentation scenes with dashboard motifs',
      'SVG Repo search direction: monitoring, dashboard, analytics chart'
    ]
  },
  'CI/CD': {
    accentA: '#fb7185', accentB: '#f59e0b', motif: 'pipeline',
    prompt: 'Continuous delivery pipeline scene: staged nodes, flowing arrows, gated releases, deployment progression, crisp abstract ops artwork, no text.',
    references: [
      'unDraw search direction: project completed, successful upload, system update',
      'ManyPixels style direction: target or presentation scenes adapted to delivery pipeline',
      'SVG Repo search direction: pipeline, deployment, continuous integration'
    ]
  },
  Security: {
    accentA: '#60a5fa', accentB: '#2dd4bf', motif: 'security',
    prompt: 'Infrastructure security illustration: shield core, perimeter nodes, protected access paths, resilient trust boundary design, no text.',
    references: [
      'unDraw search direction: document warning, contract, cloudflare dev',
      'ManyPixels style direction: target or data center scenes with security adaptation',
      'SVG Repo search direction: shield, firewall, cyber security'
    ]
  }
};

function Background({ id, theme, accentA, accentB }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={theme.bgStart} />
          <stop offset="100%" stopColor={theme.bgEnd} />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="75%" cy="25%" r="70%">
          <stop offset="0%" stopColor={accentA} stopOpacity="0.25" />
          <stop offset="100%" stopColor={accentA} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-glow-b`} cx="20%" cy="80%" r="65%">
          <stop offset="0%" stopColor={accentB} stopOpacity="0.2" />
          <stop offset="100%" stopColor={accentB} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="450" rx="28" fill={`url(#${id}-bg)`} />
      <rect width="800" height="450" rx="28" fill={`url(#${id}-glow)`} />
      <rect width="800" height="450" rx="28" fill={`url(#${id}-glow-b)`} />
      <g stroke={theme.grid} strokeWidth="1">
        <path d="M0 132 H800" />
        <path d="M0 238 H800" />
        <path d="M0 344 H800" />
        <path d="M148 0 V450" />
        <path d="M326 0 V450" />
        <path d="M504 0 V450" />
        <path d="M682 0 V450" />
      </g>
      <rect x="28" y="28" width="744" height="394" rx="24" fill={theme.panel} stroke={theme.stroke} />
      <rect x="64" y="74" width="672" height="302" rx="28" fill={theme.panelStrong} stroke={theme.stroke} />
    </>
  );
}

function NetworkMotif({ accentA, accentB, theme }) {
  return (
    <>
      <g stroke={accentB} strokeWidth="7" fill="none" strokeLinecap="round">
        <path d="M120 300 L240 160 L390 225 L545 130 L680 205" />
        <path d="M170 338 L315 272 L440 292 L610 252" opacity="0.7" />
      </g>
      <g fill={theme.text}>
        <circle cx="120" cy="300" r="17" />
        <circle cx="240" cy="160" r="19" />
        <circle cx="390" cy="225" r="17" />
        <circle cx="545" cy="130" r="17" />
        <circle cx="680" cy="205" r="21" />
      </g>
      <path d="M620 312 l36 -54 l36 54 v36 h-72z" fill={accentA} opacity="0.9" />
    </>
  );
}

function AutomationMotif({ accentA, accentB, theme }) {
  return (
    <>
      <g>
        <rect x="120" y="132" width="168" height="72" rx="18" fill={theme.panel} stroke={accentA} />
        <rect x="316" y="190" width="168" height="72" rx="18" fill={theme.panel} stroke={accentB} />
        <rect x="512" y="248" width="168" height="72" rx="18" fill={theme.panel} stroke={accentA} />
      </g>
      <g stroke={theme.text} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M276 168 H334 L334 205" />
        <path d="M472 226 H530 L530 263" />
      </g>
      <g fill={accentB}>
        <circle cx="160" cy="168" r="12" />
        <circle cx="356" cy="226" r="12" />
        <circle cx="552" cy="284" r="12" />
      </g>
      <g fill={theme.text} opacity="0.92">
        <rect x="186" y="154" width="76" height="8" rx="4" />
        <rect x="186" y="171" width="54" height="8" rx="4" />
        <rect x="382" y="212" width="76" height="8" rx="4" />
        <rect x="382" y="229" width="56" height="8" rx="4" />
        <rect x="578" y="270" width="76" height="8" rx="4" />
        <rect x="578" y="287" width="48" height="8" rx="4" />
      </g>
    </>
  );
}

function VmwareMotif({ accentA, accentB, theme }) {
  return (
    <>
      <rect x="136" y="266" width="528" height="42" rx="21" fill={accentB} opacity="0.2" />
      <g>
        <rect x="168" y="142" width="126" height="112" rx="18" fill={theme.panel} stroke={accentA} />
        <rect x="336" y="110" width="126" height="144" rx="18" fill={theme.panel} stroke={accentB} />
        <rect x="504" y="142" width="126" height="112" rx="18" fill={theme.panel} stroke={accentA} />
      </g>
      <g fill={theme.text} opacity="0.95">
        <rect x="194" y="168" width="74" height="10" rx="5" />
        <rect x="194" y="188" width="58" height="10" rx="5" />
        <rect x="362" y="146" width="74" height="10" rx="5" />
        <rect x="362" y="166" width="58" height="10" rx="5" />
        <rect x="530" y="168" width="74" height="10" rx="5" />
        <rect x="530" y="188" width="58" height="10" rx="5" />
      </g>
      <g fill={accentA}>
        <circle cx="231" cy="222" r="8" />
        <circle cx="399" cy="222" r="8" />
        <circle cx="567" cy="222" r="8" />
      </g>
    </>
  );
}

function DockerMotif({ accentA, accentB, theme }) {
  return (
    <>
      <g transform="translate(148 150)">
        <rect x="0" y="58" width="74" height="42" rx="10" fill={accentB} />
        <rect x="86" y="58" width="74" height="42" rx="10" fill={accentB} />
        <rect x="172" y="58" width="74" height="42" rx="10" fill={accentB} />
        <rect x="42" y="10" width="74" height="42" rx="10" fill={accentA} />
        <rect x="128" y="10" width="74" height="42" rx="10" fill={accentA} />
        <path d="M266 90 q60 0 94 42 h56 q-20 -76 -98 -110 q-6 -50 -40 -70 q12 46 -26 76 q-10 -4 -24 -4 q-15 0 -28 4 q-28 -22 -30 -60 q-21 28 -10 60 q-32 22 -32 62z" fill={theme.text} opacity="0.92" />
      </g>
      <g stroke={theme.text} strokeWidth="5" opacity="0.45">
        <path d="M118 354 H682" />
        <path d="M148 328 H652" />
      </g>
    </>
  );
}

function DatabaseMotif({ accentA, accentB, theme }) {
  return (
    <>
      <g transform="translate(176 110)">
        <g>
          <ellipse cx="138" cy="34" rx="118" ry="28" fill={accentA} />
          <rect x="20" y="34" width="236" height="160" fill={accentA} opacity="0.92" />
          <ellipse cx="138" cy="194" rx="118" ry="28" fill={accentA} />
        </g>
        <g opacity="0.88">
          <ellipse cx="138" cy="88" rx="118" ry="28" fill={accentB} />
          <ellipse cx="138" cy="142" rx="118" ry="28" fill={accentB} />
        </g>
        <g fill={theme.text} opacity="0.9">
          <ellipse cx="138" cy="34" rx="56" ry="10" />
          <ellipse cx="138" cy="88" rx="56" ry="10" />
          <ellipse cx="138" cy="142" rx="56" ry="10" />
        </g>
      </g>
    </>
  );
}

function PythonMotif({ accentA, accentB, theme }) {
  return (
    <>
      <path d="M266 126 h128 q54 0 54 52 v66 h-126 q-56 0 -56 56 v26 h-52 q-54 0 -54 -52 v-96 q0 -52 52 -52z" fill={accentA} />
      <path d="M534 324 h-128 q-54 0 -54 -52 v-66 h126 q56 0 56 -56 v-26 h52 q54 0 54 52 v96 q0 52 -52 52z" fill={accentB} />
      <g fill={theme.text}>
        <circle cx="338" cy="176" r="10" />
        <circle cx="462" cy="274" r="10" />
      </g>
      <g fill={theme.text} opacity="0.35">
        <rect x="208" y="182" width="138" height="12" rx="6" />
        <rect x="454" y="256" width="138" height="12" rx="6" />
      </g>
    </>
  );
}

function TerminalMotif({ accentA, accentB, theme }) {
  return (
    <>
      <rect x="124" y="112" width="552" height="226" rx="24" fill={theme.panel} stroke={accentA} />
      <rect x="124" y="112" width="552" height="42" rx="24" fill={accentA} opacity="0.16" />
      <circle cx="156" cy="132" r="7" fill="#fb7185" />
      <circle cx="178" cy="132" r="7" fill="#fbbf24" />
      <circle cx="200" cy="132" r="7" fill="#34d399" />
      <g fill={theme.text} opacity="0.92">
        <rect x="166" y="192" width="188" height="12" rx="6" />
        <rect x="166" y="224" width="262" height="12" rx="6" />
        <rect x="166" y="256" width="214" height="12" rx="6" />
        <rect x="166" y="288" width="142" height="12" rx="6" />
      </g>
      <path d="M464 210 l34 28 l-34 28" fill="none" stroke={accentB} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M516 266 h58" fill="none" stroke={accentB} strokeWidth="8" strokeLinecap="round" />
    </>
  );
}

function MonitoringMotif({ accentA, accentB, theme }) {
  return (
    <>
      <g stroke={theme.text} strokeWidth="4" opacity="0.25">
        <path d="M134 306 H680" />
        <path d="M134 252 H680" />
        <path d="M134 198 H680" />
      </g>
      <path d="M146 298 L232 264 L314 280 L396 186 L486 224 L566 168 L654 196" fill="none" stroke={accentA} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M146 322 L230 314 L316 286 L396 298 L486 276 L566 250 L654 230" fill="none" stroke={accentB} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" opacity="0.88" />
      <g fill={theme.text}>
        <circle cx="232" cy="264" r="9" />
        <circle cx="396" cy="186" r="9" />
        <circle cx="566" cy="168" r="9" />
      </g>
    </>
  );
}

function PipelineMotif({ accentA, accentB, theme }) {
  return (
    <>
      <g>
        <rect x="116" y="174" width="118" height="78" rx="18" fill={theme.panel} stroke={accentA} />
        <rect x="290" y="174" width="118" height="78" rx="18" fill={theme.panel} stroke={accentA} />
        <rect x="464" y="174" width="118" height="78" rx="18" fill={theme.panel} stroke={accentA} />
        <rect x="638" y="174" width="46" height="78" rx="18" fill={theme.panel} stroke={accentA} />
      </g>
      <g stroke={accentB} strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M234 214 H288" />
        <path d="M408 214 H462" />
        <path d="M582 214 H636" />
        <path d="M274 214 l12 -10 l0 20 z" fill={accentB} stroke="none" />
        <path d="M448 214 l12 -10 l0 20 z" fill={accentB} stroke="none" />
        <path d="M622 214 l12 -10 l0 20 z" fill={accentB} stroke="none" />
      </g>
      <g fill={theme.text}>
        <circle cx="174" cy="214" r="10" />
        <circle cx="348" cy="214" r="10" />
        <circle cx="522" cy="214" r="10" />
        <path d="M654 214 l10 10 l18 -24" fill="none" stroke={theme.text} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </>
  );
}

function SecurityMotif({ accentA, accentB, theme }) {
  return (
    <>
      <path d="M400 98 l158 56 v86 c0 84 -54 138 -158 176 c-104 -38 -158 -92 -158 -176 v-86z" fill={accentB} opacity="0.18" />
      <path d="M400 122 l132 48 v72 c0 66 -42 108 -132 142 c-90 -34 -132 -76 -132 -142 v-72z" fill={accentA} opacity="0.92" />
      <path d="M400 168 v134" stroke={theme.text} strokeWidth="12" strokeLinecap="round" />
      <path d="M338 236 h124" stroke={theme.text} strokeWidth="12" strokeLinecap="round" />
      <g fill={theme.text} opacity="0.28">
        <circle cx="256" cy="150" r="18" />
        <circle cx="544" cy="150" r="18" />
        <circle cx="256" cy="322" r="18" />
        <circle cx="544" cy="322" r="18" />
      </g>
    </>
  );
}

function renderMotif(motif, colors) {
  switch (motif) {
    case 'network':
      return <NetworkMotif {...colors} />;
    case 'automation':
      return <AutomationMotif {...colors} />;
    case 'vmware':
      return <VmwareMotif {...colors} />;
    case 'docker':
      return <DockerMotif {...colors} />;
    case 'database':
      return <DatabaseMotif {...colors} />;
    case 'python':
      return <PythonMotif {...colors} />;
    case 'terminal':
      return <TerminalMotif {...colors} />;
    case 'monitoring':
      return <MonitoringMotif {...colors} />;
    case 'pipeline':
      return <PipelineMotif {...colors} />;
    case 'security':
      return <SecurityMotif {...colors} />;
    default:
      return <NetworkMotif {...colors} />;
  }
}

function ProjectThumbnail({ projectTitle, darkMode, className = '' }) {
  const mode = darkMode ? 'dark' : 'light';
  const theme = THEME[mode];
  const config = PROJECTS[projectTitle] || PROJECTS.Networking;
  const id = `${projectTitle}-${mode}`.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();
  const colors = { ...config, theme };
  const titleId = `${id}-title`;
  const descId = `${id}-desc`;

  return (
    <svg
      viewBox="0 0 800 450"
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id={titleId}>{`${projectTitle} project thumbnail`}</title>
      <desc id={descId}>{`${config.prompt} Reference options: ${config.references.join('; ')}`}</desc>
      <Background id={id} theme={theme} accentA={config.accentA} accentB={config.accentB} />
      {renderMotif(config.motif, colors)}
    </svg>
  );
}

export default ProjectThumbnail;
