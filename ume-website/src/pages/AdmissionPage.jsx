import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLanguage } from '../context/LanguageContext';

// ============================================================
// DATA
// ============================================================

const heroBanner = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=80';

const tabs = [
  { id: 'admission', icon: 'bi-pencil-square', label: { km: 'ចុះឈ្មោះចូលរៀន', en: 'Admission' } },
  { id: 'tuition', icon: 'bi-cash-stack', label: { km: 'តម្លៃសិក្សា', en: 'Tuition Fees' } },
  { id: 'scholarship', icon: 'bi-award', label: { km: 'អាហារូបករណ៍', en: 'Scholarships' } },
];

// Admission Process
const admissionSteps = [
  {
    step: '01',
    icon: 'bi-file-text',
    title: { km: 'បំពេញពាក្យសុំ', en: 'Fill Application' },
    desc: {
      km: 'បំពេញទម្រង់ចុះឈ្មោះតាមអនឡាញ ឬមកដោយផ្ទាល់នៅសាកលវិទ្យាល័យ។',
      en: 'Fill out the registration form online or in person at the university.',
    },
  },
  {
    step: '02',
    icon: 'bi-upload',
    title: { km: 'ដាក់ឯកសារ', en: 'Submit Documents' },
    desc: {
      km: 'ដាក់ឯកសារចាំបាច់ដូចជា សញ្ញាបត្រ អត្តសញ្ញាណប័ណ្ណ និងរូបថត។',
      en: 'Submit required documents such as certificates, ID card, and photos.',
    },
  },
  {
    step: '03',
    icon: 'bi-check-circle',
    title: { km: 'បង់ថ្លៃចុះឈ្មោះ', en: 'Pay Registration Fee' },
    desc: {
      km: 'បង់ថ្លៃចុះឈ្មោះតាមរយៈធនាគារ ឬការិយាល័យហិរញ្ញវត្ថុ។',
      en: 'Pay the registration fee through bank or finance office.',
    },
  },
  {
    step: '04',
    icon: 'bi-mortarboard',
    title: { km: 'ចាប់ផ្តើមសិក្សា', en: 'Start Studying' },
    desc: {
      km: 'ទទួលកាលវិភាគសិក្សា និងចាប់ផ្តើមដំណើរសិក្សារបស់អ្នក។',
      en: 'Receive your class schedule and begin your academic journey.',
    },
  },
];

const requirements = [
  { km: 'រូបថត ៤x៦ ចំនួន ៤ សន្លឹក', en: '4 photos (4x6)' },
  { km: 'ច្បាប់ថតចម្លងសញ្ញាបត្រ ឬវិញ្ញាបនបត្រ', en: 'Copy of diploma or certificate' },
  { km: 'ច្បាប់ថតចម្លងអត្តសញ្ញាណប័ណ្ណ', en: 'Copy of ID card' },
  { km: 'ច្បាប់ថតចម្លងសៀវភៅគ្រួសារ', en: 'Copy of family book' },
  { km: 'ពាក្យសុំចុះឈ្មោះ (មាននៅសាកលវិទ្យាល័យ)', en: 'Application form (available at university)' },
];

// Tuition Data
const tuitionPrograms = [
  {
    faculty: { km: 'គ្រប់គ្រង និងទេសចរណ៍', en: 'Management & Tourism' },
    icon: 'bi-briefcase',
    programs: [
      { name: { km: 'បរិញ្ញាបត្រ', en: 'Bachelor' }, fee: '$450', period: { km: '/ឆមាស', en: '/semester' } },
      { name: { km: 'បរិញ្ញាបត្រជាន់ខ្ពស់', en: 'Master' }, fee: '$600', period: { km: '/ឆមាស', en: '/semester' } },
    ],
  },
  {
    faculty: { km: 'អក្សរសាស្ត្រ និងភាសា', en: 'Arts & Languages' },
    icon: 'bi-book',
    programs: [
      { name: { km: 'បរិញ្ញាបត្រ', en: 'Bachelor' }, fee: '$400', period: { km: '/ឆមាស', en: '/semester' } },
      { name: { km: 'បរិញ្ញាបត្រជាន់ខ្ពស់', en: 'Master' }, fee: '$550', period: { km: '/ឆមាស', en: '/semester' } },
    ],
  },
  {
    faculty: { km: 'វិទ្យាសាស្ត្រ និងបច្ចេកវិទ្យា', en: 'Science & Technology' },
    icon: 'bi-laptop',
    programs: [
      { name: { km: 'បរិញ្ញាបត្រ', en: 'Bachelor' }, fee: '$500', period: { km: '/ឆមាស', en: '/semester' } },
      { name: { km: 'បរិញ្ញាបត្រជាន់ខ្ពស់', en: 'Master' }, fee: '$650', period: { km: '/ឆមាស', en: '/semester' } },
    ],
  },
  {
    faculty: { km: 'ច្បាប់ និងសេដ្ឋកិច្ច', en: 'Law & Economics' },
    icon: 'bi-bank',
    programs: [
      { name: { km: 'បរិញ្ញាបត្រ', en: 'Bachelor' }, fee: '$450', period: { km: '/ឆមាស', en: '/semester' } },
      { name: { km: 'បរិញ្ញាបត្រជាន់ខ្ពស់', en: 'Master' }, fee: '$600', period: { km: '/ឆមាស', en: '/semester' } },
    ],
  },
  {
    faculty: { km: 'កសិកម្ម និងអភិវឌ្ឍន៍ជនបទ', en: 'Agriculture & Rural Development' },
    icon: 'bi-tree',
    programs: [
      { name: { km: 'បរិញ្ញាបត្រ', en: 'Bachelor' }, fee: '$400', period: { km: '/ឆមាស', en: '/semester' } },
      { name: { km: 'បរិញ្ញាបត្រជាន់ខ្ពស់', en: 'Master' }, fee: '$550', period: { km: '/ឆមាស', en: '/semester' } },
    ],
  },
];

const additionalFees = [
  { name: { km: 'ថ្លៃចុះឈ្មោះ', en: 'Registration Fee' }, fee: '$30', period: { km: '(ម្តង)', en: '(once)' } },
  { name: { km: 'ថ្លៃប្រឡង', en: 'Exam Fee' }, fee: '$20', period: { km: '/ឆមាស', en: '/semester' } },
  { name: { km: 'ថ្លៃបណ្ណាល័យ', en: 'Library Fee' }, fee: '$10', period: { km: '/ឆមាស', en: '/semester' } },
  { name: { km: 'ថ្លៃកីឡា', en: 'Sports Fee' }, fee: '$5', period: { km: '/ឆមាស', en: '/semester' } },
];

// Scholarship Data
const scholarships = [
  {
    icon: 'bi-trophy',
    title: { km: 'អាហារូបករណ៍ពូកែ', en: 'Excellence Scholarship' },
    coverage: { km: '១០០% ថ្លៃសិក្សា', en: '100% Tuition' },
    criteria: {
      km: 'និទ្ទេស A ឬ B+ ក្នុងការប្រឡងមធ្យមសិក្សាទុតិយភូមិ',
      en: 'Grade A or B+ in high school exam',
    },
    color: 'from-gold to-amber-500',
  },
  {
    icon: 'bi-star',
    title: { km: 'អាហារូបករណ៍ទេពកោសល្យ', en: 'Talent Scholarship' },
    coverage: { km: '៧៥% ថ្លៃសិក្សា', en: '75% Tuition' },
    criteria: {
      km: 'និទ្ទេស B ឬ C+ ជាមួយទេពកោសល្យពិសេស',
      en: 'Grade B or C+ with special talent',
    },
    color: 'from-blue-600 to-blue-400',
  },
  {
    icon: 'bi-heart',
    title: { km: 'អាហារូបករណ៍សង្គម', en: 'Social Scholarship' },
    coverage: { km: '៥០% ថ្លៃសិក្សា', en: '50% Tuition' },
    criteria: {
      km: 'សម្រាប់និស្សិតមកពីគ្រួសារក្រីក្រ ឬតំបន់ដាច់ស្រយាល',
      en: 'For students from poor families or remote areas',
    },
    color: 'from-green-600 to-emerald-400',
  },
  {
    icon: 'bi-people',
    title: { km: 'អាហារូបករណ៍បងប្អូន', en: 'Sibling Scholarship' },
    coverage: { km: '២៥% ថ្លៃសិក្សា', en: '25% Tuition' },
    criteria: {
      km: 'សម្រាប់បងប្អូនដែលសិក្សាក្នុង UME ដូចគ្នា',
      en: 'For siblings studying at UME together',
    },
    color: 'from-purple-600 to-violet-400',
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

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function AdmissionPage() {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('admission');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const text = {
    breadcrumb: { km: 'ចុះឈ្មោះចូលរៀន', en: 'Admission' },
    heroEyebrow: { km: 'ចាប់ផ្តើមដំណើរសិក្សា', en: 'Start Your Journey' },
    heroTitle: { km: 'ចុះឈ្មោះចូលរៀន', en: 'Admission' },
    heroSubtitle: { km: 'ចាប់ផ្តើមអនាគតរបស់អ្នកជាមួយ UME ថ្ងៃនេះ', en: 'Start your future with UME today' },
    admissionTitle: { km: 'ដំណើរការចុះឈ្មោះ', en: 'Admission Process' },
    admissionSubtitle: { km: '៤ ជំហានងាយៗដើម្បីចូលរៀននៅ UME', en: '4 easy steps to enroll at UME' },
    requirementsTitle: { km: 'ឯកសារចាំបាច់', en: 'Required Documents' },
    requirementsSubtitle: { km: 'ឯកសារដែលត្រូវភ្ជាប់មកជាមួយពាក្យសុំ', en: 'Documents to attach with application' },
    tuitionTitle: { km: 'តម្លៃសិក្សា', en: 'Tuition Fees' },
    tuitionSubtitle: { km: 'តម្លៃសិក្សាតាមមហាវិទ្យាល័យ និងកម្រិតសិក្សា', en: 'Tuition fees by faculty and study level' },
    additionalFeesTitle: { km: 'ថ្លៃសេវាបន្ថែម', en: 'Additional Fees' },
    scholarshipTitle: { km: 'អាហារូបករណ៍', en: 'Scholarships' },
    scholarshipSubtitle: { km: 'ឱកាសអាហារូបករណ៍សម្រាប់និស្សិត', en: 'Scholarship opportunities for students' },
    note: { km: '* តម្លៃអាចមានការផ្លាស់ប្តូរ។ សូមទាក់ទងការិយាល័យសម្រាប់ព័ត៌មានថ្មីៗ។', en: '* Prices may change. Please contact office for latest information.' },
    ctaTitle: { km: 'ត្រៀមខ្លួនចាប់ផ្តើមដំណើរសិក្សាហើយឬនៅ?', en: 'Ready to Start Your Journey?' },
    ctaDesc: { km: 'ចុះឈ្មោះឥឡូវនេះ ឬទាក់ទងមកយើងខ្ញុំសម្រាប់ព័ត៌មានបន្ថែម', en: 'Apply now or contact us for more information' },
    applyBtn: { km: 'ចុះឈ្មោះឥឡូវនេះ', en: 'Apply Now' },
    contactBtn: { km: 'ទំនាក់ទំនង', en: 'Contact' },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-navy-dark font-sans transition-colors duration-300">
      
      {/* ========== HERO ========== */}
      <section className="relative h-[400px] overflow-hidden bg-navy">
        <img src={heroBanner} alt="Admission" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/40"></div>
        <div className="relative z-10 h-full flex flex-col justify-end pb-16">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="flex items-center gap-2 text-white/50 text-xs mb-6">
              <Link to="/" className="hover:text-gold transition-colors">{t('nav.home')}</Link>
              <i className="bi bi-chevron-right text-[10px]"></i>
              <span className="text-gold">{text.breadcrumb[lang]}</span>
            </div>
            <p className="flex items-center gap-2 text-gold text-xs tracking-[0.25em] uppercase font-bold mb-4">
              <i className="bi bi-pencil-square"></i>
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
      {/* SECTION: ADMISSION */}
      {/* ============================================ */}
      <div id="admission-section">
        {/* Steps */}
        <section className="py-20 bg-white dark:bg-navy-dark">
          <div className="max-w-5xl mx-auto px-6">
            <SectionLabel 
              title={text.admissionTitle[lang]} 
              subtitle={text.admissionSubtitle[lang]} 
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {admissionSteps.map((step, idx) => (
                <div key={idx} className="relative group">
                  {/* Connector Line */}
                  {idx < admissionSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-full w-full h-[2px] bg-gold/20 -z-10">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-gold rounded-full"></div>
                    </div>
                  )}
                  <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-2 border border-gray-100 dark:border-white/10 h-full">
                    <div className="text-4xl font-extrabold text-gold/20 mb-3">{step.step}</div>
                    <div className="w-14 h-14 bg-navy rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gold transition-colors">
                      <i className={`bi ${step.icon} text-2xl text-white`}></i>
                    </div>
                    <h3 className="font-bold text-navy dark:text-white mb-2">{step.title[lang]}</h3>
                    <p className="text-navy/50 dark:text-white/50 text-sm">{step.desc[lang]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-20 bg-gray-50 dark:bg-white/[0.03]">
          <div className="max-w-4xl mx-auto px-6">
            <SectionLabel 
              title={text.requirementsTitle[lang]} 
              subtitle={text.requirementsSubtitle[lang]} 
            />
            <div className="bg-white dark:bg-navy-dark rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-white/10">
              <div className="grid sm:grid-cols-2 gap-4">
                {requirements.map((req, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="bi bi-check-lg text-gold"></i>
                    </div>
                    <span className="text-navy dark:text-white text-sm">{req[lang]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ============================================ */}
      {/* SECTION: TUITION FEES */}
      {/* ============================================ */}
      <div id="tuition-section">
        <section className="py-20 bg-white dark:bg-navy-dark">
          <div className="max-w-5xl mx-auto px-6">
            <SectionLabel 
              eyebrow={text.tuitionTitle[lang]} 
              title={text.tuitionTitle[lang]} 
              subtitle={text.tuitionSubtitle[lang]} 
            />
            
            {/* Tuition Table */}
            <div className="space-y-4 mb-10">
              {tuitionPrograms.map((faculty, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-white/10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center">
                      <i className={`bi ${faculty.icon} text-xl text-gold`}></i>
                    </div>
                    <h3 className="font-bold text-navy dark:text-white">{faculty.faculty[lang]}</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {faculty.programs.map((prog, i) => (
                      <div key={i} className="flex justify-between items-center bg-white dark:bg-navy-dark rounded-xl px-4 py-3">
                        <span className="text-navy/70 dark:text-white/70 text-sm">{prog.name[lang]}</span>
                        <span className="font-bold text-navy dark:text-white">
                          {prog.fee}
                          <span className="text-navy/40 dark:text-white/40 text-xs font-normal">{prog.period[lang]}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Fees */}
            <div className="bg-navy rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">{text.additionalFeesTitle[lang]}</h3>
              <div className="space-y-2">
                {additionalFees.map((fee, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                    <span className="text-white/70 text-sm">{fee.name[lang]}</span>
                    <span className="font-bold">
                      {fee.fee}
                      <span className="text-white/40 text-xs font-normal ml-1">{fee.period[lang]}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-navy/40 dark:text-white/40 text-xs mt-4 text-center">{text.note[lang]}</p>
          </div>
        </section>
      </div>

      {/* ============================================ */}
      {/* SECTION: SCHOLARSHIPS */}
      {/* ============================================ */}
      <div id="scholarship-section">
        <section className="py-20 bg-gray-50 dark:bg-white/[0.03]">
          <div className="max-w-5xl mx-auto px-6">
            <SectionLabel 
              eyebrow={text.scholarshipTitle[lang]} 
              title={text.scholarshipTitle[lang]} 
              subtitle={text.scholarshipSubtitle[lang]} 
            />
            <div className="grid sm:grid-cols-2 gap-6">
              {scholarships.map((scholarship, idx) => (
                <div
                  key={idx}
                  className="group bg-white dark:bg-navy-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-white/10"
                >
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${scholarship.color} p-6 text-white`}>
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <i className={`bi ${scholarship.icon} text-2xl`}></i>
                    </div>
                    <h3 className="text-lg font-bold mb-1">{scholarship.title[lang]}</h3>
                    <p className="text-white/80 text-sm font-semibold">{scholarship.coverage[lang]}</p>
                  </div>
                  {/* Body */}
                  <div className="p-6">
                    <div className="flex items-start gap-3">
                      <i className="bi bi-check-circle text-gold mt-0.5"></i>
                      <p className="text-navy/60 dark:text-white/50 text-sm">{scholarship.criteria[lang]}</p>
                    </div>
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
          <i className="bi bi-rocket-takeoff text-4xl text-gold mb-4 block"></i>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{text.ctaTitle[lang]}</h2>
          <p className="text-white/60 text-lg mb-8">{text.ctaDesc[lang]}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/admission"
              className="inline-flex items-center gap-2 bg-gold text-navy px-8 py-4 rounded-full font-bold text-lg hover:bg-gold-light transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              {text.applyBtn[lang]} <i className="bi bi-arrow-right"></i>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all border border-white/20 hover:-translate-y-1"
            >
              {text.contactBtn[lang]} <i className="bi bi-telephone"></i>
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