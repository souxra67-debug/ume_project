import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLanguage } from '../context/LanguageContext';
import presidentImg from '../assets/President.jpg';
import { getBanners, getUpcomingEvents, getNews, getGallery, getFullImageUrl } from '../services/api';
import GalleryManager from './admin/GalleryManager';
import EventManager from './admin/EventManager';

// ============================================================
// STATIC FALLBACK DATA
// ============================================================
const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80',
    title: { km: 'កសាងអនាគតអ្នកដឹកនាំ', en: "Building Tomorrow's Leaders" },
    subtitle: { km: 'ជាង ២៦ ឆ្នាំនៃឧត្តមភាពក្នុងការអប់រំ', en: 'Over 26 Years of Excellence in Education' },
    badge: { km: 'ចាប់តាំងពីឆ្នាំ ១៩៩៨', en: 'Est. 1998' },
  },
  {
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=80',
    title: { km: 'និស្សិត ៣៥,០០០+ កំពុងដឹកនាំ', en: '35,000+ Alumni Leading' },
    subtitle: { km: 'ក្តោបក្តាប់តំណែងសំខាន់ៗទូទាំងប្រទេស', en: 'Holding Key Positions Nationwide' },
    badge: { km: 'សហគមន៍ UME', en: 'UME Community' },
  },
  {
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1600&q=80',
    title: { km: 'អាហារូបករណ៍ ១០០% រង់ចាំអ្នក', en: '100% Scholarships Await' },
    subtitle: { km: 'គ្មានឧបសគ្គហិរញ្ញវត្ថុសម្រាប់អ្នកមានសក្តានុពល', en: 'No Financial Barriers for Talented Students' },
    badge: { km: 'ឱកាស', en: 'Opportunity' },
  },
];

const statsData = [
  { value: '35,302+', label: { km: 'និស្សិតបញ្ចប់ការសិក្សា', en: 'Graduates' }, icon: 'bi-mortarboard-fill' },
  { value: '7', label: { km: 'សាខាទូទាំងប្រទេស', en: 'Campuses' }, icon: 'bi-geo-alt-fill' },
  { value: '26+', label: { km: 'ឆ្នាំនៃឧត្តមភាព', en: 'Years' }, icon: 'bi-calendar-check-fill' },
  { value: '50+', label: { km: 'ដៃគូអន្តរជាតិ', en: 'Partners' }, icon: 'bi-globe-americas' },
  { value: '85%', label: { km: 'និស្សិតមានការងារធ្វើ', en: 'Employed' }, icon: 'bi-briefcase-fill' },
];

const whyChooseData = [
  { icon: 'bi-patch-check-fill', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50 dark:bg-blue-900/20', borderColor: 'border-blue-200 dark:border-blue-800', title: { km: 'ការទទួលស្គាល់ជាផ្លូវការ', en: 'Officially Accredited' }, desc: { km: 'កម្មវិធីសិក្សាទទួលស្គាល់ដោយក្រសួងអប់រំ និងស្តង់ដារអន្តរជាតិ', en: 'Programs recognized by the Ministry of Education and international standards' } },
  { icon: 'bi-cash-coin', color: 'from-emerald-500 to-emerald-600', bgColor: 'bg-emerald-50 dark:bg-emerald-900/20', borderColor: 'border-emerald-200 dark:border-emerald-800', title: { km: 'អាហារូបករណ៍សម្បូរបែប', en: 'Generous Scholarships' }, desc: { km: 'រហូតដល់ ១០០% សម្រាប់និស្សិតពូកែ និងគ្រួសារមានតម្រូវការ', en: 'Up to 100% for high achievers and families with financial need' } },
  { icon: 'bi-person-workspace', color: 'from-amber-500 to-amber-600', bgColor: 'bg-amber-50 dark:bg-amber-900/20', borderColor: 'border-amber-200 dark:border-amber-800', title: { km: 'គាំទ្រការងារពេញលេញ', en: 'Dedicated Career Support' }, desc: { km: 'ការហ្វឹកហាត់ អនុវត្តជាក់ស្តែង និងបណ្តាញនិយោជក ៨៥%+ មានការងារធ្វើ', en: 'Internships, hands-on practice, and an employer network — 85%+ employment rate' } },
  { icon: 'bi-buildings-fill', color: 'from-rose-500 to-rose-600', bgColor: 'bg-rose-50 dark:bg-rose-900/20', borderColor: 'border-rose-200 dark:border-rose-800', title: { km: 'សាខា ៧ ទីតាំង', en: '7 Campuses, One Network' }, desc: { km: 'សិក្សាជិតផ្ទះ ដោយគុណភាពដូចគ្នាគ្រប់សាខា', en: 'Study close to home with the same quality at every location' } },
];

const campusData = [
  { name: { km: 'បាត់ដំបង (ទីតាំងគោល)', en: 'Battambang (Main)' }, icon: 'bi-star-fill' },
  { name: { km: 'ភ្នំពេញ', en: 'Phnom Penh' }, icon: 'bi-geo-alt-fill' },
  { name: { km: 'សៀមរាប', en: 'Siem Reap' }, icon: 'bi-geo-alt-fill' },
  { name: { km: 'ពោធិ៍សាត់', en: 'Pursat' }, icon: 'bi-geo-alt-fill' },
  { name: { km: 'បន្ទាយមានជ័យ', en: 'Banteay Meanchey' }, icon: 'bi-geo-alt-fill' },
  { name: { km: 'ប៉ៃលិន', en: 'Pailin' }, icon: 'bi-geo-alt-fill' },
  { name: { km: 'កំពង់ឆ្នាំង', en: 'Kampong Chhnang' }, icon: 'bi-geo-alt-fill' },
];

const programsData = [
  { icon: 'bi-briefcase-fill', color: 'from-amber-500 to-amber-600', degree: { km: 'បរិញ្ញាបត្រ', en: "Bachelor's" }, duration: { km: '៤ ឆ្នាំ', en: '4 Years' }, title: { km: 'គ្រប់គ្រង និងទេសចរណ៍', en: 'Management & Tourism' }, majors: { km: 'គ្រប់គ្រងទូទៅ, ទេសចរណ៍, ពាណិជ្ជកម្ម, ទីផ្សារ', en: 'General Mgmt, Tourism, Business, Marketing' }, image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80' },
  { icon: 'bi-book-fill', color: 'from-purple-500 to-purple-600', degree: { km: 'បរិញ្ញាបត្រ', en: "Bachelor's" }, duration: { km: '៤ ឆ្នាំ', en: '4 Years' }, title: { km: 'អក្សរសាស្ត្រ និងភាសាបរទេស', en: 'Literature & Foreign Languages' }, majors: { km: 'ភាសាអង់គ្លេស', en: 'English' }, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80' },
  { icon: 'bi-laptop-fill', color: 'from-emerald-500 to-emerald-600', degree: { km: 'បរិញ្ញាបត្រ', en: "Bachelor's" }, duration: { km: '៤ ឆ្នាំ', en: '4 Years' }, title: { km: 'វិទ្យាសាស្ត្រ និងបច្ចេកវិទ្យា', en: 'Science & Technology' }, majors: { km: 'កុំព្យូទ័រ, IT', en: 'Computer Science, IT' }, image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80' },
  { icon: 'bi-bank', color: 'from-rose-500 to-rose-600', degree: { km: 'បរិញ្ញាបត្រ', en: "Bachelor's" }, duration: { km: '៤ ឆ្នាំ', en: '4 Years' }, title: { km: 'ច្បាប់ និងវិទ្យាសាស្ត្រសង្គម', en: 'Law & Social Sciences' }, majors: { km: 'ច្បាប់, ទំនាក់ទំនងអន្តរជាតិ', en: 'Law, Intl Relations' }, image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80' },
  { icon: 'bi-tree-fill', color: 'from-green-600 to-green-700', degree: { km: 'បរិញ្ញាបត្រ', en: "Bachelor's" }, duration: { km: '៤ ឆ្នាំ', en: '4 Years' }, title: { km: 'កសិកម្ម និងអភិវឌ្ឍន៍ជនបទ', en: 'Agriculture & Rural Development' }, majors: { km: 'វិទ្យាសាស្ត្រកសិកម្ម', en: 'Agri Science' }, image: 'https://i.pinimg.com/control1/1200x/39/4b/98/394b98d94ab6026c1c07e23cb2435e61.jpg' },
];

// Bachelor's / Master's program lists for the "Major Programs" section
const majorPrograms = {
  bachelor: [
    { title: { km: 'មហាវិទ្យាល័យគ្រប់គ្រង និងទេសចរណ៍', en: 'Faculty of Management & Tourism' }, link: '/programs/management-tourism' },
    { title: { km: 'មហាវិទ្យាល័យអក្សរសាស្ត្រ និងភាសាបរទេស', en: 'Faculty of Literature & Foreign Languages' }, link: '/programs/literature-humanities' },
    { title: { km: 'មហាវិទ្យាល័យវិទ្យាសាស្ត្រ និងបច្ចេកវិទ្យា', en: 'Faculty of Science & Technology' }, link: '/programs/science-technology' },
    { title: { km: 'មហាវិទ្យាល័យច្បាប់ និងវិទ្យាសាស្ត្រសង្គម', en: 'Faculty of Law & Social Sciences' }, link: '/programs/law-economics' },
    { title: { km: 'មហាវិទ្យាល័យកសិកម្ម និងអភិវឌ្ឍន៍ជនបទ', en: 'Faculty of Agriculture & Rural Development' }, link: '/programs/agriculture-rural-development' },
  ],
  master: [
    { title: { km: 'អនុបណ្ឌិតគ្រប់គ្រងពាណិជ្ជកម្ម (MBA)', en: 'Master of Business Administration (MBA)' }, link: '/master-degree' },
    { title: { km: 'អនុបណ្ឌិតនីតិសាស្ត្រ', en: 'Master of Laws (LLM)' }, link: '/master-degree' },
    { title: { km: 'អនុបណ្ឌិតគ្រប់គ្រងអប់រំ', en: 'Master of Educational Management' }, link: '/master-degree' },
    { title: { km: 'អនុបណ្ឌិតគ្រប់គ្រងសាធារណៈ', en: 'Master of Public Administration' }, link: '/master-degree' },
  ],
};

// Step-by-step admission process, shown for Bachelor's and Master's tracks
const admissionSteps = {
  bachelor: [
    { title: { km: 'បង់ថ្លៃពាក្យសុំចូលរៀន', en: 'Pay Application Fee' } },
    { title: { km: 'ប្រឡងតម្រៀបភាសាអង់គ្លេស', en: 'English Placement Test' } },
    { title: { km: 'ដាក់ឯកសារតម្រូវការ', en: 'Submit Documents' } },
  ],
  master: [
    { title: { km: 'បង់ថ្លៃពាក្យសុំចូលរៀន', en: 'Pay Application Fee' } },
    { title: { km: 'ប្រឡងតម្រៀបភាសាអង់គ្លេស', en: 'English Placement Test' } },
    { title: { km: 'ដាក់ឯកសារតម្រូវការ', en: 'Submit Documents' } },
    { title: { km: 'សម្ភាសជាមួយសម្របសម្រួល', en: 'Interview with Coordinator' } },
  ],
};

// ============================================================
// HELPER COMPONENTS
// ============================================================
function ScrollReveal({ children, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>{children}</div>;
}

function SectionBadge({ children, className = '' }) {
  return <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-gold text-navy border border-gold/30 ${className}`}>{children}</span>;
}

function SectionHeading({ eyebrow, title, subtitle, align = 'center', light = false }) {
  return (
    <div className={`mb-12 lg:mb-16 ${align === 'center' ? 'text-center' : ''}`}>
      {eyebrow && <SectionBadge className="mb-4">{eyebrow}</SectionBadge>}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 ${light ? 'text-white' : 'text-navy dark:text-white'}`}>{title}</h2>
      {subtitle && <p className={`text-lg max-w-2xl ${align === 'center' ? 'mx-auto' : ''} ${light ? 'text-white/60' : 'text-gray-500 dark:text-gray-400'}`}>{subtitle}</p>}
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function HomePage() {
  const { lang } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  const [apiBanners, setApiBanners] = useState([]);
  const [apiEvents, setApiEvents] = useState([]);
  const [apiNews, setApiNews] = useState([]);
  const [apiGallery, setApiGallery] = useState([]);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [loadingBanners, setLoadingBanners] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);
  const [loadingGallery, setLoadingGallery] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      try { const data = await getBanners(); if (mounted) setApiBanners(Array.isArray(data) ? data : (data?.results || [])); } catch { if (mounted) setApiBanners([]); } finally { if (mounted) setLoadingBanners(false); }
      try { const data = await getUpcomingEvents(); if (mounted) setApiEvents(Array.isArray(data) ? data : (data?.results || [])); } catch { if (mounted) setApiEvents([]); } finally { if (mounted) setLoadingEvents(false); }
      try { const data = await getNews(); if (mounted) setApiNews(Array.isArray(data) ? data : (data?.results || [])); } catch { if (mounted) setApiNews([]); } finally { if (mounted) setLoadingNews(false); }
      try { const data = await getGallery({ show_all: 'true' }); const gd = Array.isArray(data) ? data : (data?.results || []); if (mounted) setApiGallery(gd.filter(img => img.is_published !== false)); } catch { if (mounted) setApiGallery([]); } finally { if (mounted) setLoadingGallery(false); }
    }
    loadData();
    return () => { mounted = false; };
  }, []);

  const slides = useMemo(() => apiBanners.length > 0 ? apiBanners : heroSlides, [apiBanners]);

  useEffect(() => {
    if (slides.length < 2 || isHovering) return;
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [slides.length, isHovering]);

  useEffect(() => { setCurrentSlide(0); }, [apiBanners.length]);
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goToSlide = (idx) => setCurrentSlide(idx);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; touchDeltaX.current = 0; };
  const handleTouchMove = (e) => { touchDeltaX.current = e.touches[0].clientX - touchStartX.current; };
  const handleTouchEnd = () => {
    if (touchDeltaX.current > 60) prevSlide();
    else if (touchDeltaX.current < -60) nextSlide();
    touchDeltaX.current = 0;
  };

  const currentSlideData = slides[currentSlide] || slides[0] || {};

  const text = {
    ctaApply: { km: 'ចុះឈ្មោះឥឡូវនេះ', en: 'Apply Now' },
    ctaLearn: { km: 'ស្វែងយល់បន្ថែម', en: 'Learn More' },
    viewAll: { km: 'មើលទាំងអស់', en: 'View All' },
    statsEyebrow: { km: 'UME ជាតួលេខ', en: 'UME in Numbers' },
    statsTitle: { km: 'រីកចម្រើនជាមួយគ្នា', en: 'Growing Together' },
    presidentEyebrow: { km: 'សារស្វាគមន៍', en: 'Welcome Message' },
    presidentQuote: { km: '"គោលបំណងរបស់យើងគឺបណ្តុះបណ្តាលយុវជនកម្ពុជាឱ្យក្លាយជាអ្នកដឹកនាំប្រកបដោយចំណេះដឹង គុណធម៌ និងសមត្ថភាពប្រកួតប្រជែងក្នុងឆាកអន្តរជាតិ។"', en: '"Our purpose is to nurture Cambodian youth into knowledgeable, ethical, and competitive leaders on the international stage."' },
    presidentName: { km: 'ឯកឧត្តមបណ្ឌិត ហៀន វណ្ណហន', en: 'H.E. Dr. Hean Vanhorn' },
    presidentRole: { km: 'ស្ថាបនិក និងសាកលវិទ្យាធិការ UME', en: 'Founder & Rector, UME' },
    whyEyebrow: { km: 'ហេតុអ្វីជ្រើសរើស UME', en: 'Why Choose UME' },
    whyTitle: { km: 'អ្វីដែលធ្វើឱ្យ UME ខុសគេ', en: 'What Sets UME Apart' },
    whySubtitle: { km: 'ចំណុចខ្លាំង ៤ យ៉ាង', en: 'Four key strengths' },
    campusEyebrow: { km: 'បណ្តាញសាខា', en: 'Campus Network' },
    campusTitle: { km: 'សិក្សាជិតផ្ទះ គុណភាពដូចគ្នា', en: 'Study Close to Home, Same Quality' },
    programsEyebrow: { km: 'កម្មវិធីសិក្សា', en: 'Academic Programs' },
    programsTitle: { km: 'មហាវិទ្យាល័យទាំង ៥', en: 'Our 5 Faculties' },
    programsSubtitle: { km: 'ជ្រើសរើសផ្លូវសិក្សាដែលសាកសមនឹងអ្នក', en: 'Choose the path that fits you' },
    majorProgramsEyebrow: { km: 'កម្មវិធីសំខាន់ៗ', en: 'Major Programs' },
    majorProgramsTitle: { km: 'បរិញ្ញាបត្រ និងអនុបណ្ឌិត', en: "Bachelor's & Master's Degrees" },
    majorProgramsSubtitle: { km: 'ជ្រើសរើសកម្រិតសិក្សា និងជំនាញដែលត្រូវនឹងគោលដៅរបស់អ្នក', en: 'Choose the degree level and major that fits your goals' },
    bachelorDegree: { km: 'កម្រិតបរិញ្ញាបត្រ', en: "Bachelor's Degree" },
    masterDegree: { km: 'កម្រិតអនុបណ្ឌិត', en: "Master's Degree" },
    admissionsEyebrow: { km: 'ដំណើរការចុះឈ្មោះ', en: 'Admissions' },
    admissionsTitle: { km: 'ជំហានចុះឈ្មោះចូលរៀន', en: 'Admissions Process' },
    admissionsSubtitle: { km: 'សាមញ្ញ រហ័ស ច្បាស់លាស់ គ្រប់ជំហាន', en: 'Simple, fast, and clear at every step' },
    eventsEyebrow: { km: 'ព្រឹត្តិការណ៍', en: 'Events' },
    eventsTitle: { km: 'កុំខកខានព្រឹត្តិការណ៍សំខាន់ៗ', en: "Don't Miss Important Events" },
    galleryEyebrow: { km: 'វិចិត្រសាល', en: 'Gallery' },
    galleryTitle: { km: 'បរិយាកាសសិក្សានៅ UME', en: 'Learning Atmosphere at UME' },
    newsEyebrow: { km: 'ព័ត៌មាន', en: 'News' },
    newsTitle: { km: 'ព័ត៌មានថ្មីៗ', en: 'Latest News' },
    ctaTitle: { km: 'ត្រៀមខ្លួនចាប់ផ្តើមអនាគតហើយឬនៅ?', en: 'Ready to Start Your Future?' },
    ctaSubtitle: { km: 'ចូលរួមជាមួយនិស្សិត ៣៥,០០០+ ដែលបានជ្រើសរើស UME', en: 'Join 35,000+ students who chose UME' },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden font-sans transition-colors duration-300">

      {/* ========== 1. HERO SLIDER ========== */}
      <section className="relative h-screen max-h-[800px] min-h-[600px] overflow-hidden" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
        {loadingBanners && apiBanners.length === 0 ? (
          <div className="absolute inset-0 bg-gray-300 dark:bg-gray-800 animate-pulse flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gold border-t-transparent"></div>
          </div>
        ) : (
          <>
            <div className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]" style={{ width: `${slides.length * 100}%`, transform: `translateX(-${(100 / slides.length) * currentSlide}%)` }} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
              {slides.map((slide, idx) => {
                const imgSrc = apiBanners.length > 0 ? getFullImageUrl(slide.image) : slide.image;
                return (
                  <div key={idx} className="relative h-full flex-shrink-0 overflow-hidden" style={{ width: `${100 / slides.length}%` }}>
                    <img src={imgSrc} alt="" className="w-full h-full object-cover transition-transform duration-[10000ms] ease-out scale-105" draggable={false} />
                    <div className="absolute inset-0 bg-black/30"></div>
                  </div>
                );
              })}
            </div>

            <div className="absolute inset-0 z-10 flex items-center">
              <div className="max-w-7xl mx-auto px-6 lg:px-16 w-full">
                <div key={currentSlide} className="max-w-2xl animate-fade-in-up">
                  <span className="inline-flex items-center gap-2 bg-gold text-navy px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy"></span>
                    {apiBanners.length > 0 ? 'UME' : (currentSlideData.badge?.[lang] || '')}
                  </span>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-4">
                    {apiBanners.length > 0 ? (currentSlideData[`title_${lang}`] || currentSlideData.title_en || '') : (currentSlideData.title?.[lang] || '')}
                  </h1>
                  <p className="text-base md:text-lg text-white/80 mb-8 max-w-lg">
                    {apiBanners.length > 0 ? (currentSlideData[`subtitle_${lang}`] || currentSlideData.subtitle_en || '') : (currentSlideData.subtitle?.[lang] || '')}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/admission" className="bg-gold hover:bg-gold-light text-navy px-7 py-3.5 rounded-full font-bold text-sm transition-all inline-flex items-center gap-2">
                      {text.ctaApply[lang]} <i className="bi bi-arrow-right text-xs"></i>
                    </Link>
                    <Link to="/about" className="border-2 border-white/50 hover:border-white text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-all inline-flex items-center gap-2">
                      {text.ctaLearn[lang]}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {slides.length > 1 && (
              <>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
                  {slides.map((_, i) => (
                    <button key={i} onClick={() => goToSlide(i)} className={`h-2.5 rounded-full transition-all duration-500 ${i === currentSlide ? 'bg-gold w-10' : 'bg-white/60 w-3 hover:bg-white'}`} />
                  ))}
                </div>
                <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white hidden md:flex items-center justify-center transition-all"><i className="bi bi-chevron-left text-xl"></i></button>
                <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white hidden md:flex items-center justify-center transition-all"><i className="bi bi-chevron-right text-xl"></i></button>
              </>
            )}
          </>
        )}
      </section>

      {/* ========== 2. STATS ========== */}
      <section className="py-20 md:py-28 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading eyebrow={text.statsEyebrow[lang]} title={text.statsTitle[lang]} />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
            {statsData.map((stat, idx) => (
              <div key={idx} className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-gold/30 transition-all">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gold/10 flex items-center justify-center">
                  <i className={`bi ${stat.icon} text-2xl text-gold`}></i>
                </div>
                <p className="text-4xl md:text-5xl font-extrabold text-navy dark:text-white mb-2">{stat.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 3. PRESIDENT ========== */}
      <ScrollReveal>
        <section className="py-20 md:py-28 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="relative">
                <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-gold rounded-3xl -z-10"></div>
                <img src={presidentImg} alt="President" className="w-full aspect-[4/5] object-cover rounded-3xl" />
              </div>
              <div>
                <SectionBadge className="mb-4"><i className="bi bi-star-fill"></i> {text.presidentEyebrow[lang]}</SectionBadge>
                <div className="relative mb-8">
                  <i className="bi bi-quote text-5xl text-gold/20 absolute -top-5 -left-2"></i>
                  <p className="text-xl md:text-2xl font-bold text-navy dark:text-white leading-relaxed pl-6">{text.presidentQuote[lang]}</p>
                </div>
                <div className="flex items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="w-1 h-16 bg-gold rounded-full"></div>
                  <div>
                    <h3 className="font-bold text-lg text-navy dark:text-white">{text.presidentName[lang]}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{text.presidentRole[lang]}</p>
                    <Link to="/about" className="inline-flex items-center gap-1 text-gold text-sm font-medium mt-1 hover:underline">{text.ctaLearn[lang]} <i className="bi bi-arrow-right text-xs"></i></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ========== 4. WHY CHOOSE UME ========== */}
      <ScrollReveal>
        <section className="py-20 md:py-28 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <SectionHeading eyebrow={text.whyEyebrow[lang]} title={text.whyTitle[lang]} subtitle={text.whySubtitle[lang]} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {whyChooseData.map((item, idx) => (
                <div key={idx} className={`group p-8 rounded-2xl border-2 ${item.bgColor} ${item.borderColor} hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-md`}>
                    <i className={`bi ${item.icon} text-white text-xl`}></i>
                  </div>
                  <h3 className="font-bold text-navy dark:text-white text-lg mb-3">{item.title[lang]}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.desc[lang]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ========== 5. PROGRAMS - ដកពណ៌ខៀវ និងស្រមោលចេញ ========== */}
      <ScrollReveal>
        <section className="py-20 md:py-28 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <SectionHeading eyebrow={text.programsEyebrow[lang]} title={text.programsTitle[lang]} subtitle={text.programsSubtitle[lang]} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {programsData.map((prog, idx) => (
                <Link to="/programs" key={idx} className="group relative rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-gold/50 transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-48 overflow-hidden">
                    <img src={prog.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" />
                    <div className={`absolute top-4 left-4 w-11 h-11 bg-gradient-to-br ${prog.color} rounded-xl flex items-center justify-center shadow-lg ring-2 ring-white/10`}>
                      <i className={`bi ${prog.icon} text-white text-lg`}></i>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-bold text-gold uppercase tracking-wide">{prog.degree[lang]} &middot; {prog.duration[lang]}</span>
                    <h3 className="font-bold text-navy dark:text-white text-lg mt-2 mb-2 group-hover:text-gold transition-colors">{prog.title[lang]}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{prog.majors[lang]}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ========== 5B. MAJOR PROGRAMS (Bachelor's / Master's list) ========== */}
      <ScrollReveal>
        <section className="py-20 md:py-28 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <SectionHeading eyebrow={text.majorProgramsEyebrow[lang]} title={text.majorProgramsTitle[lang]} subtitle={text.majorProgramsSubtitle[lang]} />
            <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
              {/* Bachelor's panel */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-gold/30 transition-all duration-300">
                <div className="flex items-center gap-3 p-6 border-b border-gray-100 dark:border-gray-700">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <i className="bi bi-mortarboard-fill text-gold text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-navy dark:text-white">{text.bachelorDegree[lang]}</h3>
                </div>
                <div className="p-6">
                  {majorPrograms.bachelor.map((p, i) => (
                    <Link key={i} to={p.link} className="group flex items-center justify-between py-3.5 border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors">
                      <span className="text-gray-600 dark:text-gray-300 group-hover:text-gold transition-colors">{p.title[lang]}</span>
                      <i className="bi bi-arrow-right text-gray-300 dark:text-gray-600 group-hover:text-gold group-hover:translate-x-1 transition-all"></i>
                    </Link>
                  ))}
                </div>
              </div>
              {/* Master's panel */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-gold/30 transition-all duration-300">
                <div className="flex items-center gap-3 p-6 border-b border-gray-100 dark:border-gray-700">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <i className="bi bi-award-fill text-gold text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-navy dark:text-white">{text.masterDegree[lang]}</h3>
                </div>
                <div className="p-6">
                  {majorPrograms.master.map((p, i) => (
                    <Link key={i} to={p.link} className="group flex items-center justify-between py-3.5 border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors">
                      <span className="text-gray-600 dark:text-gray-300 group-hover:text-gold transition-colors">{p.title[lang]}</span>
                      <i className="bi bi-arrow-right text-gray-300 dark:text-gray-600 group-hover:text-gold group-hover:translate-x-1 transition-all"></i>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ========== 5C. ADMISSIONS PROCESS ========== */}
      <ScrollReveal>
        <section className="py-20 md:py-28 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <SectionHeading eyebrow={text.admissionsEyebrow[lang]} title={text.admissionsTitle[lang]} subtitle={text.admissionsSubtitle[lang]} />
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
              {/* Bachelor's process */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-navy dark:text-white">{text.bachelorDegree[lang]}</h3>
                  <Link to="/admission" className="text-gold text-sm font-semibold hover:underline inline-flex items-center gap-1">{text.ctaLearn[lang]} <i className="bi bi-arrow-right text-xs"></i></Link>
                </div>
                <div className="relative">
                  <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gold/30"></div>
                  {admissionSteps.bachelor.map((step, i) => (
                    <div key={i} className="relative flex items-start gap-5 pb-8 last:pb-0">
                      <div className="relative z-10 w-12 h-12 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">{i + 1}</span>
                      </div>
                      <div className="pt-2.5">
                        <p className="text-xs text-gold font-bold uppercase tracking-wide mb-1">Step {i + 1}</p>
                        <p className="font-semibold text-navy dark:text-white">{step.title[lang]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Master's process */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-navy dark:text-white">{text.masterDegree[lang]}</h3>
                  <Link to="/master-degree" className="text-gold text-sm font-semibold hover:underline inline-flex items-center gap-1">{text.ctaLearn[lang]} <i className="bi bi-arrow-right text-xs"></i></Link>
                </div>
                <div className="relative">
                  <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gold/30"></div>
                  {admissionSteps.master.map((step, i) => (
                    <div key={i} className="relative flex items-start gap-5 pb-8 last:pb-0">
                      <div className="relative z-10 w-12 h-12 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                        <span className="text-navy font-bold text-sm">{i + 1}</span>
                      </div>
                      <div className="pt-2.5">
                        <p className="text-xs text-gold font-bold uppercase tracking-wide mb-1">Step {i + 1}</p>
                        <p className="font-semibold text-navy dark:text-white">{step.title[lang]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ========== 6. CAMPUS ========== */}
      <ScrollReveal>
        <section className="py-20 md:py-28 bg-navy text-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <SectionHeading eyebrow={text.campusEyebrow[lang]} title={text.campusTitle[lang]} light />
            <div className="flex flex-wrap justify-center gap-3">
              {campusData.map((campus, idx) => (
                <div key={idx} className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold ${idx === 0 ? 'bg-gold text-navy' : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'} transition-all`}>
                  <i className={`bi ${campus.icon}`}></i> {campus.name[lang]}
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ========== 7. EVENTS ========== */}
      <ScrollReveal>
        <section className="py-20 md:py-28 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
              <SectionHeading eyebrow={text.eventsEyebrow[lang]} title={text.eventsTitle[lang]} align="left" />
              <Link to="/news-events" className="hidden sm:inline-flex items-center gap-1 text-gold font-semibold text-sm hover:underline">{text.viewAll[lang]} <i className="bi bi-arrow-right"></i></Link>
            </div>
            <EventManager showControls={false} limit={3} />
          </div>
        </section>
      </ScrollReveal>

      {/* ========== 8. GALLERY - កែឲ្យដូចកាត Event ========== */}
      <ScrollReveal>
        <section className="py-20 md:py-28 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
              <SectionHeading eyebrow={text.galleryEyebrow[lang]} title={text.galleryTitle[lang]} align="left" />
              <Link to="/gallery" className="hidden sm:inline-flex items-center gap-2 text-gold font-semibold text-sm hover:underline">{text.viewAll[lang]} <i className="bi bi-arrow-right"></i></Link>
            </div>
            {loadingGallery ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => <div key={i} className="aspect-[4/3] rounded-2xl bg-gray-300 dark:bg-gray-700 animate-pulse" />)}
              </div>
            ) : apiGallery.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {apiGallery.slice(0, 4).map((img, idx) => (
                  <div 
                    key={img.id || idx} 
                    onClick={() => setLightboxImage(img)}
                    className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-gold/30 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-200 dark:bg-gray-700">
                      {img.image ? (
                        <img src={getFullImageUrl(img.image)} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"><i className="bi bi-image text-5xl text-gray-400"></i></div>
                      )}
                      <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 transition-colors duration-300 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 bg-gold text-navy w-12 h-12 rounded-full flex items-center justify-center transition-all transform scale-50 group-hover:scale-100"><i className="bi bi-eye-fill text-lg"></i></span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-navy dark:text-white text-sm line-clamp-2 group-hover:text-gold transition-colors">{img[`title_${lang}`] || img.title_en || 'Untitled'}</h3>
                      {img.created_at && <p className="text-xs text-gray-500 dark:text-gray-400 mt-2"><i className="bi bi-calendar3 text-gold mr-1"></i>{new Date(img.created_at).toLocaleDateString(lang === 'km' ? 'km-KH' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-500 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">{lang === 'km' ? 'មិនទាន់មានរូបភាព' : 'No images yet'}</div>
            )}
            {/* Lightbox */}
            {lightboxImage && (
              <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6" onClick={() => setLightboxImage(null)}>
                <button onClick={() => setLightboxImage(null)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"><i className="bi bi-x-lg"></i></button>
                <img src={getFullImageUrl(lightboxImage.image)} alt="" className="max-w-full max-h-[85vh] object-contain rounded-xl" onClick={(e) => e.stopPropagation()} />
              </div>
            )}
          </div>
        </section>
      </ScrollReveal>

      {/* ========== 9. NEWS - កែឲ្យដូចកាត Event ========== */}
      {apiNews.length > 0 && (
        <ScrollReveal>
          <section className="py-20 md:py-28 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
                <SectionHeading eyebrow={text.newsEyebrow[lang]} title={text.newsTitle[lang]} align="left" />
                <Link to="/news-events" className="hidden sm:inline-flex items-center gap-1 text-gold font-semibold text-sm hover:underline">{text.viewAll[lang]} <i className="bi bi-arrow-right"></i></Link>
              </div>
              {loadingNews ? (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
                  {Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-80 rounded-2xl bg-gray-300 dark:bg-gray-700 animate-pulse" />)}
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
                  {apiNews.slice(0, 3).map((item, idx) => (
                    <Link to={`/news-events/${item.slug}`} key={item.id || item.slug} className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-gold/30 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                      <div className="relative h-64 overflow-hidden">
                        {item.thumbnail ? <img src={getFullImageUrl(item.thumbnail)} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /> : <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"><i className="bi bi-newspaper text-5xl text-gray-400"></i></div>}
                        {item.category && <span className="absolute top-3 left-3 bg-gold text-navy text-xs font-bold px-3 py-1.5 rounded-full">{item.category[`name_${lang}`]}</span>}
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-navy dark:text-white text-lg mb-3 group-hover:text-gold transition-colors line-clamp-2">{item[`title_${lang}`] || item.title_en}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4">{item[`excerpt_${lang}`] || item.excerpt_en}</p>
                        <span className="inline-flex items-center gap-1 text-gold text-sm font-semibold group-hover:gap-2 transition-all">{lang === 'km' ? 'អានបន្ត' : 'Read More'} <i className="bi bi-arrow-right text-xs"></i></span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* ========== 10. MAP ========== */}
      <section className="py-20 md:py-28 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading eyebrow={lang === 'km' ? 'ទីតាំង' : 'Location'} title={lang === 'km' ? 'មកទស្សនាយើង' : 'Visit Us'} />
          <div className="rounded-2xl overflow-hidden h-[400px] border border-gray-200 dark:border-gray-700">
            <iframe title="UME Campus" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.3444496521366!2d103.2055155!3d13.0907239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31054996d438db25%3A0x5d1752b4f187e94d!2sUniversity%20of%20Management%20and%20Economy!5e0!3m2!1sen!2skh!4v1690000000000!5m2!1sen!2skh" className="w-full h-full border-0" allowFullScreen loading="lazy"></iframe>
          </div>
        </div>
      </section>

      {/* ========== 11. CTA ========== */}
      <section className="py-24 md:py-32 bg-navy text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <i className="bi bi-mortarboard-fill text-gold text-5xl mb-8 inline-block"></i>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">{text.ctaTitle[lang]}</h2>
          <p className="text-white/60 text-lg mb-10">{text.ctaSubtitle[lang]}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/admission" className="bg-gold hover:bg-gold-light text-navy px-10 py-4 rounded-full font-bold text-lg transition-all">{text.ctaApply[lang]} <i className="bi bi-arrow-right ml-2"></i></Link>
            <Link to="/contact" className="border-2 border-white/40 hover:border-white text-white px-10 py-4 rounded-full font-bold text-lg transition-all">{lang === 'km' ? 'ទំនាក់ទំនង' : 'Contact Us'}</Link>
          </div>
        </div>
      </section>

      {/* Scroll to Top */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`fixed bottom-6 right-6 z-50 bg-gold text-navy w-12 h-12 rounded-full flex items-center justify-center transition-all hover:bg-gold-light hover:scale-110 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`} aria-label="Scroll to top">
        <i className="bi bi-arrow-up text-xl"></i>
      </button>
    </div>
  );
}