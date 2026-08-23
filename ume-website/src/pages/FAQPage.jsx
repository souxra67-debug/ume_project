import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLanguage } from '../context/LanguageContext';

const faqs = [
  {
    question: {
      km: 'តើ UME ទទួលចុះឈ្មោះនៅពេលណា?',
      en: 'When does UME accept admissions?',
    },
    answer: {
      km: 'UME បើកទទួលចុះឈ្មោះ ២ ដងក្នុងមួយឆ្នាំ៖ ឆមាសទី១ (ខែតុលា-មករា) និងឆមាសទី២ (ខែមេសា-កក្កដា)។',
      en: 'UME opens admissions twice a year: Semester 1 (October–January) and Semester 2 (April–July).',
    },
  },
  {
    question: {
      km: 'តើត្រូវការឯកសារអ្វីខ្លះសម្រាប់ចុះឈ្មោះ?',
      en: 'What documents are required for enrollment?',
    },
    answer: {
      km: 'ឯកសារចាំបាច់រួមមាន៖ សញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (ឬសញ្ញាបត្រសមមូល), អត្តសញ្ញាណប័ណ្ណ, រូបថត ៤x៦ ចំនួន ៤ សន្លឹក, និងសំបុត្រកំណើត។',
      en: 'Required documents include: high school diploma (or equivalent), national ID card, 4 passport-sized photos (4x6), and birth certificate.',
    },
  },
  {
    question: {
      km: 'តើ UME មានផ្តល់អាហារូបករណ៍ទេ?',
      en: 'Does UME offer scholarships?',
    },
    answer: {
      km: 'បាទ! UME ផ្តល់អាហារូបករណ៍ជាច្រើនប្រភេទដូចជា អាហារូបករណ៍និស្សិតឆ្នើម (100%), អាហារូបករណ៍កីឡា (75%), អាហារូបករណ៍គ្រួសារក្រីក្រ (100%) និងផ្សេងៗទៀត។',
      en: 'Yes! UME offers various scholarships such as Top Student Scholarship (100%), Sports Scholarship (75%), Low-Income Family Scholarship (100%), and more.',
    },
  },
  {
    question: {
      km: 'តើថ្លៃសិក្សាប៉ុន្មាន?',
      en: 'What are the tuition fees?',
    },
    answer: {
      km: 'ថ្លៃសិក្សាខុសគ្នាតាមមហាវិទ្យាល័យ ចន្លោះពី $300 - $550 ក្នុងមួយឆមាស។ សូមចូលទៅកាន់ទំព័រចុះឈ្មោះសម្រាប់ព័ត៌មានលម្អិត។',
      en: 'Tuition fees vary by faculty, ranging from $300 to $550 per semester. Please visit the admission page for details.',
    },
  },
  {
    question: {
      km: 'តើ UME មានសាខានៅឯណាខ្លះ?',
      en: 'Where are the UME campuses located?',
    },
    answer: {
      km: 'UME មាន ៧ សាខានៅទូទាំងប្រទេស៖ បាត់ដំបង (ទីតាំងគោល), បន្ទាយមានជ័យ, កំពង់ចាម, ពោធិ៍សាត់, ព្រះសីហនុ, កោះកុង, និងក្រចេះ។',
      en: 'UME has 7 campuses nationwide: Battambang (main campus), Banteay Meanchey, Kampong Cham, Pursat, Preah Sihanouk, Koh Kong, and Kratie.',
    },
  },
  {
    question: {
      km: 'តើអាចរៀនអនឡាញបានទេ?',
      en: 'Can I study online?',
    },
    answer: {
      km: 'បច្ចុប្បន្ន UME ផ្តល់ជូនការសិក្សាបែបបូកផ្សំ (Blended Learning) ដោយរួមបញ្ចូលទាំងការសិក្សាក្នុងថ្នាក់ និងការសិក្សាតាមអនឡាញ។',
      en: 'Currently UME offers Blended Learning, combining classroom instruction and online study.',
    },
  },
  {
    question: {
      km: 'តើមានកម្មវិធីបង្រៀនជាភាសាអង់គ្លេសទេ?',
      en: 'Are there English-taught programs?',
    },
    answer: {
      km: 'បាទ! មហាវិទ្យាល័យខ្លះមានកម្មវិធីបង្រៀនជាភាសាអង់គ្លេស 100% ជាពិសេសផ្នែកភាសាអង់គ្លេស និងគ្រប់គ្រងអន្តរជាតិ។',
      en: 'Yes! Some faculties offer 100% English-taught programs, especially English Language and International Management.',
    },
  },
  {
    question: {
      km: 'តើក្រោយបញ្ចប់ការសិក្សា មានជំនួយរកការងារធ្វើទេ?',
      en: 'Is there career support after graduation?',
    },
    answer: {
      km: 'UME មានមជ្ឈមណ្ឌលប្រឹក្សាអាជីព និងការងារ ដែលជួយណែនាំ និងស្វែងរកការងារជូននិស្សិតក្រោយបញ្ចប់ការសិក្សា។',
      en: 'UME has a Career & Job Counseling Center that assists graduates with career guidance and job placement.',
    },
  },
];

export default function FAQPage() {
  const { lang, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const text = {
    heroBadge: { km: 'សំណួរចម្លើយ', en: 'FAQ' },
    heroTitle: { km: 'សំណួរដែលគេសួរញឹកញាប់', en: 'Frequently Asked Questions' },
    heroSubtitle: { km: 'ស្វែងរកចម្លើយសម្រាប់សំណួររបស់អ្នក', en: 'Find answers to your questions' },
    searchPlaceholder: { km: 'ស្វែងរកសំណួរ...', en: 'Search questions...' },
    noResults: { km: 'រកមិនឃើញលទ្ធផល', en: 'No results found' },
    for: { km: 'សម្រាប់', en: 'for' },
    contactTitle: { km: 'រកមិនឃើញចម្លើយ?', en: 'Can’t find an answer?' },
    contactDesc: { km: 'ទាក់ទងមកយើងខ្ញុំ យើងនឹងឆ្លើយតបទៅកាន់អ្នកក្នុងពេលឆាប់ៗ', en: 'Contact us, we will respond to you shortly' },
    contactButton: { km: 'ទាក់ទងយើង', en: 'Contact Us' },
    filterAll: { km: 'ទាំងអស់', en: 'All' },
    filterAdmission: { km: 'ការចុះឈ្មោះ', en: 'Admission' },
    filterTuition: { km: 'ថ្លៃសិក្សា', en: 'Tuition' },
    filterPrograms: { km: 'កម្មវិធីសិក្សា', en: 'Programs' },
    filterOther: { km: 'ផ្សេងៗ', en: 'Other' },
  };

  const categories = [
    { key: 'all', label: text.filterAll[lang] },
    { key: 'admission', label: text.filterAdmission[lang] },
    { key: 'tuition', label: text.filterTuition[lang] },
    { key: 'programs', label: text.filterPrograms[lang] },
    { key: 'other', label: text.filterOther[lang] },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question[lang].toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer[lang].toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-navy-dark font-sans transition-colors duration-300">
      {/* Hero */}
      <section className="relative h-[350px] overflow-hidden bg-gradient-to-br from-navy via-navy-light to-navy">
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <span className="inline-block bg-amber/20 text-amber border border-amber/30 px-4 py-1.5 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
              <i className="bi bi-question-circle me-2"></i>
              {text.heroBadge[lang]}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">{text.heroTitle[lang]}</h1>
            <p className="text-lg text-white/70">{text.heroSubtitle[lang]}</p>
          </div>
        </div>
      </section>

      {/* Search & FAQ */}
      <section className="py-20 bg-white dark:bg-navy-dark">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          {/* Search */}
          <div className="relative mb-12">
            <i className="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/40 text-xl"></i>
            <input
              type="text"
              placeholder={text.searchPlaceholder[lang]}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-white/5 text-navy dark:text-white rounded-2xl focus:border-amber outline-none transition-colors text-lg placeholder:text-gray-400 dark:placeholder:text-white/30"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.key
                    ? 'bg-navy text-white shadow-md'
                    : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white/50 hover:bg-gray-200 dark:hover:bg-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? 'border-amber bg-amber/5 dark:bg-amber/10 shadow-lg'
                    : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-bold text-lg pr-8 text-navy dark:text-white">{faq.question[lang]}</span>
                  <i
                    className={`bi bi-chevron-down text-xl transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180 text-amber' : 'text-gray-400 dark:text-white/40'
                    }`}
                  ></i>
                </button>
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 text-gray-600 dark:text-white/60 leading-relaxed border-t border-gray-100 dark:border-white/10 pt-4">
                    {faq.answer[lang]}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredFaqs.length === 0 && (
            <div className="text-center py-16">
              <i className="bi bi-emoji-frown text-6xl text-gray-300 dark:text-white/20 block mb-4"></i>
              <p className="text-gray-400 dark:text-white/40 text-xl">
                {text.noResults[lang]} {text.for[lang]} "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-navy">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{text.contactTitle[lang]}</h2>
          <p className="text-white/70 mb-8">{text.contactDesc[lang]}</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-amber text-navy px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-light transition-all duration-300 hover:scale-105"
          >
            {text.contactButton[lang]} <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </section>
    </div>
  );
}