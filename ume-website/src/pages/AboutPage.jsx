import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLanguage } from '../context/LanguageContext';

// ============================================================
// DATA
// ============================================================
const topBanner = 'https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80';

const tabs = [
  { id: 'overview', icon: 'bi-building', label: { km: 'ទិដ្ឋភាពទូទៅ', en: 'Overview' } },
  { id: 'history', icon: 'bi-clock-history', label: { km: 'ប្រវត្តិ', en: 'History' } },
  { id: 'accreditation', icon: 'bi-patch-check', label: { km: 'ការទទួលស្គាល់', en: 'Accreditation' } },
  { id: 'partners', icon: 'bi-handshake', label: { km: 'ដៃគូ', en: 'Partners' } },
];

const pillars = [
  {
    icon: 'bi-binoculars-fill',
    title: { km: 'ចក្ខុវិស័យឆ្នាំ ២០៥០', en: 'Vision 2050' },
    content: {
      km: 'មជ្ឈមណ្ឌលឧត្តមភាពនៅកម្ពុជា និងលើសពីនេះ បណ្តុះបណ្តាលពលរដ្ឋប្រកបដោយភាពច្នៃប្រឌិត នវានុវត្តន៍ និងការទទួលខុសត្រូវ។',
      en: 'A center of excellence in Cambodia and beyond, nurturing citizens with creativity, innovation, and responsibility.',
    },
  },
  {
    icon: 'bi-bullseye',
    title: { km: 'បេសកកម្មរបស់យើង', en: 'Our Mission' },
    content: {
      km: 'ផ្តល់ការអប់រំប្រកបដោយគុណភាព បណ្តុះបណ្តាលធនធានមនុស្សដើម្បីចូលរួមអភិវឌ្ឍសេដ្ឋកិច្ច និងសង្គមជាតិ។',
      en: 'To deliver quality education and develop human resources that contribute to national economic and social development.',
    },
  },
  {
    icon: 'bi-gem',
    title: { km: 'គុណតម្លៃស្នូល', en: 'Core Values' },
    content: {
      km: 'ឧត្តមភាព • សុចរិតភាព • នវានុវត្តន៍ • ការទទួលខុសត្រូវសង្គម • ការគោរពភាពចម្រុះ',
      en: 'Excellence • Integrity • Innovation • Social Responsibility • Respect for Diversity',
    },
  },
];

const historyData = [
  {
    year: '1998',
    icon: 'bi-building-fill',
    title: { km: 'ការបង្កើតឡើងដំបូង', en: 'Founding' },
    content: {
      km: 'សាកលវិទ្យាល័យគ្រប់គ្រង និងសេដ្ឋកិច្ច (UME) ត្រូវបានបង្កើតឡើងក្នុងឆ្នាំ ១៩៩៨ ដោយ ឯកឧត្តមបណ្ឌិត ហ៊ាន វណ្ណហន។ UME មានកម្មវិធីសិក្សាដ៏ទូលំទូលាយចាប់ពីកម្រិតបរិញ្ញាបត្ររង រហូតដល់ថ្នាក់បណ្ឌិត ដោយបែងចែកចេញជា ៥ មហាវិទ្យាល័យធំៗ។',
      en: 'The University of Management and Economics (UME) was founded in 1998 by H.E. Dr. Hean Vanhorn. UME offers comprehensive programs from Associate to Doctoral level across 5 major faculties.',
    },
  },
  {
    year: '2021',
    icon: 'bi-globe2',
    title: { km: 'គម្រោង HEIP និងការទទួលស្គាល់', en: 'HEIP Project & Recognition' },
    content: {
      km: 'នៅឆ្នាំ ២០២១ UME ត្រូវបានជ្រើសរើសជាសាកលវិទ្យាល័យឯកជនមួយក្នុងចំណោមប្រាំមួយ ដើម្បីអនុវត្តគម្រោងកែលម្អការអប់រំកម្រិតឧត្តមសិក្សា (HEIP) ដែលជាគំនិតផ្តួចផ្តើមរួមគ្នារវាងធនាគារពិភពលោក និងក្រសួងអប់រំ។',
      en: 'In 2021, UME was selected as one of six private universities to implement the Higher Education Improvement Project (HEIP), a joint initiative between the World Bank and the Ministry of Education.',
    },
  },
  {
    year: '2026',
    icon: 'bi-pin-map-fill',
    title: { km: 'វិសាលភាព និងភាពជោគជ័យ', en: 'Expansion & Success' },
    content: {
      km: 'បច្ចុប្បន្ន UME មានវិសាលភាពគ្របដណ្តប់លើទីតាំងសាខាចំនួន ៧៖ បាត់ដំបង, បន្ទាយមានជ័យ, កំពង់ចាម, ពោធិ៍សាត់, ព្រះសីហនុ, កោះកុង, និងក្រចេះ។',
      en: 'Currently UME covers 7 campus locations: Battambang, Banteay Meanchey, Kampong Cham, Pursat, Preah Sihanouk, Koh Kong, and Kratie.',
    },
  },
];

const accreditationData = [
  {
    icon: 'bi-building-check',
    title: { km: 'ទទួលស្គាល់ដោយក្រសួងអប់រំ', en: 'Recognized by MOEYS' },
    desc: {
      km: 'UME ជាគ្រឹះស្ថានឧត្តមសិក្សាឯកជនដែលទទួលស្គាល់ដោយក្រសួងអប់រំ យុវជន និងកីឡា តាមរយៈអនុក្រឹត្យលេខ ៨២ អនក្រ.បក ចុះថ្ងៃទី ២៥ ខែសីហា ឆ្នាំ ១៩៩៨។',
      en: 'UME is a private higher education institution recognized by the Ministry of Education, Youth and Sport through Sub-Decree No. 82 ANKr.BK dated August 25, 1998.',
    },
  },
  {
    icon: 'bi-award',
    title: { km: 'សមាជិកសមាគម CHEA', en: 'CHEA Member' },
    desc: {
      km: 'ជាសមាជិកនៃសមាគមគ្រឹះស្ថានឧត្តមសិក្សាកម្ពុជា (CHEA) ដែលធានាបាននូវគុណភាពអប់រំតាមស្តង់ដារជាតិ។',
      en: 'Member of the Cambodian Higher Education Association (CHEA), ensuring education quality meets national standards.',
    },
  },
  {
    icon: 'bi-globe',
    title: { km: 'កិច្ចសហប្រតិបត្តិការអន្តរជាតិ', en: 'International Cooperation' },
    desc: {
      km: 'មានកិច្ចសហប្រតិបត្តិការជាមួយសាកលវិទ្យាល័យ និងអង្គការអន្តរជាតិជាច្រើន រួមទាំងធនាគារពិភពលោកតាមរយៈគម្រោង HEIP។',
      en: 'Has partnerships with numerous international universities and organizations, including the World Bank through the HEIP project.',
    },
  },
  {
    icon: 'bi-mortarboard',
    title: { km: 'កម្មវិធីសិក្សាទទួលស្គាល់', en: 'Accredited Programs' },
    desc: {
      km: 'កម្មវិធីសិក្សាទាំងអស់ត្រូវបានទទួលស្គាល់ និងអនុម័តដោយក្រសួងអប់រំ យុវជន និងកីឡា។',
      en: 'All academic programs are recognized and approved by the Ministry of Education, Youth and Sport.',
    },
  },
];

const partners = [
  { name: { km: 'ក្រសួងអប់រំ យុវជន និងកីឡា', en: 'MOEYS' }, type: { km: 'រដ្ឋាភិបាល', en: 'Government' }, icon: 'bi-building' },
  { name: { km: 'ធនាគារពិភពលោក', en: 'World Bank' }, type: { km: 'អន្តរជាតិ', en: 'International' }, icon: 'bi-globe2' },
  { name: 'HEIP', type: { km: 'គម្រោង', en: 'Project' }, icon: 'bi-projector' },
  { name: 'American Corner', type: { km: 'អន្តរជាតិ', en: 'International' }, icon: 'bi-flag' },
  { name: 'NALANDA University', type: { km: 'សាកលវិទ្យាល័យ', en: 'University' }, icon: 'bi-mortarboard' },
  { name: { km: 'សមាគម CHEA', en: 'CHEA' }, type: { km: 'សមាគម', en: 'Association' }, icon: 'bi-people' },
  { name: 'ACLEDA Bank', type: { km: 'ឯកជន', en: 'Private' }, icon: 'bi-bank' },
  { name: 'Smart', type: { km: 'ឯកជន', en: 'Private' }, icon: 'bi-phone' },
];

const branches = [
  { km: 'បាត់ដំបង (ទីតាំងគោល)', en: 'Battambang (Main Campus)' },
  { km: 'បន្ទាយមានជ័យ', en: 'Banteay Meanchey' },
  { km: 'កំពង់ចាម', en: 'Kampong Cham' },
  { km: 'ពោធិ៍សាត់', en: 'Pursat' },
  { km: 'ព្រះសីហនុ', en: 'Preah Sihanouk' },
  { km: 'កោះកុង', en: 'Koh Kong' },
  { km: 'ក្រចេះ', en: 'Kratie' },
];

// ============================================================
// COMPONENTS
// ============================================================

// Counter Animation Hook
function useCounter(end, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
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

  return { count, ref };
}

function Counter({ end }) {
  const { count, ref } = useCounter(end);
  return <span ref={ref}>{count.toLocaleString()}</span>;
}

function SectionLabel({ eyebrow, title, subtitle, align = 'center' }) {
  return (
    <div className={`mb-14 ${align === 'center' ? 'text-center mx-auto' : ''}`}>
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

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function AboutPage() {
  const { lang, t } = useLanguage();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedYear, setSelectedYear] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const historyRef = useRef(null);
  const accreditationRef = useRef(null);
  const partnersRef = useRef(null);

  // Handle hash navigation
  useEffect(() => {
    const hash = location.hash?.replace('#', '');
    if (hash && tabs.find(t => t.id === hash)) {
      setActiveTab(hash);
    }
  }, [location.hash]);

  // Scroll to section when tab changes
  useEffect(() => {
    const refs = {
      history: historyRef,
      accreditation: accreditationRef,
      partners: partnersRef,
    };
    if (activeTab !== 'overview' && refs[activeTab]?.current) {
      setTimeout(() => {
        refs[activeTab].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [activeTab]);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const text = {
    breadcrumb: { km: 'អំពី UME', en: 'About UME' },
    heroEyebrow: { km: 'ស្វែងយល់ពីយើង', en: 'Discover Us' },
    heroTitle: { km: 'អំពីសាកលវិទ្យាល័យ', en: 'About the University' },
    heroSubtitle: { km: 'កសាងអនាគតតាមរយៈការអប់រំប្រកបដោយគុណភាព', en: 'Building futures through quality education' },
    identityEyebrow: { km: 'អត្តសញ្ញាណ UME', en: 'UME Identity' },
    identityTitle: { km: 'ទិសដៅរបស់យើង', en: 'Our Direction' },
    videoEyebrow: { km: 'វីដេអូណែនាំ', en: 'Introduction Video' },
    videoTitle: { km: 'ស្វែងយល់ពី UME', en: 'Discover UME' },
    videoDesc: { km: 'ទស្សនាវីដេអូដើម្បីស្វែងយល់បន្ថែមអំពី UME', en: 'Watch the video to learn more about UME' },
    historyTitle: { km: 'ប្រវត្តិសាកលវិទ្យាល័យ', en: 'University History' },
    historySubtitle: { km: 'ជាង ២៦ ឆ្នាំនៃឧត្តមភាព', en: 'Over 26 years of excellence' },
    milestonesTitle: { km: 'ព្រឹត្តិការណ៍សំខាន់ៗ', en: 'Key Milestones' },
    achievement1: { km: 'និស្សិតបញ្ចប់ការសិក្សា', en: 'Total Graduates' },
    achievement2: { km: 'និស្សិតជ័យលាភី', en: 'Honors Graduates' },
    achievementNote: {
      km: '* និស្សិតបញ្ចប់ការសិក្សាជាច្រើនកំពុងកាន់តំណែងសំខាន់ៗក្នុងជួររដ្ឋាភិបាល និងវិស័យឯកជន។',
      en: '* Many graduates hold key positions in government and private sector.',
    },
    accreditationTitle: { km: 'ការទទួលស្គាល់ និងអាជ្ញាបណ្ណ', en: 'Accreditation & License' },
    accreditationSubtitle: { km: 'ការទទួលស្គាល់ជាផ្លូវការពីស្ថាប័នពាក់ព័ន្ធ', en: 'Official recognition from relevant institutions' },
    partnersTitle: { km: 'ដៃគូសហការ', en: 'Our Partners' },
    partnersSubtitle: { km: 'ស្ថាប័នជាតិ និងអន្តរជាតិដែលធ្វើការជាមួយ UME', en: 'National and international organizations working with UME' },
    partnerBenefits: { km: 'អត្ថប្រយោជន៍សម្រាប់និស្សិត', en: 'Benefits for Students' },
    partnerCta: { km: 'ចង់ក្លាយជាដៃគូ?', en: 'Want to become a partner?' },
    partnerCtaDesc: { km: 'ទាក់ទងមកយើងខ្ញុំដើម្បីពិភាក្សាអំពីឱកាសសហការ', en: 'Contact us to discuss collaboration opportunities' },
    contactBtn: { km: 'ទំនាក់ទំនង', en: 'Contact' },
    branchesEyebrow: { km: 'ទីតាំង', en: 'Locations' },
    branchesTitle: { km: 'សាខាទាំង ៧', en: '7 Campuses' },
  };

  const getPartnerName = (p) => (typeof p.name === 'string' ? p.name : p.name[lang]);
  const getPartnerType = (p) => (typeof p.type === 'string' ? p.type : p.type[lang]);

  return (
    <div className="min-h-screen bg-white dark:bg-navy-dark font-sans transition-colors duration-300">
      
      {/* ========== HERO ========== */}
      <section className="relative h-[420px] overflow-hidden bg-navy">
        <img src={topBanner} alt="UME" className="absolute inset-0 w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/40"></div>
        <div className="relative z-10 h-full flex flex-col justify-end pb-16">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="flex items-center gap-2 text-white/50 text-xs mb-6">
              <Link to="/" className="hover:text-gold transition-colors">{t('nav.home')}</Link>
              <i className="bi bi-chevron-right text-[10px]"></i>
              <span className="text-gold">{text.breadcrumb[lang]}</span>
            </div>
            <p className="flex items-center gap-2 text-gold text-xs tracking-[0.25em] uppercase font-bold mb-4">
              <i className="bi bi-building-fill"></i>
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
          <div className="flex overflow-x-auto gap-1 py-2 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  window.history.pushState(null, '', `#${tab.id}`);
                }}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
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
      {/* SECTION: OVERVIEW */}
      {/* ============================================ */}
      <div id="overview-section">
        {/* Video */}
        <section className="py-20 bg-gray-50 dark:bg-white/[0.03]">
          <div className="max-w-4xl mx-auto px-6">
            <SectionLabel 
              eyebrow={text.videoEyebrow[lang]} 
              title={text.videoTitle[lang]} 
            />
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-navy/10 dark:border-white/10">
              <iframe
                src="https://www.youtube.com/embed/68YusX-IIFg"
                title="UME Introduction"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="text-center text-navy/50 dark:text-white/50 mt-6 text-sm max-w-xl mx-auto">
              {text.videoDesc[lang]}
            </p>
          </div>
        </section>

        {/* Vision / Mission / Values */}
        <section className="py-20 bg-white dark:bg-navy-dark">
          <div className="max-w-6xl mx-auto px-6">
            <SectionLabel 
              eyebrow={text.identityEyebrow[lang]} 
              title={text.identityTitle[lang]} 
            />
            <div className="grid md:grid-cols-3 gap-px bg-navy/10 dark:bg-white/10 border border-navy/10 dark:border-white/10 rounded-2xl overflow-hidden">
              {pillars.map((item, idx) => (
                <div
                  key={idx}
                  className="group bg-white dark:bg-navy-dark hover:bg-navy dark:hover:bg-navy p-8 md:p-10 transition-colors duration-500"
                >
                  <i className={`bi ${item.icon} text-3xl text-gold mb-5 block`}></i>
                  <h3 className="text-lg font-bold text-navy dark:text-white group-hover:text-white mb-3 transition-colors">
                    {item.title[lang]}
                  </h3>
                  <p className="text-navy/60 dark:text-white/50 group-hover:text-white/70 text-sm leading-relaxed transition-colors">
                    {item.content[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Branches */}
        <section className="py-20 bg-gray-50 dark:bg-white/[0.03]">
          <div className="max-w-6xl mx-auto px-6">
            <SectionLabel 
              eyebrow={text.branchesEyebrow[lang]} 
              title={text.branchesTitle[lang]} 
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {branches.map((branch, index) => (
                <div
                  key={index}
                  className={`group bg-white dark:bg-navy-dark rounded-xl p-5 hover:shadow-lg transition-all hover:-translate-y-1 border-t-[3px] ${
                    index === 0 ? 'border-gold' : 'border-navy/10 dark:border-white/10 hover:border-gold'
                  }`}
                >
                  <i className={`bi bi-geo-alt-fill text-xl mb-2 block ${index === 0 ? 'text-gold' : 'text-navy/40 dark:text-white/30'}`}></i>
                  <p className="text-navy dark:text-white font-bold text-sm">{branch[lang]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ============================================ */}
      {/* SECTION: HISTORY */}
      {/* ============================================ */}
      <div ref={historyRef} id="history-section">
        <section className="py-20 md:py-28 bg-white dark:bg-navy-dark">
          <div className="max-w-6xl mx-auto px-6">
            <SectionLabel 
              eyebrow={text.historyTitle[lang]} 
              title={text.milestonesTitle[lang]}
              subtitle={text.historySubtitle[lang]} 
            />

            {/* Year Selector */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {historyData.map((item, index) => (
                <button
                  key={item.year}
                  onClick={() => setSelectedYear(index)}
                  className={`p-7 rounded-2xl text-left transition-all duration-300 ${
                    selectedYear === index
                      ? 'bg-navy text-white shadow-lg'
                      : 'bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10'
                  }`}
                >
                  <i className={`bi ${item.icon} text-2xl text-gold mb-4 block`}></i>
                  <div className={`text-3xl font-extrabold mb-1 tracking-tight ${selectedYear === index ? 'text-white' : 'text-navy dark:text-white'}`}>
                    {item.year}
                  </div>
                  <div className={`text-sm font-semibold ${selectedYear === index ? 'text-white/70' : 'text-navy/50 dark:text-white/50'}`}>
                    {item.title[lang]}
                  </div>
                </button>
              ))}
            </div>

            {/* Content Panel */}
            <div className="bg-navy rounded-2xl p-8 md:p-12 text-white">
              <div className="flex items-center gap-4 mb-6">
                <i className={`bi ${historyData[selectedYear].icon} text-3xl text-gold`}></i>
                <div>
                  <div className="text-gold text-2xl font-extrabold">{historyData[selectedYear].year}</div>
                  <div className="text-white/60 text-sm">{historyData[selectedYear].title[lang]}</div>
                </div>
              </div>
              <p className="text-white/75 leading-relaxed">{historyData[selectedYear].content[lang]}</p>
            </div>

            {/* Achievements */}
            <div className="grid md:grid-cols-2 gap-6 mt-10">
              <div className="bg-navy rounded-2xl p-8 text-center">
                <i className="bi bi-people-fill text-3xl text-gold mb-3 block"></i>
                <div className="text-4xl md:text-5xl font-extrabold text-white mb-1 tracking-tight">
                  <Counter end={35302} />+
                </div>
                <div className="text-white/60 text-sm font-medium">{text.achievement1[lang]}</div>
              </div>
              <div className="bg-navy rounded-2xl p-8 text-center">
                <i className="bi bi-award-fill text-3xl text-gold mb-3 block"></i>
                <div className="text-4xl md:text-5xl font-extrabold text-white mb-1 tracking-tight">
                  <Counter end={15595} />+
                </div>
                <div className="text-white/60 text-sm font-medium">{text.achievement2[lang]}</div>
              </div>
            </div>
            <p className="text-navy/40 dark:text-white/40 text-xs mt-4 text-center max-w-2xl mx-auto">
              {text.achievementNote[lang]}
            </p>
          </div>
        </section>
      </div>

      {/* ============================================ */}
      {/* SECTION: ACCREDITATION */}
      {/* ============================================ */}
      <div ref={accreditationRef} id="accreditation-section">
        <section className="py-20 md:py-28 bg-gray-50 dark:bg-white/[0.03]">
          <div className="max-w-6xl mx-auto px-6">
            <SectionLabel 
              eyebrow={text.accreditationTitle[lang]} 
              title={text.accreditationTitle[lang]}
              subtitle={text.accreditationSubtitle[lang]} 
            />
            <div className="grid sm:grid-cols-2 gap-6">
              {accreditationData.map((item, idx) => (
                <div
                  key={idx}
                  className="group bg-white dark:bg-navy-dark rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-white/10"
                >
                  <div className="w-14 h-14 bg-navy/5 dark:bg-white/5 rounded-xl flex items-center justify-center mb-5 group-hover:bg-navy group-hover:text-white transition-colors">
                    <i className={`bi ${item.icon} text-2xl text-navy dark:text-white group-hover:text-gold`}></i>
                  </div>
                  <h3 className="text-lg font-bold text-navy dark:text-white mb-3">{item.title[lang]}</h3>
                  <p className="text-navy/50 dark:text-white/50 text-sm leading-relaxed">{item.desc[lang]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ============================================ */}
      {/* SECTION: PARTNERS */}
      {/* ============================================ */}
      <div ref={partnersRef} id="partners-section">
        {/* Partner Benefits */}
        <section className="py-20 bg-white dark:bg-navy-dark">
          <div className="max-w-6xl mx-auto px-6">
            <SectionLabel 
              eyebrow={text.partnersTitle[lang]} 
              title={text.partnerBenefits[lang]} 
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: 'bi-briefcase', title: { km: 'ឱកាសកម្មសិក្សា', en: 'Internship Opportunities' }, desc: { km: 'កម្មសិក្សានៅក្រុមហ៊ុនដៃគូ', en: 'Internships at partner companies' } },
                { icon: 'bi-award', title: { km: 'អាហារូបករណ៍', en: 'Scholarships' }, desc: { km: 'អាហារូបករណ៍សម្រាប់និស្សិតឆ្នើម', en: 'Scholarships for outstanding students' } },
                { icon: 'bi-search', title: { km: 'ការស្រាវជ្រាវរួមគ្នា', en: 'Joint Research' }, desc: { km: 'គម្រោងស្រាវជ្រាវជាមួយដៃគូ', en: 'Research projects with partners' } },
                { icon: 'bi-check-circle', title: { km: 'ឱកាសការងារ', en: 'Employment' }, desc: { km: 'ឱកាសការងារពីក្រុមហ៊ុនដៃគូ', en: 'Jobs from partner companies' } },
              ].map((item, idx) => (
                <div key={idx} className="text-center bg-gray-50 dark:bg-white/5 rounded-2xl p-6 hover:shadow-md transition-all">
                  <div className="w-14 h-14 bg-navy dark:bg-navy-dark rounded-xl flex items-center justify-center mx-auto mb-4">
                    <i className={`${item.icon} text-2xl text-gold`}></i>
                  </div>
                  <h3 className="font-bold text-navy dark:text-white mb-2">{item.title[lang]}</h3>
                  <p className="text-gray-500 dark:text-white/50 text-sm">{item.desc[lang]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners Grid */}
        <section className="py-20 bg-gray-50 dark:bg-white/[0.03]">
          <div className="max-w-6xl mx-auto px-6">
            <SectionLabel title={text.partnersTitle[lang]} subtitle={text.partnersSubtitle[lang]} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {partners.map((partner, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-navy-dark rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-white/10"
                >
                  <div className="w-16 h-16 bg-navy/5 dark:bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i className={`${partner.icon} text-3xl text-navy/60 dark:text-white/40`}></i>
                  </div>
                  <h3 className="font-bold text-navy dark:text-white text-sm mb-1">{getPartnerName(partner)}</h3>
                  <span className="text-xs text-gray-400 dark:text-white/40 bg-gray-100 dark:bg-white/10 px-2 py-1 rounded-full">
                    {getPartnerType(partner)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-navy text-center">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-white mb-4">{text.partnerCta[lang]}</h2>
            <p className="text-white/70 mb-6">{text.partnerCtaDesc[lang]}</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gold text-navy px-6 py-3 rounded-full font-bold hover:bg-gold-light transition-all"
            >
              {text.contactBtn[lang]} <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </section>
      </div>

      {/* ========== SCROLL TO TOP ========== */}
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