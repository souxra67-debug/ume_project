import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { faculties } from './ProgramsPage';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function FacultyDetailPage() {
  const { slug } = useParams();
  const { lang, t } = useLanguage();

  const faculty = faculties.find(f => f.slug === slug);

  if (!faculty) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-navy dark:text-white">មហាវិទ្យាល័យមិនមានទេ</h1>
          <Link to="/programs" className="text-gold hover:underline">ត្រឡប់ទៅកាន់កម្មវិធីសិក្សា</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg-primary dark:bg-dark-bg-primary transition-colors duration-300">
      {/* Hero */}
      <section className="relative h-[400px] overflow-hidden">
        <img
          src={faculty.coverImage}
          alt={faculty.name[lang]}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                <i className={`bi ${faculty.icon} text-3xl text-gold`}></i>
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-extrabold">{faculty.name[lang]}</h1>
                <p className="text-white/60 text-sm">{faculty.shortName[lang]}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white dark:bg-dark-bg-card rounded-3xl p-8 shadow-card dark:shadow-dark-card">
                <h2 className="text-2xl font-bold text-navy dark:text-dark-text-primary mb-4">
                  {lang === 'km' ? 'អំពីមហាវិទ្យាល័យ' : 'About the Faculty'}
                </h2>
                <p className="text-navy/60 dark:text-dark-text-secondary leading-relaxed">
                  {faculty.description[lang]}
                </p>
              </div>

              {/* Vision & Mission */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-navy text-white rounded-3xl p-8">
                  <h3 className="text-xl font-bold mb-3 text-gold">
                    {lang === 'km' ? 'ចក្ខុវិស័យ' : 'Vision'}
                  </h3>
                  <p className="text-white/70 leading-relaxed">{faculty.vision[lang]}</p>
                </div>
                <div className="bg-gold text-navy rounded-3xl p-8">
                  <h3 className="text-xl font-bold mb-3">
                    {lang === 'km' ? 'បេសកកម្ម' : 'Mission'}
                  </h3>
                  <p className="text-navy/70 leading-relaxed">{faculty.mission[lang]}</p>
                </div>
              </div>

              {/* Majors */}
              <div className="bg-white dark:bg-dark-bg-card rounded-3xl p-8 shadow-card dark:shadow-dark-card">
                <h2 className="text-2xl font-bold text-navy dark:text-dark-text-primary mb-6">
                  {lang === 'km' ? 'មុខជំនាញ' : 'Majors'}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {faculty.majors.map((major, index) => (
                    <div
                      key={index}
                      className="bg-offwhite dark:bg-dark-bg-hover rounded-2xl p-5 border border-navy/5 dark:border-dark-border"
                    >
                      <h4 className="font-bold text-navy dark:text-dark-text-primary text-lg mb-2">
                        {major[lang]}
                      </h4>
                      <p className="text-navy/50 dark:text-dark-text-secondary text-sm">
                        {major.description[lang]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Paths */}
              <div className="bg-white dark:bg-dark-bg-card rounded-3xl p-8 shadow-card dark:shadow-dark-card">
                <h2 className="text-2xl font-bold text-navy dark:text-dark-text-primary mb-6">
                  {lang === 'km' ? 'ផ្លូវអាជីព' : 'Career Paths'}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {faculty.careerPaths.map((path, index) => (
                    <span
                      key={index}
                      className="bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {path[lang]}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white dark:bg-dark-bg-card rounded-3xl p-6 shadow-card dark:shadow-dark-card sticky top-28">
                <h3 className="font-bold text-navy dark:text-dark-text-primary mb-4 flex items-center gap-2">
                  <i className="bi bi-info-circle text-gold"></i>
                  {lang === 'km' ? 'ព័ត៌មានរហ័ស' : 'Quick Info'}
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-navy/40 dark:text-dark-text-secondary">
                      {lang === 'km' ? 'និស្សិត' : 'Students'}
                    </span>
                    <span className="font-semibold text-navy dark:text-dark-text-primary">
                      {faculty.stats.students}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-navy/40 dark:text-dark-text-secondary">
                      {lang === 'km' ? 'និស្សិតបញ្ចប់ការសិក្សា' : 'Graduates'}
                    </span>
                    <span className="font-semibold text-navy dark:text-dark-text-primary">
                      {faculty.stats.graduates}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-navy/40 dark:text-dark-text-secondary">
                      {lang === 'km' ? 'សាស្ត្រាចារ្យ' : 'Faculty Members'}
                    </span>
                    <span className="font-semibold text-navy dark:text-dark-text-primary">
                      {faculty.stats.facultyMembers}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-navy/40 dark:text-dark-text-secondary">
                      {lang === 'km' ? 'មន្ទីរពិសោធន៍' : 'Labs'}
                    </span>
                    <span className="font-semibold text-navy dark:text-dark-text-primary">
                      {faculty.stats.labs}
                    </span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-navy/5 dark:border-dark-border">
                  <Link
                    to="/admission"
                    className="bg-gold text-navy w-full block text-center py-3 rounded-xl font-bold hover:bg-gold-light transition-all duration-300"
                  >
                    {lang === 'km' ? 'ចុះឈ្មោះឥឡូវនេះ' : 'Apply Now'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}