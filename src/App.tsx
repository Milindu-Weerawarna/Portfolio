import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown, ArrowDownToLine, ArrowRight, ArrowUpRight, Award, Braces,
  Check, CheckCheck, ChevronRight, Cloud, Code2, Copy, Cpu, Database,
  Fingerprint, Github, GraduationCap, Layers3, Linkedin, LockKeyhole,
  Mail, MapPin, Menu, Network, Radio, ShieldCheck, ShoppingBag, Sparkles,
  Terminal, Trophy, Usb, Waves, X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { achievements, certifications, profile, projectFilters, projects, skillGroups } from './data'
import type { Project, ProjectFilter } from './data'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`
const navigation = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
]

function ExternalLink({ href, children, className, label }: {
  href: string; children: React.ReactNode; className?: string; label?: string
}) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={label}>{children}</a>
}

function SectionLabel({ number, children, light = false }: { number: string; children: React.ReactNode; light?: boolean }) {
  return <div className={`section-label${light ? ' section-label-light' : ''}`}><span>{number}</span>{children}</div>
}

function ProjectVisual({ project }: { project: Project }) {
  if (project.id === 'exfiltrack') {
    return (
      <div className="project-visual visual-forensics" aria-hidden="true">
        <div className="visual-topline"><span><Fingerprint size={15} /> EXFILTRACK</span><span className="visual-dots"><i /><i /><i /></span></div>
        <div className="forensic-flow"><div className="usb-node"><Usb size={38} strokeWidth={1.3} /></div><div className="flow-line"><span /></div><div className="evidence-nodes"><span><Database size={14} /> Registry</span><span><Terminal size={14} /> Event logs</span><span><Layers3 size={14} /> File artifacts</span></div></div>
        <div className="terminal-line"><span>›</span> reconstruct. correlate. investigate.<i /></div>
        <div className="visual-bottomline"><span><ShieldCheck size={12} /> EVIDENCE INTEGRITY</span><span>SHA-256 VERIFIED</span></div>
      </div>
    )
  }
  if (project.id === 'benthic') {
    return (
      <div className="project-visual visual-ocean" aria-hidden="true">
        <div className="visual-topline"><span><Waves size={16} /> BENTHIC GUARDIAN</span><span className="sensor-live"><i /> SENSOR NETWORK</span></div>
        <div className="ocean-grid"><div className="ocean-orbit orbit-one" /><div className="ocean-orbit orbit-two" /><div className="reef-core"><Waves size={46} strokeWidth={1.3} /></div><div className="sensor-node sensor-a"><Radio size={18} /></div><div className="sensor-node sensor-b"><Cpu size={18} /></div><div className="sensor-node sensor-c"><Sparkles size={18} /></div><span className="ocean-label ocean-label-a">SENSE</span><span className="ocean-label ocean-label-b">PREDICT</span><span className="ocean-label ocean-label-c">PROTECT</span></div>
        <div className="visual-bottomline"><span>POWERED BY PHYSICS-INFORMED AI</span><span>SLIoT ’26 FINALIST <ArrowUpRight size={12} /></span></div>
      </div>
    )
  }
  const visuals: Record<string, { icon: LucideIcon; label: string; detail: string }> = {
    disaster: { icon: Radio, label: 'CONNECTED RESPONSE', detail: 'SENSE → STREAM → ALERT' },
    brightbuy: { icon: ShoppingBag, label: 'BRIGHTBUY', detail: 'A SEAMLESS SHOPPING EXPERIENCE' },
    mlnops: { icon: Network, label: 'MLNops', detail: 'RECON / ANALYZE / REPORT' },
  }
  const { icon: Icon, label, detail } = visuals[project.id]
  return <div className={`project-visual visual-compact visual-${project.id}`} aria-hidden="true"><span className="compact-visual-label">{label}</span><div className="compact-icon"><Icon size={42} strokeWidth={1.3} /></div><span className="compact-visual-detail">{detail}</span><Braces className="visual-background-icon" size={130} strokeWidth={0.5} /></div>
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (project: Project, trigger: HTMLButtonElement) => void }) {
  return (
    <article className={`project-card${project.featured ? ' project-featured' : ''}`}>
      <button className="project-visual-button" onClick={(event) => onOpen(project, event.currentTarget)} aria-label={`Explore ${project.title}`}><ProjectVisual project={project} /><span className="visual-open"><ArrowUpRight size={20} /></span></button>
      <div className="project-body">
        <div className="project-meta"><span>{project.category}</span><span>{project.year === 'In progress' && <i className="tiny-dot" />}{project.year}</span></div>
        <h3><button onClick={(event) => onOpen(project, event.currentTarget)}>{project.title}<ArrowUpRight size={21} /></button></h3>
        <p>{project.description}</p>
        <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="project-card-footer"><button className="text-link" onClick={(event) => onOpen(project, event.currentTarget)}>Project details <ArrowRight size={15} /></button><ExternalLink href={project.links[0].url} className="project-source" label={`${project.title} source code on GitHub (opens in a new tab)`}><Github size={17} /><span>Source</span></ExternalLink></div>
      </div>
    </article>
  )
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow
    dialog?.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog?.close()
      document.body.style.overflow = previousOverflow
    }
  }, [])

  function closeDialog() {
    dialogRef.current?.close()
    onClose()
  }

  return (
    <dialog ref={dialogRef} className="project-dialog" aria-labelledby="project-dialog-title" onCancel={(event) => { event.preventDefault(); closeDialog() }} onClick={(event) => { if (event.target === event.currentTarget) closeDialog() }}>
      <div className="dialog-inner">
        <div className="dialog-top"><span>{project.category} <span className="dialog-meta-divider">/</span> {project.year}</span><button className="icon-button" onClick={closeDialog} aria-label="Close project details" autoFocus><X size={21} /></button></div>
        <ProjectVisual project={project} />
        <div className="dialog-content"><span className="eyebrow">{project.subtitle}</span><h2 id="project-dialog-title">{project.title}</h2><p>{project.description}</p><h3>Inside the project</h3><ul className="project-highlights">{project.highlights.map((highlight) => <li key={highlight}><Check size={17} /><span>{highlight}</span></li>)}</ul><div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="dialog-links">{project.links.map((link) => <ExternalLink key={link.url} href={link.url} className="button button-dark"><Github size={17} />{link.label}<ArrowUpRight size={16} /></ExternalLink>)}</div></div>
      </div>
    </dialog>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [filter, setFilter] = useState<ProjectFilter>('All work')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showAllCertificates, setShowAllCertificates] = useState(false)
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const menuButton = useRef<HTMLButtonElement>(null)
  const projectTrigger = useRef<HTMLButtonElement | null>(null)
  const filteredProjects = filter === 'All work' ? projects : projects.filter((project) => project.category === filter)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id) })
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 })
    ;['home', 'work', 'about', 'expertise', 'credentials', 'contact'].forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }
    const desktop = window.matchMedia('(min-width: 801px)')
    const onResize = () => { if (desktop.matches) setMenuOpen(false) }
    window.addEventListener('keydown', onEscape)
    desktop.addEventListener('change', onResize)
    return () => {
      window.removeEventListener('keydown', onEscape)
      desktop.removeEventListener('change', onResize)
    }
  }, [menuOpen])

  useEffect(() => () => { if (copyTimeout.current) clearTimeout(copyTimeout.current) }, [])

  function openProject(project: Project, trigger: HTMLButtonElement) {
    projectTrigger.current = trigger
    setSelectedProject(project)
  }

  function closeProject() {
    setSelectedProject(null)
    requestAnimationFrame(() => projectTrigger.current?.focus({ preventScroll: true }))
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setCopyError(false)
      if (copyTimeout.current) clearTimeout(copyTimeout.current)
      copyTimeout.current = setTimeout(() => setCopied(false), 3000)
    } catch {
      setCopyError(true)
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="container header-inner">
          <a href="#home" className="brand" aria-label="Milindu Weerawarna home" onClick={() => setMenuOpen(false)}><span className="brand-mark">m<span>w</span><i /></span><span className="brand-name">Milindu<span>Weerawarna</span></span></a>
          <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} id="main-navigation" aria-label="Main navigation">
            {navigation.map(({ id, label }) => <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''} aria-current={activeSection === id ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{label}</a>)}
            <a href={profile.resume} className="nav-resume" download onClick={() => setMenuOpen(false)}>Résumé <ArrowDownToLine size={14} /></a>
            <a href="#contact" className="button button-dark nav-contact" onClick={() => setMenuOpen(false)}>Let’s talk <ArrowUpRight size={16} /></a>
          </nav>
          <button className="mobile-menu-button icon-button" ref={menuButton} onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}>{menuOpen ? <X size={23} /> : <Menu size={23} />}</button>
        </div>
      </header>

      <main id="main">
        <section id="home" className="hero container">
          <div className="hero-copy">
            <div className="hero-intro"><span className="status-dot" /> HELLO, I’M MILINDU <span className="intro-line" /></div>
            <h1>Built with purpose.<br />Secured by <span className="heading-accent">design<svg viewBox="0 0 280 16" preserveAspectRatio="none" aria-hidden="true"><path d="M3 11C55 2 157 0 277 7M32 14c76-9 157-8 220-5" /></svg></span><span className="heading-period">.</span></h1>
            <p className="hero-description">Computer Science & Engineering undergraduate crafting secure software, intelligent systems, and technology that makes a difference.</p>
            <div className="hero-actions"><a href="#work" className="button button-dark">Explore my work <ArrowUpRight size={18} /></a><a href={profile.resume} className="button button-outline" download>Download CV <ArrowDownToLine size={17} /></a></div>
            <div className="hero-socials"><span>FIND ME ON</span><ExternalLink href={profile.github} label="GitHub profile (opens in a new tab)"><Github size={19} /></ExternalLink><ExternalLink href={profile.linkedin} label="LinkedIn profile (opens in a new tab)"><Linkedin size={19} /></ExternalLink><a href={`mailto:${profile.email}`} aria-label="Email Milindu"><Mail size={19} /></a><span className="social-divider" /><span className="hero-location"><MapPin size={14} /> Sri Lanka</span></div>
          </div>
          <div className="hero-art">
            <span className="portrait-orbit orbit-outer" /><span className="portrait-orbit orbit-inner" />
            <span className="decor-plus plus-one">+</span><span className="decor-plus plus-two">+</span>
            <div className="portrait-frame"><img src={asset('portrait.webp')} alt="Milindu Weerawarna wearing a navy suit" width="1050" height="1400" fetchPriority="high" /><div className="portrait-gradient" /><span className="portrait-caption">CURIOUS MIND. <br /><strong>BUILDER AT HEART.</strong></span><span className="portrait-caption-arrow"><ArrowUpRight size={28} /></span></div>
            <div className="floating-label security-label"><span className="floating-icon"><ShieldCheck size={21} /></span><span>Security-first<strong>By mindset. By design.</strong></span></div>
            <div className="floating-label engineering-label"><span className="floating-icon"><Code2 size={21} /></span><span>Engineering ideas<strong>Into real-world impact.</strong></span></div>
            <div className="portrait-footnote"><span className="tiny-dot" /> UNIVERSITY OF MORATUWA <ArrowUpRight size={13} /></div>
          </div>
          <div className="hero-bottom"><a href="#work" className="scroll-cue"><ArrowDown size={15} /><span>SCROLL TO EXPLORE</span></a><span className="hero-signature">Software. Security. A little curiosity.</span></div>
        </section>

        <div className="focus-strip"><div className="container focus-strip-inner"><span className="focus-strip-label">MY INTERSECTION</span><span><Code2 size={20} /> Software engineering</span><i /><span><ShieldCheck size={20} /> Cybersecurity</span><i /><span><Cpu size={20} /> Artificial intelligence</span><i /><span><Cloud size={20} /> Cloud & DevOps</span></div></div>

        <section id="work" className="section container work-section">
          <SectionLabel number="01">SELECTED WORK</SectionLabel>
          <div className="section-heading"><div><h2>Ideas into <span className="serif-word">impact.</span></h2><p>Real problems. Thoughtful solutions. A few things I’ve been building.</p></div><ExternalLink href={profile.github} className="text-link section-heading-link">More on GitHub <ArrowUpRight size={17} /></ExternalLink></div>
          <div className="project-filters" role="group" aria-label="Filter projects">{projectFilters.map((item) => <button key={item} className={filter === item ? 'selected' : ''} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}{item === 'All work' && <span>{projects.length.toString().padStart(2, '0')}</span>}</button>)}</div>
          <p className="sr-only" role="status">Showing {filteredProjects.length} projects{filter !== 'All work' ? ` in ${filter}` : ''}.</p>
          <div className={`projects-grid${filter !== 'All work' ? ' projects-filtered' : ''}`}>{filteredProjects.map((project) => <ProjectCard key={project.id} project={project} onOpen={openProject} />)}</div>
          <p className="work-footnote"><span className="tiny-dot" /> Built independently and with teams. Project graphics are illustrative, not product screenshots.</p>
        </section>

        <section id="about" className="about-section">
          <div className="container about-layout">
            <div className="about-copy"><SectionLabel number="02">THE PERSON BEHIND THE CODE</SectionLabel><h2>A curious mind.<br />A <span className="serif-word">secure</span> mindset.</h2><p>I’m Milindu, a Computer Science & Engineering undergraduate at the University of Moratuwa, specializing in Cybersecurity.</p><p>I enjoy the space where building and breaking meet: understanding how systems work, finding where they fail, and making them better. My work spans full-stack applications, digital forensics, AI, and connected devices.</p><p>Outside the IDE, you’ll find me solving CTF challenges, playing chess in international tournaments, and contributing to the engineering community.</p><a href="#contact" className="text-link">Let’s connect <ArrowUpRight size={17} /></a><div className="about-values"><span><ShieldCheck size={16} /> Build responsibly</span><span><Sparkles size={16} /> Stay curious</span><span><CheckCheck size={16} /> Keep improving</span></div></div>
            <div className="about-details">
              <div className="education-card"><div className="education-card-top"><span className="card-icon"><GraduationCap size={24} /></span><span className="eyebrow">THE FOUNDATION</span><span className="education-year">2024 — 2028</span></div><h3>B.Sc. (Hons) in Computer<br />Science & Engineering</h3><p>University of Moratuwa, Sri Lanka</p><span className="specialization"><LockKeyhole size={13} /> Cybersecurity specialization</span><div className="education-stats"><div><strong>3.69<span>/ 4.00</span></strong><span>CURRENT GPA</span></div><div><strong>Dean’s List</strong><span>SEMESTER 01</span></div></div><div className="education-bottom"><span className="tiny-dot" /> March 2024–present · Expected graduation 2028</div></div>
              <div className="school-row"><div><span className="eyebrow">G.C.E. ADVANCED LEVEL · 2022</span><h4>Maliyadeva College</h4><p>Physical Science · 3 A passes · Island rank 78</p></div><span className="school-detail">District rank 5<br />Z-score 2.7093</span></div>
              <div className="school-row"><div><span className="eyebrow">G.C.E. ORDINARY LEVEL · 2018</span><h4>Maliyadeva Adarsha College</h4><p>9 A passes</p></div><Award size={23} strokeWidth={1.4} /></div>
            </div>
          </div>
          <div className="container community-row"><span className="eyebrow">BEYOND THE CLASSROOM</span><span>CSE Career Fair <small>Company Coordinator · 2026</small></span><span>ADScAI Conference <small>Organizing Committee · 2026</small></span><span>Teaching & mentoring <small>Teaching assistant & exam supervisor</small></span></div>
        </section>

        <section id="expertise" className="section expertise-section container">
          <SectionLabel number="03">TOOLS OF THE TRADE</SectionLabel><div className="section-heading"><div><h2>Versatile by practice.<br /><span className="serif-word">Focused</span> by purpose.</h2><p>The technologies I use to build, secure, and bring ideas to life.</p></div><span className="expertise-decoration" aria-hidden="true"><Braces size={58} strokeWidth={1} /><span>ALWAYS LEARNING_</span></span></div>
          <div className="expertise-grid">{skillGroups.map((group, index) => {
            const icons = [Terminal, Code2, Cloud, Database, ShieldCheck]
            const Icon = icons[index]
            return <article className={`skill-card skill-card-${index}`} key={group.title}><div className="skill-card-heading"><Icon size={23} strokeWidth={1.6} /><span>0{index + 1}</span></div><h3>{group.title}</h3><div className="skill-tags">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></article>
          })}<div className="learning-card"><Sparkles size={25} strokeWidth={1.5} /><h3>The next chapter.</h3><p>Currently exploring agentic AI, advanced system design, cloud infrastructure, and offensive security.</p><span>LEARN. BUILD. SECURE. REPEAT. <ArrowUpRight size={15} /></span></div></div>
        </section>

        <section id="achievements" className="achievements-section"><div className="container"><SectionLabel number="04" light>TESTED UNDER PRESSURE</SectionLabel><div className="section-heading"><div><h2>Curiosity meets <span className="serif-word">competition.</span></h2><p>Problem-solving, teamwork, and a drive to go one step further.</p></div><Trophy className="achievement-trophy" size={42} strokeWidth={1.2} /></div><div className="achievements-grid">{achievements.map((achievement, index) => <article className="achievement-card" key={achievement.name}><div className="achievement-card-top"><span className="achievement-result">{index < 2 ? <Trophy size={15} /> : <Award size={15} />}{achievement.result}</span><span>{achievement.year}</span></div><h3>{achievement.name}</h3><p>{achievement.detail}</p><span className="achievement-category">{achievement.type}</span></article>)}</div></div></section>

        <section id="credentials" className="section container certifications-section"><SectionLabel number="05">LEARNING, WITH RECEIPTS</SectionLabel><div className="section-heading"><div><h2>Always a <span className="serif-word">student.</span></h2><p>Continuous learning across security, AI, and cloud engineering.</p></div><span className="certificates-count">{certifications.length.toString().padStart(2, '0')} <span>certifications</span></span></div><div className="certifications-list" id="certifications-list">{(showAllCertificates ? certifications : certifications.slice(0, 4)).map((certificate, index) => <ExternalLink key={certificate.name} href={certificate.url} className="certificate-row" label={`Verify ${certificate.name} certification (opens in a new tab)`}><span className="certificate-index">{(index + 1).toString().padStart(2, '0')}</span><span className="certificate-icon"><Award size={23} strokeWidth={1.4} /></span><span className="certificate-title"><strong>{certificate.name}</strong><span>{certificate.issuer}</span></span><span className="certificate-area">{certificate.area}</span><span className="certificate-arrow"><ArrowUpRight size={20} /></span></ExternalLink>)}</div><button className="button button-outline certificates-toggle" aria-expanded={showAllCertificates} aria-controls="certifications-list" onClick={() => setShowAllCertificates(!showAllCertificates)}>{showAllCertificates ? 'Show fewer' : `View all ${certifications.length} certifications`}<ArrowDown className={showAllCertificates ? 'rotated' : ''} size={16} /></button></section>

        <section id="contact" className="contact-section"><div className="container contact-inner"><div className="contact-topline"><span className="section-label"><span>06</span> THE NEXT GOOD IDEA STARTS HERE</span><span className="contact-location"><MapPin size={15} /> BASED IN SRI LANKA</span></div><div className="contact-main"><div><h2>Let’s build something<br /><span className="serif-word">that matters.</span><span className="contact-star" aria-hidden="true">✳</span></h2><p>Have a project in mind, an interesting opportunity,<br className="desktop-break" /> or just a good conversation? I’d love to hear from you.</p></div><a href={`mailto:${profile.email}?subject=Let%E2%80%99s%20build%20something`} className="contact-arrow" aria-label="Start a conversation by email"><ArrowUpRight size={50} strokeWidth={1.3} /></a></div><div className="contact-bottom"><div className="contact-email"><a href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={20} /></a><button className="copy-button icon-button" onClick={copyEmail} aria-label={copied ? 'Email copied' : 'Copy email address'} title={copied ? 'Copied!' : 'Copy email address'}>{copied ? <Check size={18} /> : <Copy size={18} />}</button><span className="copy-status" role="status">{copied ? 'Copied!' : copyError ? 'Please use the email link to get in touch.' : ''}</span></div><div className="contact-socials"><ExternalLink href={profile.github}>GitHub <ArrowUpRight size={15} /></ExternalLink><ExternalLink href={profile.linkedin}>LinkedIn <ArrowUpRight size={15} /></ExternalLink><a href="tel:+94702100664">Call me <ArrowUpRight size={15} /></a></div></div></div></section>
      </main>

      <footer className="site-footer container"><a href="#home" className="footer-brand">milindu<span>.</span></a><span>© {new Date().getFullYear()} Milindu Weerawarna</span><a href="#home" className="footer-top">Back to top <ChevronRight size={16} /></a></footer>
      {selectedProject && <ProjectDialog project={selectedProject} onClose={closeProject} />}
    </>
  )
}

export default App
