import { motion } from 'framer-motion';
function NavBar({ copy, language, setLanguage, showLanguageSwitch, darkMode, setDarkMode }) {
  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/alitman22',
      icon: 'fa-brands fa-github',
      external: true
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/alit-fattahi/',
      icon: 'fa-brands fa-linkedin',
      external: true
    },
    {
      name: 'Email',
      href: 'mailto:alit.fattahi@gmail.com',
      icon: 'fa-solid fa-envelope',
      external: false
    }
  ];

  return (
    <nav className="navbar">
      <motion.a href="#" className="brand terminal-prompt" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>~$ ali.sh</motion.a>
      <div className="nav-links">
        {[
          { key: 'about', href: '#about' },
          { key: 'experience', href: '#experience' },
          { key: 'skills', href: '#skills' },
          { key: 'study', href: '#study' },
          { key: 'projects', href: '#projects' },
          { key: 'stories', href: '#experience-stories' }
        ].map((item, i) => (
          <motion.a
            key={item.key}
            href={item.href}
            className="nav-link"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 + i * 0.07, duration: 0.45 }}
          >
            {copy.nav[item.key]}
          </motion.a>
        ))}
      </div>
      <div className="nav-actions">
        <div className="nav-social" aria-label="Quick profile links">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="nav-social-link"
              aria-label={item.name}
              title={item.name}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
            >
              <i className={item.icon} aria-hidden="true"></i>
            </a>
          ))}
        </div>

        <button
          className="mode-toggle"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          type="button"
          onClick={() => setDarkMode((m) => !m)}
        >
          <motion.span
            key={darkMode ? 'dark' : 'light'}
            initial={{ rotate: 180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -180, opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ display: 'inline-block' }}
          >
            {darkMode ? (
              <i className="fa-solid fa-moon"></i>
            ) : (
              <i className="fa-solid fa-sun"></i>
            )}
          </motion.span>
        </button>
        {showLanguageSwitch && (
          <div className="lang-switch" aria-label="Language selector">
            <button
              className={language === 'en' ? 'lang-btn active' : 'lang-btn'}
              type="button"
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
            <button
              className={language === 'tr' ? 'lang-btn active' : 'lang-btn'}
              type="button"
              onClick={() => setLanguage('tr')}
            >
              TR
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
