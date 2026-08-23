import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLanguage } from '../context/LanguageContext';

// ============================================================
// DATA
// ============================================================

const heroBanner = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80';

const tabs = [
  { id: 'life', icon: 'bi-heart', label: { km: 'ជីវិតនិស្សិត', en: 'Student Life' } },
  { id: 'gallery', icon: 'bi-images', label: { km: 'វិចិត្រសាល', en: 'Gallery' } },
];

// Student Life Data
const studentActivities = [
  {
    icon: 'bi-people-fill',
    title: { km: 'ក្លឹបនិស្សិត', en: 'Student Clubs' },
    desc: {
      km: 'ចូលរួមក្លឹបជាច្រើនដូចជា ក្លឹបសិល្បៈ ក្លឹបកីឡា ក្លឹបសហគ្រិន និងក្លឹបស្ម័គ្រចិត្ត។',
      en: 'Join various clubs such as Art Club, Sports Club, Entrepreneurship Club, and Volunteer Club.',
    },
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80',
  },
  {
    icon: 'bi-trophy-fill',
    title: { km: 'កីឡា និងការប្រកួត', en: 'Sports & Competitions' },
    desc: {
      km: 'ចូលរួមប្រកួតកីឡាផ្សេងៗ ដូចជា បាល់ទាត់ បាល់ទះ បាល់បោះ និងការប្រកួតកីឡាប្រពៃណី។',
      en: 'Participate in various sports competitions including football, volleyball, basketball, and traditional sports.',
    },
    image: 'https://images.unsplash.com/photo-1461896836934-bd45ba6cf2b5?w=600&q=80',
  },
  {
    icon: 'bi-music-note-list',
    title: { km: 'ព្រឹត្តិការណ៍វប្បធម៌', en: 'Cultural Events' },
    desc: {
      km: 'ចូលរួមព្រឹត្តិការណ៍បុណ្យជាតិ ការសម្តែងសិល្បៈ និងកម្មវិធីវប្បធម៌ផ្សេងៗ។',
      en: 'Participate in national festivals, art performances, and various cultural programs.',
    },
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80',
  },
  {
    icon: 'bi-laptop',
    title: { km: 'បច្ចេកវិទ្យា និងនវានុវត្តន៍', en: 'Tech & Innovation' },
    desc: {
      km: 'ចូលរួមសិក្ខាសាលាបច្ចេកវិទ្យា ការប្រកួត Hackathon និងកម្មវិធីបណ្តុះគំនិតច្នៃប្រឌិត។',
      en: 'Join tech workshops, Hackathon competitions, and innovation programs.',
    },
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80',
  },
  {
    icon: 'bi-globe2',
    title: { km: 'កម្មវិធីផ្លាស់ប្តូរនិស្សិត', en: 'Exchange Programs' },
    desc: {
      km: 'ឱកាសសិក្សានៅបរទេសតាមរយៈកម្មវិធីផ្លាស់ប្តូរនិស្សិតជាមួយសាកលវិទ្យាល័យដៃគូ។',
      en: 'Study abroad opportunities through exchange programs with partner universities.',
    },
    image: 'https://images.unsplash.com/photo-1527891751199-7225231a68dd?w=600&q=80',
  },
  {
    icon: 'bi-heart-fill',
    title: { km: 'សកម្មភាពសង្គម', en: 'Community Service' },
    desc: {
      km: 'ចូលរួមសកម្មភាពស្ម័គ្រចិត្ត ការបរិច្ចាគឈាម និងយុទ្ធនាការសង្គមផ្សេងៗ។',
      en: 'Participate in volunteer activities, blood donation, and various social campaigns.',
    },
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80',
  },
];

const campusFeatures = [
  { icon: 'bi-wifi', title: { km: 'Wi-Fi ឥតគិតថ្លៃ', en: 'Free Wi-Fi' } },
  { icon: 'bi-book', title: { km: 'បណ្ណាល័យទំនើប', en: 'Modern Library' } },
  { icon: 'bi-pc-display', title: { km: 'មន្ទីរពិសោធន៍កុំព្យូទ័រ', en: 'Computer Labs' } },
  { icon: 'bi-cup-hot', title: { km: 'អាហារដ្ឋាន', en: 'Cafeteria' } },
  { icon: 'bi-shield-check', title: { km: 'សន្តិសុខ ២៤/៧', en: '24/7 Security' } },
  { icon: 'bi-parking', title: { km: 'ចំណតរថយន្ត', en: 'Parking' } },
];

// Gallery Data
const galleryCategories = [
  { id: 'all', label: { km: 'ទាំងអស់', en: 'All' } },
  { id: 'campus', label: { km: 'សាខា', en: 'Campus' } },
  { id: 'events', label: { km: 'ព្រឹត្តិការណ៍', en: 'Events' } },
  { id: 'sports', label: { km: 'កីឡា', en: 'Sports' } },
  { id: 'culture', label: { km: 'វប្បធម៌', en: 'Culture' } },
  { id: 'graduation', label: { km: 'បញ្ចប់ការសិក្សា', en: 'Graduation' } },
];

const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80', category: 'campus', title: { km: 'ទីតាំងបាត់ដំបង', en: 'Battambang Campus' } },
  { id: 2, src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80', category: 'campus', title: { km: 'អគារសិក្សា', en: 'Academic Building' } },
  { id: 3, src: 'https://images.unsplash.com/photo-1523050854058-8df90910c58f?w=600&q=80', category: 'events', title: { km: 'ពិធីបើកឆ្នាំសិក្សា', en: 'Opening Ceremony' } },
  { id: 4, src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80', category: 'events', title: { km: 'កម្មវិធីតន្ត្រី', en: 'Music Event' } },
  { id: 5, src: 'https://images.unsplash.com/photo-1461896836934-bd45ba6cf2b5?w=600&q=80', category: 'sports', title: { km: 'ការប្រកួតកីឡា', en: 'Sports Competition' } },
  { id: 6, src: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=600&q=80', category: 'sports', title: { km: 'ព្រឹត្តិការណ៍កីឡា', en: 'Sports Event' } },
  { id: 7, src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80', category: 'culture', title: { km: 'របាំប្រពៃណី', en: 'Traditional Dance' } },
  { id: 8, src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80', category: 'culture', title: { km: 'ពិធីបុណ្យ', en: 'Festival' } },
  { id: 9, src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80', category: 'graduation', title: { km: 'ថ្ងៃបញ្ចប់ការសិក្សា', en: 'Graduation Day' } },
  { id: 10, src: 'https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78?w=600&q=80', category: 'graduation', title: { km: 'ពិធីប្រគល់សញ្ញាបត្រ', en: 'Diploma Ceremony' } },
  { id: 11, src: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80', category: 'campus', title: { km: 'បរិវេណសាកលវិទ្យាល័យ', en: 'University Grounds' } },
  { id: 12, src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80', category: 'events', title: { km: 'សិក្ខាសាលា', en: 'Workshop' } },
];

// ============================================================
// COMPONENTS
// ============================================================

function SectionLabel({ eyebrow, title, subtitle, align = 'center' }) {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center mx-auto' : ''}`}>
      {eyebrow && (
        <p className="text-gold text-xs tracking-[0.25em] uppercase font-bold mb-3">{eyebrow}</p>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold text-navy dark:text-white tracking-tight">
        {title}
      </h2>
      <div className={`h-[3px] w-14 bg-gold rounded-full mt-5 ${align === 'center' ? 'mx-auto' : ''}`}></div>
      {subtitle && (
        <p className="text-navy/50 dark:text-white/50 mt-5 max-w-xl mx-auto text-sm md:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// Lightbox Modal
function Lightbox({ image, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all"
      >
        <i className="bi bi-x-lg"></i>
      </button>
      <img
        src={image.src}
        alt="Gallery"
        className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      {image.title && (
        <p className="absolute bottom-6 text-white/80 text-sm bg-black/50 px-4 py-2 rounded-full">
          {image.title}
        </p>
      )}
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function CampusLifePage() {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('life');
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const lifeRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const refs = { life: lifeRef, gallery: galleryRef };
    if (refs[activeTab]?.current) {
      setTimeout(() => {
        refs[activeTab].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [activeTab]);

  const filteredImages = galleryFilter === 'all'
    ? galleryImages
    : galleryImages.filter((img) => img.category === galleryFilter);

  const text = {
    breadcrumb: { km: 'ជីវិតនិស្សិត', en: 'Campus Life' },
    heroEyebrow: { km: 'បទពិសោធន៍និស្សិត', en: 'Student Experience' },
    heroTitle: { km: 'ជីវិតនៅ UME', en: 'Life at UME' },
    heroSubtitle: { km: 'ច្រើនជាងការសិក្សា - បទពិសោធន៍ដែលមិនអាចបំភ្លេចបាន', en: 'More than studying - an unforgettable experience' },
    lifeTitle: { km: 'សកម្មភាពនិស្សិត', en: 'Student Activities' },
    lifeSubtitle: { km: 'ស្វែងយល់ពីសកម្មភាព និងក្លឹបផ្សេងៗនៅ UME', en: 'Explore various activities and clubs at UME' },
    featuresTitle: { km: 'សម្ភារៈបរិក្ខារ', en: 'Campus Facilities' },
    featuresSubtitle: { km: 'បរិក្ខារទំនើបៗសម្រាប់គាំទ្រការសិក្សា', en: 'Modern facilities to support learning' },
    galleryTitle: { km: 'វិចិត្រសាលរូបភាព', en: 'Photo Gallery' },
    gallerySubtitle: { km: 'រូបភាពសកម្មភាព និងព្រឹត្តិការណ៍នានា', en: 'Photos of activities and events' },
    galleryViewAll: { km: 'មើលទាំងអស់', en: 'View All' },
    ctaTitle: { km: 'ត្រៀមខ្លួនចូលរួមជាមួយយើង?', en: 'Ready to Join Us?' },
    ctaDesc: { km: 'ចុះឈ្មោះឥឡូវនេះ និងក្លាយជាផ្នែកមួយនៃសហគមន៍ UME', en: 'Apply now and become part of the UME community' },
    ctaBtn: { km: 'ចុះឈ្មោះឥឡូវនេះ', en: 'Apply Now' },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-navy-dark font-sans transition-colors duration-300">
      
      {/* ========== HERO ========== */}
      <section className="relative h-[420px] overflow-hidden bg-navy">
        <img src={heroBanner} alt="Campus Life" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/40"></div>
        <div className="relative z-10 h-full flex flex-col justify-end pb-16">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="flex items-center gap-2 text-white/50 text-xs mb-6">
              <Link to="/" className="hover:text-gold transition-colors">{t('nav.home')}</Link>
              <i className="bi bi-chevron-right text-[10px]"></i>
              <span className="text-gold">{text.breadcrumb[lang]}</span>
            </div>
            <p className="flex items-center gap-2 text-gold text-xs tracking-[0.25em] uppercase font-bold mb-4">
              <i className="bi bi-heart-fill"></i>
              {text.heroEyebrow[lang]}
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-3">
              {text.heroTitle[lang]}
            </h1>
            <p className="text-lg text-white/60">{text.heroSubtitle[lang]}</p>
          </div>
        </div>
      </section>

      {/* ========== TAB NAVIGATION ========== */}
      <section className="sticky top-20 z-40 bg-white dark:bg-navy-dark border-b border-gray-200 dark:border-white/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 py-2 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-navy text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
              >
                <i className={`bi ${tab.icon} text-base`}></i>
                {tab.label[lang]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION: STUDENT LIFE */}
      {/* ============================================ */}
      <div ref={lifeRef} id="life-section">
        {/* Activities Grid */}
        <section className="py-20 bg-white dark:bg-navy-dark">
          <div className="max-w-6xl mx-auto px-6">
            <SectionLabel 
              eyebrow={text.lifeTitle[lang]} 
              title={text.lifeTitle[lang]} 
              subtitle={text.lifeSubtitle[lang]} 
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentActivities.map((activity, idx) => (
                <div
                  key={idx}
                  className="group bg-gray-50 dark:bg-white/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={activity.image}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="w-10 h-10 bg-gold/90 rounded-xl flex items-center justify-center mb-2">
                        <i className={`bi ${activity.icon} text-lg text-navy`}></i>
                      </div>
                      <h3 className="text-white font-bold text-lg">{activity.title[lang]}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-navy/60 dark:text-white/50 text-sm leading-relaxed">
                      {activity.desc[lang]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Campus Features */}
        <section className="py-20 bg-gray-50 dark:bg-white/[0.03]">
          <div className="max-w-6xl mx-auto px-6">
            <SectionLabel 
              title={text.featuresTitle[lang]} 
              subtitle={text.featuresSubtitle[lang]} 
            />
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {campusFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 bg-white dark:bg-navy-dark rounded-xl p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-100 dark:border-white/10"
                >
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className={`bi ${feature.icon} text-xl text-gold`}></i>
                  </div>
                  <span className="font-semibold text-navy dark:text-white text-sm">{feature.title[lang]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ============================================ */}
      {/* SECTION: GALLERY */}
      {/* ============================================ */}
      <div ref={galleryRef} id="gallery-section">
        <section className="py-20 bg-white dark:bg-navy-dark">
          <div className="max-w-6xl mx-auto px-6">
            <SectionLabel 
              eyebrow={text.galleryTitle[lang]} 
              title={text.galleryTitle[lang]} 
              subtitle={text.gallerySubtitle[lang]} 
            />

            {/* Gallery Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {galleryCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setGalleryFilter(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    galleryFilter === cat.id
                      ? 'bg-navy text-white shadow-md'
                      : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
                  }`}
                >
                  {cat.label[lang]}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  onClick={() => setLightbox(image)}
                  className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={image.src}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-sm font-medium">
                      {typeof image.title === 'string' ? image.title : image.title[lang]}
                    </p>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <i className="bi bi-zoom-in text-white"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredImages.length === 0 && (
              <div className="text-center py-16">
                <i className="bi bi-images text-5xl text-gray-300 dark:text-white/20 mb-4 block"></i>
                <p className="text-gray-400 dark:text-white/30">
                  {lang === 'km' ? 'មិនមានរូបភាពក្នុងប្រភេទនេះទេ' : 'No images in this category'}
                </p>
              </div>
            )}

            {/* View All Link */}
            <div className="text-center mt-10">
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 text-gold font-semibold hover:text-gold-dark transition-colors"
              >
                {text.galleryViewAll[lang]} <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* ========== CTA ========== */}
      <section className="py-20 bg-navy text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <i className="bi bi-rocket-takeoff text-4xl text-gold mb-4 block"></i>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{text.ctaTitle[lang]}</h2>
          <p className="text-white/60 text-lg mb-8">{text.ctaDesc[lang]}</p>
          <Link
            to="/admission"
            className="inline-flex items-center gap-2 bg-gold text-navy px-8 py-4 rounded-full font-bold text-lg hover:bg-gold-light transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            {text.ctaBtn[lang]} <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && <Lightbox image={lightbox} onClose={() => setLightbox(null)} />}

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