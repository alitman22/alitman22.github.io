import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import NavBar from './components/NavBar';
import { Suspense, lazy } from 'react';
const HeroSection = lazy(() => import('./components/HeroSection'));
const AboutSection = lazy(() => import('./components/AboutSection'));
const ExperienceSection = lazy(() => import('./components/ExperienceSection'));
const SkillsSection = lazy(() => import('./components/SkillsSection'));
const StudySection = lazy(() => import('./components/StudySection'));
const ProjectsSection = lazy(() => import('./components/ProjectsSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
import { useLanguage } from './hooks/useLanguage';
import { useRegion } from './hooks/useRegion';

function App() {
  const { region } = useRegion();
  const isTurkeyRegion = region === 'TR';
  const { language, setLanguage, copy } = useLanguage(isTurkeyRegion);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.title = copy.meta.title;
    document.documentElement.lang = language;
    document.documentElement.setAttribute('data-region', region);
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [copy.meta.title, language, region, darkMode]);

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
            isTurkeyRegion={isTurkeyRegion}
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
            <Suspense fallback={<div />}>
              <HeroSection copy={copy} language={language} isTurkeyRegion={isTurkeyRegion} />
              <AboutSection copy={copy} />
              <ExperienceSection copy={copy} />
              <SkillsSection copy={copy} />
              <StudySection copy={copy} />
              <ProjectsSection copy={copy} darkMode={darkMode} />
              <ContactSection copy={copy} isTurkeyRegion={isTurkeyRegion} />
            </Suspense>

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
