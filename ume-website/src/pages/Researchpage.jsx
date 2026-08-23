import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLanguage } from '../context/LanguageContext';

const topBanner = 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1600&q=80';

function SectionLabel({ eyebrow, title, subtitle, align = 'center' }) {
  return (
    <div className={`mb-14 ${align === 'center' ? 'text-center mx-auto' : ''} max-w-2xl`}>
      <p className="text-gold text-xs tracking-[0.25em] uppercase font-bold mb-3">{eyebrow}</p>
      <h2 className="text-3xl md:text-4xl font-extrabold text-navy dark:text-white tracking-tight">{title}</h2>
      {subtitle && (
        <p className="text-navy/50 dark:text-white/50 text-sm md:text-base mt-4 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

const researchAreas = [
  {
    icon: 'bi-graph-up-arrow',
    title: { km: 'សេដ្ឋកិច្ចអភិវឌ្ឍន៍', en: 'Development Economics' },
    count: { km: '២៤ ការសិក្សា', en: '24 studies' },
  },
  {
    icon: 'bi-cpu-fill',
    title: { km: 'បច្ចេកវិទ្យា និងឌីជីថល', en: 'Technology & Digital' },
    count: { km: '១៨ ការសិក្សា', en: '18 studies' },
  },
  {
    icon: 'bi-tree-fill',
    title: { km: 'កសិកម្ម និងបរិស្ថាន', en: 'Agriculture & Environment' },
    count: { km: '១៥ ការសិក្សា', en: '15 studies' },
  },
  {
    icon: 'bi-people-fill',
    title: { km: 'សង្គមវិទ្យា និងគោលនយោបាយ', en: 'Sociology & Policy' },
    count: { km: '២១ ការសិក្សា', en: '21 studies' },
  },
];

const publications = [
  {
    title: {
      km: 'ផលប៉ះពាល់នៃឌីជីថលកម្មលើសហគ្រាសខ្នាតតូចនៅកម្ពុជា',
      en: 'Impact of Digitalization on Cambodian SMEs',
    },
    author: { km: 'បណ្ឌិត សុខ វិចិត្រ', en: 'Dr. Sok Vichetr' },
    year: { km: '២០២៦', en: '2026' },
    journal: {
      km: 'ទស្សនាវដ្តីសេដ្ឋកិច្ចអាស៊ាន',
      en: 'ASEAN Economic Review',
    },
  },
  {
    title: {
      km: 'យុទ្ធសាស្ត្រធនធានមនុស្សសម្រាប់សហគ្រាសទេសចរណ៍តំបន់បាត់ដំបង',
      en: 'HR Strategies for Battambang Tourism Enterprises',
    },
    author: { km: 'អ្នកគ្រូ ចាន់ សុភាព', en: 'Mr. Chan Sopheap' },
    year: { km: '២០២៥', en: '2025' },
    journal: {
      km: 'ទស្សនាវដ្តីគ្រប់គ្រង UME',
      en: 'UME Management Journal',
    },
  },
  {
    title: {
      km: 'ការសម្របខ្លួនកសិកម្មទៅនឹងការប្រែប្រួលអាកាសធាតុនៅតំបន់អាងទន្លេសាប',
      en: 'Agricultural Adaptation to Climate Change in the Tonle Sap Basin',
    },
    author: { km: 'បណ្ឌិត លី សុជាតា', en: 'Dr. Ly Socheata' },
    year: { km: '២០២៥', en: '2025' },
    journal: {
      km: 'ទស្សនាវដ្តីកសិកម្មនិងអភិវឌ្ឍន៍',
      en: 'Agriculture & Development Journal',
    },
  },
];

export default function ResearchPage() {
  const { lang, t } = useLanguage();

  const text = {
    breadcrumb: { km: 'ស្រាវជ្រាវ', en: 'Research' },
    heroEyebrow: { km: 'ការិយាល័យស្រាវជ្រាវ', en: 'Research Office' },
    heroTitle: {
      km: 'ស្រាវជ្រាវ និងការបោះពុម្ពផ្សាយ',
      en: 'Research & Publications',
    },
    heroSubtitle: {
      km: 'ចំណេះដឹងថ្មីៗពីសាស្ត្រាចារ្យ និងនិស្សិត UME ចូលរួមចំណែកដល់ការអភិវឌ្ឍជាតិ',
      en: 'New knowledge from UME faculty and students contributing to national development',
    },
    areasEyebrow: { km: 'វិស័យស្រាវជ្រាវ', en: 'Research Areas' },
    areasTitle: { km: 'ផ្នែកសំខាន់ៗ', en: 'Key Focus Areas' },
    pubEyebrow: { km: 'ការបោះពុម្ពថ្មីៗ', en: 'Recent Publications' },
    pubTitle: { km: 'អត្ថបទស្រាវជ្រាវថ្មីៗ', en: 'Recent Research Articles' },
    pdfBadge: 'PDF',
    ctaTitle: {
      km: 'ជាសាស្ត្រាចារ្យ ឬនិស្សិត UME?',
      en: 'Are you a UME faculty member or student?',
    },
    ctaDesc: {
      km: 'ដាក់ស្នើការស្រាវជ្រាវរបស់អ្នកសម្រាប់ការបោះពុម្ពផ្សាយជាមួយសាកលវិទ្យាល័យ',
      en: 'Submit your research for publication with the university',
    },
    ctaButton: {
      km: 'ដាក់ស្នើអត្ថបទ',
      en: 'Submit Article',
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-navy-dark font-sans transition-colors duration-300">
      {/* HERO */}
      <section className="relative h-[380px] overflow-hidden bg-navy">
        <img
          src={topBanner}
          alt={text.heroTitle[lang]}
          className="absolute inset-0 w-full h-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/40"></div>
        <div className="relative z-10 h-full flex flex-col justify-end pb-14">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="flex items-center gap-2 text-white/50 text-xs mb-5">
              <Link to="/" className="hover:text-gold transition-colors">
                {t('nav.home')}
              </Link>
              <i className="bi bi-chevron-right text-[10px]"></i>
              <span className="text-gold">{text.breadcrumb[lang]}</span>
            </div>
            <p className="flex items-center gap-2 text-gold text-xs tracking-[0.25em] uppercase font-bold mb-4">
              <i className="bi bi-lightbulb-fill"></i>
              {text.heroEyebrow[lang]}
            </p>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
              {text.heroTitle[lang]}
            </h1>
            <p className="text-white/60 max-w-2xl">{text.heroSubtitle[lang]}</p>
          </div>
        </div>
      </section>

      {/* RESEARCH AREAS */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel
            eyebrow={text.areasEyebrow[lang]}
            title={text.areasTitle[lang]}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {researchAreas.map((r, idx) => (
              <div
                key={idx}
                className="text-center bg-offwhite dark:bg-white/5 rounded-2xl p-7 border border-navy/5 dark:border-white/10"
              >
                <i className={`bi ${r.icon} text-gold text-2xl mb-4 block`}></i>
                <h3 className="font-bold text-navy dark:text-white text-sm mb-1">
                  {r.title[lang]}
                </h3>
                <p className="text-navy/40 dark:text-white/30 text-xs">{r.count[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PUBLICATIONS */}
      <section className="py-20 md:py-28 bg-offwhite dark:bg-white/[0.03]">
        <div className="max-w-4xl mx-auto px-6">
          <SectionLabel
            eyebrow={text.pubEyebrow[lang]}
            title={text.pubTitle[lang]}
            align="left"
          />
          <div className="space-y-0 divide-y divide-navy/10 dark:divide-white/10 border-t border-b border-navy/10 dark:border-white/10">
            {publications.map((p, idx) => (
              <div
                key={idx}
                className="py-6 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="w-11 h-11 rounded-lg bg-navy/10 dark:bg-white/10 flex items-center justify-center shrink-0">
                  <i className="bi bi-file-earmark-text-fill text-gold"></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-navy dark:text-white text-sm leading-snug mb-1">
                    {p.title[lang]}
                  </h3>
                  <p className="text-navy/50 dark:text-white/40 text-xs">
                    {p.author[lang]} • {p.journal[lang]} • {p.year[lang]}
                  </p>
                </div>
                <span className="shrink-0 text-crimson text-xs font-bold px-3 py-1.5 rounded-full bg-crimson/10">
                  {text.pdfBadge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy relative overflow-hidden">
        <div className="relative z-10 max-w-xl mx-auto px-6 text-center">
          <i className="bi bi-send-fill text-gold text-3xl mb-6 inline-block"></i>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
            {text.ctaTitle[lang]}
          </h2>
          <p className="text-white/60 mb-8">{text.ctaDesc[lang]}</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gold-light hover:bg-gold text-navy px-8 py-4 rounded-full font-bold transition-all shadow-gold"
          >
            {text.ctaButton[lang]} <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </section>
    </div>
  );
}