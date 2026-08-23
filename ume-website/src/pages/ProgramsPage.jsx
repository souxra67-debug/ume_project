import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLanguage } from '../context/LanguageContext';

// ============================================================
// ទិន្នន័យមហាវិទ្យាល័យទាំងអស់ (យកពីគេហទំព័រ UME និង AUPP)
// ============================================================
const faculties = [
  {
    id: 1,
    slug: 'management-tourism',
    name: {
      km: 'គ្រប់គ្រង និងទេសចរណ៍',
      en: 'Management & Tourism'
    },
    shortName: {
      km: 'គ្រប់គ្រង-ទេសចរណ៍',
      en: 'M&T'
    },
    icon: 'bi-briefcase-fill',
    coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
    description: {
      km: 'មហាវិទ្យាល័យគ្រប់គ្រង និងទេសចរណ៍ ផ្តល់ជូននូវកម្មវិធីសិក្សាដ៏ទូលំទូលាយ ដែលត្រូវបានរចនាឡើងដើម្បីបំពាក់ឲ្យនិស្សិតនូវចំណេះដឹង និងជំនាញចាំបាច់សម្រាប់អាជីពនាពេលអនាគតក្នុងវិស័យគ្រប់គ្រងអាជីវកម្ម និងទេសចរណ៍។',
      en: 'The Faculty of Management & Tourism offers comprehensive programs designed to equip students with the knowledge and skills needed for future careers in business management and tourism.'
    },
    mission: {
      km: 'បណ្តុះបណ្តាលធនធានមនុស្សដែលមានគុណភាព និងសីលធម៌វិជ្ជាជីវ៍ ដើម្បីឆ្លើយតបទៅនឹងតម្រូវការទីផ្សារការងារក្នុងស្រុក និងអន្តរជាតិ។',
      en: 'To produce quality human resources with professional ethics to meet the demands of the local and international job market.'
    },
    vision: {
      km: 'ក្លាយជាមហាវិទ្យាល័យឈានមុខគេក្នុងតំបន់អាស៊ាន ផ្នែកគ្រប់គ្រង និងទេសចរណ៍។',
      en: 'To become a leading faculty in the ASEAN region in Management and Tourism.'
    },
    levels: [
      { 
        name: { km: 'បរិញ្ញាបត្ររង', en: 'Associate Degree' }, 
        duration: { km: '២ ឆ្នាំ', en: '2 years' },
        code: 'AA'
      },
      { 
        name: { km: 'បរិញ្ញាបត្រ', en: "Bachelor's Degree" }, 
        duration: { km: '៤ ឆ្នាំ', en: '4 years' },
        code: 'BA'
      },
      { 
        name: { km: 'បរិញ្ញាបត្រជាន់ខ្ពស់', en: "Master's Degree" }, 
        duration: { km: '២ ឆ្នាំ', en: '2 years' },
        code: 'MA'
      },
      { 
        name: { km: 'បណ្ឌិត', en: 'Doctorate' }, 
        duration: { km: '៣ ឆ្នាំ', en: '3 years' },
        code: 'PhD'
      },
    ],
    majors: [
      { 
        km: 'គ្រប់គ្រងទូទៅ', 
        en: 'General Management',
        description: {
          km: 'បណ្តុះបណ្តាលជំនាញគ្រប់គ្រងអាជីវកម្មគ្រប់ប្រភេទ',
          en: 'Training in all types of business management skills'
        }
      },
      { 
        km: 'ទីផ្សារ', 
        en: 'Marketing',
        description: {
          km: 'ផ្តោតលើយុទ្ធសាស្ត្រទីផ្សារ និងការលក់',
          en: 'Focus on marketing strategies and sales'
        }
      },
      { 
        km: 'គណនេយ្យ និងហិរញ្ញវត្ថុ', 
        en: 'Accounting & Finance',
        description: {
          km: 'បណ្តុះបណ្តាលជំនាញគណនេយ្យ និងការគ្រប់គ្រងហិរញ្ញវត្ថុ',
          en: 'Training in accounting and financial management'
        }
      },
      { 
        km: 'គ្រប់គ្រងទេសចរណ៍ និងបដិសណ្ឋារកិច្ច', 
        en: 'Tourism & Hospitality Management',
        description: {
          km: 'ផ្តោតលើការគ្រប់គ្រងសណ្ឋាគារ និងទេសចរណ៍',
          en: 'Focus on hotel and tourism management'
        }
      },
    ],
    careerPaths: [
      { km: 'អ្នកគ្រប់គ្រងអាជីវកម្ម', en: 'Business Manager' },
      { km: 'អ្នកទីផ្សារ', en: 'Marketing Specialist' },
      { km: 'គណនេយ្យករ', en: 'Accountant' },
      { km: 'អ្នកគ្រប់គ្រងសណ្ឋាគារ', en: 'Hotel Manager' },
    ],
    stats: {
      students: '1,200+',
      graduates: '4,500+',
      facultyMembers: '45',
      labs: '3'
    }
  },
  {
    id: 2,
    slug: 'literature-humanities',
    name: {
      km: 'អក្សរសាស្ត្រ មនុស្សសាស្ត្រ និងភាសាបរទេស',
      en: 'Literature, Humanities & Foreign Languages'
    },
    shortName: {
      km: 'អក្សរសាស្ត្រ-ភាសា',
      en: 'L&L'
    },
    icon: 'bi-book-fill',
    coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&q=80',
    description: {
      km: 'មហាវិទ្យាល័យអក្សរសាស្ត្រ មនុស្សសាស្ត្រ និងភាសាបរទេស ផ្តល់ជូននូវកម្មវិធីសិក្សាដ៏ទូលំទូលាយ ដែលត្រូវបានរចនាឡើងដើម្បីបំពាក់ឲ្យនិស្សិតនូវចំណេះដឹងភាសា និងវប្បធម៌ដើម្បីធ្វើការក្នុងវិស័យអប់រំ បកប្រែ និងទំនាក់ទំនងអន្តរជាតិ។',
      en: 'The Faculty of Literature, Humanities & Foreign Languages offers comprehensive programs designed to equip students with language and cultural knowledge for careers in education, translation, and international relations.'
    },
    mission: {
      km: 'ផ្សព្វផ្សាយចំណេះដឹងភាសា និងអក្សរសាស្ត្រដើម្បីអភិវឌ្ឍធនធានមនុស្សប្រកបដោយគុណភាព',
      en: 'To promote language and literature knowledge to develop quality human resources.'
    },
    vision: {
      km: 'ក្លាយជាមជ្ឈមណ្ឌលសិក្សាភាសា និងអក្សរសាស្ត្រឈានមុខគេនៅកម្ពុជា',
      en: 'To become a leading center for language and literature studies in Cambodia.'
    },
    levels: [
      { 
        name: { km: 'បរិញ្ញាបត្ររង', en: 'Associate Degree' }, 
        duration: { km: '២ ឆ្នាំ', en: '2 years' },
        code: 'AA'
      },
      { 
        name: { km: 'បរិញ្ញាបត្រ', en: "Bachelor's Degree" }, 
        duration: { km: '៤ ឆ្នាំ', en: '4 years' },
        code: 'BA'
      },
    ],
    majors: [
      { 
        km: 'ភាសាអង់គ្លេស', 
        en: 'English',
        description: {
          km: 'បណ្តុះបណ្តាលជំនាញភាសាអង់គ្លេសសម្រាប់ការងារ និងការសិក្សា',
          en: 'Training in English language skills for work and study'
        }
      },
      { 
        km: 'ភាសាចិន', 
        en: 'Chinese',
        description: {
          km: 'បណ្តុះបណ្តាលជំនាញភាសាចិនសម្រាប់អាជីវកម្ម និងទំនាក់ទំនង',
          en: 'Training in Chinese language skills for business and communication'
        }
      },
      { 
        km: 'ភាសាថៃ', 
        en: 'Thai',
        description: {
          km: 'បណ្តុះបណ្តាលជំនាញភាសាថៃសម្រាប់ការងារ និងវប្បធម៌',
          en: 'Training in Thai language skills for work and culture'
        }
      },
    ],
    careerPaths: [
      { km: 'គ្រូបង្រៀនភាសា', en: 'Language Teacher' },
      { km: 'អ្នកបកប្រែ', en: 'Translator' },
      { km: 'អ្នកទំនាក់ទំនងអន្តរជាតិ', en: 'International Relations Officer' },
      { km: 'អ្នកស្រាវជ្រាវវប្បធម៌', en: 'Cultural Researcher' },
    ],
    stats: {
      students: '800+',
      graduates: '2,800+',
      facultyMembers: '30',
      labs: '4'
    }
  },
  {
    id: 3,
    slug: 'science-technology',
    name: {
      km: 'វិទ្យាសាស្ត្រ និងបច្ចេកវិទ្យា',
      en: 'Science & Technology'
    },
    shortName: {
      km: 'វិទ្យាសាស្ត្រ-បច្ចេកវិទ្យា',
      en: 'S&T'
    },
    icon: 'bi-laptop-fill',
    coverImage: 'https://i.pinimg.com/736x/28/b5/4a/28b54aa3248e20f53a183d19c18c08a9.jpg',
    description: {
      km: 'មហាវិទ្យាល័យវិទ្យាសាស្ត្រ និងបច្ចេកវិទ្យា ផ្តល់ជូននូវកម្មវិធីសិក្សាដ៏ទូលំទូលាយ ដែលត្រូវបានរចនាឡើងដើម្បីបំពាក់ឲ្យនិស្សិតនូវចំណេះដឹងផ្នែកបច្ចេកវិទ្យា និងកុំព្យូទ័រដើម្បីឆ្លើយតបទៅនឹងតម្រូវការនៃយុគសម័យឌីជីថល។',
      en: 'The Faculty of Science & Technology offers comprehensive programs designed to equip students with technology and computer knowledge to meet the demands of the digital age.'
    },
    mission: {
      km: 'បណ្តុះបណ្តាលអ្នកជំនាញផ្នែកបច្ចេកវិទ្យាព័ត៌មានវិទ្យាប្រកបដោយគុណភាពខ្ពស់',
      en: 'To train high-quality information technology professionals.'
    },
    vision: {
      km: 'ក្លាយជាមជ្ឈមណ្ឌលបណ្តុះបណ្តាលបច្ចេកវិទ្យាឌីជីថលឈានមុខគេនៅកម្ពុជា',
      en: 'To become a leading digital technology training center in Cambodia.'
    },
    levels: [
      { 
        name: { km: 'បរិញ្ញាបត្ររង', en: 'Associate Degree' }, 
        duration: { km: '២ ឆ្នាំ', en: '2 years' },
        code: 'AA'
      },
      { 
        name: { km: 'បរិញ្ញាបត្រ', en: "Bachelor's Degree" }, 
        duration: { km: '៤ ឆ្នាំ', en: '4 years' },
        code: 'BA'
      },
    ],
    majors: [
      { 
        km: 'ព័ត៌មានវិទ្យា', 
        en: 'Information Technology',
        description: {
          km: 'បណ្តុះបណ្តាលជំនាញផ្នែកប្រព័ន្ធព័ត៌មាន និងបណ្តាញកុំព្យូទ័រ',
          en: 'Training in information systems and computer networks'
        }
      },
      { 
        km: 'វិទ្យាសាស្ត្រកុំព្យូទ័រ', 
        en: 'Computer Science',
        description: {
          km: 'បណ្តុះបណ្តាលជំនាញផ្នែកកម្មវិធី និងបញ្ញាសិប្បនិម្មិត',
          en: 'Training in programming and artificial intelligence'
        }
      },
    ],
    careerPaths: [
      { km: 'អ្នកអភិវឌ្ឍន៍កម្មវិធី', en: 'Software Developer' },
      { km: 'អ្នកគ្រប់គ្រងបណ្តាញ', en: 'Network Administrator' },
      { km: 'អ្នកវិភាគប្រព័ន្ធ', en: 'Systems Analyst' },
      { km: 'អ្នកជំនាញសន្តិសុខឌីជីថល', en: 'Cybersecurity Specialist' },
    ],
    stats: {
      students: '950+',
      graduates: '3,200+',
      facultyMembers: '35',
      labs: '5'
    }
  },
  {
    id: 4,
    slug: 'law-economics',
    name: {
      km: 'ច្បាប់ និងសេដ្ឋកិច្ច',
      en: 'Law & Economics'
    },
    shortName: {
      km: 'ច្បាប់-សេដ្ឋកិច្ច',
      en: 'L&E'
    },
    icon: 'bi-bank',
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
    description: {
      km: 'មហាវិទ្យាល័យច្បាប់ និងសេដ្ឋកិច្ច ផ្តល់ជូននូវកម្មវិធីសិក្សាដ៏ទូលំទូលាយ ដែលត្រូវបានរចនាឡើងដើម្បីបំពាក់ឲ្យនិស្សិតនូវចំណេះដឹងផ្នែកច្បាប់ និងសេដ្ឋកិច្ចដើម្បីធ្វើការក្នុងវិស័យតុលាការ ធនាគារ និងរដ្ឋបាលសាធារណៈ។',
      en: 'The Faculty of Law & Economics offers comprehensive programs designed to equip students with legal and economic knowledge for careers in the judiciary, banking, and public administration.'
    },
    mission: {
      km: 'បណ្តុះបណ្តាលអ្នកជំនាញផ្នែកច្បាប់ និងសេដ្ឋកិច្ចប្រកបដោយសីលធម៌ និងសមត្ថភាពខ្ពស់',
      en: 'To train legal and economic professionals with high ethics and competence.'
    },
    vision: {
      km: 'ក្លាយជាមហាវិទ្យាល័យឈានមុខគេផ្នែកច្បាប់ និងសេដ្ឋកិច្ចនៅកម្ពុជា',
      en: 'To become a leading faculty of law and economics in Cambodia.'
    },
    levels: [
      { 
        name: { km: 'បរិញ្ញាបត្ររង', en: 'Associate Degree' }, 
        duration: { km: '២ ឆ្នាំ', en: '2 years' },
        code: 'AA'
      },
      { 
        name: { km: 'បរិញ្ញាបត្រ', en: "Bachelor's Degree" }, 
        duration: { km: '៤ ឆ្នាំ', en: '4 years' },
        code: 'BA'
      },
      { 
        name: { km: 'បរិញ្ញាបត្រជាន់ខ្ពស់', en: "Master's Degree" }, 
        duration: { km: '២ ឆ្នាំ', en: '2 years' },
        code: 'MA'
      },
      { 
        name: { km: 'បណ្ឌិត', en: 'Doctorate' }, 
        duration: { km: '៣ ឆ្នាំ', en: '3 years' },
        code: 'PhD'
      },
    ],
    majors: [
      { 
        km: 'ច្បាប់', 
        en: 'Law',
        description: {
          km: 'បណ្តុះបណ្តាលជំនាញផ្នែកច្បាប់រដ្ឋប្បវេណី និងព្រហ្មទណ្ឌ',
          en: 'Training in civil and criminal law'
        }
      },
      { 
        km: 'សេដ្ឋកិច្ច', 
        en: 'Economics',
        description: {
          km: 'បណ្តុះបណ្តាលជំនាញផ្នែកសេដ្ឋកិច្ចអតិសុខុម និងអន្តរជាតិ',
          en: 'Training in microeconomics and international economics'
        }
      },
    ],
    careerPaths: [
      { km: 'មេធាវី', en: 'Lawyer' },
      { km: 'ចៅក្រម', en: 'Judge' },
      { km: 'អ្នកសេដ្ឋកិច្ច', en: 'Economist' },
      { km: 'មន្ត្រីធនាគារ', en: 'Banking Officer' },
    ],
    stats: {
      students: '700+',
      graduates: '2,500+',
      facultyMembers: '28',
      labs: '2'
    }
  },
  {
    id: 5,
    slug: 'agriculture-rural-development',
    name: {
      km: 'កសិកម្ម និងអភិវឌ្ឍន៍ជនបទ',
      en: 'Agriculture & Rural Development'
    },
    shortName: {
      km: 'កសិកម្ម-អភិវឌ្ឍន៍',
      en: 'A&RD'
    },
    icon: 'bi-tree-fill',
    coverImage: 'https://i.pinimg.com/1200x/7a/3a/15/7a3a15bd4795d7b82a53822f42ab3ea4.jpg',
    description: {
      km: 'មហាវិទ្យាល័យកសិកម្ម និងអភិវឌ្ឍន៍ជនបទ ផ្តល់ជូននូវកម្មវិធីសិក្សាដ៏ទូលំទូលាយ ដែលត្រូវបានរចនាឡើងដើម្បីបំពាក់ឲ្យនិស្សិតនូវចំណេះដឹងផ្នែកកសិកម្ម និងការអភិវឌ្ឍជនបទដើម្បីរួមចំណែកដល់សន្តិសុខស្បៀង និងការអភិវឌ្ឍប្រកបដោយចីរភាព។',
      en: 'The Faculty of Agriculture & Rural Development offers comprehensive programs designed to equip students with agricultural and rural development knowledge to contribute to food security and sustainable development.'
    },
    mission: {
      km: 'បណ្តុះបណ្តាលអ្នកជំនាញផ្នែកកសិកម្ម និងអភិវឌ្ឍន៍ជនបទប្រកបដោយគុណភាពខ្ពស់',
      en: 'To train high-quality professionals in agriculture and rural development.'
    },
    vision: {
      km: 'ក្លាយជាមជ្ឈមណ្ឌលស្រាវជ្រាវ និងបណ្តុះបណ្តាលកសិកម្មឈានមុខគេនៅកម្ពុជា',
      en: 'To become a leading agricultural research and training center in Cambodia.'
    },
    levels: [
      { 
        name: { km: 'បរិញ្ញាបត្ររង', en: 'Associate Degree' }, 
        duration: { km: '២ ឆ្នាំ', en: '2 years' },
        code: 'AA'
      },
      { 
        name: { km: 'បរិញ្ញាបត្រ', en: "Bachelor's Degree" }, 
        duration: { km: '៤ ឆ្នាំ', en: '4 years' },
        code: 'BA'
      },
    ],
    majors: [
      { 
        km: 'កសិកម្ម', 
        en: 'Agriculture',
        description: {
          km: 'បណ្តុះបណ្តាលជំនាញផ្នែកដាំដំណាំ និងបសុសត្វ',
          en: 'Training in crop cultivation and animal husbandry'
        }
      },
      { 
        km: 'អភិវឌ្ឍន៍ជនបទ', 
        en: 'Rural Development',
        description: {
          km: 'បណ្តុះបណ្តាលជំនាញផ្នែកការអភិវឌ្ឍសហគមន៍ជនបទ',
          en: 'Training in rural community development'
        }
      },
    ],
    careerPaths: [
      { km: 'អ្នកជំនាញកសិកម្ម', en: 'Agricultural Specialist' },
      { km: 'អ្នកអភិវឌ្ឍន៍ជនបទ', en: 'Rural Development Officer' },
      { km: 'អ្នកស្រាវជ្រាវកសិកម្ម', en: 'Agricultural Researcher' },
      { km: 'មន្ត្រីអភិវឌ្ឍន៍សហគមន៍', en: 'Community Development Officer' },
    ],
    stats: {
      students: '600+',
      graduates: '2,000+',
      facultyMembers: '25',
      labs: '3'
    }
  }
];

// ============================================================
// COMPONENT: Faculty Card (សម្រាប់បង្ហាញក្នុងបញ្ជី)
// ============================================================
function FacultyCard({ faculty, lang, index }) {
  return (
    <Link
      to={`/programs/${faculty.slug}`}
      className="group relative bg-white dark:bg-dark-bg-card rounded-3xl overflow-hidden shadow-card dark:shadow-dark-card hover:shadow-navy dark:hover:shadow-dark-card transition-all duration-500 hover:-translate-y-2"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={faculty.coverImage}
          alt={faculty.name[lang]}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy/60 to-transparent"></div>
        <div className="absolute top-4 left-4 bg-gold text-navy px-3 py-1 rounded-full text-xs font-bold">
          {faculty.shortName[lang]}
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-2">
            <i className={`bi ${faculty.icon} text-2xl text-gold`}></i>
          </div>
          <h3 className="text-xl font-bold">{faculty.name[lang]}</h3>
        </div>
      </div>
      <div className="p-6">
        <p className="text-navy/60 dark:text-dark-text-secondary text-sm leading-relaxed line-clamp-2 mb-4">
          {faculty.description[lang]}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {faculty.majors.slice(0, 3).map((major, idx) => (
            <span key={idx} className="text-xs bg-offwhite dark:bg-dark-bg-hover text-navy dark:text-dark-text-primary px-3 py-1 rounded-full">
              {major[lang]}
            </span>
          ))}
          {faculty.majors.length > 3 && (
            <span className="text-xs bg-gold/10 text-gold px-3 py-1 rounded-full">
              +{faculty.majors.length - 3}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-navy/5 dark:border-dark-border">
          <div className="flex items-center gap-4 text-xs text-navy/40 dark:text-dark-text-secondary">
            <span className="flex items-center gap-1">
              <i className="bi bi-people"></i> {faculty.stats.students}
            </span>
            <span className="flex items-center gap-1">
              <i className="bi bi-mortarboard"></i> {faculty.stats.graduates}
            </span>
          </div>
          <span className="text-gold group-hover:translate-x-1 transition-transform">
            <i className="bi bi-arrow-right"></i>
          </span>
        </div>
      </div>
    </Link>
  );
}

// ============================================================
// MAIN PAGE: Programs Listing
// ============================================================
export default function ProgramsPage() {
  const { lang, t } = useLanguage();

  const text = {
    heroBadge: { km: 'កម្មវិធីសិក្សា', en: 'Programs' },
    heroTitle: { km: 'កម្មវិធីសិក្សារបស់យើង', en: 'Our Programs' },
    heroSubtitle: { 
      km: 'ស្វែងរកកម្មវិធីសិក្សាដែលសាកសមបំផុតសម្រាប់អនាគតរបស់អ្នក ពីមហាវិទ្យាល័យទាំង ៥ របស់ UME',
      en: 'Discover the best program for your future from UME\'s 5 faculties'
    },
    viewDetail: { km: 'មើលព័ត៌មានលម្អិត', en: 'View Details' },
    whyChoose: { km: 'ហេតុអ្វីជ្រើសរើស UME?', en: 'Why Choose UME?' },
    whyDesc: {
      km: 'UME ផ្តល់ជូននូវកម្មវិធីសិក្សាដែលទទួលស្គាល់ដោយក្រសួងអប់រំ និងមានបទពិសោធន៍ជាង ២៦ ឆ្នាំក្នុងការបណ្តុះបណ្តាលធនធានមនុស្សប្រកបដោយគុណភាព។',
      en: 'UME offers accredited programs recognized by the Ministry of Education with over 26 years of experience in training quality human resources.'
    },
    statsTitle: { km: 'ស្ថិតិ', en: 'Statistics' },
    facultiesTitle: { km: 'មហាវិទ្យាល័យទាំងអស់', en: 'All Faculties' },
    footerCTA1: { km: 'ត្រៀមខ្លួនចាប់ផ្តើម', en: 'Ready to Start' },
    footerCTA2: { km: 'ដំណើរសិក្សា', en: 'Your Journey' },
    footerCTADesc: {
      km: 'ចូលរួមជាមួយនិស្សិតជាង ៣៥,០០០ នាក់ដែលបានបញ្ចប់ការសិក្សាពី UME',
      en: 'Join over 35,000 alumni who graduated from UME'
    },
    applyNow: { km: 'ចុះឈ្មោះឥឡូវនេះ', en: 'Apply Now' },
    scholarshipInfo: { km: 'ព័ត៌មានអាហារូបករណ៍', en: 'Scholarship Info' },
  };

  return (
    <div className="min-h-screen bg-light-bg-primary dark:bg-dark-bg-primary transition-colors duration-300">
      {/* ========== HERO ========== */}
      <section className="relative h-[400px] overflow-hidden bg-gradient-to-br from-navy via-navy-light to-navy-dark">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border-2 border-white/20 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 border-2 border-white/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-white/10 rounded-full"></div>
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="animate-fade-in-down">
              <span className="inline-flex items-center gap-2 bg-white/10 text-gold border border-gold/30 px-5 py-2 rounded-full text-sm font-medium mb-5 backdrop-blur-sm">
                <i className="bi bi-mortarboard-fill"></i>
                {text.heroBadge[lang]}
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
                {text.heroTitle[lang]}
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-2xl">{text.heroSubtitle[lang]}</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 leading-[0]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="none" className="w-full">
            <path
              className="fill-light-bg-primary dark:fill-dark-bg-primary transition-colors duration-300"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
            />
          </svg>
        </div>
      </section>

      {/* ========== WHY CHOOSE UME ========== */}
      <section className="py-16 bg-light-bg-secondary dark:bg-dark-bg-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-navy dark:text-dark-text-primary mb-6">
                {text.whyChoose[lang]}
              </h2>
              <p className="text-navy/60 dark:text-dark-text-secondary text-lg leading-relaxed mb-6">
                {text.whyDesc[lang]}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-dark-bg-card rounded-2xl p-4 shadow-card dark:shadow-dark-card">
                  <p className="text-2xl font-bold text-gold">26+</p>
                  <p className="text-navy/40 dark:text-dark-text-secondary text-sm">ឆ្នាំបទពិសោធន៍</p>
                </div>
                <div className="bg-white dark:bg-dark-bg-card rounded-2xl p-4 shadow-card dark:shadow-dark-card">
                  <p className="text-2xl font-bold text-gold">35K+</p>
                  <p className="text-navy/40 dark:text-dark-text-secondary text-sm">និស្សិតបញ្ចប់ការសិក្សា</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-navy to-navy-light rounded-2xl p-6 text-white">
                <i className="bi bi-award text-3xl text-gold mb-3 block"></i>
                <p className="font-bold">ទទួលស្គាល់ដោយក្រសួងអប់រំ</p>
              </div>
              <div className="bg-gradient-to-br from-gold to-gold-light rounded-2xl p-6 text-navy">
                <i className="bi bi-globe-americas text-3xl mb-3 block"></i>
                <p className="font-bold">ដៃគូអន្តរជាតិ ៥០+</p>
              </div>
              <div className="bg-gradient-to-br from-crimson to-crimson-light rounded-2xl p-6 text-white">
                <i className="bi bi-people text-3xl text-gold mb-3 block"></i>
                <p className="font-bold">សាស្ត្រាចារ្យជំនាញ ១០០+</p>
              </div>
              <div className="bg-white dark:bg-dark-bg-card rounded-2xl p-6 shadow-card dark:shadow-dark-card">
                <i className="bi bi-laptop text-3xl text-gold mb-3 block"></i>
                <p className="font-bold text-navy dark:text-dark-text-primary">បច្ចេកវិទ្យាទំនើប</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== ALL FACULTIES ========== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy dark:text-dark-text-primary">
              {text.facultiesTitle[lang]}
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {faculties.map((faculty, index) => (
              <FacultyCard key={faculty.id} faculty={faculty} lang={lang} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-20 bg-gradient-to-r from-navy to-navy-dark text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {text.footerCTA1[lang]}
            <span className="text-gold"> {text.footerCTA2[lang]}</span>
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">{text.footerCTADesc[lang]}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/admission"
              className="bg-gold text-navy px-8 py-4 rounded-full font-bold text-lg hover:bg-gold-light transition-all duration-300 hover:scale-105 shadow-gold inline-flex items-center gap-2"
            >
              {text.applyNow[lang]} <i className="bi bi-arrow-right"></i>
            </Link>
            <Link
              to="/scholarship"
              className="bg-white/10 border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300"
            >
              {text.scholarshipInfo[lang]}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}