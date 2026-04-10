import { useEffect, useLayoutEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import SkillsSection from './components/SkillsSection';
import StudySection from './components/StudySection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceStories from './components/ExperienceStories';
import ContactSection from './components/ContactSection';
import { useLanguage } from './hooks/useLanguage';
import { useRegion } from './hooks/useRegion';
import { useVisitorTracking } from './hooks/useVisitorTracking';

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

  // Prevent browser-native hash/restore jumps before first paint.
  useLayoutEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.history.scrollRestoration = 'manual';
    if (window.location.hash) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    // Guard against late layout shifts on initial load.
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });
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

            <AboutSection copy={copy} />

            <ExperienceSection copy={copy} />

            <SkillsSection copy={copy} />

            <StudySection copy={copy} />

            <ProjectsSection copy={copy} darkMode={darkMode} />

            <ExperienceStories copy={copy} />

            <ContactSection copy={copy} isTurkeyRegion={isTurkeyRegion} />

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
