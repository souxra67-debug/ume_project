import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function FacultyLaw() {
  const { lang } = useLanguage();

  const facultyData = {
    name: {
      km: 'ច្បាប់ និងសេដ្ឋកិច្ច',
      en: 'Law & Economics'
    },
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80',
    description: {
      km: 'មហាវិទ្យាល័យច្បាប់ និងសេដ្ឋកិច្ច គឺជាមហាវិទ្យាល័យដ៏សំខាន់របស់ UME ដែលផ្តល់ជូននូវកម្មវិធីសិក្សាប្រកបដោយគុណភាពខ្ពស់ក្នុងវិស័យច្បាប់ និងសេដ្ឋកិច្ច។ មហាវិទ្យាល័យបានបណ្តុះបណ្តាលមេធាវី ចៅក្រម និងអ្នកសេដ្ឋកិច្ចជំនាញជាច្រើនរូបឱ្យបម្រើក្នុងសង្គមកម្ពុជា។',
      en: 'The Faculty of Law & Economics is an important faculty of UME that offers high-quality programs in law and economics. The faculty has trained many lawyers, judges, and economists to serve Cambodian society.'
    },
    vision: {
      km: 'ក្លាយជាមហាវិទ្យាល័យឈានមុខគេផ្នែកច្បាប់ និងសេដ្ឋកិច្ចនៅកម្ពុជា និងតំបន់អាស៊ាន',
      en: 'To become a leading faculty of law and economics in Cambodia and the ASEAN region.'
    },
    mission: {
      km: 'បណ្តុះបណ្តាលអ្នកជំនាញផ្នែកច្បាប់ និងសេដ្ឋកិច្ចប្រកបដោយសីលធម៌ សមត្ថភាពខ្ពស់ និងការយល់ដឹងអំពីយុត្តិធម៌សង្គម',
      en: 'To train legal and economic professionals with high ethics, competence, and understanding of social justice.'
    },
    levels: [
      { name: { km: 'បរិញ្ញាបត្ររង', en: 'Associate Degree' }, duration: { km: '២ ឆ្នាំ', en: '2 years' } },
      { name: { km: 'បរិញ្ញាបត្រ', en: "Bachelor's Degree" }, duration: { km: '៤ ឆ្នាំ', en: '4 years' } },
      { name: { km: 'បរិញ្ញាបត្រជាន់ខ្ពស់', en: "Master's Degree" }, duration: { km: '២ ឆ្នាំ', en: '2 years' } },
      { name: { km: 'បណ្ឌិត', en: 'Doctorate' }, duration: { km: '៣ ឆ្នាំ', en: '3 years' } },
    ],
    majors: [
      { 
        name: { km: 'ច្បាប់', en: 'Law' },
        desc: { km: 'បណ្តុះបណ្តាលជំនាញផ្នែកច្បាប់រដ្ឋប្បវេណី ព្រហ្មទណ្ឌ និងពាណិជ្ជកម្ម', en: 'Training in civil, criminal, and commercial law' }
      },
      { 
        name: { km: 'សេដ្ឋកិច្ច', en: 'Economics' },
        desc: { km: 'បណ្តុះបណ្តាលជំនាញផ្នែកសេដ្ឋកិច្ចអតិសុខុម ម៉ាក្រូ និងអន្តរជាតិ', en: 'Training in microeconomics, macroeconomics, and international economics' }
      },
    ],
    careerPaths: [
      { km: 'មេធាវី', en: 'Lawyer' },
      { km: 'ចៅក្រម', en: 'Judge' },
      { km: 'ព្រះរាជអាជ្ញា', en: 'Prosecutor' },
      { km: 'អ្នកសេដ្ឋកិច្ច', en: 'Economist' },
      { km: 'មន្ត្រីធនាគារ', en: 'Banking Officer' },
    ],
    stats: {
      students: '700+',
      graduates: '2,500+',
      facultyMembers: '28',
      labs: '2'
    },
    facilities: [
      { name: { km: 'តុលាការក្លែងធ្វើ', en: 'Moot Court' }, icon: 'bi-bank' },
      { name: { km: 'មជ្ឈមណ្ឌលស្រាវជ្រាវច្បាប់', en: 'Legal Research Center' }, icon: 'bi-book' },
      { name: { km: 'បណ្ណាល័យច្បាប់', en: 'Law Library' }, icon: 'bi-journal' },
    ]
  };

  return (
    <div className="min-h-screen bg-light-bg-primary dark:bg-dark-bg-primary transition-colors duration-300">
      {/* Hero */}
      <section className="relative h-[450px] overflow-hidden">
        <img src={facultyData.coverImage} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy/80 to-transparent"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="max-w-3xl animate-fade-in-down">
              <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
                <Link to="/" className="hover:text-gold transition-colors">ទំព័រដើម</Link>
                <i className="bi bi-chevron-right text-[10px]"></i>
                <Link to="/programs" className="hover:text-gold transition-colors">កម្មវិធីសិក្សា</Link>
                <i className="bi bi-chevron-right text-[10px]"></i>
                <span className="text-gold">{facultyData.name[lang]}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
                {facultyData.name[lang]}
              </h1>
              <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
                {facultyData.description[lang].substring(0, 150)}...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content - same structure */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white dark:bg-dark-bg-card rounded-3xl p-8 shadow-card dark:shadow-dark-card">
                <h2 className="text-2xl font-bold text-navy dark:text-dark-text-primary mb-4 flex items-center gap-3">
                  <i className="bi bi-info-circle text-gold"></i>
                  {lang === 'km' ? 'អំពីមហាវិទ្យាល័យ' : 'About the Faculty'}
                </h2>
                <p className="text-navy/60 dark:text-dark-text-secondary leading-relaxed">
                  {facultyData.description[lang]}
                </p>
              </div>

              {/* Vision & Mission */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-navy to-navy-light text-white rounded-3xl p-8 shadow-navy">
                  <i className="bi bi-eye text-3xl text-gold mb-3 block"></i>
                  <h3 className="text-xl font-bold mb-3">{lang === 'km' ? 'ចក្ខុវិស័យ' : 'Vision'}</h3>
                  <p className="text-white/70 leading-relaxed">{facultyData.vision[lang]}</p>
                </div>
                <div className="bg-gradient-to-br from-gold to-gold-light text-navy rounded-3xl p-8 shadow-gold">
                  <i className="bi bi-bullseye text-3xl mb-3 block"></i>
                  <h3 className="text-xl font-bold mb-3">{lang === 'km' ? 'បេសកកម្ម' : 'Mission'}</h3>
                  <p className="text-navy/70 leading-relaxed">{facultyData.mission[lang]}</p>
                </div>
              </div>

              {/* Majors */}
              <div className="bg-white dark:bg-dark-bg-card rounded-3xl p-8 shadow-card dark:shadow-dark-card">
                <h2 className="text-2xl font-bold text-navy dark:text-dark-text-primary mb-6 flex items-center gap-3">
                  <i className="bi bi-journal-check text-gold"></i>
                  {lang === 'km' ? 'មុខជំនាញ' : 'Majors'}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {facultyData.majors.map((major, index) => (
                    <div key={index} className="bg-offwhite dark:bg-dark-bg-hover rounded-2xl p-5 border border-navy/5 dark:border-dark-border hover:border-gold/50 transition-all">
                      <h4 className="font-bold text-navy dark:text-dark-text-primary text-lg mb-2">{major.name[lang]}</h4>
                      <p className="text-navy/50 dark:text-dark-text-secondary text-sm">{major.desc[lang]}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Paths */}
              <div className="bg-white dark:bg-dark-bg-card rounded-3xl p-8 shadow-card dark:shadow-dark-card">
                <h2 className="text-2xl font-bold text-navy dark:text-dark-text-primary mb-6 flex items-center gap-3">
                  <i className="bi bi-briefcase text-gold"></i>
                  {lang === 'km' ? 'ផ្លូវអាជីព' : 'Career Paths'}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {facultyData.careerPaths.map((path, index) => (
                    <span key={index} className="bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-medium hover:bg-gold/20 transition-colors">
                      {path[lang]}
                    </span>
                  ))}
                </div>
              </div>

              {/* Facilities */}
              <div className="bg-white dark:bg-dark-bg-card rounded-3xl p-8 shadow-card dark:shadow-dark-card">
                <h2 className="text-2xl font-bold text-navy dark:text-dark-text-primary mb-6 flex items-center gap-3">
                  <i className="bi bi-building text-gold"></i>
                  {lang === 'km' ? 'បរិក្ខារ' : 'Facilities'}
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {facultyData.facilities.map((facility, index) => (
                    <div key={index} className="bg-offwhite dark:bg-dark-bg-hover rounded-2xl p-4 text-center hover:scale-105 transition-transform">
                      <i className={`bi ${facility.icon} text-3xl text-gold mb-2 block`}></i>
                      <p className="text-navy dark:text-dark-text-primary font-medium text-sm">{facility.name[lang]}</p>
                    </div>
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
                  <div className="flex justify-between text-sm border-b border-navy/5 dark:border-dark-border pb-3">
                    <span className="text-navy/40 dark:text-dark-text-secondary">{lang === 'km' ? 'និស្សិត' : 'Students'}</span>
                    <span className="font-semibold text-navy dark:text-dark-text-primary">{facultyData.stats.students}</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-navy/5 dark:border-dark-border pb-3">
                    <span className="text-navy/40 dark:text-dark-text-secondary">{lang === 'km' ? 'និស្សិតបញ្ចប់ការសិក្សា' : 'Graduates'}</span>
                    <span className="font-semibold text-navy dark:text-dark-text-primary">{facultyData.stats.graduates}</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-navy/5 dark:border-dark-border pb-3">
                    <span className="text-navy/40 dark:text-dark-text-secondary">{lang === 'km' ? 'សាស្ត្រាចារ្យ' : 'Faculty Members'}</span>
                    <span className="font-semibold text-navy dark:text-dark-text-primary">{facultyData.stats.facultyMembers}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-navy/40 dark:text-dark-text-secondary">{lang === 'km' ? 'មន្ទីរពិសោធន៍' : 'Labs'}</span>
                    <span className="font-semibold text-navy dark:text-dark-text-primary">{facultyData.stats.labs}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-navy/5 dark:border-dark-border space-y-3">
                  <Link to="/admission" className="bg-gold text-navy w-full block text-center py-3 rounded-xl font-bold hover:bg-gold-light transition-all duration-300">
                    {lang === 'km' ? 'ចុះឈ្មោះឥឡូវនេះ' : 'Apply Now'}
                  </Link>
                  <Link to="/scholarship" className="bg-navy text-white w-full block text-center py-3 rounded-xl font-bold hover:bg-navy-light transition-all duration-300">
                    {lang === 'km' ? 'ព័ត៌មានអាហារូបករណ៍' : 'Scholarship Info'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-navy to-navy-dark text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {lang === 'km' ? 'កសាងអនាគតតាមរយៈច្បាប់ និងសេដ្ឋកិច្ច' : 'Build Your Future Through Law & Economics'}
          </h2>
          <p className="text-white/70 text-lg mb-8">
            {lang === 'km' 
              ? 'ចូលរួមជាមួយយើងដើម្បីក្លាយជាអ្នកដឹកនាំផ្នែកច្បាប់ និងសេដ្ឋកិច្ច'
              : 'Join us to become a leader in law and economics'}
          </p>
          <Link to="/admission" className="inline-flex items-center gap-2 bg-gold text-navy px-10 py-4 rounded-full font-bold text-lg hover:bg-gold-light transition-all shadow-gold">
            {lang === 'km' ? 'ចុះឈ្មោះឥឡូវនេះ' : 'Apply Now'} <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </section>
    </div>
  );
}