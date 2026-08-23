import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLanguage } from '../context/LanguageContext';
import associateHero from '../assets/Master Degree Image for web 2024.jpg';

// ============================================================
// DATA
// ============================================================

const associatePrograms = [
  {
    id: 'accounting-finance',
    icon: 'bi-calculator-fill',
    color: 'from-blue-600 to-cyan-500',
    bgColor: 'bg-blue-500',
    title: { km: 'គណនេយ្យ និងហិរញ្ញវត្ថុ', en: 'Accounting and Finance' },
    description: {
      km: 'សិក្សាពីគោលការណ៍គណនេយ្យ ហិរញ្ញវត្ថុ និងការគ្រប់គ្រងហិរញ្ញវត្ថុសម្រាប់អាជីវកម្មទំនើប។',
      en: 'Study accounting principles, finance, and financial management for modern business.',
    },
  },
  {
    id: 'general-management',
    icon: 'bi-briefcase-fill',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-500',
    title: { km: 'គ្រប់គ្រងទូទៅ', en: 'General Management' },
    description: {
      km: 'អភិវឌ្ឍជំនាញគ្រប់គ្រងទូទៅ ការដឹកនាំ និងការសម្រេចចិត្តក្នុងអាជីវកម្ម។',
      en: 'Develop general management, leadership, and decision-making skills in business.',
    },
  },
  {
    id: 'banking-finance',
    icon: 'bi-bank',
    color: 'from-emerald-600 to-teal-500',
    bgColor: 'bg-emerald-500',
    title: { km: 'ធនាគារ និងហិរញ្ញវត្ថុ', en: 'Banking and Finance' },
    description: {
      km: 'ស្វែងយល់ពីប្រព័ន្ធធនាគារ សេវាហិរញ្ញវត្ថុ និងការគ្រប់គ្រងហានិភ័យហិរញ្ញវត្ថុ។',
      en: 'Explore banking systems, financial services, and financial risk management.',
    },
  },
  {
    id: 'human-resource',
    icon: 'bi-people-fill',
    color: 'from-purple-600 to-pink-500',
    bgColor: 'bg-purple-500',
    title: { km: 'គ្រប់គ្រងធនធានមនុស្ស', en: 'Human Resource Management' },
    description: {
      km: 'រៀនពីការជ្រើសរើស បណ្តុះបណ្តាល និងគ្រប់គ្រងធនធានមនុស្សក្នុងអង្គភាព។',
      en: 'Learn about recruitment, training, and managing human resources in organizations.',
    },
  },
  {
    id: 'marketing',
    icon: 'bi-megaphone-fill',
    color: 'from-rose-500 to-red-500',
    bgColor: 'bg-rose-500',
    title: { km: 'គ្រប់គ្រងទីផ្សារ', en: 'Marketing' },
    description: {
      km: 'សិក្សាពីយុទ្ធសាស្ត្រទីផ្សារ ឥរិយាបថអ្នកប្រើប្រាស់ និងទីផ្សារឌីជីថល។',
      en: 'Study marketing strategies, consumer behavior, and digital marketing.',
    },
  },
];

const year1Courses = [
  { km: 'ប្រវត្តិសាស្ត្រប្រទេសកម្ពុជា', en: 'History of Cambodia' },
  { km: 'សង្គមវិទ្យា', en: 'Sociology' },
  { km: 'ការគ្រប់គ្រងការិយាល័យ', en: 'Office Administration' },
  { km: 'ទស្សនៈសាសនា', en: 'Basics Buddhism' },
  { km: 'គណិតវិទ្យាធុរកិច្ច', en: 'Business Maths' },
  { km: 'សេចក្តីផ្តើមនៃសេដ្ឋកិច្ច', en: 'Introduction to Economic' },
  { km: 'សេចក្តីផ្តើមនៃទីផ្សារ', en: 'Principle of Marketing' },
  { km: 'លំនាំដើមនៃការគ្រប់គ្រង', en: 'Introduction of Management' },
  { km: 'សេចក្តីផ្តើមនៃកុំព្យូទ័រ', en: 'Basics of Computer' },
  { km: 'មីក្រូសេដ្ឋកិច្ច', en: 'Micro Economics' },
  { km: 'តំណាងដំណោះស្រាយភាគហ៊ុន', en: 'Introduction to Business' },
  { km: 'ភាសាអង់គ្លេសសម្រាប់សាកលវិទ្យាល័យ ភាគ១ & ភាគ២', en: 'English for University I & II' },
];

const year2Courses = [
  { km: 'គោលការណ៍គណនេយ្យ', en: 'Accounting Principle' },
  { km: 'ការគ្រប់គ្រងការដឹកជញ្ជូន', en: 'Shipping Management' },
  { km: 'ឥរិយាបថអង្គភាព', en: 'Organizational Behavior' },
  { km: 'នីតិពាណិជ្ជកម្ម', en: 'Business Law' },
  { km: 'សេចក្តីផ្តើមនៃសហគ្រិនភាព', en: 'Introduction to Entrepreneurship' },
  { km: 'គណនេយ្យហិរញ្ញវត្ថុ', en: 'Financial Accounting' },
  { km: 'សេវាកម្មទីផ្សារ', en: 'Service Marketing' },
  { km: 'ម៉ាក្រូសេដ្ឋកិច្ច', en: 'Macro Economics' },
  { km: 'គ្រប់គ្រងធនធានមនុស្ស', en: 'Human Resource Management' },
  { km: 'រូបិយប័ណ្ណ និងធនាគារ', en: 'Money and Banking' },
  { km: 'ការអនុវត្តន៍ នៃសហគ្រិនភាព', en: 'The Practice of Entrepreneurship' },
  { km: 'ភាសាអង់គ្លេសសម្រាប់សាកលវិទ្យាល័យ ភាគ៣ & ភាគ៤', en: 'English for University III & IV' },
];

// ============================================================
// COMPONENTS
// ============================================================

function SectionBadge({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-gold/10 text-gold border border-gold/20 ${className}`}>
      {children}
    </span>
  );
}

function ScrollReveal({ children, className = '' }) {
  const [visible, setVisible] = useState(false);
  const ref = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function AssociateDegreePage() {
  const { lang, t } = useLanguage();
  const [activeProgram, setActiveProgram] = useState(0);
  const [activeYear, setActiveYear] = useState('year1');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const text = {
    breadcrumb: { km: 'បរិញ្ញាបត្ររង', en: 'Associate Degree' },
    heroTitle: { km: 'កម្មវិធីថ្នាក់បរិញ្ញាបត្ររង', en: 'Associate Degree Programs' },
    heroSubtitle: { km: 'ចាប់ផ្តើមមូលដ្ឋានគ្រឹះអាជីពរបស់អ្នកជាមួយកម្មវិធីរយៈពេល ២ ឆ្នាំ', en: 'Start your career foundation with a 2-year program' },
    programsTitle: { km: 'ជ្រើសរើសជំនាញសិក្សា', en: 'Choose Your Major' },
    curriculumTitle: { km: 'កម្មវិធីសិក្សាតាមឆ្នាំសិក្សា', en: 'Curriculum by Academic Year' },
    year1: { km: 'ឆ្នាំទី១', en: 'Year 1' },
    year2: { km: 'ឆ្នាំទី២', en: 'Year 2' },
    credit: { km: 'ក្រេឌីត', en: 'Credits' },
    totalCredits: { km: 'សរុបក្រេឌីត', en: 'Total Credits' },
    duration: { km: 'រយៈពេល ២ ឆ្នាំ', en: '2 Years' },
    degree: { km: 'បរិញ្ញាបត្ររង', en: 'Associate Degree' },
    ctaTitle: { km: 'ត្រៀមខ្លួនចាប់ផ្តើមដំណើរសិក្សាហើយឬនៅ?', en: 'Ready to Start Your Journey?' },
    ctaSubtitle: { km: 'ចុះឈ្មោះឥឡូវនេះដើម្បីចាប់ផ្តើមការសិក្សាថ្នាក់បរិញ្ញាបត្ររង', en: 'Apply now to start your Associate Degree' },
    ctaBtn: { km: 'ចុះឈ្មោះឥឡូវនេះ', en: 'Apply Now' },
    contactBtn: { km: 'សាកសួរព័ត៌មាន', en: 'Inquire Now' },
    programOverview: { km: 'អំពីកម្មវិធីសិក្សា', en: 'Program Overview' },
    yearLabel: { km: 'ឆ្នាំសិក្សា', en: 'Academic Year' },
  };

  const yearCourses = activeYear === 'year1' ? year1Courses : year2Courses;
  const totalCredits = yearCourses.length * 3;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-sans transition-colors duration-300">
      
      {/* ============================================ */}
      {/* HERO */}
      {/* ============================================ */}
     <section className="relative h-[450px] md:h-[550px] lg:h-[600px] overflow-hidden bg-gray-900">
  <img 
    src={associateHero} 
    alt="Associate Degree" 
    className="absolute inset-0 w-full h-full object-cover"
    onError={(e) => {
      e.target.style.display = 'none';
      e.target.parentElement.style.background = 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)';
    }}
  />
  <div className="absolute inset-0 bg-gradient-to-r from-gray-900/85 via-gray-900/55 to-transparent"></div>
  
  <div className="relative z-10 h-full flex items-center">
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full">
      <div className="max-w-3xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-white/50 text-xs md:text-sm mb-6">
          <Link to="/" className="hover:text-gold transition-colors">{t('nav.home')}</Link>
          <i className="bi bi-chevron-right text-[10px]"></i>
          <Link to="/programs" className="hover:text-gold transition-colors">{t('nav.programs')}</Link>
          <i className="bi bi-chevron-right text-[10px]"></i>
          <span className="text-gold">{text.breadcrumb[lang]}</span>
        </div>
        
        <SectionBadge className="mb-5">
          <i className="bi bi-mortarboard-fill"></i> {text.degree[lang]}
        </SectionBadge>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6">
          {text.heroTitle[lang]}
        </h1>
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mb-8 leading-relaxed">
          {text.heroSubtitle[lang]}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 bg-white/10 text-white text-sm md:text-base px-5 py-2.5 rounded-full backdrop-blur-sm">
            <i className="bi bi-clock text-gold"></i> {text.duration[lang]}
          </span>
          <span className="inline-flex items-center gap-2 bg-gold/20 text-gold text-sm md:text-base px-5 py-2.5 rounded-full backdrop-blur-sm border border-gold/30">
            <i className="bi bi-journal-text"></i> {totalCredits} {text.credit[lang]}
          </span>
        </div>
      </div>
    </div>
  </div>
  
  {/* Scroll Indicator */}
  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
    <i className="bi bi-chevron-down text-white/40 text-xl"></i>
  </div>
</section>

      {/* ============================================ */}
      {/* PROGRAM SELECTOR CARDS */}
      {/* ============================================ */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <SectionBadge className="mb-4">
              <i className="bi bi-collection"></i> {text.programsTitle[lang]}
            </SectionBadge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
              {text.programsTitle[lang]}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {associatePrograms.map((prog, idx) => (
              <button
                key={prog.id}
                onClick={() => setActiveProgram(idx)}
                className={`group relative p-5 rounded-2xl text-center transition-all duration-300 hover:-translate-y-2 ${
                  activeProgram === idx
                    ? 'bg-white dark:bg-gray-800 shadow-2xl ring-2 ring-gold scale-105'
                    : 'bg-gray-50 dark:bg-gray-800/50 shadow-md hover:shadow-xl border border-gray-100 dark:border-gray-700'
                }`}
              >
                {/* Icon */}
                <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${prog.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <i className={`bi ${prog.icon} text-2xl text-white`}></i>
                </div>
                
                {/* Title */}
                <h3 className={`font-bold text-sm leading-snug mb-2 transition-colors ${
                  activeProgram === idx ? 'text-gold' : 'text-gray-900 dark:text-white'
                }`}>
                  {prog.title[lang]}
                </h3>

                {/* Active Indicator */}
                {activeProgram === idx && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gold rounded-full flex items-center justify-center shadow-md">
                    <i className="bi bi-check-lg text-white text-xs"></i>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Selected Program Overview */}
          <ScrollReveal>
            <div className={`mt-8 p-6 md:p-8 rounded-2xl bg-gradient-to-br ${associatePrograms[activeProgram].color} text-white shadow-xl`}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className={`bi ${associatePrograms[activeProgram].icon} text-2xl`}></i>
                </div>
                <div>
                  <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-1">{text.programOverview[lang]}</p>
                  <h3 className="text-xl font-bold mb-2">{associatePrograms[activeProgram].title[lang]}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{associatePrograms[activeProgram].description[lang]}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================ */}
      {/* CURRICULUM BY YEAR */}
      {/* ============================================ */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <SectionBadge className="mb-4">
              <i className="bi bi-calendar-range"></i> {text.curriculumTitle[lang]}
            </SectionBadge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
              {text.curriculumTitle[lang]}
            </h2>
          </div>

          {/* Year Tabs */}
          <div className="flex justify-center gap-3 mb-10">
            <button
              onClick={() => setActiveYear('year1')}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                activeYear === 'year1'
                  ? 'bg-white dark:bg-gray-800 shadow-xl text-gray-900 dark:text-white ring-2 ring-gold'
                  : 'bg-white/50 dark:bg-gray-800/30 text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800'
              }`}
            >
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-extrabold ${
                activeYear === 'year1' ? 'bg-gold text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              }`}>1</span>
              <div className="text-left">
                <div className="text-sm font-bold">{text.year1[lang]}</div>
                <div className="text-xs opacity-60">12 {lang === 'km' ? 'មុខវិជ្ជា' : 'Courses'}</div>
              </div>
            </button>

            <button
              onClick={() => setActiveYear('year2')}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                activeYear === 'year2'
                  ? 'bg-white dark:bg-gray-800 shadow-xl text-gray-900 dark:text-white ring-2 ring-gold'
                  : 'bg-white/50 dark:bg-gray-800/30 text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800'
              }`}
            >
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-extrabold ${
                activeYear === 'year2' ? 'bg-gold text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              }`}>2</span>
              <div className="text-left">
                <div className="text-sm font-bold">{text.year2[lang]}</div>
                <div className="text-xs opacity-60">12 {lang === 'km' ? 'មុខវិជ្ជា' : 'Courses'}</div>
              </div>
            </button>
          </div>

          {/* Courses Grid */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 flex items-center justify-between">
              <h3 className="text-white font-bold flex items-center gap-2">
                <i className="bi bi-journal-bookmark-fill text-gold"></i>
                {activeYear === 'year1' ? text.year1[lang] : text.year2[lang]} - {text.yearLabel[lang]}
              </h3>
              <span className="text-gold text-sm font-bold bg-white/10 px-3 py-1 rounded-full">
                {totalCredits} {text.credit[lang]}
              </span>
            </div>

            {/* Courses List */}
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {yearCourses.map((course, idx) => (
                <div key={idx} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors group">
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-sm font-bold text-gray-500 dark:text-gray-400 group-hover:bg-gold group-hover:text-white transition-colors flex-shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">
                        {course[lang]}
                      </p>
                      <p className="text-gray-400 dark:text-gray-500 text-xs">
                        {course.en}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gold bg-gold/10 px-3 py-1 rounded-full whitespace-nowrap">
                    3 {text.credit[lang]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA */}
      {/* ============================================ */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 border-2 border-gold rounded-full"></div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <i className="bi bi-mortarboard-fill text-gold text-4xl mb-6 inline-block"></i>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-5">{text.ctaTitle[lang]}</h2>
          <p className="text-white/60 text-lg mb-8">{text.ctaSubtitle[lang]}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/admission"
              className="bg-gold hover:bg-gold-light text-gray-900 px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-gold/20"
            >
              {text.ctaBtn[lang]} <i className="bi bi-arrow-right ml-2"></i>
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white/30 hover:border-white text-white px-10 py-4 rounded-full font-bold text-lg transition-all"
            >
              {text.contactBtn[lang]} <i className="bi bi-telephone ml-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Scroll to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 z-50 bg-gold text-gray-900 w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all hover:bg-gold-light hover:scale-110 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <i className="bi bi-arrow-up text-xl"></i>
      </button>
    </div>
  );
}