import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { FaArrowRight, FaDownload, FaGithub, FaLinkedin, FaEnvelope, FaBars, FaXmark, FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { awards, education, experience, languages, profile, projects, publication, reference, roles, skills } from './data';
import './styles.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function Particles() {
  return <div className="particles" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /><span /></div>;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const items = [['/', 'Home'], ['/about', 'About'], ['/projects', 'Projects'], ['/resume', 'Resume']];
  return (
    <header className="navbar">
    <div className="shell nav-inner">
      <Link className="wordmark" to="/" onClick={close}><span className="mark">E</span><span>{profile.shortName}</span></Link>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">{open ? <FaXmark /> : <FaBars />}</button>
      <nav className={open ? 'nav-links open' : 'nav-links'}>
        {items.map(([path, label]) => <NavLink key={path} to={path} end={path === '/'} onClick={close}>{label}</NavLink>)}
        <NavLink className="nav-contact" to="/contact" onClick={close}>Contact <FaArrowRight /></NavLink>
      </nav>
    </div>
    </header>
  );
}

function Footer() {
  return <footer className="footer"><div className="shell footer-grid"><div><Link className="wordmark" to="/"><span className="mark">E</span><span>{profile.shortName}</span></Link><p>Curious about intelligent systems and useful software.</p></div><div className="footer-links"><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a><a href={`mailto:${profile.email}`} aria-label="Email"><FaEnvelope /></a></div><p className="copyright">© {new Date().getFullYear()} {profile.name}. Built with care.</p></div></footer>;
}

function Layout({ children }) {
  const { pathname } = useLocation();
  useEffect(() => {
    const page = pathname === '/' ? 'Home' : pathname.slice(1).replace(/-/g, ' ');
    document.title = `${page.charAt(0).toUpperCase() + page.slice(1)} | ${profile.name}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', `${page} portfolio of ${profile.name}, focused on AI, machine learning, NLP, research, and practical software.`);
  }, [pathname]);
  return <><ScrollToTop /><Navbar />{children}<Footer /></>;
}

function ButtonLink({ children, to, external = false, secondary = false }) {
  const className = secondary ? 'button secondary' : 'button';
  return external ? <a className={className} href={to} target="_blank" rel="noreferrer">{children}</a> : <Link className={className} to={to}>{children}</Link>;
}

function TypingText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const role = roles[roleIndex];
    const complete = text === role;
    const empty = text === '';
    const delay = complete ? 1400 : deleting && empty ? 400 : deleting ? 42 : 78;
    const timer = setTimeout(() => {
      if (complete) setDeleting(true);
      else if (deleting && empty) { setDeleting(false); setRoleIndex((roleIndex + 1) % roles.length); }
      else setText(deleting ? role.slice(0, text.length - 1) : role.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(timer);
  }, [deleting, roleIndex, text]);
  return <span className="typing">{text}<span className="cursor" aria-hidden="true">|</span></span>;
}

function Home() {
  return <main>
    <section className="hero"><Particles /><div className="shell hero-grid"><div className="hero-copy reveal"><p className="kicker">HI THERE!</p><h1>I'M <span>EMON</span></h1><p className="hero-role"><TypingText /></p><p className="hero-text">{profile.bio}</p><div className="hero-actions"><ButtonLink to="/projects">Explore my work <FaArrowRight /></ButtonLink><a className="button secondary" href={profile.cv} download>Download resume <FaDownload /></a></div><div className="social-row"><a href={profile.github} target="_blank" rel="noreferrer"><FaGithub /> GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><FaLinkedin /> LinkedIn</a></div></div><div className="hero-visual reveal delay"><div className="portrait-frame"><img src="/profile.webp" alt="Portrait of Md Sakib Hasan Emon" /></div><span className="visual-label">AI / ML<br />RESEARCH</span></div></div></section>
    <section className="intro-band"><div className="shell split-heading"><p className="kicker">ABOUT ME</p><div><h2>Building with curiosity.<br /><em>Learning by doing.</em></h2><p>{profile.statement}</p><ButtonLink to="/about" secondary>More about me <FaArrowRight /></ButtonLink></div></div></section>
    <section className="featured"><div className="shell"><div className="section-heading"><div><p className="kicker">SELECTED WORK</p><h2>Projects that make<br /><em>ideas useful.</em></h2></div><ButtonLink to="/projects" secondary>View all projects <FaArrowRight /></ButtonLink></div><div className="project-grid">{projects.slice(0, 3).map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}</div></div></section>
    <section className="stats-band"><div className="shell stats"><div><strong>56K+</strong><span>Banglish samples</span></div><div><strong>91.4%</strong><span>Classification accuracy</span></div><div><strong>5</strong><span>Technical focus areas</span></div><div><strong>01</strong><span>Research direction</span></div></div></section>
  </main>;
}

function ProjectCard({ project, index }) {
  return <article className={`project-card ${project.accent}`}><div className="project-art">{project.image ? <img src={project.image} alt={`${project.title} project preview`} /> : <span className="project-placeholder">PROJECT 0{index + 1}</span>}<FaArrowUpRightFromSquare /></div><div className="project-content"><p className="project-type">{project.technologies.slice(0, 2).join(' / ')}</p><h3>{project.title}</h3><p>{project.description}</p><div className="tag-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div><div className="project-links"><a className="text-link" href={project.github} target="_blank" rel="noreferrer">GitHub <FaArrowRight /></a>{project.live && <a className="text-link" href={project.live} target="_blank" rel="noreferrer">Live demo <FaArrowUpRightFromSquare /></a>}</div></div></article>;
}

function PageIntro({ kicker, title, children }) { return <section className="page-intro"><div className="shell"><p className="kicker">{kicker}</p><h1>{title}</h1>{children && <p>{children}</p>}</div></section>; }

function About() {
  return <main><PageIntro kicker="ABOUT EMON" title={<>A student of systems,<br /><em>language & possibility.</em></>}><span>{profile.bio} {profile.statement}</span></PageIntro><section className="about-section"><div className="shell about-grid"><div><p className="kicker">THE SHORT VERSION</p><h2>Research-minded.<br /><em>Practical by nature.</em></h2></div><div className="about-copy"><p>{profile.bio}</p><p>My work sits where machine learning meets real human language. I am especially interested in low-resource NLP, explainable AI, healthcare AI, and building reliable workflows from data collection through evaluation.</p><ButtonLink to="/resume" secondary>View my resume <FaArrowRight /></ButtonLink></div></div></section><TechStack /><GithubActivity /><section className="education"><div className="shell"><div className="section-heading"><div><p className="kicker">ACADEMIC BACKGROUND</p><h2>Where I have<br /><em>been learning.</em></h2></div></div><div className="education-list">{education.map((item) => <article key={item.title}><span>{item.period}</span><div><h3>{item.title}</h3><p>{item.place}</p></div><strong>{item.result}</strong></article>)}</div></div></section></main>;
}

function TechStack() {
  return <section className="tech-section"><div className="shell"><div className="section-heading"><div><p className="kicker">TECHNOLOGY</p><h2>Tools I use to<br /><em>make things work.</em></h2></div><p>Editable skill groups based on my current academic and project experience.</p></div><div className="skill-groups">{Object.entries(skills).map(([group, items]) => <div className="skill-group" key={group}><h3>{group}</h3><div>{items.map((item) => <span key={item}>{item}</span>)}</div></div>)}</div></div></section>;
}

function GithubActivity() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    fetch('https://api.github.com/users/EMON-26/repos?sort=updated&per_page=3')
      .then((response) => response.ok ? response.json() : [])
      .then((items) => setRepositories(items))
      .catch(() => setRepositories([]));
  }, []);
  return <section className="github-section"><div className="shell"><div className="section-heading"><div><p className="kicker">OPEN SOURCE</p><h2>Recent work<br /><em>on GitHub.</em></h2></div><a className="button secondary" href={profile.github} target="_blank" rel="noreferrer">View profile <FaGithub /></a></div><div className="github-grid">{repositories.length ? repositories.map((repository) => <a className="github-repo" key={repository.id} href={repository.html_url} target="_blank" rel="noreferrer"><strong>{repository.name}</strong><span>{repository.description || 'Open-source project by Emon.'}</span><small>{repository.language || 'Code'} · {repository.stargazers_count} stars</small></a>) : <p className="github-empty">Repository activity will appear here when GitHub is available.</p>}</div></div></section>;
}

function Projects() {
  return <main><PageIntro kicker="SELECTED PROJECTS" title={<>Ideas into<br /><em>working systems.</em></>}><span>A collection of academic research, software projects, and practical experiments.</span></PageIntro><section className="projects-page"><div className="shell project-grid full-grid">{projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}</div></section></main>;
}

function Contact() {
  return <main><PageIntro kicker="CONTACT" title={<>Let’s start a<br /><em>conversation.</em></>}><span>Open to research opportunities, graduate study conversations, and thoughtful technical collaboration.</span></PageIntro><section className="contact-page"><div className="shell contact-layout"><div><p className="kicker">REACH OUT</p><h2>Have a question<br /><em>or an idea?</em></h2><div className="contact-details"><a href={`mailto:${profile.email}`}>{profile.email}</a><a href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`}>{profile.phone}</a><span>{profile.location}</span></div><div className="contact-social"><a href={profile.github} target="_blank" rel="noreferrer"><FaGithub /> GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><FaLinkedin /> LinkedIn</a></div></div><form className="contact-form" name="portfolio-contact" method="POST" action="/success.html" data-netlify="true"><input type="hidden" name="form-name" value="portfolio-contact" /><label>Name<input name="name" required /></label><label>Email<input name="email" type="email" required /></label><label>Message<textarea name="message" rows="6" required /></label><button className="button" type="submit">Send message <FaArrowRight /></button></form></div></section></main>;
}

function Resume() {
  return <main><PageIntro kicker="CURRICULUM VITAE" title={<>The context behind<br /><em>the work.</em></>}><span>{profile.statement}</span></PageIntro><section className="resume-page"><div className="shell resume-grid"><div><div className="resume-block"><p className="kicker">PERSONAL INFORMATION</p><div className="resume-contact resume-contact-inline"><span>{profile.location} · {profile.nationality}</span><span>{profile.phone}</span><a href={`mailto:${profile.email}`}>{profile.email}</a><a href={profile.github} target="_blank" rel="noreferrer">{profile.github.replace('https://', '')}</a><a href={profile.linkedin} target="_blank" rel="noreferrer">{profile.linkedin.replace('https://', '')}</a></div></div><div className="resume-block"><p className="kicker">WORK EXPERIENCE</p>{experience.map((item) => <article key={item.title}><span>{item.period}</span><h3>{item.title}</h3><p>{item.place}</p><ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></article>)}</div><div className="resume-block"><p className="kicker">EDUCATION AND TRAINING</p>{education.map((item) => <article key={item.title}><span>{item.period}</span><h3>{item.title}</h3><p>{item.place} · {item.result}</p></article>)}</div><div className="resume-block"><p className="kicker">RESEARCH EXPERIENCE</p><h2>Bachelor's thesis: Banglish mental health classification using transformer-based multi-task learning</h2><p>Constructed and annotated more than 56,000 samples across six mental health categories and three severity levels. Developed a BanglaBERT architecture with Attention Pooling and Grad x Input explainability, achieving 91.4% classification accuracy and 92.2% severity accuracy.</p><p>Research interests: Machine Learning, Natural Language Processing, Explainable AI, Healthcare AI, Low-Resource NLP, and Large Language Models.</p></div><div className="resume-block"><p className="kicker">PUBLICATION</p><h3>{publication.title}</h3><p>{publication.authors}</p><p>{publication.venue}</p><p className="accent-text">{publication.status}</p></div><div className="resume-block"><p className="kicker">PERSONAL SKILLS</p><div className="resume-columns"><div><h3>Languages</h3>{languages.map((language) => <p key={language.name}>{language.name} · {language.level}</p>)}</div><div><h3>Technical skills</h3>{Object.entries(skills).map(([group, items]) => <p key={group}><strong>{group}:</strong> {items.join(', ')}</p>)}</div></div><h3>Awards and certifications</h3><ul>{awards.map((award) => <li key={award}>{award}</li>)}</ul></div></div><aside className="resume-aside"><p className="kicker">DOWNLOAD</p><h2>Keep a copy<br /><em>of my CV.</em></h2><p>The current CV is available as a PDF download.</p><a className="button" href={profile.cv} download>Download CV <FaDownload /></a><div className="resume-contact"><p className="kicker">REFERENCE</p><strong>{reference.name}</strong><span>{reference.role}</span><a href={`mailto:${reference.email}`}>{reference.email}</a><span>{reference.phone}</span></div></aside></div></section></main>;
}

function App() { return <Layout><Routes><Route path="/" element={<Home />} /><Route path="/about" element={<About />} /><Route path="/projects" element={<Projects />} /><Route path="/resume" element={<Resume />} /><Route path="/contact" element={<Contact />} /><Route path="*" element={<Home />} /></Routes></Layout>; }

createRoot(document.getElementById('root')).render(<StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>);
