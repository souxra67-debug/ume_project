import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from '../assets/UME logo.png';
import { useLanguage } from '../context/LanguageContext';

// ============================================================
// THEME TOGGLE
// ============================================================
function ThemeToggle({ className = '' }) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('ume-theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('ume-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('ume-theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark((prev) => !prev)}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:text-gold hover:bg-gold/10 ${className}`}
    >
      <i className={`bi ${isDark ? 'bi-sun-fill' : 'bi-moon-stars-fill'} text-base`}></i>
    </button>
  );
}

// ============================================================
// LANGUAGE TOGGLE
// ============================================================
function LanguageToggle({ className = '' }) {
  const { lang, toggleLang } = useLanguage();
  return (
    <button
      onClick={toggleLang}
      aria-label="Switch language"
      className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200 hover:text-gold hover:bg-gold/10 ${className}`}
    >
      {lang === 'km' ? 'EN' : 'ខ្មែរ'}
    </button>
  );
}

// ============================================================
// MENU STRUCTURE
// ============================================================
const menuStructure = [
  { key: 'home', href: '/' },
  {
    key: 'about',
    href: '/about',
    submenu: [
      { key: 'aboutOverview', href: '/about#overview' },
      { key: 'aboutHistory', href: '/about#history' },
      { key: 'aboutAccreditation', href: '/about#accreditation' },
      { key: 'aboutPartners', href: '/about#partners' },
      { key: 'aboutBoardOfDirectors', href: '/board-of-directors' },
      { key: 'aboutStructure', href: '/structure' },
      { key: 'aboutAlumni', href: '/alumni' },
    ],
  },
  {
    key: 'programs',
    href: '/programs',
    submenu: [
      { key: 'programsAll', href: '/programs' },
      { key: 'programsAssociate', href: '/associate-degree' },
      { key: 'programsMaster', href: '/master-degree' },
      { key: 'programsAdmission', href: '/admission' },
    ],
  },
  {
    key: 'newsEvents',
    href: '/news-events',
  },
  {
    key: 'campusLife',
    href: '/campus-life',
    submenu: [
      { key: 'campusLifeStudent', href: '/campus-life' },
      { key: 'campusLifeGallery', href: '/campus-life#gallery' },
    ],
  },
  {
    key: 'more',
    href: '#',
    submenu: [
      { key: 'moreResearch', href: '/research' },
      { key: 'moreCareer', href: '/career' },
      { key: 'moreFaq', href: '/faq' },
      { key: 'moreRules', href: '/rules' },
    ],
  },
  { key: 'contact', href: '/contact' },
];

// ============================================================
// SMOOTH SCROLL HELPER
// ============================================================
const smoothScrollToHash = (hash) => {
  if (!hash) return;
  setTimeout(() => {
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100);
};

// ============================================================
// MAIN NAVBAR COMPONENT
// ============================================================
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    setMobileOpen(false);
    setOpenSubmenu(null);
  }, [location]);

  // Smooth scroll for hash links on page load
  useEffect(() => {
    if (location.hash) {
      smoothScrollToHash(location.hash);
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  const isActive = (href) => {
    if (!href || href === '#') return false;
    if (href === '/') return location.pathname === '/';
    const pathOnly = href.split('#')[0];
    return location.pathname === pathOnly || location.pathname.startsWith(pathOnly + '/');
  };

  // Handle navigation with smooth scroll
  const handleNavClick = (e, href) => {
    const [path, hash] = href.split('#');
    
    if (path === location.pathname && hash) {
      e.preventDefault();
      smoothScrollToHash(`#${hash}`);
      setMobileOpen(false);
      setOpenSubmenu(null);
    } else if (hash && path !== location.pathname) {
      setMobileOpen(false);
      setOpenSubmenu(null);
    }
  };

  return (
    <nav
      className={`sticky top-0 z-50 bg-white dark:bg-gray-900 border-b transition-all duration-300 ${
        scrolled 
          ? 'shadow-lg border-transparent' 
          : 'shadow-sm border-gray-100 dark:border-gray-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group">
          <img src={logo} alt="UME" className="h-10 sm:h-14 md:h-16 w-auto transition-transform duration-300 group-hover:scale-105" />
          <div className="leading-tight">
            <span className="text-lg sm:text-2xl font-bold text-navy dark:text-white tracking-tight group-hover:text-gold transition-colors duration-300">
              UME
            </span>
            <p className="text-[10px] sm:text-xs text-navy/50 dark:text-gray-400 font-medium tracking-wide leading-tight">
              {t('nav.tagline')}
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-0">
          {menuStructure.map((item, index) => (
            <li key={index} className="relative group">
              {!item.submenu ? (
                <Link
                  to={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-3 py-2 text-[15px] font-medium rounded-lg transition-all duration-300 whitespace-nowrap ${
                    isActive(item.href)
                      ? 'text-gold bg-gold/5'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gold hover:bg-gold/5'
                  }`}
                >
                  {t(`nav.${item.key}`)}
                  {isActive(item.href) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gold rounded-full"></span>
                  )}
                </Link>
              ) : (
                <>
                  <Link
                    to={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`relative flex items-center gap-1 px-3 py-2 text-[15px] font-medium rounded-lg transition-all duration-300 whitespace-nowrap ${
                      item.submenu.some((sub) => isActive(sub.href))
                        ? 'text-gold bg-gold/5'
                        : 'text-gray-700 dark:text-gray-300 hover:text-gold hover:bg-gold/5'
                    }`}
                  >
                    {t(`nav.${item.key}`)}
                    <i className="bi bi-chevron-down text-[10px] group-hover:rotate-180 transition-transform duration-300"></i>
                    {item.submenu.some((sub) => isActive(sub.href)) && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gold rounded-full"></span>
                    )}
                  </Link>
                  
                  {/* ✅ Dropdown Menu - ស្អាត គ្មាន header ដាច់ដោយឡែក */}
                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl py-3 px-2 min-w-[240px] backdrop-blur-sm">
                      {item.submenu.map((sub, i) => (
                        <Link
                          key={i}
                          to={sub.href}
                          onClick={(e) => handleNavClick(e, sub.href)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] transition-all duration-200 ${
                            isActive(sub.href)
                              ? 'text-gold bg-gold/10 font-semibold'
                              : 'text-gray-700 dark:text-gray-300 hover:text-gold hover:bg-gold/5'
                          }`}
                        >
                          <i className={`bi ${isActive(sub.href) ? 'bi-dot' : 'bi-chevron-right'} text-xs ${isActive(sub.href) ? 'text-gold' : 'text-gray-400 group-hover:text-gold'}`}></i>
                          <span>{t(`nav.${sub.key}`)}</span>
                          {isActive(sub.href) && (
                            <i className="bi bi-check2 text-gold text-xs ml-auto"></i>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </li>
          ))}

          {/* Language + Theme toggle */}
          <li className="ml-1">
            <LanguageToggle className="text-gray-500 dark:text-gray-400" />
          </li>
          <li>
            <ThemeToggle className="text-gray-500 dark:text-gray-400" />
          </li>

          {/* CTA Button */}
          <li className="ml-2">
            <Link
              to="/admission"
              className="bg-gold hover:bg-gold-light text-navy px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-gold/25 transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              {t('nav.cta')}
            </Link>
          </li>
        </ul>

        {/* Mobile: language + theme toggle + hamburger */}
        <div className="lg:hidden flex items-center gap-1">
          <LanguageToggle className="text-gray-500 dark:text-gray-400" />
          <ThemeToggle className="text-gray-500 dark:text-gray-400" />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-navy dark:text-white p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <i className="bi bi-x-lg text-2xl"></i> : <i className="bi bi-list text-2xl"></i>}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-[85vh] overflow-y-auto opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white dark:bg-gray-900 border-t-2 border-gray-200 dark:border-gray-800 px-4 py-4 space-y-1 shadow-2xl">
          {menuStructure.map((item, index) => (
            <div key={index}>
              {!item.submenu ? (
                <Link
                  to={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`block px-4 py-3.5 rounded-xl text-base font-semibold transition-all duration-200 ${
                    isActive(item.href)
                      ? 'text-gold bg-gold/10'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gold hover:bg-gold/5'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <i className="bi bi-chevron-right text-gold/50 text-sm"></i>
                    {t(`nav.${item.key}`)}
                  </span>
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => toggleSubmenu(index)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-semibold transition-all duration-200 ${
                      openSubmenu === index
                        ? 'text-gold bg-gold/10'
                        : 'text-gray-700 dark:text-gray-300 hover:text-gold hover:bg-gold/5'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <i className="bi bi-folder2-open text-gold/50"></i>
                      {t(`nav.${item.key}`)}
                    </span>
                    <i className={`bi bi-chevron-down text-sm transition-transform duration-300 ${openSubmenu === index ? 'rotate-180' : ''}`}></i>
                  </button>
                  
                  {/* ✅ Mobile Submenu - ស្អាត គ្មាន header */}
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      openSubmenu === index ? 'max-h-[500px] opacity-100 mt-1 mb-2' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="ml-3 pl-4 py-2 space-y-1 border-l-2 border-gold/30">
                      {item.submenu.map((sub, i) => (
                        <Link
                          key={i}
                          to={sub.href}
                          onClick={(e) => handleNavClick(e, sub.href)}
                          className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all duration-200 ${
                            isActive(sub.href)
                              ? 'text-gold bg-gold/10 font-medium'
                              : 'text-gray-600 dark:text-gray-400 hover:text-gold hover:bg-gold/5'
                          }`}
                        >
                          <i className={`bi ${isActive(sub.href) ? 'bi-dot' : 'bi-chevron-right'} text-xs ${isActive(sub.href) ? 'text-gold' : 'text-gold/40'}`}></i>
                          <span>{t(`nav.${sub.key}`)}</span>
                          {isActive(sub.href) && (
                            <i className="bi bi-check2 text-gold text-xs ml-auto"></i>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
          
          {/* Mobile CTA Button */}
          <div className="pt-3 pb-1">
            <Link
              to="/admission"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-navy py-4 rounded-xl font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              <i className="bi bi-mortarboard-fill text-lg"></i>
              {t('nav.ctaMobile')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}