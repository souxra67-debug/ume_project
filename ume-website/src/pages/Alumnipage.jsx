import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLanguage } from '../context/LanguageContext';

// ============================================================
// DATA
// ============================================================

const heroBanner = 'https://images.unsplash.com/photo-1523050854058-8df90910c58f?w=1600&q=80';

const tabs = [
  { id: 'alumni', icon: 'bi-people-fill', label: { km: 'អតីតនិស្សិត', en: 'Alumni' } },
  { id: 'testimonials', icon: 'bi-chat-quote', label: { km: 'សម្តែងមតិ', en: 'Testimonials' } },
];

// Alumni Data
const alumniStats = [
  { icon: 'bi-people-fill', end: 35302, suffix: '+', label: { km: 'និស្សិតបញ្ចប់ការសិក្សា', en: 'Graduates' } },
  { icon: 'bi-building', end: 85, suffix: '%', label: { km: 'មានការងារធ្វើ', en: 'Employed' } },
  { icon: 'bi-globe2', end: 25, suffix: '+', label: { km: 'ប្រទេស', en: 'Countries' } },
  { icon: 'bi-award', end: 500, suffix: '+', label: { km: 'ម្ចាស់អាជីវកម្ម', en: 'Business Owners' } },
];

const notableAlumni = [
  {
    name: { km: 'លោក សុខ ដារ៉ា', en: 'Mr. Sok Dara' },
    role: { km: 'អភិបាលរងខេត្តបាត់ដំបង', en: 'Deputy Governor of Battambang' },
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
    quote: {
      km: 'UME បានផ្តល់ឱ្យខ្ញុំនូវមូលដ្ឋានគ្រឹះដ៏រឹងមាំសម្រាប់អាជីពរបស់ខ្ញុំ។',
      en: 'UME gave me a strong foundation for my career.',
    },
  },
  {
    name: { km: 'លោកស្រី ចាន់ ម៉ាលី', en: 'Ms. Chan Maly' },
    role: { km: 'CEO ក្រុមហ៊ុនបច្ចេកវិទ្យា', en: 'CEO of Tech Company' },
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80',
    quote: {
      km: 'ការសិក្សានៅ UME បានបំពាក់ឱ្យខ្ញុំនូវជំនាញដែលត្រូវការក្នុងទីផ្សារការងារ។',
      en: 'Studying at UME equipped me with skills needed in the job market.',
    },
  },
  {
    name: { km: 'លោក គឹម សុផល', en: 'Mr. Kim Sophal' },
    role: { km: 'អ្នកគ្រប់គ្រងធនាគារ', en: 'Bank Manager' },
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80',
    quote: {
      km: 'គុណភាពអប់រំនៅ UME បានជួយខ្ញុំឱ្យទទួលបានជោគជ័យក្នុងអាជីព។',
      en: 'The quality of education at UME helped me succeed in my career.',
    },
  },
];

const alumniBenefits = [
  {
    icon: 'bi-briefcase',
    title: { km: 'បណ្តាញការងារ', en: 'Career Network' },
    desc: { km: 'ចូលរួមបណ្តាញអតីតនិស្សិតដើម្បីឱកាសការងារ', en: 'Join alumni network for career opportunities' },
  },
  {
    icon: 'bi-mortarboard',
    title: { km: 'ការសិក្សាបន្ត', en: 'Continuing Education' },
    desc: { km: 'ទទួលបានការបញ្ចុះតម្លៃសម្រាប់ការសិក្សាបន្ត', en: 'Get discounts for continuing education' },
  },
  {
    icon: 'bi-calendar-event',
    title: { km: 'ព្រឹត្តិការណ៍', en: 'Events' },
    desc: { km: 'ចូលរួមព្រឹត្តិការណ៍ជួបជុំអតីតនិស្សិត', en: 'Participate in alumni reunion events' },
  },
  {
    icon: 'bi-gift',
    title: { km: 'អត្ថប្រយោជន៍ពិសេស', en: 'Exclusive Benefits' },
    desc: { km: 'ទទួលបានការផ្តល់ជូនពិសេសពីដៃគូ', en: 'Receive exclusive offers from partners' },
  },
];

// Testimonial Data
const testimonials = [
  {
    id: 1,
    name: { km: 'លោក សុខ ដារ៉ា', en: 'Mr. Sok Dara' },
    role: { km: 'អភិបាលរងខេត្តបាត់ដំបង', en: 'Deputy Governor of Battambang' },
    batch: { km: 'ជំនាន់ទី ៥ (២០០៨)', en: 'Batch 5 (2008)' },
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
    rating: 5,
    content: {
      km: 'ខ្ញុំសូមថ្លែងអំណរគុណដល់សាកលវិទ្យាល័យ UME ដែលបានផ្តល់ឱ្យខ្ញុំនូវការអប់រំប្រកបដោយគុណភាព។ សាស្ត្រាចារ្យមានជំនាញខ្ពស់ និងយកចិត្តទុកដាក់ចំពោះនិស្សិតគ្រប់រូប។',
      en: 'I would like to express my gratitude to UME for providing me with quality education. The professors are highly skilled and attentive to every student.',
    },
  },
  {
    id: 2,
    name: { km: 'លោកស្រី ចាន់ ម៉ាលី', en: 'Ms. Chan Maly' },
    role: { km: 'CEO ក្រុមហ៊ុនបច្ចេកវិទ្យា', en: 'CEO of Tech Company' },
    batch: { km: 'ជំនាន់ទី ១០ (២០១៣)', en: 'Batch 10 (2013)' },
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80',
    rating: 5,
    content: {
      km: 'កម្មវិធីសិក្សានៅ UME ទំនើប និងឆ្លើយតបទៅនឹងតម្រូវការទីផ្សារការងារ។ ខ្ញុំមានមោទនភាពដែលបានបញ្ចប់ការសិក្សាពីទីនេះ។',
      en: 'The curriculum at UME is modern and responsive to job market needs. I am proud to have graduated from here.',
    },
  },
  {
    id: 3,
    name: { km: 'លោក គឹម សុផល', en: 'Mr. Kim Sophal' },
    role: { km: 'អ្នកគ្រប់គ្រងធនាគារ', en: 'Bank Manager' },
    batch: { km: 'ជំនាន់ទី ៨ (២០១១)', en: 'Batch 8 (2011)' },
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80',
    rating: 5,
    content: {
      km: 'UME មិនត្រឹមតែផ្តល់ចំណេះដឹងទេ តែថែមទាំងបណ្តុះជំនាញទន់ៗដែលចាំបាច់សម្រាប់អាជីព។ សូមអរគុណ UME!',
      en: 'UME not only provides knowledge but also cultivates soft skills necessary for career. Thank you UME!',
    },
  },
  {
    id: 4,
    name: { km: 'កញ្ញា សុខ នីតា', en: 'Ms. Sok Nita' },
    role: { km: 'សហគ្រិន', en: 'Entrepreneur' },
    batch: { km: 'ជំនាន់ទី ១៥ (២០១៨)', en: 'Batch 15 (2018)' },
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80',
    rating: 4,
    content: {
      km: 'ការសិក្សានៅ UME បានជួយខ្ញុំឱ្យមានទំនុកចិត្តក្នុងការចាប់ផ្តើមអាជីវកម្មផ្ទាល់ខ្លួន។',
      en: 'Studying at UME helped me gain confidence to start my own business.',
    },
  },
  {
    id: 5,
    name: { km: 'លោក វង្ស សំណាង', en: 'Mr. Vong Samnang' },
    role: { km: 'គ្រូបង្រៀន', en: 'Teacher' },
    batch: { km: 'ជំនាន់ទី ១២ (២០១៥)', en: 'Batch 12 (2015)' },
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80',
    rating: 5,
    content: {
      km: 'គុណភាពបង្រៀននៅ UME គឺល្អឥតខ្ចោះ។ ខ្ញុំបានរៀនច្រើនពីសាស្ត្រាចារ្យដែលមានបទពិសោធន៍។',
      en: 'The teaching quality at UME is excellent. I learned a lot from experienced professors.',
    },
  },
  {
    id: 6,
    name: { km: 'កញ្ញា ហេង ស្រីនីត', en: 'Ms. Heng Sreynit' },
    role: { km: 'បុគ្គលិកអង្គការក្រៅរដ្ឋាភិបាល', en: 'NGO Worker' },
    batch: { km: 'ជំនាន់ទី ១៨ (២០២១)', en: 'Batch 18 (2021)' },
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80',
    rating: 4,
    content: {
      km: 'ខ្ញុំស្រឡាញ់បរិយាកាសសិក្សានៅ UME។ មិត្តភក្តិ និងសាស្ត្រាចារ្យសុទ្ធតែរួសរាយរាក់ទាក់។',
      en: 'I love the learning environment at UME. Friends and professors are all friendly and supportive.',
    },
  },
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

// Counter Animation Hook
function useCounter(end, duration = 1800) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    let start = null;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 4)) * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, end, duration]);

  return { count, visible };
}

function Counter({ end, suffix = '' }) {
  const { count, visible } = useCounter(end);
  return (
    <span className={visible ? 'opacity-100' : 'opacity-0'}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

// Star Rating
function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <i
          key={star}
          className={`bi ${star <= rating ? 'bi-star-fill text-gold' : 'bi-star text-gray-300 dark:text-white/20'} text-sm`}
        ></i>
      ))}
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function AlumniPage() {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('alumni');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const text = {
    breadcrumb: { km: 'អតីតនិស្សិត', en: 'Alumni' },
    heroEyebrow: { km: 'សហគមន៍ UME', en: 'UME Community' },
    heroTitle: { km: 'អតីតនិស្សិត និងសម្តែងមតិ', en: 'Alumni & Testimonials' },
    heroSubtitle: { km: 'ស្វែងយល់ពីភាពជោគជ័យរបស់អតីតនិស្សិត UME', en: 'Discover the success of UME alumni' },
    alumniTitle: { km: 'អតីតនិស្សិតឆ្នើម', en: 'Notable Alumni' },
    alumniSubtitle: { km: 'អតីតនិស្សិតដែលទទួលបានជោគជ័យក្នុងអាជីព', en: 'Alumni who have achieved career success' },
    statsTitle: { km: 'ស្ថិតិអតីតនិស្សិត', en: 'Alumni Statistics' },
    benefitsTitle: { km: 'អត្ថប្រយោជន៍សមាជិក', en: 'Member Benefits' },
    testimonialsTitle: { km: 'សម្តែងមតិ', en: 'Testimonials' },
    testimonialsSubtitle: { km: 'អ្វីដែលអតីតនិស្សិតនិយាយអំពី UME', en: 'What alumni say about UME' },
    ctaTitle: { km: 'ចូលរួមជាមួយសហគមន៍អតីតនិស្សិត', en: 'Join the Alumni Community' },
    ctaDesc: { km: 'ភ្ជាប់ទំនាក់ទំនងជាមួយអតីតនិស្សិតរាប់ពាន់នាក់', en: 'Connect with thousands of alumni' },
    ctaBtn: { km: 'ចុះឈ្មោះឥឡូវនេះ', en: 'Register Now' },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-navy-dark font-sans transition-colors duration-300">
      
      {/* ========== HERO ========== */}
      <section className="relative h-[400px] overflow-hidden bg-navy">
        <img src={heroBanner} alt="Alumni" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/40"></div>
        <div className="relative z-10 h-full flex flex-col justify-end pb-16">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="flex items-center gap-2 text-white/50 text-xs mb-6">
              <Link to="/" className="hover:text-gold transition-colors">{t('nav.home')}</Link>
              <i className="bi bi-chevron-right text-[10px]"></i>
              <Link to="/about" className="hover:text-gold transition-colors">{t('nav.about')}</Link>
              <i className="bi bi-chevron-right text-[10px]"></i>
              <span className="text-gold">{text.breadcrumb[lang]}</span>
            </div>
            <p className="flex items-center gap-2 text-gold text-xs tracking-[0.25em] uppercase font-bold mb-4">
              <i className="bi bi-people-fill"></i>
              {text.heroEyebrow[lang]}
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
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
      {/* SECTION: ALUMNI */}
      {/* ============================================ */}
      <div id="alumni-section">
        {/* Stats Counter */}
        <section className="py-16 bg-navy">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-white text-center mb-10">{text.statsTitle[lang]}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {alumniStats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i className={`bi ${stat.icon} text-2xl text-gold`}></i>
                  </div>
                  <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">
                    <Counter end={stat.end} suffix={stat.suffix} />
                  </div>
                  <p className="text-white/60 text-sm">{stat.label[lang]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Notable Alumni */}
        <section className="py-20 bg-white dark:bg-navy-dark">
          <div className="max-w-6xl mx-auto px-6">
            <SectionLabel 
              title={text.alumniTitle[lang]} 
              subtitle={text.alumniSubtitle[lang]} 
            />
            <div className="grid md:grid-cols-3 gap-6">
              {notableAlumni.map((alum, idx) => (
                <div
                  key={idx}
                  className="group bg-gray-50 dark:bg-white/5 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-white/10"
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-gold/20 group-hover:ring-gold/40 transition-all">
                    <img
                      src={alum.image}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<div class="w-full h-full bg-navy flex items-center justify-center"><i class="bi bi-person-fill text-3xl text-gold"></i></div>';
                      }}
                    />
                  </div>
                  <h3 className="font-bold text-navy dark:text-white text-lg mb-1">{alum.name[lang]}</h3>
                  <p className="text-gold text-sm font-medium mb-3">{alum.role[lang]}</p>
                  <div className="relative">
                    <i className="bi bi-quote text-3xl text-gold/20 absolute -top-2 -left-1"></i>
                    <p className="text-navy/50 dark:text-white/50 text-sm italic leading-relaxed">
                      "{alum.quote[lang]}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Alumni Benefits */}
        <section className="py-20 bg-gray-50 dark:bg-white/[0.03]">
          <div className="max-w-5xl mx-auto px-6">
            <SectionLabel title={text.benefitsTitle[lang]} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {alumniBenefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-navy-dark rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-100 dark:border-white/10"
                >
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <i className={`bi ${benefit.icon} text-xl text-gold`}></i>
                  </div>
                  <h4 className="font-bold text-navy dark:text-white text-sm mb-2">{benefit.title[lang]}</h4>
                  <p className="text-navy/40 dark:text-white/40 text-xs">{benefit.desc[lang]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ============================================ */}
      {/* SECTION: TESTIMONIALS */}
      {/* ============================================ */}
      <div id="testimonials-section">
        <section className="py-20 bg-white dark:bg-navy-dark">
          <div className="max-w-6xl mx-auto px-6">
            <SectionLabel 
              eyebrow={text.testimonialsTitle[lang]} 
              title={text.testimonialsTitle[lang]} 
              subtitle={text.testimonialsSubtitle[lang]} 
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-white/10"
                >
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gold/20">
                      <img
                        src={testimonial.image}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="w-full h-full bg-navy flex items-center justify-center"><i class="bi bi-person-fill text-xl text-gold"></i></div>';
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-navy dark:text-white text-sm">{testimonial.name[lang]}</h4>
                      <p className="text-navy/40 dark:text-white/40 text-xs">{testimonial.role[lang]}</p>
                      <p className="text-gold text-xs mt-0.5">{testimonial.batch[lang]}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-3">
                    <StarRating rating={testimonial.rating} />
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <i className="bi bi-quote text-2xl text-gold/20 absolute -top-1 -left-1"></i>
                    <p className="text-navy/60 dark:text-white/50 text-sm leading-relaxed pl-4">
                      "{testimonial.content[lang]}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ========== CTA ========== */}
      <section className="py-20 bg-navy text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <i className="bi bi-people-fill text-4xl text-gold mb-4 block"></i>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{text.ctaTitle[lang]}</h2>
          <p className="text-white/60 text-lg mb-8">{text.ctaDesc[lang]}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/admission"
              className="inline-flex items-center gap-2 bg-gold text-navy px-8 py-4 rounded-full font-bold text-lg hover:bg-gold-light transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              {text.ctaBtn[lang]} <i className="bi bi-arrow-right"></i>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all border border-white/20 hover:-translate-y-1"
            >
              {lang === 'km' ? 'ទំនាក់ទំនង' : 'Contact'}
            </Link>
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