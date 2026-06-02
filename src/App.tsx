import { useState } from 'react'
import './App.css'
import Intro from './Intro'

const Sparkle4 = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
)
const Sparkle6 = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L13 8L17 4L14 9L20 8L15 12L20 16L14 15L17 20L13 16L12 22L11 16L7 20L10 15L4 16L9 12L4 8L10 9L7 4L11 8L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
)
const Asterisk = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M12 4V20M4 8L20 16M20 8L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const navItems = [
  { id: 'intro', label: 'Introduction', group: 'Overview' },
  { id: 'process', label: 'Design Process', group: 'Overview' },
  { id: 'colors', label: 'Color Scale', group: 'Visual Language' },
  { id: 'typography', label: 'Typography', group: 'Visual Language' },
  { id: 'corners', label: 'Corner Philosophy', group: 'Visual Language' },
  { id: 'spacing', label: 'Spacing & Grid', group: 'Visual Language' },
  { id: 'cursors', label: 'Custom Cursors', group: 'Visual Language' },
  { id: 'components', label: 'UI Patterns', group: 'Components' },
  { id: 'voice', label: 'Voice & Tone', group: 'Writing' },
]
const groups = ['Overview', 'Visual Language', 'Components', 'Writing']

function Sidebar() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-mark">JH</span>
        <div>
          <div className="logo-name">Johanna Huarachi</div>
          <div className="logo-sub">Style Guide · v1.0</div>
        </div>
      </div>
      <nav className="sidebar-nav">
        {groups.map(group => (
          <div key={group} className="nav-group">
            <div className="nav-group-label">{group}</div>
            {navItems.filter(s => s.group === group).map(s => (
              <button key={s.id} className="nav-item" onClick={() => scrollTo(s.id)}>{s.label}</button>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  )
}

const Divider = () => <div className="divider" />

// ── Live color swatch with copy-to-clipboard ──
function ColorSwatch({ name, hex, rgb, usage, light, when }: { name: string; hex: string; rgb: string; usage: string; light: boolean; when: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <div className="color-swatch" onClick={copy} title="Click to copy hex">
      <div className="swatch-block" style={{ background: rgb }}>
        <span className="swatch-hex" style={{ color: light ? '#27272A' : '#FFFFFF' }}>
          {copied ? 'Copied!' : hex}
        </span>
      </div>
      <div className="swatch-info">
        <div className="swatch-name">{name}</div>
        <div className="swatch-usage">{usage}</div>
        <div className="swatch-when"><strong>When:</strong> {when}</div>
      </div>
    </div>
  )
}

// ── Live type tester ──
function TypeTester() {
  const [text, setText] = useState('Bringing delight and a humanities perspective.')
  const [size, setSize] = useState('2rem')
  const [weight, setWeight] = useState('700')
  return (
    <div className="type-tester">
      <div className="type-tester-controls">
        <div className="tester-control">
          <label>Size</label>
          <select value={size} onChange={e => setSize(e.target.value)} className="tester-select">
            <option value="0.875rem">Caption — 14px</option>
            <option value="1rem">Body — 16px</option>
            <option value="1.25rem">Title XS — 20px</option>
            <option value="1.5rem">Title — 24px</option>
            <option value="2rem">Title Large — 32px</option>
            <option value="3rem">Decoration — 48px</option>
          </select>
        </div>
        <div className="tester-control">
          <label>Weight</label>
          <select value={weight} onChange={e => setWeight(e.target.value)} className="tester-select">
            <option value="400">Regular — 400</option>
            <option value="700">Bold — 700</option>
          </select>
        </div>
      </div>
      <div
        className="type-tester-preview"
        contentEditable
        suppressContentEditableWarning
        onInput={e => setText((e.target as HTMLElement).innerText)}
        style={{ fontSize: size, fontWeight: weight, letterSpacing: size === '3rem' ? '-0.02em' : '0' }}
      >
        {text}
      </div>
      <div className="type-tester-hint">Click to edit the text above</div>
    </div>
  )
}

// ── Live button playground ──
function ButtonPlayground() {
  const [log, setLog] = useState<string[]>([])
  const fire = (label: string) => setLog(prev => [`Clicked: ${label}`, ...prev].slice(0, 3))
  return (
    <div className="btn-playground">
      <div className="demo-row">
        <button className="btn btn-primary" onClick={() => fire('View Case Study')}>View Case Study <Sparkle4 /></button>
        <button className="btn btn-primary" onClick={() => fire('Nice to meet you!')}>Nice to meet you! <Sparkle6 /></button>
        <button className="btn btn-outline" onClick={() => fire('Always good to know!')}>Always good to know! <Asterisk /></button>
      </div>
      {log.length > 0 && (
        <div className="btn-log">
          {log.map((l, i) => <div key={i} className="btn-log-item" style={{ opacity: 1 - i * 0.3 }}>✦ {l}</div>)}
        </div>
      )}
    </div>
  )
}

// ── Live card builder ──
function CardBuilder() {
  const projects = [
    { title: 'PROS Revenue Management', desc: 'Integrated AI and modernized an airline pricing platform for analysts.', tags: ['#Claude', '#B2B', '#handed off', '#internship'], bg: 'rgb(22,43,85)', imgText: 'PROS Revenue Management' },
    { title: 'Love Lives in SF', desc: 'Designed and developed a digital hub for SF\'s public art programming.', tags: ['#ClaudeCode', '#shipped', '#internship', '#non-profit'], bg: 'linear-gradient(135deg,rgb(30,75,154),rgb(41,196,176))', imgText: '' },
    { title: 'PROS Fare Finder', desc: 'Designed a map-based flight exploration tool to support everyday travelers.', tags: ['#Figma Make', '#B2B', '#shipped', '#internship'], bg: 'rgb(41,196,176)', imgText: 'PROS Fare Finder' },
    { title: 'Expert.ai', desc: 'Redesigned the filtering system for an AI text analysis platform.', tags: ['#Figma', '#Accessibility', '#internship', '#handed off'], bg: 'rgb(30,75,154)', imgText: 'Expert.ai' },
  ]
  const [active, setActive] = useState(0)
  const p = projects[active]
  return (
    <div className="card-builder">
      <div className="card-builder-picker">
        {projects.map((pr, i) => (
          <button key={i} className={`card-pick-btn ${active === i ? 'active' : ''}`} onClick={() => setActive(i)}>
            {pr.title}
          </button>
        ))}
      </div>
      <div className="card-builder-preview">
        <div className="demo-card" style={{ width: '280px' }}>
          <div className="demo-card-img" style={{ background: p.bg, display: 'flex', alignItems: 'center', padding: '16px' }}>
            {p.imgText && <span style={{ color: 'white', fontWeight: 700, fontSize: '0.85rem' }}>{p.imgText}</span>}
          </div>
          <div className="demo-card-body">
            <div className="demo-card-title">{p.title}</div>
            <div className="demo-card-desc">{p.desc}</div>
            <div className="demo-card-tags">
              {p.tags.map(t => (
                <span key={t} className={`tag ${t === '#shipped' || t === '#handed off' ? 'tag-accent' : t === '#internship' || t === '#non-profit' || t === '#freelance' ? 'tag-muted' : 'tag-default'}`}>{t}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="card-builder-meta">
          <div className="meta-row"><span className="meta-key">Title</span><span className="meta-val">{p.title}</span></div>
          <div className="meta-row"><span className="meta-key">Tags</span><span className="meta-val">{p.tags.join(', ')}</span></div>
          <div className="meta-row"><span className="meta-key">Status</span><span className="meta-val">{p.tags.find(t => t === '#shipped') ? '🟢 Shipped' : '🔵 Handed off'}</span></div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [checked, setChecked] = useState(false)
  const [showIntro, setShowIntro] = useState(true)

  const colors = [
    { name: 'Blue', hex: '#1E4B9A', rgb: 'rgb(30, 75, 154)', usage: 'Primary brand color.', light: false, when: 'Every headline, active nav item, primary button, link, and tag label. If it\'s the most important thing on the page, it\'s Blue.' },
    { name: 'Blue Dark', hex: '#162B55', rgb: 'rgb(22, 43, 85)', usage: 'Deep navy for hover and depth.', light: false, when: 'Button hover fill, sidebar logo background, code block backgrounds. Never used as text color.' },
    { name: 'Teal', hex: '#29C4B0', rgb: 'rgb(41, 196, 176)', usage: 'Accent — used sparingly.', light: false, when: 'The animated word in the hero, section eyebrows, the live green dot, spacing visualizations. One teal moment per screen.' },
    { name: 'Black', hex: '#27272A', rgb: 'rgb(39, 39, 42)', usage: 'Near-black body text.', light: false, when: 'High-contrast body copy and UI elements where Blue would feel too branded.' },
    { name: 'Gray Text', hex: '#71717B', rgb: 'rgb(113, 113, 123)', usage: 'Secondary and supporting text.', light: true, when: 'Descriptions, captions, nav labels, placeholder text, metadata. Everything that supports but doesn\'t lead.' },
    { name: 'BG Gray', hex: '#FAFAFA', rgb: 'rgb(250, 250, 250)', usage: 'Page background.', light: true, when: 'The base canvas for every page. Slightly warmer than white so the line grid reads clearly.' },
    { name: 'Gray 100', hex: '#F4F4F5', rgb: 'rgb(244, 244, 245)', usage: 'Subtle surface backgrounds.', light: true, when: 'Default tag chips, hovered nav items, subtle card differentiators.' },
    { name: 'Divider', hex: '#E4E4E7', rgb: 'rgb(228, 228, 231)', usage: 'Borders and structural lines.', light: true, when: 'Card borders (when not navy), section dividers, input outlines, the line grid.' },
    { name: 'White', hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)', usage: 'Elevated surfaces.', light: true, when: 'Card backgrounds, sidebar, button backgrounds, anything that needs to lift off the BG Gray base.' },
  ]

  return (
    <div className="app">
      {showIntro && <Intro onDone={() => setShowIntro(false)} />}
      <Sidebar />
      <main className="main-content">

        {/* HERO */}
        <div className="hero">
          <div className="hero-eyebrow">Style Guide · v1.0</div>
          <h1 className="hero-name">Johanna Huarachi</h1>
          <p className="hero-sub">Multidisciplinary Designer & Builder bringing delight and a humanities perspective to every product.</p>
          <div className="hero-meta">
            <span className="tag tag-default">#Based in SF</span>
            <span className="tag tag-default">#MDes @ CCA</span>
            <span className="tag tag-default">#Figma Campus Leader</span>
          </div>
        </div>

        <Divider />

        {/* INTRO */}
        <section id="intro">
          <div className="section-eyebrow">Overview</div>
          <h2 className="section-title">Introduction</h2>
          <p className="section-lead">This is the design system for me — every color, typeface, and pattern I reach for, named and documented.</p>
          <div className="prose">
            <p>I'm a multidisciplinary designer and builder with a background most designers don't have. I studied psychology, neuroscience, and Latino studies at Williams College as a first-gen student. Those fields gave me a framework for understanding how people think, where systems fail them, and who gets left out. That lens shows up in everything I make.</p>
            <p>Currently finishing my MDes in Interaction Design at CCA, graduating August 2026. Previously at PROS and the Democratic National Committee. Figma Campus Leader at CCA, hosting workshops and events for the design community on campus.</p>
          </div>
          <div className="card-row">
            {[
              { label: 'Based in', value: 'San Francisco, CA' },
              { label: 'Currently', value: 'MDes @ CCA' },
              { label: 'Graduating', value: 'August 2026' },
              { label: 'Prev.', value: 'PROS & DNC' },
            ].map(c => (
              <div key={c.label} className="info-card">
                <div className="info-card-label">{c.label}</div>
                <div className="info-card-value">{c.value}</div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* PROCESS */}
        <section id="process">
          <div className="section-eyebrow">Overview</div>
          <h2 className="section-title">Design Process</h2>
          <p className="section-lead">How I actually work — not the polished answer, the real one.</p>
          <div className="process-list">
            {[
              { num: '01', title: 'Research first, always', desc: 'I start with people. Who uses this? Who\'s being left out? What does the existing system fail at? At PROS I joined after research was done — I immediately scheduled time with the researcher and PM to get up to speed before touching Figma.' },
              { num: '02', title: 'Reverse-engineer the problem', desc: 'Most design problems are systems problems in disguise. On the Revenue Management project, the real problem wasn\'t bad UI — it was that Junior and Senior analysts had completely divergent needs inside the same platform.' },
              { num: '03', title: 'Vibe code the structure, refine the details', desc: 'I build fast to think. AI-assisted scaffolding gets the bones in place, then I slow down on what matters: spacing, hierarchy, the right word. This site is a product of that process.' },
              { num: '04', title: 'Delight is in the details', desc: 'The hover state, the footer copy, the 404 page with Toto\'s face. These are not afterthoughts — they\'re where personality lives. I always think about who reads all the way down.' },
              { num: '05', title: 'Ship, then learn', desc: 'A shipped project teaches you more than a perfect prototype. I prefer handing off something real over endlessly refining in a vacuum.' },
            ].map(s => (
              <div key={s.num} className="process-step">
                <div className="process-num">{s.num}</div>
                <div>
                  <div className="process-title">{s.title}</div>
                  <div className="process-desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* COLORS */}
        <section id="colors">
          <div className="section-eyebrow">Visual Language</div>
          <h2 className="section-title">Color Scale</h2>
          <p className="section-lead">Cool, precise, and purposeful. Navy blue is the anchor. Teal is the signal. Everything else gets out of the way.</p>
          <p className="sub-desc" style={{ marginBottom: '16px' }}>Click any swatch to copy the hex value.</p>
          <div className="color-grid">
            {colors.map(c => <ColorSwatch key={c.hex} {...c} />)}
          </div>
          <div className="prose">
            <p><strong>Blue does the talking.</strong> It's in every headline, every active state, every primary button — carrying weight without being aggressive.</p>
            <p><strong>Teal punctuates.</strong> One teal moment per screen. The animated word in the hero, the live dot in the corner, the 404 display number. Used sparingly so it always lands.</p>
            <p><strong>The grays are the structure.</strong> BG Gray keeps the canvas soft. Divider holds things apart. Gray Text handles everything secondary. They're invisible when they're working right.</p>
          </div>
        </section>

        <Divider />

        {/* TYPOGRAPHY */}
        <section id="typography">
          <div className="section-eyebrow">Visual Language</div>
          <h2 className="section-title">Typography</h2>
          <p className="section-lead">One font family, doing everything. Space Grotesk is geometric, confident, and modern.</p>

          <div className="type-specimens">
            {[
              { role: 'Decoration / Hero', name: 'Space Grotesk', weight: '700', size: '2.8rem', spacing: '-0.02em', lh: '0.9', usage: 'Hero statements and display moments only. Never used for body or UI text.', when: 'The opening line of a portfolio page. "Hi, I\'m Johanna, a [role]." The 404 number. Nothing else.', sample: 'Craft delightful experiences.', mono: false },
              { role: 'Title / Headings', name: 'Space Grotesk', weight: '700', size: '1.5rem', spacing: '0px', lh: '1.5', usage: 'Page titles, card headings, section labels. Weight 700.', when: 'Project titles on the homepage. Case study section headers like "Research" and "Solution." Nav section labels.', sample: 'Multidisciplinary Designer & Builder', mono: false },
              { role: 'Body / UI', name: 'Space Grotesk', weight: '400', size: '1rem', spacing: '0px', lh: '1.6', usage: 'All body copy, descriptions, captions, navigation links.', when: 'Everything else. Case study paragraphs, FAQ answers, card descriptions, sidebar nav items, button labels.', sample: 'I bring a humanities lens to every product decision.', mono: false },
              { role: 'Code / Technical', name: 'DM Mono', weight: '400', size: '0.875rem', spacing: '0px', lh: '1.6', usage: 'Hex values, token names, code snippets only.', when: 'Hex codes in the color palette. CSS token names in the spacing system. Never used for UI copy or body text.', sample: 'rgb(30, 75, 154) — Blue — Primary brand', mono: true },
            ].map((t, i) => (
              <div key={i} className="type-specimen">
                <div className="specimen-meta">
                  <span className="specimen-role">{t.role}</span>
                  <span className="specimen-stack">{t.name} · {t.weight} · {t.size}</span>
                </div>
                <div className="specimen-sample" style={{ fontSize: t.size, fontWeight: t.weight, letterSpacing: t.spacing, lineHeight: t.lh, fontFamily: t.mono ? '"DM Mono", monospace' : '"Space Grotesk", sans-serif' }}>
                  {t.sample}
                </div>
                <div className="specimen-usage">{t.usage}</div>
                <div className="specimen-when"><strong>When to use:</strong> {t.when}</div>
              </div>
            ))}
          </div>

          <div className="sub-label" style={{ marginTop: '32px' }}>Live Type Tester</div>
          <p className="sub-desc">Adjust size and weight — click the text to edit it.</p>
          <TypeTester />

          <div className="sub-label" style={{ marginTop: '32px' }}>Type Scale</div>
          <div className="type-scale">
            {[
              { name: 'Decoration', size: '112px', weight: '700', spacing: '-0.02em', use: 'Hero / Display only' },
              { name: 'Title Large', size: '24px', weight: '700', spacing: '0px', use: 'Section headings' },
              { name: 'Title', size: '20px', weight: '700', spacing: '0px', use: 'Card titles' },
              { name: 'Title XS', size: '16px', weight: '700', spacing: '0px', use: 'UI labels, nav items' },
              { name: 'Body', size: '14px', weight: '400', spacing: '0px', use: 'Paragraphs, descriptions' },
              { name: 'Caption', size: '12px', weight: '400', spacing: '0px', use: 'Metadata, timestamps' },
            ].map(t => (
              <div key={t.name} className="scale-row">
                <div className="scale-label">{t.name}<span className="scale-meta"> · {t.size} · w{t.weight}</span></div>
                <div className="scale-sample" style={{ fontSize: Math.min(parseInt(t.size), 28) + 'px', fontWeight: t.weight, letterSpacing: t.spacing }}>{t.use}</div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* CORNERS */}
        <section id="corners">
          <div className="section-eyebrow">Visual Language</div>
          <h2 className="section-title">Corner Philosophy</h2>
          <p className="section-lead">Sharp corners. No border-radius. This is intentional, not a default.</p>
          <div className="prose">
            <p>Rounded corners signal "friendly," "consumer," "approachable." Sharp corners signal something else: precise, structured, serious. My work sits at the intersection of humanist thinking and technical rigor — the sharp corners reflect the technical side.</p>
            <p>This applies to every interactive element: cards, buttons, inputs, tags. The only exception is the sidebar logo mark (4px radius), which reads as a badge rather than a UI element.</p>
          </div>
          <div className="corner-demo">
            {[
              { label: 'Sharp — radius: 0', sub: 'Cards, buttons, inputs, tags — all interactive elements', r: '0', dim: false },
              { label: 'Slight — radius: 4px', sub: 'Logo mark only. Badge-like, not UI-like.', r: '4px', dim: false },
              { label: 'Rounded — radius: 12px+', sub: 'Not used in this system.', r: '12px', dim: true },
            ].map(c => (
              <div key={c.label} className="corner-example" style={{ borderRadius: c.r, opacity: c.dim ? 0.3 : 1 }}>
                <div className="corner-label" style={{ textDecoration: c.dim ? 'line-through' : 'none' }}>{c.label}</div>
                <div className="corner-sub">{c.sub}</div>
              </div>
            ))}
          </div>
          <div className="demo-row" style={{ marginTop: '8px' }}>
            <button className="btn btn-primary">Sharp button <Sparkle4 /></button>
            <span className="tag tag-default">#shipped</span>
            <span className="tag tag-accent">#internship</span>
            <input className="input-field" placeholder="Sharp input" readOnly style={{ width: '180px' }} />
          </div>
        </section>

        <Divider />

        {/* SPACING */}
        <section id="spacing">
          <div className="section-eyebrow">Visual Language</div>
          <h2 className="section-title">Spacing & Grid</h2>
          <p className="section-lead">A 4px base grid. A line grid background runs through every page — visible structure, not decoration.</p>

          <div className="sub-label">Background Grid</div>
          <div className="grid-demo">
            <div className="grid-demo-inner">
              <span className="grid-demo-label">40px × 40px line grid</span>
            </div>
          </div>
          <code className="inline-code">background: linear-gradient(var(--divider) 1px, transparent 1px), linear-gradient(90deg, var(--divider) 1px, transparent 1px); background-size: 40px 40px;</code>

          <div className="sub-label" style={{ marginTop: '32px' }}>Spacing Scale</div>
          <div className="spacing-table">
            {[
              { token: '--space-1', value: '4px', px: 4, use: 'Icon gaps, tight nudges' },
              { token: '--space-2', value: '8px', px: 8, use: 'Button padding vertical, small gaps' },
              { token: '--space-3', value: '12px', px: 12, use: 'Tag and input padding' },
              { token: '--space-4', value: '16px', px: 16, use: 'Card padding, list item gaps' },
              { token: '--space-6', value: '24px', px: 24, use: 'Component spacing, section gaps' },
              { token: '--space-8', value: '32px', px: 32, use: 'Large padding blocks' },
              { token: '--space-12', value: '48px', px: 48, use: 'Section dividers' },
              { token: '--space-16', value: '64px', px: 64, use: 'Page section padding' },
            ].map(s => (
              <div key={s.token} className="spacing-row">
                <code className="spacing-token">{s.token}</code>
                <div style={{ width: s.px + 'px', height: '12px', background: 'rgb(41, 196, 176)', minWidth: s.px + 'px', flexShrink: 0 }} />
                <span className="spacing-value">{s.value}</span>
                <span className="spacing-use">{s.use}</span>
              </div>
            ))}
          </div>

          <div className="sub-label" style={{ marginTop: '32px' }}>Layout Principles</div>
          <div className="principles-grid">
            {[
              { num: '01', title: 'Left-aligned, not centered', desc: 'Content lives on the left. Centered text is for short hero statements only.' },
              { num: '02', title: 'Sidebar + scrolling main', desc: 'Persistent left sidebar for navigation. Main content scrolls independently.' },
              { num: '03', title: 'Generous whitespace', desc: 'Crowded UI signals anxiety. Space signals confidence. When in doubt, add more.' },
              { num: '04', title: 'Grid-backed layouts', desc: 'The line grid keeps everything aligned without needing a rigid column system.' },
            ].map(p => (
              <div key={p.num} className="principle-card">
                <div className="principle-num">{p.num}</div>
                <div className="principle-title">{p.title}</div>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* CURSORS */}
        <section id="cursors">
          <div className="section-eyebrow">Visual Language</div>
          <h2 className="section-title">Custom Cursors</h2>
          <p className="section-lead">Every interactive element has a custom sparkle cursor — SVGs that replace the default pointer. Each variant signals a different type of interaction.</p>
          <div className="cursor-grid">
            {[
              { name: '4-point star', icon: <Sparkle4 />, size: 'Large (24px)', use: 'Primary actions — "View Case Study", "Nice to meet you!"' },
              { name: '6-point star', icon: <Sparkle6 />, size: 'Medium (20px)', use: 'Secondary actions — "Fun Side Project", "My photos"' },
              { name: 'Asterisk', icon: <Asterisk />, size: 'Medium (20px)', use: 'Neutral / informational — "Always good to know!"' },
              { name: 'Spinning circle', icon: <span style={{ fontSize: '18px', fontFamily: 'monospace' }}>◌</span>, size: 'Small (16px)', use: 'Ambient / loading states' },
            ].map(c => (
              <div key={c.name} className="cursor-card">
                <div className="cursor-icon">{c.icon}</div>
                <div className="cursor-name">{c.name}</div>
                <div className="cursor-size">{c.size}</div>
                <div className="cursor-use">{c.use}</div>
              </div>
            ))}
          </div>
          <div className="prose">
            <p>A sparkle on hover is unexpected and specific — it communicates delight without saying the word. Each variant has a clear purpose: 4-point for primary, 6-point for secondary, asterisk for neutral. A micro design system within the cursor itself.</p>
          </div>
          <div className="demo-row" style={{ marginTop: '16px' }}>
            <button className="btn btn-primary">Nice to meet you! <Sparkle4 /></button>
            <button className="btn btn-primary">Fun Side Project <Sparkle6 /></button>
            <button className="btn btn-outline">Always good to know! <Asterisk /></button>
          </div>
        </section>

        <Divider />

        {/* COMPONENTS */}
        <section id="components">
          <div className="section-eyebrow">Components</div>
          <h2 className="section-title">UI Patterns</h2>
          <p className="section-lead">Small, reusable patterns across every project. Sharp corners, blue palette, sparkle interactions.</p>

          <div className="sub-label">Buttons — Live</div>
          <p className="sub-desc">White background, navy border, bold blue text, sparkle on the right. Hover to fill. Click to interact.</p>
          <ButtonPlayground />
          <div className="prose" style={{ marginTop: '12px' }}>
            <p><strong>When to use:</strong> Every CTA in the portfolio uses this button. "View Case Study" on project cards uses the 4-point (primary). "Fun Side Project" uses the 6-point (secondary). One primary button per view — never two competing primaries on the same screen.</p>
          </div>

          <div className="sub-label" style={{ marginTop: '40px' }}>Tags</div>
          <p className="sub-desc">Always lowercase, # prefixed, no punctuation. Sharp corners. Metadata, not sentences.</p>
          <div className="demo-row" style={{ flexWrap: 'wrap' }}>
            {['#ProductDesign', '#B2B', '#Claude', '#ClaudeCode', '#Figma', '#Figma Make', '#Windsurf'].map(t => <span key={t} className="tag tag-default">{t}</span>)}
            {['#shipped', '#handed off'].map(t => <span key={t} className="tag tag-accent">{t}</span>)}
            {['#internship', '#freelance', '#non-profit'].map(t => <span key={t} className="tag tag-muted">{t}</span>)}
          </div>
          <div className="prose" style={{ marginTop: '12px' }}>
            <p><strong>When to use:</strong> Every project card uses tags. Blue = delivery status (#shipped, #handed off). Teal = engagement type (#internship, #freelance, #non-profit). Gray = tools or discipline (#Claude, #Figma, #B2B). Tags never appear alone — always in a group of 2–4 at the bottom of a card.</p>
          </div>

          <div className="sub-label" style={{ marginTop: '40px' }}>Cards — Live</div>
          <p className="sub-desc">Switch between real projects from the portfolio. White bg, 1px navy border, sharp corners, offset hover shadow.</p>
          <CardBuilder />
          <div className="prose" style={{ marginTop: '12px' }}>
            <p><strong>When to use:</strong> The primary container for all project work on the homepage. Every card needs a visual (video, image, or gradient placeholder), a title, a one-line description, and tags. No card is ever text-only.</p>
          </div>

          <div className="sub-label" style={{ marginTop: '40px' }}>Form Elements</div>
          <p className="sub-desc">Sharp corners, 1px navy border, white background. Focus: border increases to 2px blue.</p>
          <div className="demo-row" style={{ flexWrap: 'wrap', gap: '20px' }}>
            <input className="input-field" placeholder="johanna.huarachi@cca.edu" type="email" />
            <label className="checkbox-label">
              <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} className="checkbox-input" />
              <span className={`checkbox-box ${checked ? 'checked' : ''}`}>{checked && '✓'}</span>
              Open to collaborations
            </label>
          </div>
        </section>

        <Divider />

        {/* VOICE */}
        <section id="voice">
          <div className="section-eyebrow">Writing</div>
          <h2 className="section-title">Voice & Tone</h2>
          <p className="section-lead">Direct, warm, specific. I write the way I talk — not the way I think I'm supposed to sound.</p>
          <div className="voice-principles">
            {[
              { title: 'Say the thing directly', desc: 'The lead is never buried. What something does goes in the first sentence.', do: '"Integrated AI into an airline pricing platform for analysts."', dont: '"Leveraged cutting-edge AI capabilities to enhance the user experience for key stakeholders."' },
              { title: 'Warm, not corporate', desc: 'Contractions, first person, natural rhythm. "Made with Iced Hojichas, genuine thought, and delight" is the register.', do: '"Always happy to talk design, research, or anything in between."', dont: '"I welcome opportunities to discuss design-related topics and professional engagements."' },
              { title: 'Specific beats vague', desc: '"Unique background" tells nobody anything. Name the actual thing.', do: '"I studied psychology, neuroscience, and Latino studies at Williams College as a first-gen student."', dont: '"My interdisciplinary background informs my human-centered approach to design."' },
              { title: 'Personality lives at the edges', desc: 'Clean and direct in the main copy. The footer, the 404 page, the hover states — that\'s where the real me shows up.', do: '"Made with Iced Hojichas, genuine thought, and delight"', dont: '"© 2026 Johanna Huarachi. All rights reserved."' },
            ].map(v => (
              <div key={v.title} className="voice-card">
                <div className="voice-emoji">✦</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
                <div className="voice-examples">
                  <div className="voice-do"><span className="voice-label do">Do</span>{v.do}</div>
                  <div className="voice-dont"><span className="voice-label dont">Don't</span>{v.dont}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="sub-label" style={{ marginTop: '32px' }}>Writing Patterns</div>
          <div className="prose">
            <p><strong>Project descriptions:</strong> What I did + who it was for + what happened. Active voice. "Integrated AI and modernized..." not "An integration was developed..."</p>
            <p><strong>CTA copy:</strong> Action verbs with sparkle icons. "View Case Study ✦" — never "Click here" or "Learn more."</p>
            <p><strong>Tags:</strong> Lowercase, # prefixed, no punctuation. Metadata, not sentences.</p>
            <p><strong>FAQs and about sections:</strong> Written like I'm talking to someone I just met at a design event — smart, curious, no pretense.</p>
          </div>
        </section>

        <div className="site-footer">
          Made with iced hojichas, genuine thought, and delight — Johanna Huarachi · 2026
        </div>

      </main>
    </div>
  )
}