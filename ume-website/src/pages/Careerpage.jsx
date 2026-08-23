import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLanguage } from '../context/LanguageContext';

const topBanner = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&q=80';

function SectionLabel({ eyebrow, title, subtitle, align = 'center' }) {
  return (
    <div className={`mb-14 ${align === 'center' ? 'text-center mx-auto' : ''} max-w-2xl`}>
      <p className="text-gold text-xs tracking-[0.25em] uppercase font-bold mb-3">{eyebrow}</p>
      <h2 className="text-3xl md:text-4xl font-extrabold text-navy dark:text-white tracking-tight">{title}</h2>
      {subtitle && <p className="text-navy/50 dark:text-white/50 text-sm md:text-base mt-4 leading-relaxed">{subtitle}</p>}
    </div>
  );
}

const services = [
  {
    icon: 'bi-file-earmark-person-fill',
    title: { km: 'ការណែនាំសរសេរ CV', en: 'CV Writing Guidance' },
    desc: { km: 'ការណែនាំបុគ្គល ដើម្បីរៀបចំ CV និងលិខិតដាក់ពាក្យសុំការងារឲ្យទាក់ទាញនិយោជក', en: 'Personalized guidance to craft compelling CVs and cover letters' },
  },
  {
    icon: 'bi-mic-fill',
    title: { km: 'ហ្វឹកហាត់សម្ភាសន៍', en: 'Interview Coaching' },
    desc: { km: 'សិក្ខាសាលា mock interview ជាមួយអ្នកជំនាញឧស្សាហកម្មពិត', en: 'Mock interview workshops with real industry professionals' },
  },
  {
    icon: 'bi-building-fill',
    title: { km: 'កម្មសិក្សា (Internship)', en: 'Internships' },
    desc: { km: 'តភ្ជាប់និស្សិតទៅកាន់កម្មសិក្សាជាមួយក្រុមហ៊ុនដៃគូជាង ១២០', en: 'Connect students with internships at 120+ partner companies' },
  },
  {
    icon: 'bi-people-fill',
    title: { km: 'ព្រឹត្តិការណ៍ជួបជុំការងារ', en: 'Career Fairs' },
    desc: { km: 'Career Fair ប្រចាំឆមាស ដែលនិយោជកមកជួបផ្ទាល់និស្សិត', en: 'Semesterly career fairs where employers meet students face-to-face' },
  },
];

const jobListings = [
  {
    company: { km: 'ធនាគារ ABC', en: 'ABC Bank' },
    title: { km: 'មន្ត្រីឥណទានហិរញ្ញវត្ថុ', en: 'Financial Loan Officer' },
    type: { km: 'ពេញម៉ោង', en: 'Full-time' },
    location: { km: 'បាត់ដំបង', en: 'Battambang' },
    tag: { km: 'បន្ទាន់', en: 'Urgent' },
    posted: { km: '២ ថ្ងៃមុន', en: '2 days ago' },
  },
  {
    company: { km: 'ក្រុមហ៊ុនទេសចរណ៍ខេមរា', en: 'Khemera Tours Co.' },
    title: { km: 'អ្នកគ្រប់គ្រងទីផ្សារឌីជីថល', en: 'Digital Marketing Manager' },
    type: { km: 'ពេញម៉ោង', en: 'Full-time' },
    location: { km: 'ភ្នំពេញ', en: 'Phnom Penh' },
    tag: null,
    posted: { km: '៥ ថ្ងៃមុន', en: '5 days ago' },
  },
  {
    company: { km: 'ក្រុមហ៊ុន Tech Startup', en: 'Tech Startup' },
    title: { km: 'កម្មសិក្សា — អភិវឌ្ឍន៍កម្មវិធី', en: 'Internship — Software Development' },
    type: { km: 'កម្មសិក្សា', en: 'Internship' },
    location: { km: 'ពីចម្ងាយ', en: 'Remote' },
    tag: { km: 'សម្រាប់និស្សិត', en: 'For Students' },
    posted: { km: '១ សប្តាហ៍មុន', en: '1 week ago' },
  },
  {
    company: { km: 'NGO អភិវឌ្ឍន៍សហគមន៍', en: 'Community Development NGO' },
    title: { km: 'សម្របសម្រួលគម្រោង', en: 'Project Coordinator' },
    type: { km: 'ពេញម៉ោង', en: 'Full-time' },
    location: { km: 'ពោធិ៍សាត់', en: 'Pursat' },
    tag: null,
    posted: { km: '១ សប្តាហ៍មុន', en: '1 week ago' },
  },
];

const partners = [
  { km: 'ធនាគារ ABC', en: 'ABC Bank' },
  { km: 'ក្រុមហ៊ុនទេសចរណ៍ខេមរា', en: 'Khemera Tours' },
  { km: 'Tech Startup KH', en: 'Tech Startup KH' },
  { km: 'NGO អភិវឌ្ឍន៍', en: 'Development NGO' },
  { km: 'ក្រុមហ៊ុនធានារ៉ាប់រង XYZ', en: 'XYZ Insurance' },
  { km: 'រតនាគារជាតិ', en: 'National Treasury' },
];

export default function CareerPage() {
  const { lang, t } = useLanguage();

  const text = {
    breadcrumb: { km: 'មជ្ឈមណ្ឌលការងារ', en: 'Career Center' },
    heroEyebrow: { km: 'មជ្ឈមណ្ឌលអាជីព', en: 'Career Center' },
    heroTitle: { km: 'ពីថ្នាក់រៀន ទៅកាន់អាជីព', en: 'From Classroom to Career' },
    heroSubtitle: { km: 'ភ្ជាប់និស្សិត និងសិស្សចាស់ទៅកាន់ឱកាសការងារ កម្មសិក្សា និងក្រុមហ៊ុនដៃគូជាង ១២០', en: 'Connecting students and alumni to jobs, internships, and 120+ partner companies' },
    servicesEyebrow: { km: 'សេវាកម្មរបស់យើង', en: 'Our Services' },
    servicesTitle: { km: 'ជំនួយអាជីពពេញលេញ', en: 'Full Career Support' },
    jobsEyebrow: { km: 'ឱកាសការងារ', en: 'Job Opportunities' },
    jobsTitle: { km: 'មុខតំណែងកំពុងបើកចំហ', en: 'Open Positions' },
    filterAll: { km: 'ទាំងអស់', en: 'All' },
    filterFullTime: { km: 'ពេញម៉ោង', en: 'Full-time' },
    filterInternship: { km: 'កម្មសិក្សា', en: 'Internship' },
    applyButton: { km: 'ដាក់ពាក្យ', en: 'Apply' },
    partnersLabel: { km: 'ក្រុមហ៊ុនដៃគូជ្រើសរើសនិយោជិក', en: 'Partner Recruiters' },
    ctaTitle: { km: 'ត្រៀមខ្លួនស្វែងរកអាជីពដំបូងរបស់អ្នក?', en: 'Ready to Launch Your First Career?' },
    ctaDesc: { km: 'ណាត់ជួបប្រឹក្សាការងារឥតគិតថ្លៃជាមួយក្រុមមជ្ឈមណ្ឌលអាជីព UME', en: 'Book a free career consultation with the UME Career Center team' },
    ctaButton: { km: 'ណាត់ជួបប្រឹក្សា', en: 'Book a Consultation' },
  };

  const filterTypes = [
    { label: text.filterAll[lang], value: text.filterAll[lang] },
    { label: text.filterFullTime[lang], value: text.filterFullTime[lang] },
    { label: text.filterInternship[lang], value: text.filterInternship[lang] },
  ];

  const [filter, setFilter] = useState(text.filterAll[lang]);

  // Filter logic using language-specific type value
  const filteredJobs = filter === text.filterAll[lang]
    ? jobListings
    : jobListings.filter((j) => j.type[lang] === filter);

  return (
    <div className="min-h-screen bg-white dark:bg-navy-dark font-sans transition-colors duration-300">
      {/* HERO */}
      <section className="relative h-[380px] overflow-hidden bg-navy">
        <img src={topBanner} alt={text.heroTitle[lang]} className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/40"></div>
        <div className="relative z-10 h-full flex flex-col justify-end pb-14">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="flex items-center gap-2 text-white/50 text-xs mb-5">
              <Link to="/" className="hover:text-gold transition-colors">{t('nav.home')}</Link>
              <i className="bi bi-chevron-right text-[10px]"></i>
              <span className="text-gold">{text.breadcrumb[lang]}</span>
            </div>
            <p className="flex items-center gap-2 text-gold text-xs tracking-[0.25em] uppercase font-bold mb-4">
              <i className="bi bi-briefcase-fill"></i>
              {text.heroEyebrow[lang]}
            </p>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-3">{text.heroTitle[lang]}</h1>
            <p className="text-white/60 max-w-2xl">{text.heroSubtitle[lang]}</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel eyebrow={text.servicesEyebrow[lang]} title={text.servicesTitle[lang]} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {services.map((s, idx) => (
              <div key={idx} className="text-center sm:text-left">
                <div className="w-12 h-12 rounded-xl bg-navy/5 dark:bg-white/10 flex items-center justify-center mb-5 mx-auto sm:mx-0">
                  <i className={`bi ${s.icon} text-gold text-xl`}></i>
                </div>
                <h3 className="font-bold text-navy dark:text-white mb-2 leading-snug">{s.title[lang]}</h3>
                <p className="text-navy/50 dark:text-white/50 text-sm leading-relaxed">{s.desc[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOB LISTINGS */}
      <section className="py-20 md:py-28 bg-offwhite dark:bg-white/[0.03]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
            <div>
              <p className="text-gold text-xs tracking-[0.25em] uppercase font-bold mb-3">{text.jobsEyebrow[lang]}</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-navy dark:text-white tracking-tight">{text.jobsTitle[lang]}</h2>
            </div>
            <div className="flex gap-2">
              {filterTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setFilter(type.value)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    filter === type.value
                      ? 'bg-navy text-white'
                      : 'bg-white dark:bg-navy-dark text-navy/50 dark:text-white/50 border border-navy/10 dark:border-white/10 hover:border-gold'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredJobs.map((job, idx) => (
              <div
                key={idx}
                className="group bg-white dark:bg-navy-dark rounded-2xl p-6 border border-navy/5 dark:border-white/10 hover:shadow-navy hover:-translate-y-0.5 transition-all duration-300 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-navy/5 dark:bg-white/10 flex items-center justify-center shrink-0">
                  <i className="bi bi-building text-gold text-lg"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-bold text-navy dark:text-white group-hover:text-gold transition-colors">{job.title[lang]}</h3>
                    {job.tag && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-crimson/10 text-crimson">
                        {job.tag[lang]}
                      </span>
                    )}
                  </div>
                  <p className="text-navy/50 dark:text-white/40 text-sm">{job.company[lang]}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-navy/40 dark:text-white/30">
                    <span className="flex items-center gap-1"><i className="bi bi-briefcase"></i>{job.type[lang]}</span>
                    <span className="flex items-center gap-1"><i className="bi bi-geo-alt"></i>{job.location[lang]}</span>
                    <span className="flex items-center gap-1"><i className="bi bi-clock-history"></i>{job.posted[lang]}</span>
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="shrink-0 bg-gold-light hover:bg-gold text-navy px-5 py-2.5 rounded-full font-bold text-xs transition-all text-center"
                >
                  {text.applyButton[lang]}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-16 bg-white dark:bg-navy-dark">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-navy/40 dark:text-white/30 text-xs tracking-[0.25em] uppercase font-bold mb-8">{text.partnersLabel[lang]}</p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            {partners.map((p, idx) => (
              <span key={idx} className="text-navy/50 dark:text-white/40 font-semibold text-sm">{p[lang]}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <i className="bi bi-rocket-takeoff-fill text-gold text-3xl mb-6 inline-block"></i>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">{text.ctaTitle[lang]}</h2>
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