import {
  ArrowUpRight,
  Code2,
  Layers3,
  Link,
  Sparkles,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { CurvedLoop } from './components/CurvedLoop'
import StaggeredMenu from './components/StaggeredMenu'
import GridMotion from './components/GridMotion'
import { ProjectSlider } from './components/ProjectSlider'
import { SectionLabel } from './components/SectionLabel'
import SplitText from './components/SplitText'
import TargetCursor from './components/TargetCursor'
import {
  achievements,
  certifications,
  education,
  explorations,
  interests,
  profile,
  projects,
  skills,
  workStyle,
} from './data/portfolio'

function App() {
  const [hiddenNav, setHiddenNav] = useState(false)

  useEffect(() => {
    let previousY = window.scrollY

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.14 },
    )

    document.querySelectorAll('.reveal').forEach((element) => {
      revealObserver.observe(element)
    })

    const onScroll = () => {
      const currentY = window.scrollY
      setHiddenNav(currentY > previousY && currentY > 120)
      previousY = Math.max(currentY, 0)
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      revealObserver.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <main>
      <TargetCursor 
        targetSelector="a, button, .project-card, .role-card, .skill-panel, .sm-panel-item"
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />
      
      <StaggeredMenu
        isFixed={true}
        position="right"
        items={[
          { label: 'About', ariaLabel: 'Go to about page', link: '#about' },
          { label: 'Work', ariaLabel: 'View our work', link: '#work' },
          { label: 'Skills', ariaLabel: 'View our skills', link: '#skills' },
          { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' }
        ]}
        socialItems={profile.links.map(l => ({ label: l.label, link: l.href }))}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor={hiddenNav ? 'transparent' : '#fff'}
        openMenuButtonColor="#fff"
        changeMenuColorOnOpen={false}
        colors={['#333', '#111']}
        logoUrl=""
        accentColor="#555"
        closeOnClickAway={true}
      />

      <section className="hero-section" id="top">
        {/* Animated grid background — auto-loads images from /public/assets/projects/background/ */}
        <GridMotion />

        {/* Scanline texture sits above the grid */}
        <div className="scanline" style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }} aria-hidden="true" />

        <div className="hero-content" style={{ position: 'relative', zIndex: 4 }}>
          <p className="hero-kicker reveal">Currently building with AI, code, and design</p>
          <h1 aria-label={profile.name}>
            <SplitText
              text="HARI"
              tag="span"
              className="hero-h1-line block"
              delay={60}
              duration={1}
              textAlign="left"
            />
            <SplitText
              text="HARSHA"
              tag="span"
              className="hero-h1-line block"
              delay={60}
              duration={1}
              textAlign="left"
            />
            <SplitText
              text="UMMIDI"
              tag="span"
              className="hero-h1-line block"
              delay={60}
              duration={1}
              textAlign="left"
            />
          </h1>
          <div className="hero-bottom reveal">
            <p>{profile.role}</p>
            <span>{profile.location}</span>
          </div>
        </div>
        <a className="scroll-cue" href="#about" aria-label="Scroll to about section">
          <ArrowUpRight size={20} />
        </a>
      </section>

      <CurvedLoop
        marqueeText={[...interests, ...explorations.slice(0, 4)].join('  ✦  ')}
        curveAmount={120}
        direction="left"
        speed={1.35}
        className="curved-loop-light"
        variant="top"
      />

      <section className="intro-section" id="about">
        <div className="container two-column">
          <SectionLabel
            eyebrow="About"
            title="AI-native developer with a designer's eye."
            description="A one-page signal of what I build, study, and explore."
          />
          <div className="intro-copy reveal">
            <p>{profile.intro}</p>
            <p>{profile.about}</p>
          </div>
        </div>
      </section>

      <section className="role-section">
        <div className="container role-grid">
          <div className="portrait-card reveal">
            <img src="/assets/profile.png" alt="Portrait of Hari Harsha Ummidi" loading="lazy" />
          </div>
          <div className="role-card reveal">
            <Sparkles size={26} />
            <p>Current Role</p>
            <h2>Designer Lead at Skill Forge</h2>
            <span>{profile.currentRole}</span>
          </div>
          <div className="role-card role-card-dark reveal">
            <Layers3 size={26} />
            <p>Work Style</p>
            <div className="pill-cloud">
              {workStyle.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="container">
          <SectionLabel
            eyebrow="Selected Work"
            title="Projects across AI, systems, and product interfaces."
            description="Built from learning, experiments, hackathons, and full-stack practice."
          />
          <div className="project-grid">
            {projects.map((project, index) => (
              <article
                className={`project-card reveal ${index === 0 ? 'project-card-featured' : ''}`}
                key={project.title}
              >
                <div className="project-image">
                  <ProjectSlider folder={project.assetFolder} title={project.title} />
                </div>
                <div className="project-meta">
                  <span>{project.category}</span>
                  <span>{project.service}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tag-row">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="skills-section" id="skills">
        <div className="container">
          <SectionLabel
            eyebrow="Stack"
            title="Technical range with a strong AI systems bias."
            dark
          />
          <div className="skills-grid">
            {skills.map((skill) => (
              <div className="skill-panel reveal" key={skill.group}>
                <Code2 size={22} />
                <h3>{skill.group}</h3>
                <div className="skill-list">
                  {skill.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="timeline-section">
        <div className="container two-column">
          <SectionLabel
            eyebrow="Education"
            title="Computer science, data science, and applied building."
          />
          <div className="timeline reveal">
            {education.map((item) => (
              <article key={item.degree}>
                <span>{item.years}</span>
                <h3>{item.degree}</h3>
                <p>{item.institution}</p>
                {item.focus ? <small>{item.focus.join(' / ')}</small> : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="proof-section">
        <div className="container proof-grid">
          <div className="proof-column reveal">
            <SectionLabel eyebrow="Highlights" title="Signals that keep compounding." />
            <ul>
              {achievements.map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>
          </div>
          <div className="proof-column reveal">
            <SectionLabel eyebrow="Certifications" title="Structured learning and foundations." />
            <ul>
              {certifications.map((certification) => (
                <li key={certification}>{certification}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="community-section">
        <div className="container community-wrap reveal">
          <img src="/assets/community-systems.png" alt="Abstract learning systems visual" loading="lazy" />
          <div>
            <p>Community & Learning</p>
            <h2>
              Building by experimenting, joining technical events, and tracking how AI
              workflows reshape software engineering.
            </h2>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <CurvedLoop
          marqueeText={[
            'Let us build intelligent experiences',
            'Available for collaboration',
            'AI-NATIVE BUILDER',
            'Innovating at the intersection of AI and software engineering',
            'Transforming ideas into intelligent solutions',  
            profile.name,
          ].join('  ✦  ')}
          curveAmount={45}
          direction="right"
          speed={1.55}
          className="curved-loop-dark"
          variant="bottom"
        />
        <div className="container contact-grid">
          <div>
            <p className="contact-label">Contact</p>
            <h2>Connect with Hari</h2>
          </div>
          <div className="contact-links">
            {profile.links.map((link) => {
              const Icon = link.label === 'CodeChef' ? Code2 : Link

              return (
                <a href={link.href} key={link.label} target="_blank" rel="noreferrer">
                  <Icon size={20} />
                  <span>{link.label}</span>
                  <ArrowUpRight size={18} />
                </a>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
