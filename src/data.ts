export const profile = {
  name: 'Milindu Weerawarna',
  email: 'milindunavodya@gmail.com',
  phone: '+94 70 210 0664',
  github: 'https://github.com/Milindu-Weerawarna',
  linkedin: 'https://www.linkedin.com/in/milindu-weerawarna/',
  location: 'Sri Lanka',
  university: 'University of Moratuwa',
  resume: `${import.meta.env.BASE_URL}Milindu_Weerawarna_CV.pdf`,
}

export const projectFilters = ['All work', 'Cybersecurity', 'AI & IoT', 'Full-stack'] as const
export type ProjectFilter = (typeof projectFilters)[number]

export interface Project {
  id: string
  title: string
  subtitle: string
  category: Exclude<ProjectFilter, 'All work'>
  year: string
  description: string
  tags: string[]
  links: { label: string; url: string }[]
  highlights: string[]
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'exfiltrack',
    title: 'ExfilTrack',
    subtitle: 'Following the digital trail.',
    category: 'Cybersecurity',
    year: 'In progress',
    description: 'A Windows digital forensics platform that connects the dots behind potential USB data exfiltration.',
    tags: ['Python', 'Windows Forensics', 'SQLite', 'SHA-256'],
    links: [{ label: 'Repository', url: 'https://github.com/ExfilTrack/Exfiltrack' }],
    highlights: [
      'Correlates Registry, EVTX, LNK, and Jump List artifacts to reconstruct USB activity timelines.',
      'Identifies suspicious file access patterns with automated risk scoring.',
      'Verifies evidence with SHA-256 and generates reproducible forensic reports.',
    ],
    featured: true,
  },
  {
    id: 'benthic',
    title: 'Benthic Guardian',
    subtitle: 'Intelligence beneath the surface.',
    category: 'AI & IoT',
    year: '2026',
    description: 'An AI-enabled coral reef monitoring and early-warning system. Finalist at the SLIoT Challenge 2026.',
    tags: ['ESP32', 'TensorFlow', 'FastAPI', 'Next.js', 'PostgreSQL'],
    links: [
      { label: 'Frontend', url: 'https://github.com/TeamTerronix/dashboard-Benthic-Guardian' },
      { label: 'Backend', url: 'https://github.com/TeamTerronix/backend-Benthic-Guardian' },
      { label: 'Model', url: 'https://github.com/TeamTerronix/model-Benthic-Guardian' },
    ],
    highlights: [
      'Connects underwater sensor nodes to real-time ingestion and interactive dashboards.',
      'Uses a Physics-Informed Neural Network to estimate coral bleaching risk.',
      'Combines microbial fuel cells, solar power, and underwater optical communication in a sustainable architecture.',
    ],
    featured: true,
  },
  {
    id: 'disaster',
    title: 'Disaster Response System',
    subtitle: 'Real-time data. Faster response.',
    category: 'Full-stack',
    year: '2026',
    description: 'A live flood and landslide risk platform, connecting IoT sensor data with the people who need it.',
    tags: ['React', 'Node.js', 'Kafka', 'Socket.IO', 'Supabase'],
    links: [{ label: 'Repository', url: 'https://github.com/Disaster-Response-System-Group-J/disaster-response-system' }],
    highlights: [
      'Streams live IoT sensor events to monitor flood and landslide risks.',
      'Implements secure authentication and role-based access for administrators, responders, and public users.',
      'Delivers instant alerts and incident updates using Apache Kafka and Socket.IO.',
    ],
  },
  {
    id: 'brightbuy',
    title: 'BrightBuy',
    subtitle: 'A better way to buy.',
    category: 'Full-stack',
    year: '2025',
    description: 'A full-stack e-commerce experience with secure APIs, dynamic product variants, and a persistent cart.',
    tags: ['React', 'Express.js', 'MySQL', 'JWT'],
    links: [{ label: 'Repository', url: 'https://github.com/Imindu-J/BrightBuy' }],
    highlights: [
      'Builds secure REST APIs for products, variants, and a persistent shopping cart.',
      'Uses JWT authentication and role-based access control.',
      'Validates stock and protects passwords with bcrypt hashing.',
    ],
  },
  {
    id: 'mlnops',
    title: 'MLNops',
    subtitle: 'Reconnaissance, reimagined.',
    category: 'Cybersecurity',
    year: '2026',
    description: 'An extended open-source MCP server for authorized infrastructure reconnaissance and security analysis.',
    tags: ['Python', 'FastMCP', 'AsyncIO', 'Pytest'],
    links: [{ label: 'Repository', url: 'https://github.com/Milindu-Weerawarna/MLNops' }],
    highlights: [
      'Rebuilds and extends an open-source MCP server for authorized security posture analysis.',
      'Integrates DNS, WHOIS, SSL/TLS, subdomain, ASN, and cloud-exposure analysis.',
      'Produces structured reports with an automated test suite.',
    ],
  },
]

export const skillGroups = [
  { title: 'Languages', skills: ['Python', 'TypeScript', 'JavaScript', 'Java', 'C / C++', 'SQL', 'Bash', 'VHDL'] },
  { title: 'Web & application', skills: ['React', 'Next.js', 'Node.js', 'Express.js', 'FastAPI', 'Flask', 'Flutter', 'Tailwind CSS', 'REST APIs', 'WebSockets'] },
  { title: 'Cloud & DevOps', skills: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'Linux', 'Git', 'Jenkins', 'Ansible', 'Terraform'] },
  { title: 'Data & intelligence', skills: ['TensorFlow', 'Scikit-Learn', 'XGBoost', 'Pandas', 'PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'Redis', 'Firebase', 'DynamoDB'] },
  { title: 'Security toolkit', skills: ['Burp Suite', 'Wireshark', 'Nmap', 'Nessus', 'OWASP ZAP', 'Metasploit', 'Hashcat'] },
]

export const certifications = [
  { name: 'Ethical Hacker', issuer: 'Cisco', url: 'https://www.credly.com/badges/d1e530f5-bbd0-4bd0-bee3-c63b80ff9be7/linked_in_profile', area: 'Security' },
  { name: 'Certified LLM Security Expert', issuer: 'Red Team Leaders', url: 'https://courses.redteamleaders.com/exam-completion/d436c0bfe77cd4f6', area: 'Security' },
  { name: 'Machine Learning Specialization', issuer: 'Stanford University & DeepLearning.AI', url: 'https://www.coursera.org/account/accomplishments/specialization/certificate/S9CCABOQPFTE', area: 'AI / ML' },
  { name: '100 Days of DevOps', issuer: 'KodeKloud', url: 'https://engineer.kodekloud.com/certificate-verification/08933efc-6244-407d-bc37-ba4a7ea64808', area: 'DevOps' },
  { name: '100 Days of Cloud (AWS)', issuer: 'KodeKloud', url: 'https://engineer.kodekloud.com/certificate-verification/bc2a1693-9d6a-49c0-9452-ab810a96cd90', area: 'Cloud' },
  { name: 'API Security Fundamentals', issuer: 'APIsec University', url: 'https://www.credly.com/badges/456be3d1-4736-4ae0-ae75-2b7725b3d949/linked_in_profile', area: 'Security' },
  { name: 'Fundamentals of Accelerated Data Science', issuer: 'NVIDIA', url: 'https://learn.nvidia.com/certificates?id=XwvBNt4TTgikSpoZqndHhA', area: 'AI / ML' },
  { name: 'Introduction to Cybersecurity', issuer: 'Cisco', url: 'https://www.credly.com/badges/85c57847-a278-4cb5-b131-d4f8aa0fff97/linked_in_profile', area: 'Security' },
]

export const achievements = [
  { result: 'Finalist', name: 'SLIoT Challenge', detail: 'Open category · University of Moratuwa', year: '2026', type: 'IoT' },
  { result: '1st runner-up', name: 'Vectra · King of the Hill', detail: '8-hour competition · IEEE WIE AG of IIT', year: '2026', type: 'Security' },
  { result: '4th place', name: 'Enigma Mathematical Hackathon', detail: 'Mathematical Society · University of Moratuwa', year: '2025', type: 'Problem solving' },
  { result: 'Finalist', name: 'ANIMUS 1.0', detail: 'Capture the Flag · University of Ruhuna', year: '2025', type: 'Security' },
  { result: 'Finalist', name: 'SLIIT Xtreme', detail: 'Competitive programming · SLIIT', year: '2025', type: 'Programming' },
  { result: '4th place', name: 'Capture the Flag Challenge', detail: 'Cyber Security Community · SLIIT', year: '2026', type: 'Security' },
  { result: 'Participant', name: 'IEEEXtreme', detail: 'Global programming competition · IEEE', year: '2025', type: 'Programming' },
]
