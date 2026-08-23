import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLanguage } from '../context/LanguageContext';

export default function NotFoundPage() {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  const text = {
    title: { km: 'ទំព័ររកមិនឃើញ', en: 'Page Not Found' },
    description: { km: 'ទំព័រដែលអ្នកកំពុងស្វែងរកអាចត្រូវបានលុប ប្តូរឈ្មោះ ឬមិនមាន។', en: 'The page you are looking for may have been removed, renamed, or does not exist.' },
    searchPlaceholder: { km: 'ស្វែងរកទំព័រ...', en: 'Search for a page...' },
    searchButton: { km: 'ស្វែងរក', en: 'Search' },
    countdownText: { km: 'នឹងបញ្ជូនទៅទំព័រដើមក្នុង', en: 'Redirecting to home page in' },
    seconds: { km: 'វិនាទី', en: 'seconds' },
    mightBeLooking: { km: 'អ្នកប្រហែលជាកំពុងស្វែងរក', en: 'You might be looking for' },
    backButton: { km: 'ត្រឡប់ក្រោយ', en: 'Go Back' },
    homeButton: { km: 'ទំព័រដើម', en: 'Home' },
    helpButton: { km: 'ជំនួយ', en: 'Help' },
  };

  const suggestions = [
    {
      name: { km: 'ទំព័រដើម', en: 'Home' },
      to: '/',
      icon: 'bi bi-house-fill',
      desc: { km: 'ត្រឡប់ទៅទំព័រដើម', en: 'Return to homepage' },
    },
    {
      name: { km: 'កម្មវិធីសិក្សា', en: 'Programs' },
      to: '/programs',
      icon: 'bi bi-book-fill',
      desc: { km: 'ស្វែងរកកម្មវិធីសិក្សា', en: 'Explore programs' },
    },
    {
      name: { km: 'ចុះឈ្មោះ', en: 'Admission' },
      to: '/admission',
      icon: 'bi bi-pencil-fill',
      desc: { km: 'ចុះឈ្មោះចូលរៀន', en: 'Apply for admission' },
    },
    {
      name: { km: 'ទំនាក់ទំនង', en: 'Contact' },
      to: '/contact',
      icon: 'bi bi-telephone-fill',
      desc: { km: 'ទាក់ទងយើងខ្ញុំ', en: 'Contact us' },
    },
    {
      name: { km: 'ព័ត៌មាន', en: 'News' },
      to: '/news',
      icon: 'bi bi-newspaper',
      desc: { km: 'ព័ត៌មានថ្មីៗ', en: 'Latest news' },
    },
    {
      name: { km: 'អំពី UME', en: 'About UME' },
      to: '/about',
      icon: 'bi bi-info-circle-fill',
      desc: { km: 'ស្វែងយល់អំពី UME', en: 'Learn about UME' },
    },
  ];

  useEffect(() => {
    if (countdown <= 0) {
      navigate('/');
      return;
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const found = suggestions.find((s) =>
        s.name[lang].toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (found) {
        navigate(found.to);
      }
    }
  };

  return (
    <div className="min-h-screen bg-offwhite dark:bg-navy-dark flex items-center justify-center px-4 py-16 transition-colors duration-300">
      <div className="max-w-2xl w-full">
        {/* 404 Number */}
        <div className="text-center mb-8">
          <div className="text-[150px] md:text-[200px] font-black text-navy/5 dark:text-white/5 leading-none select-none">404</div>
          <div className="relative -mt-20 md:-mt-28">
            <i className="bi bi-compass text-7xl text-gold animate-float"></i>
          </div>
        </div>

        {/* Message */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-3">
            {text.title[lang]}
          </h1>
          <p className="text-gray-500 dark:text-white/50 max-w-md mx-auto">
            {text.description[lang]}
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-10 max-w-md mx-auto">
          <div className="relative">
            <i className="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder={text.searchPlaceholder[lang]}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-white/5 rounded-2xl focus:border-gold outline-none transition-colors text-navy dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-gold text-navy px-4 py-1.5 rounded-xl text-sm font-medium hover:bg-gold-light transition-colors">
              {text.searchButton[lang]}
            </button>
          </div>
        </form>

        {/* Auto Redirect Info */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white dark:bg-navy-dark border border-gray-200 dark:border-white/10 rounded-full px-5 py-2.5 text-sm text-gray-500 dark:text-white/50">
            <i className="bi bi-clock text-gold"></i>
            {text.countdownText[lang]} <span className="font-bold text-navy dark:text-white">{countdown}</span> {text.seconds[lang]}
          </div>
        </div>

        {/* Suggested Pages */}
        <div className="mb-8">
          <h3 className="text-center text-sm font-semibold text-gray-400 dark:text-white/40 uppercase tracking-wider mb-4">
            {text.mightBeLooking[lang]}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {suggestions.map((suggestion, idx) => (
              <Link
                key={idx}
                to={suggestion.to}
                className="group flex items-center gap-3 bg-white dark:bg-navy-dark border border-gray-200 dark:border-white/10 rounded-2xl p-4 hover:border-gold hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="w-10 h-10 bg-navy/5 group-hover:bg-navy rounded-xl flex items-center justify-center shrink-0 transition-colors">
                  <i className={`${suggestion.icon} text-navy group-hover:text-gold transition-colors`}></i>
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-navy dark:text-white text-sm group-hover:text-gold transition-colors">
                    {suggestion.name[lang]}
                  </p>
                  <p className="text-gray-400 dark:text-white/40 text-xs truncate">{suggestion.desc[lang]}</p>
                </div>
                <i className="bi bi-chevron-right text-gray-300 dark:text-white/20 group-hover:text-gold group-hover:translate-x-1 transition-all ml-auto"></i>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 bg-white dark:bg-navy-dark border border-gray-300 dark:border-white/20 text-navy dark:text-white px-6 py-3 rounded-full font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-all"
          >
            <i className="bi bi-arrow-left"></i> {text.backButton[lang]}
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-full font-medium hover:bg-navy-light transition-all"
          >
            <i className="bi bi-house-fill"></i> {text.homeButton[lang]}
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gold text-navy px-6 py-3 rounded-full font-medium hover:bg-gold-light transition-all"
          >
            <i className="bi bi-envelope-fill"></i> {text.helpButton[lang]}
          </Link>
        </div>
      </div>
    </div>
  );
}