import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLanguage } from '../context/LanguageContext';

// ============================================================
// DATA
// ============================================================

const rulesDocuments = [
  {
    id: 1,
    icon: 'bi-file-earmark-text',
    title: { km: 'បទបញ្ជាផ្ទៃក្នុង UME', en: 'UME Internal Regulations' },
    desc: { km: 'បទបញ្ជាស្តីពីការគ្រប់គ្រង និងប្រតិបត្តិការរបស់សាកលវិទ្យាល័យ', en: 'Regulations on university management and operations' },
    date: { km: 'ធ្វើបច្ចុប្បន្នភាព ២០២៤', en: 'Updated 2024' },
    category: 'internal',
  },
  {
    id: 2,
    icon: 'bi-shield-check',
    title: { km: 'ក្រមសីលធម៌និស្សិត', en: 'Student Code of Conduct' },
    desc: { km: 'គោលការណ៍ និងវិន័យសម្រាប់និស្សិត UME ទាំងអស់', en: 'Principles and discipline for all UME students' },
    date: { km: 'ធ្វើបច្ចុប្បន្នភាព ២០២៤', en: 'Updated 2024' },
    category: 'student',
  },
  {
    id: 3,
    icon: 'bi-journal-check',
    title: { km: 'បទបញ្ជាសិក្សា', en: 'Academic Regulations' },
    desc: { km: 'បទបញ្ជាស្តីពីការសិក្សា ការប្រឡង និងការវាយតម្លៃ', en: 'Regulations on studies, exams, and assessments' },
    date: { km: 'ធ្វើបច្ចុប្បន្នភាព ២០២៤', en: 'Updated 2024' },
    category: 'academic',
  },
  {
    id: 4,
    icon: 'bi-cash-coin',
    title: { km: 'បទបញ្ជាហិរញ្ញវត្ថុ', en: 'Financial Regulations' },
    desc: { km: 'បទបញ្ជាស្តីពីថ្លៃសិក្សា អាហារូបករណ៍ និងការទូទាត់', en: 'Regulations on tuition, scholarships, and payments' },
    date: { km: 'ធ្វើបច្ចុប្បន្នភាព ២០២៤', en: 'Updated 2024' },
    category: 'financial',
  },
  {
    id: 5,
    icon: 'bi-building',
    title: { km: 'បទបញ្ជាបរិវេណសាកលវិទ្យាល័យ', en: 'Campus Regulations' },
    desc: { km: 'បទបញ្ជាស្តីពីការប្រើប្រាស់បរិវេណ និងសម្ភារៈបរិក្ខារ', en: 'Regulations on campus and facility usage' },
    date: { km: 'ធ្វើបច្ចុប្បន្នភាព ២០២៤', en: 'Updated 2024' },
    category: 'campus',
  },
  {
    id: 6,
    icon: 'bi-shield-lock',
    title: { km: 'គោលការណ៍ឯកជនភាព', en: 'Privacy Policy' },
    desc: { km: 'គោលការណ៍ការពារទិន្នន័យ និងព័ត៌មានផ្ទាល់ខ្លួន', en: 'Data protection and personal information policy' },
    date: { km: 'ធ្វើបច្ចុប្បន្នភាព ២០២៤', en: 'Updated 2024' },
    category: 'privacy',
  },
];

const categories = [
  { id: 'all', label: { km: 'ទាំងអស់', en: 'All' } },
  { id: 'internal', label: { km: 'បទបញ្ជាផ្ទៃក្នុង', en: 'Internal' } },
  { id: 'student', label: { km: 'និស្សិត', en: 'Student' } },
  { id: 'academic', label: { km: 'សិក្សា', en: 'Academic' } },
  { id: 'financial', label: { km: 'ហិរញ្ញវត្ថុ', en: 'Financial' } },
];

// ============================================================
// COMPONENT
// ============================================================
export default function RulesRegulationsPage() {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filteredDocs = activeCategory === 'all'
    ? rulesDocuments
    : rulesDocuments.filter(doc => doc.category === activeCategory);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-sans transition-colors duration-300">
      
      {/* ========== HERO ========== */}
      <section className="relative h-[280px] md:h-[350px] overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 border-2 border-gold rounded-full"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="max-w-2xl">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-white/50 text-xs mb-6">
                <Link to="/" className="hover:text-gold transition-colors">{t('nav.home')}</Link>
                <i className="bi bi-chevron-right text-[10px]"></i>
                <span className="text-gold">{t('rulesPage.breadcrumb')}</span>
              </div>
              
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-gold/10 text-gold border border-gold/20 mb-4">
                <i className="bi bi-shield-check"></i> UME
              </span>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-4">
                {t('rulesPage.heroTitle')}
              </h1>
              <p className="text-lg text-white/60 max-w-xl">
                {t('rulesPage.heroSubtitle')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== DESCRIPTION ========== */}
      <section className="py-10 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-start gap-4 p-5 bg-gray-50 dark:bg-gray-800 rounded-2xl">
            <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
              <i className="bi bi-info-circle text-gold"></i>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {t('rulesPage.description')}
            </p>
          </div>
        </div>
      </section>

      {/* ========== DOCUMENTS ========== */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-5xl mx-auto px-6">
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-navy text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
              >
                <i className={`bi ${activeCategory === cat.id ? 'bi-check-lg' : 'bi-folder'} mr-1.5`}></i>
                {cat.label[lang]}
              </button>
            ))}
          </div>

          {/* Documents Grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gold group-hover:text-white transition-colors">
                  <i className={`bi ${doc.icon} text-xl`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-gold transition-colors">
                    {doc.title[lang]}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed mb-3">
                    {doc.desc[lang]}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 dark:text-gray-500 text-[11px]">
                      <i className="bi bi-calendar3 mr-1"></i> {doc.date[lang]}
                    </span>
                    <span className="inline-flex items-center gap-1 text-gold text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {t('rulesPage.viewBtn')} <i className="bi bi-arrow-right text-[10px]"></i>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredDocs.length === 0 && (
            <div className="text-center py-16">
              <i className="bi bi-inbox text-5xl text-gray-300 dark:text-gray-600 mb-4 block"></i>
              <p className="text-gray-400 dark:text-gray-500">
                {lang === 'km' ? 'មិនមានឯកសារក្នុងប្រភេទនេះទេ' : 'No documents in this category'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-16 bg-navy text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <i className="bi bi-question-circle text-gold text-3xl mb-4 block"></i>
          <h2 className="text-2xl font-bold mb-3">
            {lang === 'km' ? 'មានសំណួរអំពីបទបញ្ជា?' : 'Have Questions About Regulations?'}
          </h2>
          <p className="text-white/60 mb-6">
            {lang === 'km' ? 'ទាក់ទងមកយើងខ្ញុំសម្រាប់ព័ត៌មានបន្ថែម' : 'Contact us for more information'}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gold text-navy px-6 py-3 rounded-full font-bold hover:bg-gold-light transition-all"
          >
            {t('common.contactUs')} <i className="bi bi-arrow-right"></i>
          </Link>
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