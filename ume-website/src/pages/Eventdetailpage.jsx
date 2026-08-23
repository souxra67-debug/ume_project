import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLanguage } from '../context/LanguageContext';
import { getFullImageUrl } from '../services/api';

// ============================================================
// API CONFIG
// ============================================================
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

async function fetchFromAPI(endpoint) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, { credentials: 'include' });
    if (!res.ok) throw new Error('API error');
    return await res.json();
  } catch (err) {
    console.error('API Error:', err);
    return null;
  }
}

// ============================================================
// HELPERS
// ============================================================

function formatDate(dateStr, lang) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  try {
    return date.toLocaleDateString(lang === 'km' ? 'km-KH' : 'en-US', options);
  } catch {
    return date.toLocaleDateString('en-US', options);
  }
}

function formatTime(dateStr, lang) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  try {
    return date.toLocaleTimeString(lang === 'km' ? 'km-KH' : 'en-US', { hour: '2-digit', minute: '2-digit' });
  } catch {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }
}

// ============================================================
// LOADING COMPONENT
// ============================================================
function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 animate-pulse">
      <div className="h-[350px] bg-gray-300 dark:bg-gray-700"></div>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function NewsEventDetail() {
  const { lang } = useLanguage();
  const { id, slug } = useParams(); // ✅ គាំទ្រទាំង id និង slug
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // ✅ State សម្រាប់ទិន្នន័យពី API
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const identifier = id || slug;

  // ✅ ទាញទិន្នន័យពី API
  useEffect(() => {
    async function loadItem() {
      if (!identifier) {
        setError('No ID provided');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // សាកទាញពី news API
        let data = await fetchFromAPI(`/news/${identifier}/`);
        
        if (data && data.slug) {
          // ជា news article
          setItem({
            ...data,
            type: 'news',
            title: { km: data.title_km || data.title_en, en: data.title_en || data.title_km },
            content: { km: data.content_km || data.content_en || '', en: data.content_en || data.content_km || '' },
            excerpt: { km: data.excerpt_km || data.excerpt_en || '', en: data.excerpt_en || data.excerpt_km || '' },
            image: data.thumbnail || data.image || null,
            date: data.published_at || data.created_at,
            author: data.author || { km: 'UME Admin', en: 'UME Admin' },
            category: data.category || null,
            tags: data.tags || [],
          });
        } else {
          // សាកទាញពី events API
          data = await fetchFromAPI(`/events/${identifier}/`);
          
          if (data && data.slug) {
            // ជា event
            setItem({
              ...data,
              type: 'event',
              title: { km: data.title_km || data.title_en, en: data.title_en || data.title_km },
              content: { km: data.description_km || data.description_en || '', en: data.description_en || data.description_km || '' },
              excerpt: { km: data.description_km || data.description_en || '', en: data.description_en || data.description_km || '' },
              image: data.thumbnail || data.image || null,
              date: data.event_date,
              endDate: data.end_date,
              time: { 
                km: data.event_date ? formatTime(data.event_date, 'km') : '', 
                en: data.event_date ? formatTime(data.event_date, 'en') : '' 
              },
              location: { 
                km: data.location_km || data.location_en || '', 
                en: data.location_en || data.location_km || '' 
              },
              author: data.author || { km: 'UME Admin', en: 'UME Admin' },
              tags: data.tags || [],
            });
          } else {
            setError('Not found');
          }
        }
      } catch (err) {
        console.error('Failed to load item:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    loadItem();
  }, [identifier]);

  // Scroll to top on id change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [identifier]);

  // Scroll to top button
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ============================================================
  // LOADING STATE
  // ============================================================
  if (loading) {
    return <LoadingSkeleton />;
  }

  // ============================================================
  // 404 - NOT FOUND
  // ============================================================
  if (error || !item) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center px-6">
          <i className="bi bi-emoji-frown text-6xl text-gold mb-4 block"></i>
          <h1 className="text-3xl font-bold text-navy dark:text-white mb-2">
            {lang === 'km' ? 'រកមិនឃើញ' : 'Not Found'}
          </h1>
          <p className="text-navy/50 dark:text-white/50 mb-6">
            {lang === 'km' ? 'ទំព័រដែលអ្នកកំពុងរកមិនមានទេ' : 'The page you are looking for does not exist'}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/news-events"
              className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-full font-bold hover:bg-navy-light transition-all"
            >
              <i className="bi bi-arrow-left"></i>
              {lang === 'km' ? 'ព័ត៌មាន & ព្រឹត្តិការណ៍' : 'News & Events'}
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 border border-navy text-navy dark:border-white dark:text-white px-6 py-3 rounded-full font-bold hover:bg-navy hover:text-white dark:hover:bg-white dark:hover:text-navy transition-all"
            >
              <i className="bi bi-house"></i>
              {lang === 'km' ? 'ទំព័រដើម' : 'Home'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // RENDER
  // ============================================================
  const text = {
    breadcrumb: {
      km: item.type === 'news' ? 'ព័ត៌មាន' : 'ព្រឹត្តិការណ៍',
      en: item.type === 'news' ? 'News' : 'Event',
    },
    backToList: { km: 'ត្រឡប់ទៅបញ្ជី', en: 'Back to List' },
    publishedOn: { km: 'ចុះផ្សាយថ្ងៃទី', en: 'Published on' },
    eventDate: { km: 'កាលបរិច្ឆេទ', en: 'Event Date' },
    eventTime: { km: 'ម៉ោង', en: 'Time' },
    eventLocation: { km: 'ទីតាំង', en: 'Location' },
    shareTitle: { km: 'ចែករំលែក', en: 'Share' },
    category: { km: 'ប្រភេទ', en: 'Category' },
    tags: { km: 'ស្លាក', en: 'Tags' },
  };

  const heroImage = item.image 
    ? getFullImageUrl(item.image) 
    : 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-sans transition-colors duration-300">
      
      {/* ========== HERO BANNER ========== */}
      <section className="relative h-[350px] md:h-[400px] overflow-hidden bg-navy">
        <img 
          src={heroImage} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/40"></div>
        
        <div className="relative z-10 h-full flex flex-col justify-end pb-12">
          <div className="max-w-4xl mx-auto px-6 md:px-12 w-full">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/50 text-xs mb-4">
              <Link to="/" className="hover:text-gold transition-colors">{lang === 'km' ? 'ទំព័រដើម' : 'Home'}</Link>
              <i className="bi bi-chevron-right text-[10px]"></i>
              <Link to="/news-events" className="hover:text-gold transition-colors">
                {lang === 'km' ? 'ព័ត៌មាន & ព្រឹត្តិការណ៍' : 'News & Events'}
              </Link>
              <i className="bi bi-chevron-right text-[10px]"></i>
              <span className="text-gold">{text.breadcrumb[lang]}</span>
            </div>
            
            {/* Type Badge */}
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold mb-3 ${
              item.type === 'news' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
            }`}>
              <i className={`bi ${item.type === 'news' ? 'bi-newspaper' : 'bi-calendar-event'} text-xs`}></i>
              {item.type === 'news' 
                ? (lang === 'km' ? 'ព័ត៌មាន' : 'News')
                : (lang === 'km' ? 'ព្រឹត្តិការណ៍' : 'Event')
              }
            </span>
            
            {/* Title */}
            <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
              {item.title[lang] || item.title_en || ''}
            </h1>
            
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-white/60 text-xs">
              {item.category && (
                <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full">
                  <i className="bi bi-folder"></i>
                  {item.category[`name_${lang}`] || item.category.name_en}
                </span>
              )}
              <span className="flex items-center gap-1">
                <i className="bi bi-calendar3"></i>
                {item.type === 'news' ? formatDate(item.date, lang) : formatDate(item.date || item.event_date, lang)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CONTENT ========== */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Button */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/news-events')}
              className="inline-flex items-center gap-1 text-navy/50 dark:text-white/50 hover:text-gold transition-colors text-sm"
            >
              <i className="bi bi-arrow-left"></i>
              {text.backToList[lang]}
            </button>
          </div>

          {/* Event Details Box */}
          {item.type === 'event' && (
            <div className="bg-navy rounded-2xl p-6 mb-8 text-white">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="bi bi-calendar3 text-gold"></i>
                  </div>
                  <div>
                    <p className="text-white/50 text-[10px] uppercase">{text.eventDate[lang]}</p>
                    <p className="text-white text-sm font-medium">
                      {formatDate(item.date || item.event_date, lang)}
                    </p>
                  </div>
                </div>
                {item.time?.[lang] && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className="bi bi-clock text-gold"></i>
                    </div>
                    <div>
                      <p className="text-white/50 text-[10px] uppercase">{text.eventTime[lang]}</p>
                      <p className="text-white text-sm font-medium">{item.time[lang]}</p>
                    </div>
                  </div>
                )}
                {item.location?.[lang] && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className="bi bi-geo-alt text-gold"></i>
                    </div>
                    <div>
                      <p className="text-white/50 text-[10px] uppercase">{text.eventLocation[lang]}</p>
                      <p className="text-white text-sm font-medium">{item.location[lang]}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
            {item.content?.[lang]?.split('\n').map((paragraph, idx) => (
              paragraph.trim() ? (
                <p key={idx} className="text-navy/70 dark:text-white/60 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ) : <br key={idx} />
            )) || (
              <p className="text-navy/50 dark:text-white/40 italic">
                {lang === 'km' ? 'មិនមានខ្លឹមសារ' : 'No content available'}
              </p>
            )}
          </div>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-8 pt-6 border-t border-gray-200 dark:border-white/10">
              <i className="bi bi-tags text-navy/40 dark:text-white/40"></i>
              {item.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 dark:bg-white/5 text-navy/50 dark:text-white/50 text-xs px-3 py-1 rounded-full"
                >
                  {typeof tag === 'string' ? tag : tag[lang] || tag}
                </span>
              ))}
            </div>
          )}

          {/* Share Buttons */}
          <div className="flex items-center gap-3 mb-12">
            <span className="text-navy/40 dark:text-white/40 text-sm">{text.shareTitle[lang]}:</span>
            <button 
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
              className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors" 
              title="Facebook"
            >
              <i className="bi bi-facebook text-sm"></i>
            </button>
            <button 
              onClick={() => window.open(`https://t.me/share/url?url=${window.location.href}`, '_blank')}
              className="w-8 h-8 bg-blue-400 text-white rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors" 
              title="Telegram"
            >
              <i className="bi bi-telegram text-sm"></i>
            </button>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert(lang === 'km' ? 'បានចម្លងតំណភ្ជាប់!' : 'Link copied!');
              }}
              className="w-8 h-8 bg-gray-600 text-white rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors" 
              title="Copy Link"
            >
              <i className="bi bi-link-45deg text-sm"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Scroll to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        className={`fixed bottom-8 right-8 z-50 bg-gold text-navy w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all hover:bg-gold-light hover:scale-110 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'
        }`}
      >
        <i className="bi bi-arrow-up text-xl"></i>
      </button>
    </div>
  );
}