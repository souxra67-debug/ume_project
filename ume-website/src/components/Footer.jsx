import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from '../assets/UME logo.png';
import { useLanguage } from '../context/LanguageContext';

// ============================================================
// VISITOR COUNTER
// ============================================================
function VisitorCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const base = 1580000;
    const random = Math.floor(Math.random() * 50000);
    setCount(base + random);

    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <span className="font-bold text-gold animate-pulse">{formatNumber(count)}</span>
  );
}

export default function Footer() {
  const { t, lang } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    {
      titleKey: 'quickLinks',
      links: [
        { key: 'home', to: '/' },
        { key: 'about', to: '/about' },
        { key: 'programs', to: '/programs' },
        { key: 'admission', to: '/admission' },
      ],
    },
    {
      titleKey: 'explore',
      links: [
        { key: 'newsEvents', to: '/news-events' },
        { key: 'campusLife', to: '/campus-life' },
        { key: 'alumni', to: '/alumni' },
        { key: 'rules', to: '/rules' },
        { key: 'contact', to: '/contact' },
      ],
    },
  ];

  // Social Media Links
  const socialLinks = [
    { icon: 'bi-facebook', label: 'Facebook', href: 'https://www.facebook.com/share/1JNEFL7nQG/', color: 'hover:bg-[#1877f2]' },
    { icon: 'bi-tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@ume.btb.1998?_r=1&_t=ZS-98PBMdYkrMS', color: 'hover:bg-[#000000]' },
    { icon: 'bi-telegram', label: 'Telegram', href: 'https://t.me/ume_edu_kh', color: 'hover:bg-[#0088cc]' },
    { icon: 'bi-youtube', label: 'YouTube', href: 'https://www.youtube.com/c/UMEUniversity', color: 'hover:bg-[#ff0000]' },
    { icon: 'bi-instagram', label: 'Instagram', href: 'https://www.instagram.com/ume.edu.kh', color: 'hover:bg-[#e4405f]' },
  ];

  const footerText = {
    boardOfDirectors: {
      km: 'ក្រុមប្រឹក្សាភិបាល',
      en: 'Board of Directors'
    }
  };

  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 relative transition-colors duration-300 border-t border-gray-100 dark:border-gray-800">
      {/* Gold line - ដូច Navbar accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent"></div>
      <div className="absolute top-[3px] left-0 right-0 h-[1px] bg-gold/30"></div>

      {/* Decorative Pattern - ដូច Navbar */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 border-2 border-navy dark:border-gold/20 rounded-full"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 border-2 border-navy dark:border-gold/20 rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1: Logo + Description + Visitor */}
          <div className="md:col-span-1">
            <Link to="/" onClick={scrollToTop} className="flex items-center gap-3 mb-4 group">
              <img src={logo} alt="UME" className="h-12 w-auto transition-transform duration-300 group-hover:scale-105" />
              <div className="leading-tight">
                {/* Logo text - ដូច Navbar: navy (light) / white (dark) */}
                <span className="text-xl font-bold text-navy dark:text-white tracking-tight group-hover:text-gold transition-colors duration-300">UME</span>
                <p className="text-xs text-navy/50 dark:text-gray-400 font-medium tracking-wide mt-0.5">{t('nav.tagline')}</p>
              </div>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mt-3 max-w-xs">
              {t('footer.description')}
            </p>
            
            {/* Visitor Counter - ដូច Navbar style */}
            <div className="mt-5 flex items-center gap-2.5 text-gray-500 dark:text-gray-400 text-xs bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-2.5 border border-gray-100 dark:border-gray-700">
              <i className="bi bi-eye-fill text-gold text-sm"></i>
              <span>
                {lang === 'km' ? 'អ្នកចូលទស្សនា' : 'Visitors'} : <VisitorCounter />
              </span>
            </div>

            {/* Quick Contact */}
            <div className="mt-4 space-y-1.5 text-xs text-gray-400 dark:text-gray-500">
              <p className="flex items-center gap-2">
                <i className="bi bi-clock text-gold"></i>
                {lang === 'km' ? 'ម៉ោងធ្វើការ: ច័ន្ទ-សុក្រ ៨:០០ - ១៧:០០' : 'Working Hours: Mon-Fri 8:00 - 17:00'}
              </p>
            </div>
          </div>

          {/* Column 2 & 3: Quick Links - ដូច Navbar menu style */}
          {footerLinks.map((col, i) => (
            <div key={i}>
              {/* ចំណងជើង - ដូច Navbar: navy (light) / gold (dark) */}
              <h4 className="text-navy dark:text-gold font-semibold mb-4 text-sm uppercase tracking-wider">
                {t(`footer.${col.titleKey}`)}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      to={link.to}
                      onClick={scrollToTop}
                      className="text-gray-500 dark:text-gray-400 hover:text-gold dark:hover:text-gold text-sm transition-all duration-200 hover:translate-x-1 inline-block group"
                    >
                      <i className="bi bi-chevron-right text-gold/30 text-xs mr-1 group-hover:text-gold transition-colors"></i>
                      {link.key === 'boardOfDirectors' 
                        ? footerText.boardOfDirectors[lang]
                        : t(`footer.${link.key}`)
                      }
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 4: Contact + Social - ដូច Navbar style */}
          <div>
            <h4 className="text-navy dark:text-gold font-semibold mb-4 text-sm uppercase tracking-wider">
              {t('footer.contact')}
            </h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li className="flex gap-3 group">
                <i className="bi bi-geo-alt-fill text-gold text-sm mt-0.5 group-hover:scale-110 transition-transform"></i>
                <span className="group-hover:text-navy dark:group-hover:text-white transition-colors">{t('footer.address')}</span>
              </li>
              <li className="flex gap-3 group">
                <i className="bi bi-telephone-fill text-gold text-sm mt-0.5 group-hover:scale-110 transition-transform"></i>
                <a href="tel:053730336" className="group-hover:text-navy dark:group-hover:text-white transition-colors">053 730 336</a>
              </li>
              <li className="flex gap-3 group">
                <i className="bi bi-envelope-fill text-gold text-sm mt-0.5 group-hover:scale-110 transition-transform"></i>
                <a href="mailto:info@ume.edu.kh" className="group-hover:text-navy dark:group-hover:text-white transition-colors">info@ume.edu.kh</a>
              </li>
              <li className="flex gap-3 group">
                <i className="bi bi-globe text-gold text-sm mt-0.5 group-hover:scale-110 transition-transform"></i>
                <a href="https://www.ume.edu.kh" target="_blank" rel="noopener noreferrer" className="group-hover:text-navy dark:group-hover:text-white transition-colors">
                  www.ume.edu.kh
                </a>
              </li>
            </ul>

            {/* Social Links - ដូច Navbar icon style */}
            <div className="mt-5">
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-3 uppercase tracking-wider">
                {lang === 'km' ? 'តាមដានយើង' : 'Follow Us'}
              </p>
              <div className="flex gap-2.5">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`w-9 h-9 bg-gray-50 dark:bg-gray-800 ${social.color} rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg border border-gray-100 dark:border-gray-700`}
                  >
                    <i className={`bi ${social.icon} text-gray-500 dark:text-gray-400 hover:text-white text-sm transition-colors`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - ដូច Navbar border */}
      <div className="relative z-10 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-gray-400 dark:text-gray-500 text-xs flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()}</span>
            <span className="text-gold font-semibold">UME</span>
            <span>University.</span>
            <span className="hidden sm:inline">{t('footer.copyright')}</span>
          </p>
          <div className="flex items-center gap-4">
            {/* Back to Top - ដូច Navbar hover style */}
            <button
              onClick={scrollToTop}
              className="text-gray-400 dark:text-gray-500 hover:text-gold dark:hover:text-gold text-xs transition-colors flex items-center gap-1 group"
            >
              {t('footer.backToTop')}
              <i className="bi bi-arrow-up text-sm group-hover:-translate-y-1 transition-transform"></i>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}