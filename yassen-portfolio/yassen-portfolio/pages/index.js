import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'

// ─── DATA ───────────────────────────────────────────────────────────────────

const broadcastWork = [
  {
    id: 'b1',
    title: 'نشرة الأخبار المسائية',
    client: 'قناة المحور',
    tag: 'News Editing',
    desc: 'Full broadcast edit & color grading for the prime-time news bulletin on Elmehwar TV.',
    youtubeId: 'dQw4w9WgXcQ', // replace with real ID
    thumb: null,
  },
  {
    id: 'b2',
    title: 'برنامج الحقيقة',
    client: 'قناة المجد',
    tag: 'Talk Show',
    desc: 'Post-production and motion graphics for Al Majd's flagship current-affairs programme.',
    youtubeId: 'dQw4w9WgXcQ',
    thumb: null,
  },
  {
    id: 'b3',
    title: 'Documentary Feature',
    client: 'Elmehwar TV',
    tag: 'Documentary',
    desc: 'End-to-end edit for a primetime documentary exploring Egyptian cultural heritage.',
    youtubeId: 'dQw4w9WgXcQ',
    thumb: null,
  },
  {
    id: 'b4',
    title: 'Special Broadcast',
    client: 'Elmagd Network',
    tag: 'Live Event',
    desc: 'Multi-camera edit and highlights package for a major live broadcast event.',
    youtubeId: 'dQw4w9WgXcQ',
    thumb: null,
  },
]

const creativeWork = [
  {
    id: 'c1',
    title: 'شوارع الذاكرة',
    client: 'Short Film — Writer & Director',
    tag: 'Short Film',
    desc: 'An intimate short about urban memory and displacement in modern Cairo.',
    youtubeId: 'dQw4w9WgXcQ',
    thumb: null,
  },
  {
    id: 'c2',
    title: 'Parallel Frames',
    client: 'Personal Project — Script & Direction',
    tag: 'Directing',
    desc: 'Experimental narrative exploring dual realities through parallel editing.',
    youtubeId: 'dQw4w9WgXcQ',
    thumb: null,
  },
  {
    id: 'c3',
    title: 'The Silent Hour',
    client: 'Original Screenplay',
    tag: 'Scriptwriting',
    desc: 'Feature-length script set in 1980s Alexandria — a story of ambition and sacrifice.',
    youtubeId: null,
    thumb: null,
    isScript: true,
  },
]

const skills = [
  {
    num: '01',
    icon: '🎬',
    name: 'Video Editing',
    desc: 'Broadcast-grade post-production from rough cut to final delivery. Colour, sound design, and motion graphics.',
    tools: ['Adobe Premiere', 'DaVinci Resolve', 'After Effects', 'Audition'],
  },
  {
    num: '02',
    icon: '✍️',
    name: 'Scriptwriting',
    desc: 'Narrative development, dialogue, documentary scripts, and commercial copy in Arabic and English.',
    tools: ['Final Draft', 'Fountain', 'Story Mapping'],
  },
  {
    num: '03',
    icon: '🎥',
    name: 'Directing',
    desc: 'On-set direction, storyboarding, talent coaching, and cinematic language for short and feature formats.',
    tools: ['Shot Design', 'Storyboarding', 'Actor Direction'],
  },
  {
    num: '04',
    icon: '📊',
    name: 'Sales & Marketing',
    desc: 'Media sales strategy, pitch decks, and client relations — bridging creative output with commercial results.',
    tools: ['Pitch Strategy', 'Client Relations', 'Content Marketing'],
  },
]

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function VideoCard({ item, onOpen }) {
  return (
    <div
      className="video-card reveal"
      onClick={() => item.youtubeId && onOpen(item)}
      style={{ cursor: item.youtubeId ? 'pointer' : 'default' }}
    >
      <div className="card-thumb">
        {item.thumb ? (
          <img src={item.thumb} alt={item.title} className="card-thumb-img" loading="lazy" />
        ) : (
          <div className="card-thumb-placeholder">
            {item.tag === 'Scriptwriting' ? '✍' : '▶'}
          </div>
        )}
      </div>
      <div className="card-overlay always-gradient" />
      {item.youtubeId && (
        <div className="play-btn">
          <div className="play-icon" />
        </div>
      )}
      <div className="card-info">
        <span className="card-tag">{item.tag}</span>
        <div className="card-title">{item.title}</div>
        <div className="card-client">{item.client}</div>
      </div>
    </div>
  )
}

function Modal({ item, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!item) return null
  return (
    <div className={`modal-backdrop ${item ? 'open' : ''}`} onClick={onClose}>
      <div className="modal-inner" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕ &nbsp; Close
        </button>
        <div className="modal-video">
          <iframe
            src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0`}
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
        <div className="modal-caption">
          <h3>{item.title}</h3>
          <p>{item.client} &nbsp;·&nbsp; {item.desc}</p>
        </div>
      </div>
    </div>
  )
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [modal, setModal] = useState(null)
  const cursorRef = useRef(null)
  const ringRef = useRef(null)

  // Cursor
  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
      if (ringRef.current) {
        ringRef.current.style.left = e.clientX + 'px'
        ringRef.current.style.top = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', move)
    const links = document.querySelectorAll('a, button, .video-card')
    const over = () => { cursorRef.current?.classList.add('hover'); ringRef.current?.classList.add('hover') }
    const out = () => { cursorRef.current?.classList.remove('hover'); ringRef.current?.classList.remove('hover') }
    links.forEach(l => { l.addEventListener('mouseenter', over); l.addEventListener('mouseleave', out) })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  // Scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#broadcast', label: 'Broadcast' },
    { href: '#creative', label: 'Creative' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <>
      <Head>
        <title>Yassen Khaled — Filmmaker & Video Editor</title>
        <meta name="description" content="Yassen Khaled — Professional Filmmaker, Video Editor & Scriptwriter. Broadcast credits include Elmehwar TV and Elmagd Network." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </Head>

      {/* Custom cursor */}
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />

      {/* Film grain */}
      <div className="grain" aria-hidden="true" />

      {/* Mobile menu */}
      <nav className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navLinks.map(l => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
        ))}
      </nav>

      {/* Navigation */}
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <a href="#hero" className="nav-logo">YK</a>
        <ul className="nav-links">
          {navLinks.map(l => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
        </ul>
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </header>

      {/* ── Hero ── */}
      <section id="hero" className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-lines" aria-hidden="true" />
        <div className="hero-content">
          <div className="hero-eyebrow">Filmmaker · Video Editor · Storyteller</div>
          <h1 className="hero-name">
            Yassen<span>Khaled</span>
          </h1>
          <p className="hero-tagline">
            Crafting stories that move audiences — from the edit suite to the director's chair, across Egypt's leading broadcast networks.
          </p>
          <div className="hero-ctas">
            <a href="#broadcast" className="btn-primary">View Broadcast Work</a>
            <a href="#contact" className="btn-ghost">Get in Touch</a>
          </div>
        </div>
        <div className="hero-scroll" aria-hidden="true">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="about-section">
        <div className="about-grid">
          <div className="about-portrait">
            <div className="about-portrait-placeholder">YK</div>
            <div className="portrait-accent" />
          </div>
          <div className="about-text">
            <div className="section-label">About</div>
            <h2 className="section-title">Visual storytelling<br />at broadcast scale</h2>
            <p>
              <strong>Yassen Khaled</strong> is a Cairo-based filmmaker and video editor with extensive experience in Egypt's national television landscape. His editorial work has been broadcast to millions of viewers across Elmehwar TV and Elmagd Network.
            </p>
            <p>
              Beyond the edit suite, Yassen brings original scripts to life as a director — combining a business strategist's instinct for what resonates with a cinematographer's eye for what endures.
            </p>
            <div className="network-badges">
              <span className="badge">Elmehwar TV</span>
              <span className="badge">Elmagd Network</span>
              <span className="badge">Broadcast Editing</span>
              <span className="badge">Short Film</span>
              <span className="badge">Scriptwriting</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Broadcast Portfolio ── */}
      <section id="broadcast" className="portfolio-section">
        <div className="section-label">Portfolio — 01</div>
        <h2 className="section-title">Broadcast Work</h2>
        <p className="section-subtitle">
          Professional editing and post-production for Egypt's leading television channels.
        </p>
        <div className="video-grid">
          {broadcastWork.map((item, i) => (
            <VideoCard key={item.id} item={item} onOpen={setModal} />
          ))}
        </div>
      </section>

      {/* ── Creative Portfolio ── */}
      <section id="creative" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
        <div className="section-label">Portfolio — 02</div>
        <h2 className="section-title">Creative Work</h2>
        <p className="section-subtitle">
          Original short films, personal directing projects, and screenwriting.
        </p>
        <div className="video-grid">
          {creativeWork.map((item) => (
            <VideoCard key={item.id} item={item} onOpen={setModal} />
          ))}
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="skills-section">
        <div className="section-label">Expertise</div>
        <h2 className="section-title">Skills & Tools</h2>
        <p className="section-subtitle">
          A craft honed across broadcast, narrative, and commercial contexts.
        </p>
        <div className="skills-grid">
          {skills.map((s, i) => (
            <div className={`skill-card reveal reveal-delay-${i + 1}`} key={s.num}>
              <div className="skill-number">{s.num}</div>
              <div className="skill-icon">{s.icon}</div>
              <div className="skill-name">{s.name}</div>
              <p className="skill-desc">{s.desc}</p>
              <div className="skill-tools">
                {s.tools.map(t => <span className="tool-tag" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Education ── */}
      <section id="education" className="education-section">
        <div className="section-label">Background</div>
        <h2 className="section-title">Education</h2>
        <p className="section-subtitle">
          An analytical foundation that sharpens every creative decision.
        </p>
        <div className="edu-card reveal">
          <div className="edu-degree">Bachelor of Business Administration</div>
          <div className="edu-school">IAEMS — Institute of Applied Engineering & Management Studies</div>
          <p className="edu-desc">
            A rigorous business education that informs Yassen's approach to production management, media budgeting, client relations, and the commercial realities of the film and broadcast industries. The discipline of strategic thinking translates directly into disciplined storytelling.
          </p>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="contact-section">
        <div className="contact-inner">
          <div>
            <div className="section-label">Contact</div>
            <h2 className="contact-heading">
              Let's create<br /><span>something</span><br />remarkable.
            </h2>
            <p className="contact-body">
              Open to broadcast commissions, short film collaborations, post-production projects, and creative consultations.
            </p>
            <div className="availability">
              <div className="availability-dot" />
              Available for new projects
            </div>
          </div>
          <div>
            <div className="contact-tagline">
              Every great story starts with a <em>conversation.</em>
            </div>
            <div className="contact-links">
              <a href="tel:01117018034" className="contact-link">
                <span className="contact-link-icon">📞</span>
                <div className="contact-link-text">
                  <span className="contact-link-label">Phone</span>
                  <span className="contact-link-value">011 1701 8034</span>
                </div>
                <span style={{ color: 'var(--gold)', opacity: 0.5 }}>→</span>
              </a>
              <a href="mailto:soso.sosy93@gmail.com" className="contact-link">
                <span className="contact-link-icon">✉️</span>
                <div className="contact-link-text">
                  <span className="contact-link-label">Email</span>
                  <span className="contact-link-value">soso.sosy93@gmail.com</span>
                </div>
                <span style={{ color: 'var(--gold)', opacity: 0.5 }}>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer>
        <span className="footer-logo">Yassen Khaled</span>
        <span className="footer-copy">
          © {new Date().getFullYear()} Yassen Khaled · Filmmaker & Video Editor · Cairo, Egypt
        </span>
      </footer>

      {/* Video Modal */}
      <Modal item={modal} onClose={() => setModal(null)} />
    </>
  )
}
