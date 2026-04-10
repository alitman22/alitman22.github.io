import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import { useLanguage } from './hooks/useLanguage';
import { useRegion } from './hooks/useRegion';
import { useVisitorTracking } from './hooks/useVisitorTracking';

const AboutSection = lazy(() => import('./components/AboutSection'));
const ExperienceSection = lazy(() => import('./components/ExperienceSection'));
const SkillsSection = lazy(() => import('./components/SkillsSection'));
const StudySection = lazy(() => import('./components/StudySection'));
const ProjectsSection = lazy(() => import('./components/ProjectsSection'));
const ExperienceStories = lazy(() => import('./components/ExperienceStories'));
const ContactSection = lazy(() => import('./components/ContactSection'));

function SectionPlaceholder({ minHeight }) {
  return <div className="section-deferred-placeholder" style={{ minHeight }} aria-hidden="true" />;
}

function DeferredSection({ minHeight, children, anchorId }) {
  const containerRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) {
      return undefined;
    }

    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      setShouldRender(true);
      return undefined;
    }

    const node = containerRef.current;
    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setShouldRender(true);
        observer.disconnect();
      },
      { rootMargin: '320px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div id={anchorId} className="deferred-anchor" ref={containerRef}>
      {shouldRender ? children : <SectionPlaceholder minHeight={minHeight} />}
    </div>
  );
}

function App() {
  const { region } = useRegion();
  const isTurkeyRegion = region === 'TR';
  const { language, setLanguage, copy } = useLanguage();
  const [darkMode, setDarkMode] = useState(true);

  useVisitorTracking();

  useEffect(() => {
    document.title = copy.meta.title;
    document.documentElement.lang = language;
    document.documentElement.setAttribute('data-region', region);
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [copy.meta.title, language, region, darkMode]);

  // Handle anchor navigation with proper scroll offset
  useEffect(() => {
    const scrollToAnchor = () => {
      const hash = window.location.hash;
      if (hash) {
        const anchorId = hash.slice(1); // Remove '#'
        const element = document.getElementById(anchorId);
        if (element) {
          // Use setTimeout to ensure the element is ready
          window.setTimeout(() => {
            const navbarHeight = 80;
            const elementPos = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: elementPos - navbarHeight,
              behavior: 'smooth'
            });
          }, 50);
        }
      }
    };

    // Scroll on initial load
    window.addEventListener('load', scrollToAnchor);
    
    // Handle hash change (when user clicks a menu link)
    window.addEventListener('hashchange', scrollToAnchor);

    // Try initial scroll in case page is already loaded
    scrollToAnchor();

    return () => {
      window.removeEventListener('load', scrollToAnchor);
      window.removeEventListener('hashchange', scrollToAnchor);
    };
  }, []);

  return (
    <div className={`app-root${darkMode ? ' dark' : ' light'}`}>
      <AnimatePresence>
        <motion.div
          key="navbar"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
        >
          <NavBar
            copy={copy}
            language={language}
            setLanguage={setLanguage}
            showLanguageSwitch
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        </motion.div>
      </AnimatePresence>

      <main className="container">
        <AnimatePresence>
          <motion.div
            key="main-content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 60 }}
          >
            <HeroSection copy={copy} language={language} isTurkeyRegion={isTurkeyRegion} />

            <DeferredSection minHeight="340px" anchorId="about-anchor">
              <Suspense fallback={<SectionPlaceholder minHeight="340px" />}>
                <AboutSection copy={copy} />
              </Suspense>
            </DeferredSection>

            <DeferredSection minHeight="460px" anchorId="experience-anchor">
              <Suspense fallback={<SectionPlaceholder minHeight="460px" />}>
                <ExperienceSection copy={copy} />
              </Suspense>
            </DeferredSection>

            <DeferredSection minHeight="520px" anchorId="skills-anchor">
              <Suspense fallback={<SectionPlaceholder minHeight="520px" />}>
                <SkillsSection copy={copy} />
              </Suspense>
            </DeferredSection>

            <DeferredSection minHeight="320px" anchorId="study-anchor">
              <Suspense fallback={<SectionPlaceholder minHeight="320px" />}>
                <StudySection copy={copy} />
              </Suspense>
            </DeferredSection>

            <DeferredSection minHeight="620px" anchorId="projects-anchor">
              <Suspense fallback={<SectionPlaceholder minHeight="620px" />}>
                <ProjectsSection copy={copy} darkMode={darkMode} />
              </Suspense>
            </DeferredSection>

            <DeferredSection minHeight="540px" anchorId="experience-stories-anchor">
              <Suspense fallback={<SectionPlaceholder minHeight="540px" />}>
                <ExperienceStories copy={copy} />
              </Suspense>
            </DeferredSection>

            <DeferredSection minHeight="260px" anchorId="contact-anchor">
              <Suspense fallback={<SectionPlaceholder minHeight="260px" />}>
                <ContactSection copy={copy} isTurkeyRegion={isTurkeyRegion} />
              </Suspense>
            </DeferredSection>

            <footer className="footer">
              <p>{copy.footer.designed}</p>
              <p>{copy.footer.built}</p>
            </footer>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
