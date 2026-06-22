import { GalleryItem, ProjectItem, KanbanBoard } from './types.ts';

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    category: "System Design",
    title: "Edge Cache Topology",
    desc: "A distributed in-memory layout representing multi-region proxy routing, dynamic TTL invalidation, and edge request replication.",
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    info: "WebP Native • 34.2 KB",
    bytes: "34,972 bytes"
  },
  {
    id: 2,
    category: "UI/UX Design",
    title: "Luminosity Control Panel",
    desc: "Modular design kit engineered with accessibility-first compliance checks, floating action docks, and sleek color palettes.",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    info: "WebP Native • 41.5 KB",
    bytes: "42,492 bytes"
  },
  {
    id: 3,
    category: "Web Engineering",
    title: "Concurrent Render State",
    desc: "A live diagnostics stream tracking micro-frontend mounts, dependency bundle splitting, and hydration benchmarks.",
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    info: "WebP Native • 29.8 KB",
    bytes: "30,515 bytes"
  },
  {
    id: 4,
    category: "System Design",
    title: "Decentralized Database Sync",
    desc: "An experimental cluster design with active-active synchronization, conflict-free replicated data types, and LSM-tree persistence.",
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    info: "WebP Native • 48.9 KB",
    bytes: "50,073 bytes"
  },
  {
    id: 5,
    category: "UI/UX Design",
    title: "Bento Layout Architecture",
    desc: "Asymmetrical grid modules configured for real-time widgets, responsive timeline metrics, and ambient typography configurations.",
    src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
    info: "WebP Native • 38.6 KB",
    bytes: "39,526 bytes"
  },
  {
    id: 6,
    category: "Web Engineering",
    title: "AST Parsing Flow",
    desc: "Static code compilation, lexical optimization passes, and source-to-source mapping diagrams inside high-performance engines.",
    src: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80",
    info: "WebP Native • 54.0 KB",
    bytes: "55,296 bytes"
  }
];

export const PROJECTS_ITEMS: ProjectItem[] = [
  {
    id: 1,
    title: "CollabSuite Hub",
    desc: "Real-time system with dynamic operational transformations, custom document syncing, and keyboard-first canvas tools ensuring low-latency performance in complex teams.",
    tags: ["React", "TypeScript", "Node.js", "WebSockets"],
    metrics: "12ms Sync • 4.9k Stars",
    status: "active",
    date: "June 2026",
    demoUrl: "#",
    githubUrl: "https://github.com"
  },
  {
    id: 2,
    title: "Aether Engine",
    desc: "A headless, GPU-accelerated canvas engine that compiles interactive vector mathematics directly to WebGL, reducing frames drawing overhead by 40%.",
    tags: ["WebAssembly", "WebGL", "Rust", "TypeScript"],
    metrics: "60 FPS • 1.2M Triangles",
    status: "completed",
    date: "April 2026",
    demoUrl: "#",
    githubUrl: "https://github.com"
  },
  {
    id: 3,
    title: "Chronos Scheduler",
    desc: "Collaborative event scheduling engine featuring time-zone routing matrix, reactive availability calendars, and integration hooks for Workspace apps.",
    tags: ["React", "Radix", "Tailwind CSS", "Express"],
    metrics: "99.99% Uptime • 8.2k Users",
    status: "queued",
    date: "Planned Aug 2026",
    demoUrl: "#",
    githubUrl: "https://github.com"
  }
];

export const INITIAL_KANBAN_BOARD: KanbanBoard = {
  backlog: [
    { id: 101, text: "Lazy loading pipeline setup", tag: "Pipeline" },
    { id: 102, text: "Framer-motion route shifts", tag: "UI" },
    { id: 103, text: "Secure auth encryption hook", tag: "Security" }
  ],
  inProgress: [
    { id: 104, text: "Optimize WebP asset serving", tag: "Performance" },
    { id: 105, text: "Draft architecture brief", tag: "Docs" }
  ],
  done: [
    { id: 106, text: "Interlocking SVG Hex Logo", tag: "Assets" },
    { id: 107, text: "Command palette keyboard listeners", tag: "UX" }
  ]
};
