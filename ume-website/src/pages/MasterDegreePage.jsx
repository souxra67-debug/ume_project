import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLanguage } from '../context/LanguageContext';
import masterDegreeHero from '../assets/Master Degree Image for web 2024.jpg';

// ============================================================
// DATA
// ============================================================

const masterPrograms = [
  {
    id: 'management-tourism',
    icon: 'bi-briefcase-fill',
    color: 'bg-amber-500',
    title: { km: 'គ្រប់គ្រងពាណិជ្ជកម្ម និងទេសចរណ៍', en: 'Management and Tourism' },
    subtitle: { km: 'បរិញ្ញាបត្រជាន់ខ្ពស់', en: 'Master\'s Degree' },
    curriculum: {
      common: {
        title: { km: 'មុខវិជ្ជាសិក្សារួម', en: 'Common Courses' },
        courses: [
          { km: 'មូលដ្ឋានគ្រឹះនៃការគ្រប់គ្រង', en: 'Foundations of Management' },
          { km: 'ការគ្រប់គ្រងគម្រោង', en: 'Project Management' },
          { km: 'គ្រប់គ្រងធនធានមនុស្ស', en: 'Human Resource Management' },
          { km: 'វិធីសាស្ត្រស្រាវជ្រាវ', en: 'Research Methodology' },
        ],
      },
      major: {
        title: { km: 'មុខវិជ្ជាសិក្សាឯកទេស', en: 'Major Courses' },
        courses: [
          { km: 'សេដ្ឋកិច្ចគ្រប់គ្រង', en: 'Managerial Economics' },
          { km: 'ការគ្រប់គ្រងទីផ្សារ', en: 'Marketing Management' },
          { km: 'ទំនាក់ទំនងអន្តរជាតិ', en: 'International Relationship' },
          { km: 'ការដឹកនាំសកលលោក', en: 'Global Leadership' },
        ],
      },
      elective: {
        title: { km: 'មុខវិជ្ជាសិក្សាជ្រើសរើស', en: 'Elective Courses' },
        courses: [
          { km: 'ការគ្រប់គ្រងហិរញ្ញវត្ថុ', en: 'Financial Management' },
          { km: 'ការគ្រប់គ្រងការផ្លាស់ប្តូរ', en: 'Change Management' },
          { km: 'ការគ្រប់គ្រងសហគ្រិនភាព', en: 'Entrepreneurship Management' },
          { km: 'ប្រសិទ្ធភាពនៃការគ្រប់គ្រង និងការសម្រេចចិត្ត', en: 'Effective Management and Decision Making' },
        ],
      },
      additional: {
        title: { km: 'មុខវិជ្ជាសិក្សាបន្ថែម', en: 'Additional Courses' },
        courses: [
          { km: 'សីលធម៌អាជីវកម្ម', en: 'Business Ethics' },
          { km: 'បរិយាកាសធុរកិច្ចអន្តរជាតិ', en: 'International Business Environment' },
          { km: 'ឥរិយាបថអង្គភាព', en: 'Organizational Behavior' },
        ],
      },
    },
  },
  {
    id: 'law-economics',
    icon: 'bi-bank',
    color: 'bg-rose-500',
    title: { km: 'នីតិសាស្រ្ត និងសេដ្ឋកិច្ច', en: 'Law and Economics' },
    subtitle: { km: 'បរិញ្ញាបត្រជាន់ខ្ពស់', en: 'Master\'s Degree' },
    curriculum: {
      common: {
        title: { km: 'មុខវិជ្ជាសិក្សារួម', en: 'Common Courses' },
        courses: [
          { km: 'នីតិបុរាណសាស្ត្រសាធារណៈ', en: 'Political Science' },
          { km: 'រដ្ឋបាលពិសេស', en: 'Special Administration' },
          { km: 'ច្បាប់ព្រហ្មទណ្ឌ', en: 'Criminal Law' },
          { km: 'វិធីសាស្ត្រនីតិសាស្ត្រ', en: 'Jurisprudence Methods' },
        ],
      },
      major: {
        title: { km: 'មុខវិជ្ជាសិក្សាឯកទេស', en: 'Major Courses' },
        courses: [
          { km: 'នីតិមុខងារសាធារណៈ', en: 'Law on Public Function' },
          { km: 'ទំនាក់ទំនងអន្តរជាតិ និងនយោបាយ', en: 'International Relation and Politics' },
          { km: 'វិធីសាស្ត្រស្រាវជ្រាវ', en: 'Research Methodology' },
          { km: 'ភូមិសាស្ត្រនយោបាយ', en: 'Geographical Politics' },
        ],
      },
      elective: {
        title: { km: 'មុខវិជ្ជាសិក្សាជ្រើសរើស', en: 'Elective Courses' },
        courses: [
          { km: 'ក្រមនីតិវិធីរដ្ឋប្បវេណី', en: 'Civil Procedure Code' },
          { km: 'ក្រមនីតិវិធីព្រហ្មទណ្ឌ', en: 'Criminal Procedure Code' },
          { km: 'ច្បាប់សន្តិសុខសង្គម', en: 'Social Security Law' },
          { km: 'ច្បាប់ស្តីពីការវិនិយោគ', en: 'Law on Investment' },
        ],
      },
      additional: {
        title: { km: 'មុខវិជ្ជាសិក្សាបន្ថែម', en: 'Additional Courses' },
        courses: [
          { km: 'នីតិពាណិជ្ជកម្ម', en: 'Commercial Law' },
          { km: 'ច្បាប់ភូមិបាល', en: 'Land Law' },
          { km: 'ការចរចា និងការដោះស្រាយវិវាទក្រៅប្រព័ន្ធតុលាការ', en: 'Negotiation and Conflict Resolution' },
        ],
      },
    },
  },
  {
    id: 'arts-humanities',
    icon: 'bi-book-fill',
    color: 'bg-purple-500',
    title: { km: 'សិល្បៈ មនុស្សសាស្រ្ត និងភាសាបរទេស', en: 'Arts, Humanity and Foreign Language' },
    subtitle: { km: 'បរិញ្ញាបត្រជាន់ខ្ពស់', en: 'Master\'s Degree' },
    curriculum: {
      common: {
        title: { km: 'មុខវិជ្ជាសិក្សារួម', en: 'Common Courses' },
        courses: [
          { km: 'សីលធម៌ធុរកិច្ច', en: 'Business Ethics' },
          { km: 'ស្ថិតិអាជីវកម្ម', en: 'Business Statistics' },
          { km: 'សេដ្ឋកិច្ចគ្រប់គ្រង', en: 'Managerial Economics' },
        ],
      },
      major: {
        title: { km: 'មុខវិជ្ជាសិក្សាស្រាវជ្រាវឯកទេស', en: 'Major Research Courses' },
        courses: [
          { km: 'ការគ្រប់គ្រងទូទៅ', en: 'General Management' },
          { km: 'ការគ្រប់គ្រងទីផ្សារ', en: 'Marketing Management' },
          { km: 'គ្រប់គ្រងធនធានមនុស្ស', en: 'Human Resource Management' },
          { km: 'ប្រសិទ្ធភាពនៃការគ្រប់គ្រង និងការសម្រេចចិត្ត', en: 'Effective Management Decision Making' },
          { km: 'យុទ្ធសាស្ត្រគ្រប់គ្រង', en: 'Strategic Management' },
          { km: 'ការគ្រប់គ្រងនៃការផ្លាស់ប្តូរ', en: 'Management of Change' },
          { km: 'មូលដ្ឋានគ្រឹះនៃការគ្រប់គ្រង', en: 'Foundational of Management' },
          { km: 'ការគ្រប់គ្រងហិរញ្ញវត្ថុ', en: 'Financial Management' },
        ],
      },
      elective: {
        title: { km: 'មុខវិជ្ជាសិក្សាជ្រើសរើស', en: 'Elective Courses' },
        courses: [
          { km: 'ការគ្រប់គ្រងគម្រោង', en: 'Project Management' },
          { km: 'ការគ្រប់គ្រងសហគ្រិន', en: 'Entrepreneurship Management' },
        ],
      },
      research: {
        title: { km: 'មុខវិជ្ជាស្រាវជ្រាវ', en: 'Research Subjects' },
        courses: [
          { km: 'វិធីសាស្ត្រស្រាវជ្រាវ', en: 'Research Methodology' },
          { km: 'ការស្រាវជ្រាវទីផ្សារ', en: 'Marketing Research' },
          { km: 'សេដ្ឋកិច្ចគ្រប់គ្រង', en: 'Managerial Economics' },
        ],
      },
    },
  },
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

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function MasterDegreePage() {
  const { lang, t } = useLanguage();
  const [activeProgram, setActiveProgram] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const program = masterPrograms[activeProgram];
  const curriculum = program.curriculum;

  const text = {
    breadcrumb: { km: 'ថ្នាក់បរិញ្ញាបត្រជាន់ខ្ពស់', en: 'Master\'s Degree' },
    heroTitle: { km: 'កម្មវិធីថ្នាក់បរិញ្ញាបត្រជាន់ខ្ពស់', en: 'Master\'s Degree Programs' },
    heroSubtitle: { km: 'ពង្រឹងសមត្ថភាពភាពជាអ្នកដឹកនាំ និងជំនាញឯកទេស', en: 'Enhance leadership capabilities and specialized skills' },
    programsTitle: { km: 'ជ្រើសរើសកម្មវិធីសិក្សា', en: 'Choose Your Program' },
    curriculumTitle: { km: 'រចនាសម្ព័ន្ធកម្មវិធីសិក្សា', en: 'Curriculum Structure' },
    credit: { km: 'ក្រេឌីត', en: 'Credits' },
    ctaTitle: { km: 'ត្រៀមខ្លួនសម្រាប់ជំហានបន្ទាប់?', en: 'Ready for the Next Step?' },
    ctaSubtitle: { km: 'ចុះឈ្មោះឥឡូវនេះដើម្បីចាប់ផ្តើមការសិក្សាថ្នាក់បរិញ្ញាបត្រជាន់ខ្ពស់', en: 'Apply now to start your Master\'s Degree journey' },
    ctaBtn: { km: 'ចុះឈ្មោះឥឡូវនេះ', en: 'Apply Now' },
    contactBtn: { km: 'សាកសួរព័ត៌មាន', en: 'Inquire Now' },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-sans transition-colors duration-300">
      
      {/* ============================================ */}
      {/* HERO */}
      {/* ============================================ */}
      <section className="relative h-[450px] md:h-[550px] lg:h-[600px] overflow-hidden bg-gray-900">
  <img 
    src={masterDegreeHero} 
    alt="Master Degree" 
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
          <span className="text-gold">{t('masterDegree.breadcrumb')}</span>
        </div>
        
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-gold/10 text-gold border border-gold/20 mb-5">
          <i className="bi bi-mortarboard-fill"></i> {t('masterDegree.degree')}
        </span>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6">
          {t('masterDegree.heroTitle')}
        </h1>
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mb-8 leading-relaxed">
          {t('masterDegree.heroSubtitle')}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 bg-white/10 text-white text-sm md:text-base px-5 py-2.5 rounded-full backdrop-blur-sm">
            <i className="bi bi-clock text-gold"></i> {t('masterDegree.duration')}
          </span>
          <span className="inline-flex items-center gap-2 bg-gold/20 text-gold text-sm md:text-base px-5 py-2.5 rounded-full backdrop-blur-sm border border-gold/30">
            <i className="bi bi-award"></i> {t('masterDegree.degree')}
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
      {/* PROGRAM SELECTOR TABS */}
      {/* ============================================ */}
      <section className="sticky top-20 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 py-3 overflow-x-auto scrollbar-hide">
            {masterPrograms.map((prog, idx) => (
              <button
                key={prog.id}
                onClick={() => setActiveProgram(idx)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeProgram === idx
                    ? `${prog.color} text-white shadow-lg`
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <i className={`bi ${prog.icon} text-base`}></i>
                {prog.title[lang]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PROGRAM HEADER */}
      {/* ============================================ */}
      <section className={`py-12 ${program.color.replace('bg-', 'bg-')}/5 dark:bg-gray-900`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className={`w-16 h-16 ${program.color} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
              <i className={`bi ${program.icon} text-3xl text-white`}></i>
            </div>
            <div>
              <p className="text-gold text-xs font-bold tracking-wider uppercase mb-1">
                {program.subtitle[lang]}
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
                {program.title[lang]}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CURRICULUM STRUCTURE */}
      {/* ============================================ */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionBadge className="mb-4">
              <i className="bi bi-journal-text"></i> {text.curriculumTitle[lang]}
            </SectionBadge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
              {text.curriculumTitle[lang]}
            </h2>
          </div>

          {/* Curriculum Sections */}
          <div className="space-y-8">
            {Object.entries(curriculum).map(([key, section]) => {
              if (!section || !section.courses) return null;
              return (
                <div key={key} className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
                  {/* Section Header */}
                  <div className={`${program.color} px-6 py-4`}>
                    <h3 className="text-white font-bold text-lg flex items-center gap-2">
                      <i className={`bi ${key === 'common' ? 'bi-collection' : key === 'major' ? 'bi-star-fill' : key === 'elective' ? 'bi-list-check' : key === 'additional' ? 'bi-plus-circle' : 'bi-search'}`}></i>
                      {section.title[lang]}
                    </h3>
                  </div>
                  
                  {/* Courses List */}
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {section.courses.map((course, idx) => (
                      <div key={idx} className="flex items-center justify-between px-6 py-4 hover:bg-white dark:hover:bg-gray-750 transition-colors">
                        <div className="flex items-center gap-4">
                          <span className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-bold text-gray-500 dark:text-gray-400 flex-shrink-0">
                            {idx + 1}
                          </span>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white text-sm">
                              {course[lang] || course.en}
                            </p>
                            {lang === 'km' && course.en && (
                              <p className="text-gray-400 dark:text-gray-500 text-xs">{course.en}</p>
                            )}
                          </div>
                        </div>
                        <span className="text-xs font-bold text-gold bg-gold/10 px-3 py-1 rounded-full whitespace-nowrap">
                          3 {text.credit[lang]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
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