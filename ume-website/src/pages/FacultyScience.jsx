import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function FacultyScience() {
  const { lang } = useLanguage();

  const facultyData = {
    name: {
      km: 'វិទ្យាសាស្ត្រ និងបច្ចេកវិទ្យា',
      en: 'Science & Technology'
    },
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80',
    description: {
      km: 'មហាវិទ្យាល័យវិទ្យាសាស្ត្រ និងបច្ចេកវិទ្យា គឺជាមហាវិទ្យាល័យឈានមុខគេក្នុងការបណ្តុះបណ្តាលធនធានមនុស្សផ្នែកបច្ចេកវិទ្យាព័ត៌មានវិទ្យា និងវិទ្យាសាស្ត្រកុំព្យូទ័រ។ មហាវិទ្យាល័យផ្តល់ជូននូវកម្មវិធីសិក្សាទំនើបៗ ដើម្បីឆ្លើយតបទៅនឹងតម្រូវការនៃយុគសម័យឌីជីថល។',
      en: 'The Faculty of Science & Technology is a leading faculty in training human resources in information technology and computer science. The faculty offers modern programs to meet the demands of the digital age.'
    },
    vision: {
      km: 'ក្លាយជាមជ្ឈមណ្ឌលបណ្តុះបណ្តាលបច្ចេកវិទ្យាឌីជីថលឈានមុខគេនៅកម្ពុជា និងតំបន់អាស៊ាន',
      en: 'To become a leading digital technology training center in Cambodia and the ASEAN region.'
    },
    mission: {
      km: 'បណ្តុះបណ្តាលអ្នកជំនាញផ្នែកបច្ចេកវិទ្យាព័ត៌មានវិទ្យាប្រកបដោយគុណភាពខ្ពស់ និងសមត្ថភាពច្នៃប្រឌិត',
      en: 'To train high-quality information technology professionals with creative abilities.'
    },
    levels: [
      { name: { km: 'បរិញ្ញាបត្ររង', en: 'Associate Degree' }, duration: { km: '២ ឆ្នាំ', en: '2 years' } },
      { name: { km: 'បរិញ្ញាបត្រ', en: "Bachelor's Degree" }, duration: { km: '៤ ឆ្នាំ', en: '4 years' } },
    ],
    majors: [
      { 
        name: { km: 'ព័ត៌មានវិទ្យា', en: 'Information Technology' },
        desc: { km: 'បណ្តុះបណ្តាលជំនាញផ្នែកប្រព័ន្ធព័ត៌មាន និងបណ្តាញកុំព្យូទ័រ', en: 'Training in information systems and computer networks' }
      },
      { 
        name: { km: 'វិទ្យាសាស្ត្រកុំព្យូទ័រ', en: 'Computer Science' },
        desc: { km: 'បណ្តុះបណ្តាលជំនាញផ្នែកកម្មវិធី និងបញ្ញាសិប្បនិម្មិត', en: 'Training in programming and artificial intelligence' }
      },
    ],
    careerPaths: [
      { km: 'អ្នកអភិវឌ្ឍន៍កម្មវិធី', en: 'Software Developer' },
      { km: 'អ្នកគ្រប់គ្រងបណ្តាញ', en: 'Network Administrator' },
      { km: 'អ្នកវិភាគប្រព័ន្ធ', en: 'Systems Analyst' },
      { km: 'អ្នកជំនាញសន្តិសុខឌីជីថល', en: 'Cybersecurity Specialist' },
      { km: 'អ្នកអភិវឌ្ឍន៍កម្មវិធីទូរស័ព្ទ', en: 'Mobile App Developer' },
    ],
    stats: {
      students: '950+',
      graduates: '3,200+',
      facultyMembers: '35',
      labs: '5'
    },
    facilities: [
      { name: { km: 'មន្ទីរពិសោធន៍កុំព្យូទ័រ', en: 'Computer Lab' }, icon: 'bi-pc-display' },
      { name: { km: 'មន្ទីរពិសោធន៍បណ្តាញ', en: 'Network Lab' }, icon: 'bi-router' },
      { name: { km: 'មជ្ឈមណ្ឌលច្នៃប្រឌិត', en: 'Innovation Center' }, icon: 'bi-lightbulb' },
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

      {/* Content - same structure as above */}
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
            {lang === 'km' ? 'ក្លាយជាអ្នកជំនាញបច្ចេកវិទ្យាឌីជីថល' : 'Become a Digital Technology Expert'}
          </h2>
          <p className="text-white/70 text-lg mb-8">
            {lang === 'km' 
              ? 'ចូលរួមជាមួយយើងដើម្បីកសាងអនាគតឌីជីថលរបស់កម្ពុជា'
              : 'Join us to build Cambodia\'s digital future'}
          </p>
          <Link to="/admission" className="inline-flex items-center gap-2 bg-gold text-navy px-10 py-4 rounded-full font-bold text-lg hover:bg-gold-light transition-all shadow-gold">
            {lang === 'km' ? 'ចុះឈ្មោះឥឡូវនេះ' : 'Apply Now'} <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </section>
    </div>
  );
}