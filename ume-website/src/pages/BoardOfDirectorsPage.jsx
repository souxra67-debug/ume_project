import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLanguage } from '../context/LanguageContext';

// ===== Leader photos =====
import chairmanImg from '../assets/leaders/Ph.D TEP Khunnal.jpg';
import deputyChairmanImg from '../assets/leaders/Dr.TUN Pheakdey.jpg';

// ===== Board Members (10 នាក់, numbered 2–11; node 1 is the shared junction) =====
import member1Img from '../assets/leaders/Dr.Norng Tha.jpg';
import member2Img from '../assets/leaders/soth vanthoch.jpg';
import member3Img from '../assets/leaders/TUN Narith.jpg';
import member4Img from '../assets/leaders/Youth Jeitana.jpg';
import member5Img from '../assets/leaders/LENG Chanthy.jpg';
import member6Img from '../assets/leaders/TEP Veasna.jpg';
import member7Img from '../assets/leaders/MEN Sithy.jpg';
import member8Img from '../assets/leaders/CHIN Rotana.jpg';
import member9Img from '../assets/leaders/CHHUM Ralin.jpg';
import member10Img from '../assets/leaders/MOUN Veasna.jpg';

// Left chain (numbers 2–6)
const leftChain = [
  { number: 2, photo: member1Img, name: { km: 'បណ្ឌិត នរោង ថា', en: 'Dr. NORNG Tha' } },
  { number: 3, photo: member2Img, name: { km: 'បណ្ឌិត សុទ្ធ វណ្ណថូច', en: 'Dr. SOT Vanthoch' } },
  { number: 4, photo: member3Img, name: { km: 'លោក ទុន ណារិទ្ធ', en: 'Mr. TUN Narith' } },
  { number: 5, photo: member4Img, name: { km: 'លោក យុទ្ធ ជេតនា', en: 'Mr. YOUTH Jeitana' } },
  { number: 6, photo: member5Img, name: { km: 'លោកស្រី ឡេង ចាន់ធី', en: 'Mrs. LENG Chanthy' } },
];

// Right chain (numbers 7–11)
const rightChain = [
  { number: 7, photo: member6Img, name: { km: 'លោក ទេព វាសនា', en: 'Mr. TEP Veasna' } },
  { number: 8, photo: member7Img, name: { km: 'លោក ម៉ែន ស៊ីធី', en: 'Mr. MEN Sithy' } },
  { number: 9, photo: member8Img, name: { km: 'លោក ជិន រតនា', en: 'Mr. CHIN Rathana' } },
  { number: 10, photo: member9Img, name: { km: 'លោក ឈុំ រ៉ាលីន', en: 'Mr. CHHUM Ralin' } },
  { number: 11, photo: member10Img, name: { km: 'លោក មូន វាសនា', en: 'Mr. MOUN Veasna' } },
];

function MemberMini({ member, lang }) {
  return (
    <div className="group flex items-center gap-4 bg-white dark:bg-navy-dark border border-navy/10 dark:border-white/10 rounded-full pr-6 pl-2 py-2 shadow-sm hover:shadow-lg hover:border-gold/40 transition-all duration-300 w-full max-w-[280px]">
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden ring-2 ring-navy/10 dark:ring-white/10 shrink-0 group-hover:ring-gold/50 transition-all">
        <img src={member.photo} alt={member.name[lang]} className="w-full h-full object-cover" />
      </div>
      <span className="text-navy dark:text-white text-sm md:text-base font-bold leading-snug">
        {member.name[lang]}
      </span>
    </div>
  );
}

function ChainNode({ member, lang, side }) {
  const isLeft = side === 'left';
  return (
    <div className={`relative flex items-center gap-3 ${isLeft ? 'justify-end pr-11 md:pr-14' : 'justify-start pl-11 md:pl-14'}`}>
      {isLeft && <MemberMini member={member} lang={lang} />}
      <span
        className={`absolute z-10 w-9 h-9 md:w-11 md:h-11 rounded-full bg-gold text-navy text-sm md:text-base font-bold flex items-center justify-center ring-[6px] ring-white dark:ring-navy-dark shadow-md ${
          isLeft ? '-right-[18px] md:-right-[22px]' : '-left-[18px] md:-left-[22px]'
        }`}
      >
        {member.number}
      </span>
      {!isLeft && <MemberMini member={member} lang={lang} />}
    </div>
  );
}

export default function BoardOfDirectorsPage() {
  const { lang, t } = useLanguage();

  const text = {
    breadcrumb: { km: 'ក្រុមប្រឹក្សាភិបាល', en: 'Board of Directors' },
    heroTitle: { km: 'ក្រុមប្រឹក្សាភិបាល', en: 'Board of Directors' },
    heroSubtitle: { km: 'សាកលវិទ្យាល័យគ្រប់គ្រង និងសេដ្ឋកិច្ច', en: 'University of Management and Economics' },
    description: {
      km: 'ក្រុមប្រឹក្សាភិបាលនៃសាកលវិទ្យាល័យគ្រប់គ្រង និងសេដ្ឋកិច្ច មានប្រធាន ១ រូប អនុប្រធាន ១ រូប និងសមាជិក ១០ រូប ដែលត្រូវបានតែងតាំងដោយក្រសួងអប់រំ យុវជន និងកីឡា សម្រាប់អាណត្តិ ៥ ឆ្នាំ និងមានបេសកកម្មបម្រើផលប្រយោជន៍របស់សាកលវិទ្យាល័យទាំងមូល។ ប្រធានក្រុមប្រឹក្សាភិបាលត្រូវបានជ្រើសរើសដោយសមាជិកក្រុមប្រឹក្សាភិបាលនៃសាកលវិទ្យាល័យ។',
      en: 'The Chairman of the Board of the University of Management and Economics has 1 Chairman, 1 Vice-Chairman and 10 members appointed by the Ministry of Education Youth and Sports for a term of 5 years and has a mission to serve the interests of the University as a whole. Chairman of Board is elected by the University Board member of Trustees.'
    },
    chairman: { km: 'ប្រធាន', en: 'Chairman' },
    chairmanName: { km: 'បណ្ឌិត ទេព ខុន្នាល់', en: 'Dr. TEP Khunnal' },
    viceChairman: { km: 'អនុប្រធាន', en: 'Vice-Chairman' },
    viceChairmanName: { km: 'បណ្ឌិត ទុន ភក្ដី', en: 'Dr. TUN Pheakdey' },
    membersTitle: { km: 'សមាជិកក្រុមប្រឹក្សាភិបាល', en: 'Board Members' },
    membersCount: { km: '10 សមាជិក', en: '10 Members' },
    termInfo: { km: 'អាណត្តិ ៥ ឆ្នាំ • តែងតាំងដោយក្រសួងអប់រំ យុវជន និងកីឡា', en: '5-year term • Appointed by Ministry of Education, Youth and Sports' },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-navy-dark font-sans transition-colors duration-300">
      {/* ========== HERO ========== */}
      <section className="relative bg-navy overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full border-2 border-white/20"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full border-2 border-white/10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5"></div>
        </div>

        <div className="relative z-10 pt-16 pb-16 md:pt-20 md:pb-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/50 text-xs mb-6">
              <Link to="/" className="hover:text-gold transition-colors">{t('footer.home')}</Link>
              <i className="bi bi-chevron-right text-[10px]"></i>
              <Link to="/about" className="hover:text-gold transition-colors">{t('footer.about')}</Link>
              <i className="bi bi-chevron-right text-[10px]"></i>
              <span className="text-gold">{text.breadcrumb[lang]}</span>
            </div>

            {/* Title */}
            <p className="flex items-center gap-3 text-gold text-xs tracking-[0.25em] uppercase font-bold mb-4">
              <i className="bi bi-building"></i>
              {text.heroTitle[lang]}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
              {text.heroTitle[lang]}
            </h1>
            <p className="text-xl text-white/60 mb-8">
              {text.heroSubtitle[lang]}
            </p>

            {/* Description Box */}
            <div className="max-w-4xl bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center shrink-0 mt-1">
                  <i className="bi bi-info-lg text-gold"></i>
                </div>
                <p className="text-white/80 leading-relaxed text-sm md:text-base">
                  {text.description[lang]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== ORG CHART: Chairman → Vice-Chairman → (1) → 10 Members ========== */}
      <section className="py-16 md:py-28 bg-white dark:bg-navy-dark">
        <div className="max-w-5xl mx-auto px-6 md:px-12">

          {/* Chairman node */}
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-3 rounded-full border-2 border-gold/30 group-hover:scale-105 transition-transform duration-500"></div>
              <div className="relative flex items-center gap-5 bg-navy text-white rounded-2xl pl-3 pr-10 py-3 shadow-navy">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-4 ring-gold shrink-0">
                  <img src={chairmanImg} alt={text.chairmanName[lang]} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-extrabold text-lg md:text-xl">{text.chairmanName[lang]}</div>
                  <div className="text-gold text-xs md:text-sm font-semibold uppercase tracking-wider">{text.chairman[lang]}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stem down */}
          <div className="w-0.5 h-10 bg-gold/40 mx-auto"></div>

          {/* Vice-Chairman node */}
          <div className="flex justify-center">
            <div className="flex items-center gap-5 bg-offwhite dark:bg-white/5 border border-navy/10 dark:border-white/10 rounded-2xl pl-3 pr-10 py-3 shadow-sm">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden ring-4 ring-navy/20 dark:ring-white/20 shrink-0">
                <img src={deputyChairmanImg} alt={text.viceChairmanName[lang]} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-bold text-navy dark:text-white text-base md:text-lg">{text.viceChairmanName[lang]}</div>
                <div className="text-navy/50 dark:text-white/50 text-xs md:text-sm font-semibold uppercase tracking-wider">{text.viceChairman[lang]}</div>
              </div>
            </div>
          </div>

          {/* Stem down to junction node "1" */}
          <div className="w-0.5 h-10 bg-gold/40 mx-auto"></div>

          {/* Junction node "1" — governs / connects both branches */}
          <div className="flex justify-center">
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-navy text-gold border-2 border-gold flex items-center justify-center font-extrabold text-base md:text-lg shadow-navy">
              1
            </div>
          </div>

          {/* Bracket splitting node 1 into two chains */}
          <div className="w-0.5 h-6 bg-gold/40 mx-auto"></div>
          <div className="relative mx-auto" style={{ maxWidth: '78%' }}>
            <div className="h-0.5 bg-gold/40"></div>
            <div className="absolute left-0 top-0 w-0.5 h-8 bg-gold/40"></div>
            <div className="absolute right-0 top-0 w-0.5 h-8 bg-gold/40"></div>
          </div>
          <div className="h-8"></div>

          {/* Members title */}
          <div className="text-center mb-10 md:mb-14">
            <h3 className="text-xl md:text-2xl font-extrabold text-navy dark:text-white">{text.membersTitle[lang]}</h3>
            <p className="text-navy/50 dark:text-white/50 text-sm mt-1">{text.membersCount[lang]}</p>
          </div>

          {/* Two parallel numbered chains (2–6 left, 7–11 right) */}
          <div className="grid grid-cols-2 gap-x-6 md:gap-x-14">
            <div className="border-r-2 border-gold/30 space-y-8 md:space-y-10">
              {leftChain.map((m) => (
                <ChainNode key={m.number} member={m} lang={lang} side="left" />
              ))}
            </div>
            <div className="border-l-2 border-gold/30 space-y-8 md:space-y-10">
              {rightChain.map((m) => (
                <ChainNode key={m.number} member={m} lang={lang} side="right" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER NOTE ========== */}
      <section className="py-12 bg-navy">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <div className="inline-flex items-center gap-3 text-white/60 text-sm">
            <i className="bi bi-clock-history text-gold"></i>
            <span>{text.termInfo[lang]}</span>
          </div>
        </div>
      </section>
    </div>
  );
}