// src/data/newsEventsData.js

export const newsEventsData = [
  // ========== NEWS ==========
  {
    id: 'news-1',
    type: 'news',
    title: {
      km: 'UME ទទួលបានពានរង្វាន់គុណភាពអប់រំឆ្នាំ ២០២៦',
      en: 'UME Receives Education Quality Award 2026',
    },
    excerpt: {
      km: 'សាកលវិទ្យាល័យគ្រប់គ្រង និងសេដ្ឋកិច្ច ទទួលបានពានរង្វាន់គុណភាពអប់រំពីក្រសួងអប់រំ យុវជន និងកីឡា...',
      en: 'The University of Management and Economics received the Education Quality Award from the Ministry of Education...',
    },
    content: {
      km: `សាកលវិទ្យាល័យគ្រប់គ្រង និងសេដ្ឋកិច្ច (UME) មានសេចក្តីសោមនស្សរីករាយក្នុងការប្រកាសថា ខ្លួនបានទទួលពានរង្វាន់គុណភាពអប់រំឆ្នាំ ២០២៦ ពីក្រសួងអប់រំ យុវជន និងកីឡា។

ពានរង្វាន់នេះគឺជាការទទួលស្គាល់នូវកិច្ចខិតខំប្រឹងប្រែងឥតឈប់ឈររបស់ UME ក្នុងការលើកកម្ពស់គុណភាពអប់រំ និងការបណ្តុះបណ្តាលធនធានមនុស្សដែលមានសមត្ថភាពខ្ពស់សម្រាប់ប្រទេសកម្ពុជា។

លោកសាកលវិទ្យាធិការ UME បានមានប្រសាសន៍ថា "ពានរង្វាន់នេះជាកម្លាំងចិត្តដ៏ធំធេងសម្រាប់យើងក្នុងការបន្តបេសកកម្មផ្តល់ការអប់រំប្រកបដោយគុណភាពដល់និស្សិតកម្ពុជា"។`,
      en: `The University of Management and Economics (UME) is delighted to announce that it has received the Education Quality Award 2026 from the Ministry of Education, Youth and Sport.

This award recognizes UME's continuous efforts in improving education quality and training highly capable human resources for Cambodia.

The Rector of UME stated, "This award is a tremendous motivation for us to continue our mission of providing quality education to Cambodian students."`,
    },
    image: 'https://images.unsplash.com/photo-1523050854058-8df90910c58f?w=800&q=80',
    date: '2026-07-15',
    author: { km: 'ក្រុមការងារ UME', en: 'UME Team' },
    icon: 'bi-trophy-fill',
    tags: [
      { km: 'ពានរង្វាន់', en: 'Award' },
      { km: 'គុណភាព', en: 'Quality' },
      { km: 'ការអប់រំ', en: 'Education' },
    ],
    featured: true,
  },
  {
    id: 'news-2',
    type: 'news',
    title: {
      km: 'កម្មវិធីថ្មី៖ បរិញ្ញាបត្របច្ចេកវិទ្យាព័ត៌មាន',
      en: 'New Program: Bachelor of Information Technology',
    },
    excerpt: {
      km: 'UME ប្រកាសបើកកម្មវិធីសិក្សាថ្មីផ្នែកបច្ចេកវិទ្យាព័ត៌មាន ចាប់ពីឆ្នាំសិក្សា ២០២៦-២០២៧...',
      en: 'UME announces new Information Technology program starting from academic year 2026-2027...',
    },
    content: {
      km: `សាកលវិទ្យាល័យ UME មានសេចក្តីសោមនស្សក្នុងការប្រកាសបើកកម្មវិធីសិក្សាថ្មី បរិញ្ញាបត្របច្ចេកវិទ្យាព័ត៌មាន ចាប់ពីឆ្នាំសិក្សា ២០២៦-២០២៧ នេះតទៅ។

កម្មវិធីនេះត្រូវបានរចនាឡើងដើម្បីបំពាក់និស្សិតនូវជំនាញចាំបាច់ក្នុងយុគសម័យឌីជីថល រួមមាន ការអភិវឌ្ឍកម្មវិធី បណ្តាញកុំព្យូទ័រ សន្តិសុខព័ត៌មាន និងបញ្ញាសិប្បនិម្មិត។`,
      en: `UME University is pleased to announce the launch of a new Bachelor of Information Technology program starting from the 2026-2027 academic year.

This program is designed to equip students with essential skills in the digital era, including software development, computer networking, cybersecurity, and artificial intelligence.`,
    },
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
    date: '2026-07-10',
    author: { km: 'នាយកដ្ឋានសិក្សា', en: 'Academic Department' },
    icon: 'bi-laptop',
    tags: [
      { km: 'កម្មវិធីថ្មី', en: 'New Program' },
      { km: 'បច្ចេកវិទ្យា', en: 'Technology' },
    ],
    featured: false,
  },
  {
    id: 'news-3',
    type: 'news',
    title: {
      km: 'និស្សិត UME ឈ្នះការប្រកួត Hackathon ថ្នាក់ជាតិ',
      en: 'UME Students Win National Hackathon',
    },
    excerpt: {
      km: 'ក្រុមនិស្សិត UME ចំនួន ៣ រូប បានឈ្នះការប្រកួត Hackathon ថ្នាក់ជាតិ ជាមួយកម្មវិធីគ្រប់គ្រងកសិកម្ម...',
      en: 'A team of 3 UME students won the National Hackathon with an agriculture management app...',
    },
    content: {
      km: `ក្រុមនិស្សិត UME បានបង្កើតកម្មវិធីទូរស័ព្ទសម្រាប់ជួយកសិករក្នុងការគ្រប់គ្រងដំណាំ ដែលបានឈ្នះចំណាត់ថ្នាក់លេខ ១ ក្នុងការប្រកួត Hackathon ថ្នាក់ជាតិឆ្នាំ ២០២៦។`,
      en: `The UME student team created a mobile app to help farmers manage crops, which won 1st place in the 2026 National Hackathon competition.`,
    },
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    date: '2026-06-28',
    author: { km: 'ក្រុមការងារ UME', en: 'UME Team' },
    icon: 'bi-trophy',
    tags: [
      { km: 'និស្សិត', en: 'Students' },
      { km: 'Hackathon', en: 'Hackathon' },
      { km: 'បច្ចេកវិទ្យា', en: 'Technology' },
    ],
    featured: true,
  },

  // ========== EVENTS ==========
  {
    id: 'event-1',
    type: 'event',
    title: {
      km: 'ពិធីបើកឆ្នាំសិក្សាថ្មី ២០២៦-២០២៧',
      en: 'Opening Ceremony Academic Year 2026-2027',
    },
    excerpt: {
      km: 'សាកលវិទ្យាល័យ UME នឹងរៀបចំពិធីបើកឆ្នាំសិក្សាថ្មីនៅថ្ងៃទី ១៥ ខែកញ្ញា ឆ្នាំ ២០២៦ នៅសាលសន្និសីទ UME...',
      en: 'UME University will hold the new academic year opening ceremony on September 15, 2026 at UME Conference Hall...',
    },
    content: {
      km: `សាកលវិទ្យាល័យ UME សូមអញ្ជើញនិស្សិត មាតាបិតា និងសាធារណជន ចូលរួមក្នុងពិធីបើកឆ្នាំសិក្សាថ្មី ២០២៦-២០២៧។

កម្មវិធីនឹងរួមមាន សុន្ទរកថាពីថ្នាក់ដឹកនាំ UME ការណែនាំកម្មវិធីសិក្សាថ្មីៗ និងការសម្តែងសិល្បៈពីនិស្សិត។`,
      en: `UME University invites students, parents, and the public to join the opening ceremony for the new academic year 2026-2027.

The program will include speeches from UME leadership, introduction of new academic programs, and student performances.`,
    },
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    date: '2026-09-15',
    time: { km: '៨:០០ ព្រឹក', en: '8:00 AM' },
    location: { km: 'សាលសន្និសីទ UME បាត់ដំបង', en: 'UME Conference Hall, Battambang' },
    icon: 'bi-calendar-check',
    featured: true,
  },
  {
    id: 'event-2',
    type: 'event',
    title: {
      km: 'សិក្ខាសាលាអំពីឱកាសការងារក្នុងយុគសម័យ AI',
      en: 'Workshop on Career Opportunities in the AI Era',
    },
    excerpt: {
      km: 'សិក្ខាសាលាពិសេសស្តីពីឱកាសការងារក្នុងយុគសម័យ AI ដោយវាគ្មិនកិត្តិយសមកពីក្រុមហ៊ុនបច្ចេកវិទ្យាឈានមុខ...',
      en: 'Special workshop on career opportunities in the AI era by guest speakers from leading tech companies...',
    },
    content: {
      km: `សិក្ខាសាលាពិសេសស្តីពី "ឱកាសការងារក្នុងយុគសម័យ AI" នឹងប្រព្រឹត្តទៅនៅថ្ងៃទី ២០ ខែសីហា ឆ្នាំ ២០២៦។

វាគ្មិនកិត្តិយសមកពីក្រុមហ៊ុនបច្ចេកវិទ្យាឈានមុខនឹងចែករំលែកចំណេះដឹងអំពីនិន្នាការការងារថ្មីៗក្នុងយុគសម័យបញ្ញាសិប្បនិម្មិត។`,
      en: `A special workshop on "Career Opportunities in the AI Era" will take place on August 20, 2026.

Guest speakers from leading tech companies will share insights on emerging job trends in the artificial intelligence era.`,
    },
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80',
    date: '2026-08-20',
    time: { km: '២:០០ រសៀល', en: '2:00 PM' },
    location: { km: 'បន្ទប់សិក្ខាសាលា A', en: 'Seminar Room A' },
    icon: 'bi-easel',
    featured: false,
  },
  {
    id: 'event-3',
    type: 'event',
    title: {
      km: 'ពិព័រណ៍ការងារ UME ឆ្នាំ ២០២៦',
      en: 'UME Career Fair 2026',
    },
    excerpt: {
      km: 'ពិព័រណ៍ការងារប្រចាំឆ្នាំរបស់ UME នឹងប្រព្រឹត្តទៅនៅខែតុលា ដោយមានក្រុមហ៊ុនជាង ៥០ ចូលរួម...',
      en: 'UME annual career fair will take place in October with over 50 companies participating...',
    },
    content: {
      km: `ពិព័រណ៍ការងារ UME ឆ្នាំ ២០២៦ នឹងប្រព្រឹត្តទៅនៅថ្ងៃទី ១០-១១ ខែតុលា ឆ្នាំ ២០២៦។

ក្រុមហ៊ុនជាង ៥០ មកពីវិស័យផ្សេងៗនឹងចូលរួមដើម្បីជ្រើសរើសបុគ្គលិក និងផ្តល់ឱកាសកម្មសិក្សា។`,
      en: `UME Career Fair 2026 will take place on October 10-11, 2026.

Over 50 companies from various sectors will participate to recruit staff and provide internship opportunities.`,
    },
    image: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&q=80',
    date: '2026-10-10',
    time: { km: '៩:០០ ព្រឹក - ៤:០០ រសៀល', en: '9:00 AM - 4:00 PM' },
    location: { km: 'បរិវេណ UME បាត់ដំបង', en: 'UME Campus, Battambang' },
    icon: 'bi-briefcase',
    featured: true,
  },
];

// Helper function to get item by ID
export function getNewsEventById(id) {
  return newsEventsData.find(item => item.id === id) || null;
}

// Helper function to get related items (same type, excluding current)
export function getRelatedItems(currentId, type, limit = 3) {
  return newsEventsData
    .filter(item => item.type === type && item.id !== currentId)
    .slice(0, limit);
}

// Helper function to get latest items by type
export function getLatestByType(type, limit = 3) {
  return newsEventsData
    .filter(item => item.type === type)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
}