import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLanguage } from '../context/LanguageContext';
import { getNews, getEvents, getFullImageUrl } from '../services/api';

// ============================================================
// CONSTANTS
// ============================================================
const heroBanner = 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1600&q=80';

const tabs = [
  { id: 'all', icon: 'bi-grid-fill', label: { km: 'ទាំងអស់', en: 'All' } },
  { id: 'news', icon: 'bi-newspaper', label: { km: 'ព័ត៌មាន', en: 'News' } },
  { id: 'event', icon: 'bi-calendar-event', label: { km: 'ព្រឹត្តិការណ៍', en: 'Events' } },
];

// ============================================================
// HELPERS
// ============================================================
function formatDate(dateStr, lang) {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return lang === 'km' 
      ? date.toLocaleDateString('km-KH', options)
      : date.toLocaleDateString('en-US', options);
  } catch {
    return '';
  }
}

function formatTime(dateStr, lang) {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    return date.toLocaleTimeString(lang === 'km' ? 'km-KH' : 'en-US', { 
      hour: '2-digit', minute: '2-digit' 
    });
  } catch {
    return '';
  }
}

// ============================================================
// COMPONENTS (ស៊ីគ្នានឹង Homepage)
// ============================================================
function SectionBadge({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-gold/10 to-gold/5 text-gold border border-gold/20 ${className}`}>
      {children}
    </span>
  );
}

function SectionHeading({ eyebrow, title, subtitle, align = 'center', light = false }) {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : ''}`}>
      {eyebrow && <SectionBadge className="mb-4">{eyebrow}</SectionBadge>}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 ${light ? 'text-white' : 'text-navy dark:text-white'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg max-w-2xl ${align === 'center' ? 'mx-auto' : ''} ${light ? 'text-white/60' : 'text-gray-500 dark:text-gray-400'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function NewsEventsPage() {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // API Data States
  const [newsList, setNewsList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load data from API
  useEffect(() => {
    setLoading(true);
    Promise.all([
      getNews().catch(() => []),
      getEvents().catch(() => []),
    ])
      .then(([newsData, eventsData]) => {
        const newsArr = Array.isArray(newsData) ? newsData : (newsData?.results || []);
        const eventsArr = Array.isArray(eventsData) ? eventsData : (eventsData?.results || []);
        setNewsList(newsArr);
        setEventList(eventsArr);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Scroll to top button
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Combine News & Events
  const allItems = [
    ...newsList.map(n => ({
      id: n.slug || n.id,
      type: 'news',
      title: { km: n.title_km || '', en: n.title_en || '' },
      excerpt: { km: n.excerpt_km || '', en: n.excerpt_en || '' },
      image: getFullImageUrl(n.thumbnail),
      date: n.published_at,
      featured: n.is_featured || false,
      icon: 'bi-newspaper',
      link: `/news-events/${n.slug}`,
      category: n.category?.[`name_${lang}`] || '',
    })),
    ...eventList.map(e => ({
      id: e.slug || e.id,
      type: 'event',
      title: { km: e.title_km || '', en: e.title_en || '' },
      excerpt: { km: e.description_km?.substring(0, 150) || '', en: e.description_en?.substring(0, 150) || '' },
      image: getFullImageUrl(e.thumbnail),
      date: e.event_date,
      time: { km: formatTime(e.event_date, 'km'), en: formatTime(e.event_date, 'en') },
      location: { km: e.location_km || '', en: e.location_en || '' },
      featured: false,
      icon: 'bi-calendar-event',
      link: `/news-events/${e.slug}`,
      category: '',
    })),
  ];

  // Filter & Sort
  const filteredItems = activeTab === 'all'
    ? allItems.sort((a, b) => new Date(b.date) - new Date(a.date))
    : allItems
        .filter(item => item.type === activeTab)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

  const featuredItems = filteredItems.filter(item => item.featured);
  const regularItems = filteredItems.filter(item => !item.featured);

  const newsCount = newsList.length;
  const eventsCount = eventList.length;

  const text = {
    breadcrumb: { km: 'ព័ត៌មាន & ព្រឹត្តិការណ៍', en: 'News & Events' },
    heroEyebrow: { km: 'ទាន់ហេតុការណ៍', en: 'Stay Updated' },
    heroTitle: { km: 'ព័ត៌មាន និងព្រឹត្តិការណ៍', en: 'News & Events' },
    heroSubtitle: { km: 'ព័ត៌មានថ្មីៗ និងព្រឹត្តិការណ៍នានារបស់ UME', en: 'Latest news and events from UME' },
    readMore: { km: 'អានបន្ត', en: 'Read More' },
    noResults: { km: 'មិនមានព័ត៌មានក្នុងប្រភេទនេះទេ', en: 'No items in this category' },
    featured: { km: 'ពិសេស', en: 'Featured' },
    loading: { km: 'កំពុងផ្ទុក...', en: 'Loading...' },
    newsLabel: { km: 'ព័ត៌មាន', en: 'News' },
    eventLabel: { km: 'ព្រឹត្តិការណ៍', en: 'Event' },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-sans transition-colors duration-300">
      
{/* ========== HERO (ស្រឡះ ដូច Homepage) ========== */}
<section className="relative h-[380px] md:h-[450px] overflow-hidden bg-gray-100 dark:bg-navy-dark">
  <img 
    src={heroBanner} 
    alt="News" 
    className="absolute inset-0 w-full h-full object-cover" 
  />
  
  {/* Overlay ស្រាលៗ - កាត់បន្ថយពណ៌ខៀវ ឲ្យរូបច្បាស់ */}
  <div className="absolute inset-0 bg-gradient-to-r from-navy/30 via-navy/15 to-transparent dark:from-navy/50 dark:via-navy/25 dark:to-transparent"></div>
  
  {/* ពន្លឺមាសស្រាលៗនៅបាត */}
  <div className="absolute left-6 md:left-16 bottom-0 w-2/3 md:w-1/2 h-32 md:h-40 bg-gold/10 blur-3xl rounded-full pointer-events-none"></div>
  
  {/* ពន្លឺមាសតូចនៅកណ្តាល */}
  <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-gold/5 blur-3xl rounded-full pointer-events-none"></div>
  
  <div className="relative z-10 h-full flex flex-col justify-end pb-14">
    <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-white/70 text-xs mb-6">
        <Link to="/" className="hover:text-gold transition-colors">{t('nav.home')}</Link>
        <i className="bi bi-chevron-right text-[10px]"></i>
        <span className="text-gold">{text.breadcrumb[lang]}</span>
      </div>
      
      {/* Badge ដូច Homepage */}
      <span className="inline-flex items-center gap-2 bg-white/90 dark:bg-navy/80 backdrop-blur-sm text-navy dark:text-gold px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase mb-4 border border-white/50 dark:border-gold/30 shadow-lg">
        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
        {text.heroEyebrow[lang]}
      </span>
      
      <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-[1.2] tracking-tight mb-3 drop-shadow-lg">
        {text.heroTitle[lang]}
      </h1>
      <p className="text-lg text-white/80 max-w-xl drop-shadow-md">
        {text.heroSubtitle[lang]}
      </p>
    </div>
  </div>
</section>

      {/* ========== TAB NAVIGATION (ស៊ីគ្នានឹង Navbar) ========== */}
      <section className="sticky top-20 z-40 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm backdrop-blur-sm bg-white/95 dark:bg-gray-900/95">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 py-2 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 md:px-6 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-navy dark:bg-navy-light text-white shadow-lg shadow-navy/20'
                    : 'text-gray-500 dark:text-gray-400 hover:text-navy dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <i className={`bi ${tab.icon} text-base`}></i>
                {tab.label[lang]}
                {tab.id === 'news' && (
                  <span className={`text-xs ml-1 px-1.5 py-0.5 rounded-full ${
                    activeTab === tab.id 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                  }`}>
                    {newsCount}
                  </span>
                )}
                {tab.id === 'event' && (
                  <span className={`text-xs ml-1 px-1.5 py-0.5 rounded-full ${
                    activeTab === tab.id 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                  }`}>
                    {eventsCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CONTENT (ស៊ីគ្នានឹង Homepage Cards) ========== */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          
          {loading ? (
            /* Loading Skeleton */
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-96 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              {/* Featured Items */}
              {featuredItems.length > 0 && (
                <div className="mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                      <i className="bi bi-star-fill text-gold text-lg"></i>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-navy dark:text-white">{text.featured[lang]}</h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {lang === 'km' ? 'ព័ត៌មានសំខាន់ៗ' : 'Important updates'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {featuredItems.slice(0, 2).map((item) => (
                      <Link
                        key={item.id}
                        to={item.link}
                        className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
                      >
                        <div className="relative h-64 md:h-72 overflow-hidden">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt=""
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-navy/10 to-gold/10 flex items-center justify-center">
                              <i className={`bi ${item.icon} text-6xl text-gray-300 dark:text-gray-600`}></i>
                            </div>
                          )}
                          
                          {/* Category Badge */}
                          <div className="absolute top-4 left-4">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                              item.type === 'news' 
                                ? 'bg-navy text-white' 
                                : 'bg-gold text-navy'
                            }`}>
                              <i className={`bi ${item.icon} text-xs`}></i>
                              {item.type === 'news' ? text.newsLabel[lang] : text.eventLabel[lang]}
                            </span>
                          </div>
                          
                          {/* Featured Badge */}
                          <div className="absolute top-4 right-4">
                            <span className="inline-flex items-center gap-1 bg-gold text-navy text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg">
                              <i className="bi bi-star-fill text-[8px]"></i>
                              {text.featured[lang]}
                            </span>
                          </div>
                          
                          {/* Date Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                            <div className="flex items-center gap-2 text-white/90 text-sm">
                              <i className="bi bi-calendar3 text-gold"></i>
                              {formatDate(item.date, lang)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="font-bold text-navy dark:text-white text-lg mb-3 group-hover:text-gold transition-colors line-clamp-2">
                            {item.title[lang]}
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                            {item.excerpt[lang]}
                          </p>
                          <span className="inline-flex items-center gap-2 text-gold text-sm font-semibold group-hover:gap-3 transition-all">
                            {text.readMore[lang]} 
                            <i className="bi bi-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Regular Items Grid */}
              {regularItems.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularItems.map((item) => (
                    <Link
                      key={item.id}
                      to={item.link}
                      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
                    >
                      <div className="relative h-52 overflow-hidden">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-navy/10 to-gold/10 flex items-center justify-center">
                            <i className={`bi ${item.icon} text-5xl text-gray-300 dark:text-gray-600`}></i>
                          </div>
                        )}
                        
                        {/* Type Badge */}
                        <div className="absolute top-3 left-3">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold shadow-lg ${
                            item.type === 'news' 
                              ? 'bg-navy text-white' 
                              : 'bg-gold text-navy'
                          }`}>
                            <i className={`bi ${item.icon} text-[10px]`}></i>
                            {item.type === 'news' ? text.newsLabel[lang] : text.eventLabel[lang]}
                          </span>
                        </div>
                        
                        {/* Date Badge */}
                        <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg px-2.5 py-1.5 text-[10px] font-semibold text-navy dark:text-white shadow-lg">
                          <i className="bi bi-calendar3 text-gold mr-1"></i>
                          {formatDate(item.date, lang)}
                        </div>
                      </div>
                      
                      <div className="p-5">
                        {/* Category (for news) */}
                        {item.category && (
                          <span className="text-[11px] font-semibold text-gold uppercase tracking-wide mb-2 block">
                            {item.category}
                          </span>
                        )}
                        
                        <h3 className="font-bold text-navy dark:text-white text-base mb-2 group-hover:text-gold transition-colors line-clamp-2">
                          {item.title[lang]}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-xs line-clamp-2 mb-3">
                          {item.excerpt[lang]}
                        </p>
                        
                        {/* Event Details */}
                        {item.type === 'event' && (
                          <div className="flex flex-col gap-1.5 mb-3 pb-3 border-b border-gray-100 dark:border-gray-700">
                            {item.time?.[lang] && (
                              <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-[11px]">
                                <i className="bi bi-clock text-gold"></i>
                                {item.time[lang]}
                              </div>
                            )}
                            {item.location?.[lang] && (
                              <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-[11px]">
                                <i className="bi bi-geo-alt text-gold"></i>
                                {item.location[lang]}
                              </div>
                            )}
                          </div>
                        )}

                        <span className="inline-flex items-center gap-1 text-gold text-sm font-medium group-hover:gap-2 transition-all">
                          {text.readMore[lang]} 
                          <i className="bi bi-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div className="text-center py-20">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <i className="bi bi-inbox text-3xl text-gray-400 dark:text-gray-500"></i>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-lg">{text.noResults[lang]}</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ========== CTA (ស៊ីគ្នានឹង Homepage) ========== */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-navy via-navy-dark to-dark-bg-primary text-white relative overflow-hidden">
        {/* Decorative gold elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 border-2 border-gold rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 border-2 border-gold rounded-full"></div>
        </div>
        {/* Gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <i className="bi bi-envelope-paper text-gold text-4xl mb-6 inline-block animate-float"></i>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-5 text-white">
            {lang === 'km' ? 'ទទួលព័ត៌មានថ្មីៗ' : 'Stay Updated'}
          </h2>
          <p className="text-white/60 text-lg mb-8">
            {lang === 'km' ? 'តាមដានព័ត៌មាន និងព្រឹត្តិការណ៍ថ្មីៗពី UME' : 'Follow the latest news and events from UME'}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="bg-gold hover:bg-gold-light text-navy px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-gold/20 hover:shadow-gold/40 transform hover:-translate-y-0.5"
            >
              <i className="bi bi-send mr-2"></i>
              {lang === 'km' ? 'ទំនាក់ទំនងយើង' : 'Contact Us'}
            </Link>
            <Link
              to="/admission"
              className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:bg-white/5"
            >
              {lang === 'km' ? 'ចុះឈ្មោះឥឡូវនេះ' : 'Apply Now'}
            </Link>
          </div>
        </div>
      </section>

      {/* Scroll to Top (ដូច Homepage) */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        className={`fixed bottom-6 right-6 z-50 bg-gold text-navy w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all hover:bg-gold-light hover:scale-110 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <i className="bi bi-arrow-up text-xl"></i>
      </button>
    </div>
  );
}