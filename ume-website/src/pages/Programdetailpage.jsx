import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLanguage } from '../context/LanguageContext';

// TODO: replace with real API data
const mockPrograms = [
  {
    slug: 'business-administration',
    faculty: { km: 'គ្រប់គ្រង និងទេសចរណ៍', en: 'Management & Tourism' },
    title: { km: 'គ្រប់គ្រងពាណិជ្ជកម្ម', en: 'Business Administration' },
    icon: 'bi-briefcase-fill',
    degree: { km: 'បរិញ្ញាបត្រ', en: "Bachelor's Degree" },
    duration: { km: '៤ ឆ្នាំ', en: '4 years' },
    credits: { km: '១៤០ ក្រេឌីត', en: '140 credits' },
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80',
    overview: {
      km: 'កម្មវិធីនេះបណ្តុះបណ្តាលនិស្សិតឲ្យមានចំណេះដឹងគ្រប់ជ្រុងជ្រោយផ្នែកគ្រប់គ្រង ធនធានមនុស្ស ការគ្រប់គ្រងប្រតិបត្តិការ និងយុទ្ធសាស្ត្រអាជីវកម្ម ត្រៀមខ្លួនសម្រាប់តួនាទីជាអ្នកដឹកនាំនៅគ្រប់ស្ថាប័ន។',
      en: 'This program trains students with comprehensive knowledge in management, human resources, operations management, and business strategy, preparing them for leadership roles in any organization.',
    },
    curriculum: [
      {
        year: { km: 'ឆ្នាំទី១', en: 'Year 1' },
        focus: { km: 'មូលដ្ឋានគ្រឹះគ្រប់គ្រង គណនេយ្យ សេដ្ឋកិច្ចមីក្រូ', en: 'Fundamentals of Management, Accounting, Microeconomics' },
      },
      {
        year: { km: 'ឆ្នាំទី២', en: 'Year 2' },
        focus: { km: 'ធនធានមនុស្ស ទីផ្សារ ច្បាប់ពាណិជ្ជកម្ម', en: 'Human Resources, Marketing, Commercial Law' },
      },
      {
        year: { km: 'ឆ្នាំទី៣', en: 'Year 3' },
        focus: { km: 'ការគ្រប់គ្រងយុទ្ធសាស្ត្រ ហិរញ្ញវត្ថុសាជីវកម្ម', en: 'Strategic Management, Corporate Finance' },
      },
      {
        year: { km: 'ឆ្នាំទី៤', en: 'Year 4' },
        focus: { km: 'កម្មសិក្សា និងសារណានិពន្ធបញ្ចប់ការសិក្សា', en: 'Internship and Graduation Thesis' },
      },
    ],
    careers: [
      { km: 'អ្នកគ្រប់គ្រងទូទៅ', en: 'General Manager' },
      { km: 'មន្ត្រីធនធានមនុស្ស', en: 'HR Officer' },
      { km: 'អ្នកវិភាគអាជីវកម្ម', en: 'Business Analyst' },
      { km: 'ស្ថាបនិកអាជីវកម្មខ្នាតតូច', en: 'Small Business Founder' },
    ],
  },
];

function SectionLabel({ eyebrow, title }) {
  return (
    <div className="mb-8">
      <p className="text-gold text-xs tracking-[0.25em] uppercase font-bold mb-3">{eyebrow}</p>
      <h2 className="text-2xl md:text-3xl font-extrabold text-navy dark:text-white tracking-tight">{title}</h2>
    </div>
  );
}

export default function ProgramDetailPage() {
  const { slug } = useParams();
  const { lang, t } = useLanguage();
  const [program, setProgram] = useState(undefined);

  const text = {
    notFoundTitle: { km: 'រកមិនឃើញជំនាញនេះទេ', en: 'Program not found' },
    backToPrograms: { km: 'ត្រឡប់ទៅកម្មវិធីសិក្សា', en: 'Back to Programs' },
    breadcrumbHome: t('nav.home'),
    breadcrumbPrograms: { km: 'កម្មវិធីសិក្សា', en: 'Programs' },
    degreeLabel: { km: 'សញ្ញាបត្រ', en: 'Degree' },
    durationLabel: { km: 'រយៈពេលសិក្សា', en: 'Duration' },
    creditsLabel: { km: 'ក្រេឌីតសរុប', en: 'Total Credits' },
    overviewEyebrow: { km: 'ទិដ្ឋភាពទូទៅ', en: 'Overview' },
    overviewTitle: { km: 'អំពីជំនាញនេះ', en: 'About This Program' },
    curriculumEyebrow: { km: 'ផែនការសិក្សា', en: 'Curriculum' },
    curriculumTitle: { km: 'រចនាសម្ព័ន្ធកម្មវិធីសិក្សា', en: 'Program Structure' },
    careersTitle: { km: 'ឱកាសការងារបន្ទាប់ពីបញ្ចប់', en: 'Career Opportunities After Graduation' },
    applyButton: { km: 'ដាក់ពាក្យសម្រាប់ជំនាញនេះ', en: 'Apply for this Program' },
    tuitionButton: { km: 'មើលថ្លៃសិក្សា', en: 'View Tuition Fees' },
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const found = mockPrograms.find((p) => p.slug === slug) || mockPrograms[0];
    setProgram(found);
  }, [slug]);

  if (program === undefined) return null;

  if (!program) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <i className="bi bi-mortarboard text-4xl text-navy/20 dark:text-white/20 mb-4"></i>
        <h1 className="text-2xl font-bold text-navy dark:text-white mb-2">{text.notFoundTitle[lang]}</h1>
        <Link to="/programs" className="bg-gold-light hover:bg-gold text-navy px-6 py-3 rounded-full font-bold text-sm transition-all">
          {text.backToPrograms[lang]}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-navy-dark font-sans">
      {/* HERO */}
      <section className="relative h-[360px] md:h-[420px] overflow-hidden bg-navy">
        <img src={program.img} alt={program.title[lang]} className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/40"></div>
        <div className="relative z-10 h-full flex flex-col justify-end pb-14">
          <div className="max-w-6xl mx-auto px-6 w-full">
            <div className="flex items-center gap-2 text-white/50 text-xs mb-5">
              <Link to="/" className="hover:text-gold transition-colors">{t('nav.home')}</Link>
              <i className="bi bi-chevron-right text-[10px]"></i>
              <Link to="/programs" className="hover:text-gold transition-colors">{text.breadcrumbPrograms[lang]}</Link>
            </div>
            <p className="flex items-center gap-2 text-gold text-xs tracking-[0.25em] uppercase font-bold mb-4">
              <i className={`bi ${program.icon}`}></i>
              {program.faculty[lang]}
            </p>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">{program.title[lang]}</h1>
          </div>
        </div>
      </section>

      {/* QUICK FACTS */}
      <section className="relative z-20 -mt-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white dark:bg-navy-dark rounded-2xl shadow-navy border border-navy/5 dark:border-white/10 grid grid-cols-3 divide-x divide-navy/10 dark:divide-white/10">
            <div className="p-5 md:p-7 text-center">
              <i className="bi bi-award-fill text-gold text-lg mb-2 block"></i>
              <p className="font-bold text-navy dark:text-white text-sm md:text-base">{program.degree[lang]}</p>
              <p className="text-navy/40 dark:text-white/30 text-xs">{text.degreeLabel[lang]}</p>
            </div>
            <div className="p-5 md:p-7 text-center">
              <i className="bi bi-calendar3 text-gold text-lg mb-2 block"></i>
              <p className="font-bold text-navy dark:text-white text-sm md:text-base">{program.duration[lang]}</p>
              <p className="text-navy/40 dark:text-white/30 text-xs">{text.durationLabel[lang]}</p>
            </div>
            <div className="p-5 md:p-7 text-center">
              <i className="bi bi-journal-bookmark-fill text-gold text-lg mb-2 block"></i>
              <p className="font-bold text-navy dark:text-white text-sm md:text-base">{program.credits[lang]}</p>
              <p className="text-navy/40 dark:text-white/30 text-xs">{text.creditsLabel[lang]}</p>
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-14">
            <div>
              <SectionLabel eyebrow={text.overviewEyebrow[lang]} title={text.overviewTitle[lang]} />
              <p className="text-navy/70 dark:text-white/60 leading-relaxed">{program.overview[lang]}</p>
            </div>

            <div>
              <SectionLabel eyebrow={text.curriculumEyebrow[lang]} title={text.curriculumTitle[lang]} />
              <div className="space-y-0 divide-y divide-navy/10 dark:divide-white/10 border-t border-b border-navy/10 dark:border-white/10">
                {program.curriculum.map((c, idx) => (
                  <div key={idx} className="flex gap-6 py-5">
                    <span className="text-gold font-bold text-sm w-24 shrink-0">{c.year[lang]}</span>
                    <span className="text-navy/70 dark:text-white/60 text-sm">{c.focus[lang]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-offwhite dark:bg-white/5 rounded-2xl p-7 border border-navy/5 dark:border-white/10 sticky top-24">
              <h3 className="font-bold text-navy dark:text-white mb-5 text-sm tracking-wide uppercase">
                {text.careersTitle[lang]}
              </h3>
              <ul className="space-y-3">
                {program.careers.map((c, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-navy/70 dark:text-white/60 text-sm">
                    <i className="bi bi-check-circle-fill text-gold"></i>
                    {c[lang]}
                  </li>
                ))}
              </ul>
              <Link
                to="/admission"
                className="mt-7 block text-center bg-gold-light hover:bg-gold text-navy py-3 rounded-full font-bold text-sm transition-all shadow-gold"
              >
                {text.applyButton[lang]}
              </Link>
              <Link
                to="/tuition-fees"
                className="mt-3 block text-center border border-navy/10 dark:border-white/15 text-navy dark:text-white py-3 rounded-full font-semibold text-sm hover:border-gold hover:text-gold transition-all"
              >
                {text.tuitionButton[lang]}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}