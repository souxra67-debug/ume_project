import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function FacultyAgriculture() {
  const { lang } = useLanguage();

  const facultyData = {
    name: {
      km: 'កសិកម្ម និងអភិវឌ្ឍន៍ជនបទ',
      en: 'Agriculture & Rural Development'
    },
    coverImage: 'https://i.pinimg.com/1200x/7a/3a/15/7a3a15bd4795d7b82a53822f42ab3ea4.jpg',
    description: {
      km: 'មហាវិទ្យាល័យកសិកម្ម និងអភិវឌ្ឍន៍ជនបទ គឺជាមហាវិទ្យាល័យដ៏សំខាន់របស់ UME ដែលផ្តល់ជូននូវកម្មវិធីសិក្សាប្រកបដោយគុណភាពក្នុងវិស័យកសិកម្ម និងការអភិវឌ្ឍជនបទ។ មហាវិទ្យាល័យបានរួមចំណែកយ៉ាងសំខាន់ក្នុងការអភិវឌ្ឍវិស័យកសិកម្ម និងសន្តិសុខស្បៀងនៅកម្ពុជា។',
      en: 'The Faculty of Agriculture & Rural Development is an important faculty of UME that offers quality programs in agriculture and rural development. The faculty has made significant contributions to the development of agriculture and food security in Cambodia.'
    },
    vision: {
      km: 'ក្លាយជាមជ្ឈមណ្ឌលស្រាវជ្រាវ និងបណ្តុះបណ្តាលកសិកម្មឈានមុខគេនៅកម្ពុជា និងតំបន់អាស៊ាន',
      en: 'To become a leading agricultural research and training center in Cambodia and the ASEAN region.'
    },
    mission: {
      km: 'បណ្តុះបណ្តាលអ្នកជំនាញផ្នែកកសិកម្ម និងអភិវឌ្ឍន៍ជនបទប្រកបដោយគុណភាពខ្ពស់ ដើម្បីរួមចំណែកដល់ការអភិវឌ្ឍប្រកបដោយចីរភាព',
      en: 'To train high-quality professionals in agriculture and rural development to contribute to sustainable development.'
    },
    levels: [
      { name: { km: 'បរិញ្ញាបត្ររង', en: 'Associate Degree' }, duration: { km: '២ ឆ្នាំ', en: '2 years' } },
      { name: { km: 'បរិញ្ញាបត្រ', en: "Bachelor's Degree" }, duration: { km: '៤ ឆ្នាំ', en: '4 years' } },
    ],
    majors: [
      { 
        name: { km: 'កសិកម្ម', en: 'Agriculture' },
        desc: { km: 'បណ្តុះបណ្តាលជំនាញផ្នែកដាំដំណាំ បសុសត្វ និងកសិកម្មនិរន្តរភាព', en: 'Training in crop cultivation, animal husbandry, and sustainable agriculture' }
      },
      { 
        name: { km: 'អភិវឌ្ឍន៍ជនបទ', en: 'Rural Development' },
        desc: { km: 'បណ្តុះបណ្តាលជំនាញផ្នែកការអភិវឌ្ឍសហគមន៍ជនបទ និងការគ្រប់គ្រងគម្រោង', en: 'Training in rural community development and project management' }
      },
    ],
    careerPaths: [
      { km: 'អ្នកជំនាញកសិកម្ម', en: 'Agricultural Specialist' },
      { km: 'អ្នកអភិវឌ្ឍន៍ជនបទ', en: 'Rural Development Officer' },
      { km: 'អ្នកស្រាវជ្រាវកសិកម្ម', en: 'Agricultural Researcher' },
      { km: 'មន្ត្រីអភិវឌ្ឍន៍សហគមន៍', en: 'Community Development Officer' },
      { km: 'អ្នកគ្រប់គ្រងកសិដ្ឋាន', en: 'Farm Manager' },
    ],
    stats: {
      students: '600+',
      graduates: '2,000+',
      facultyMembers: '25',
      labs: '3'
    },
    facilities: [
      { name: { km: 'កសិដ្ឋានពិសោធន៍', en: 'Experimental Farm' }, icon: 'bi-tree' },
      { name: { km: 'មន្ទីរពិសោធន៍ដី', en: 'Soil Lab' }, icon: 'bi-droplet' },
      { name: { km: 'មជ្ឈមណ្ឌលស្រាវជ្រាវ', en: 'Research Center' }, icon: 'bi-microscope' },
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
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                {facultyData.name[lang]}
              </h1>
              <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
                {facultyData.description[lang].substring(0, 150)}...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content - same structure as others */}
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
            {lang === 'km' ? 'ចូលរួមអភិវឌ្ឍវិស័យកសិកម្មកម្ពុជា' : 'Join in Developing Cambodia\'s Agriculture'}
          </h2>
          <p className="text-white/70 text-lg mb-8">
            {lang === 'km' 
              ? 'ក្លាយជាផ្នែកមួយនៃការអភិវឌ្ឍប្រកបដោយចីរភាពនៃវិស័យកសិកម្ម'
              : 'Become part of the sustainable development of agriculture'}
          </p>
          <Link to="/admission" className="inline-flex items-center gap-2 bg-gold text-navy px-10 py-4 rounded-full font-bold text-lg hover:bg-gold-light transition-all shadow-gold">
            {lang === 'km' ? 'ចុះឈ្មោះឥឡូវនេះ' : 'Apply Now'} <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </section>
    </div>
  );
}