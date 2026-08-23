import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLanguage } from '../context/LanguageContext';

// ===== Top Leadership =====
const chairman = {
  name: { km: 'បណ្ឌិត ទេព ខុន្នាល់', en: 'Ph.D TEP Khunnal' },
  role: { km: 'ប្រធាន', en: 'Chairman' },
};

const president = {
  name: { km: 'បណ្ឌិត ទុន ភក្ដី', en: 'Dr. TUN Pheakdey' },
  role: { km: 'សាកលវិទ្យាធិការ', en: 'President' },
};

const advisor = {
  name: { km: 'បណ្ឌិត អាំង ប៊ុនថន', en: 'Dr. EANG Bunthan' },
  role: { km: 'ទីប្រឹក្សាសាកលវិទ្យាធិការ', en: 'Advisor to the President' },
};

// ===== Vice Presidents =====
const vicePresidents = [
  {
    name: { km: 'លោក ទុន ណារិទ្ធ', en: 'Mr. TUN Narith' },
    role: { km: 'សាកលវិទ្យាធិការរង', en: 'Vice-President' },
    department: { km: 'សិក្សា និងស្រាវជ្រាវ', en: 'Academic and Research' },
    color: 'border-l-4 border-l-teal-600',
    bgColor: 'bg-teal-50 dark:bg-teal-900/20',
    icon: 'bi-mortarboard-fill',
    iconColor: 'text-teal-600',
    units: [
      { km: 'ដេប៉ាតឺម៉ង់ឆ្នាំមូលដ្ឋាន', en: 'Foundation Year Department' },
      { km: 'មហាវិទ្យាល័យគ្រប់គ្រង និងទេសចរណ៍', en: 'Faculty of Management and Tourism' },
      { km: 'មហាវិទ្យាល័យអក្សរសាស្ត្រ មនុស្សសាស្ត្រ និងភាសាបរទេស', en: 'Faculty of Arts, Humanity and Foreign Language' },
      { km: 'មហាវិទ្យាល័យច្បាប់ និងសេដ្ឋកិច្ច', en: 'Faculty of Law and Economics' },
      { km: 'មហាវិទ្យាល័យវិទ្យាសាស្ត្រ និងបច្ចេកវិទ្យា', en: 'Faculty of Science and Technology' },
      { km: 'មហាវិទ្យាល័យកសិកម្ម និងអភិវឌ្ឍន៍ជនបទ', en: 'Faculty of Agriculture and Rural Development' },
      { km: 'កម្មវិធីថ្នាក់អនុបណ្ឌិត', en: 'Master Program' },
      { km: 'កម្មវិធីថ្នាក់បណ្ឌិត', en: 'Doctoral Program' },
      { km: 'កម្មវិធីសញ្ញាបត្រសហការី', en: 'Associate Program' },
      { km: 'មជ្ឈមណ្ឌលស្រាវជ្រាវ', en: 'Research Centre' },
    ],
  },
  {
    name: { km: 'លោក ទុន សុភ័ក្ត្រា', en: 'Mr. TUN Sopheaktra' },
    role: { km: 'សាកលវិទ្យាធិការរង', en: 'Vice-President' },
    department: { km: 'រដ្ឋបាល និងហិរញ្ញវត្ថុ', en: 'Administration and Finance' },
    color: 'border-l-4 border-l-sky-600',
    bgColor: 'bg-sky-50 dark:bg-sky-900/20',
    icon: 'bi-cash-coin',
    iconColor: 'text-sky-600',
    units: [
      { km: 'ហិរញ្ញវត្ថុ', en: 'Finance' },
      { km: 'រដ្ឋបាល', en: 'Administration' },
      { km: 'មជ្ឈមណ្ឌលបណ្តុះបណ្តាល', en: 'Training Centre' },
      { km: 'បច្ចេកវិទ្យាព័ត៌មាន', en: 'Information Technology' },
      { km: 'បណ្ណាល័យ UME', en: 'UME Library' },
      { km: 'American Corner', en: 'American Corner' },
    ],
    branches: [
      { km: 'សាខាបន្ទាយមានជ័យ', en: 'Banteay Meanchey Branch' },
      { km: 'សាខាកំពង់ចាម', en: 'Kompong Cham Branch' },
      { km: 'សាខាព្រះសីហនុ', en: 'Sihanoukville Branch' },
      { km: 'សាខាក្រចេះ', en: 'Kratie Branch' },
      { km: 'សាខាពោធិ៍សាត់', en: 'Pursat Branch' },
      { km: 'សាខាកោះកុង', en: 'Koh Kong Branch' },
    ],
  },
  {
    name: { km: 'លោក យុទ្ធ ជេតនា', en: 'Mr. YOUTH Jeitana' },
    role: { km: 'សាកលវិទ្យាធិការរង', en: 'Vice-President' },
    department: { km: 'ធានាគុណភាពផ្ទៃក្នុង', en: 'Internal Quality Assurance' },
    color: 'border-l-4 border-l-rose-700',
    bgColor: 'bg-rose-50 dark:bg-rose-900/20',
    icon: 'bi-patch-check-fill',
    iconColor: 'text-rose-700',
    units: [
      { km: 'សវនកម្មផ្ទៃក្នុង', en: 'Internal Audit' },
      { km: 'ធានាគុណភាពផ្ទៃក្នុង', en: 'Internal Quality Assurance' },
      { km: 'កិច្ចការនិស្សិត', en: 'Student Affairs' },
      { km: 'សេវាប្រឹក្សាយោបល់', en: 'Counselling Service' },
    ],
  },
  {
    name: { km: 'លោកស្រី ឡេង ចាន់ធី', en: 'LENG Chanthy (Ms)' },
    role: { km: 'សាកលវិទ្យាធិការរង', en: 'Vice-President' },
    department: { km: 'ទំនាក់ទំនងអន្តរជាតិ', en: 'International Relations' },
    color: 'border-l-4 border-l-blue-800',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    icon: 'bi-globe2',
    iconColor: 'text-blue-800',
    units: [
      { km: 'ទំនាក់ទំនងជាតិ និងអន្តរជាតិ', en: 'National Relation & International Relations' },
      { km: 'សាខា UME', en: 'UME Campuses' },
      { km: 'លក់ និងទីផ្សារ', en: 'Sale and Marketing' },
    ],
  },
];

// ===== Units under President =====
const presidentUnits = [
  { km: 'បណ្ណាល័យ UME', en: 'UME Library' },
  { km: 'American Corner', en: 'American Corner' },
];

function SectionLabel({ eyebrow, title, subtitle }) {
  return (
    <div className="text-center mb-12">
      <p className="text-gold text-xs tracking-[0.25em] uppercase font-bold mb-3">{eyebrow}</p>
      <h2 className="text-3xl md:text-4xl font-extrabold text-navy dark:text-white tracking-tight">{title}</h2>
      <div className="h-[3px] w-14 bg-gold rounded-full mt-5 mx-auto"></div>
      {subtitle && <p className="text-navy/50 dark:text-white/50 mt-4 max-w-xl mx-auto text-sm">{subtitle}</p>}
    </div>
  );
}

// Card component for org chart boxes
function OrgBox({ title, name, icon, iconColor, className = '' }) {
  return (
    <div className={`bg-white dark:bg-navy-dark border-2 border-navy/10 dark:border-white/10 rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-shadow ${className}`}>
      {icon && <i className={`bi ${icon} ${iconColor || 'text-gold'} text-2xl block mb-2`}></i>}
      {name && <div className="font-bold text-navy dark:text-white text-sm">{name}</div>}
      {title && <div className="text-navy/50 dark:text-white/50 text-xs mt-1">{title}</div>}
    </div>
  );
}

export default function StructurePage() {
  const { lang, t } = useLanguage();

  const text = {
    breadcrumb: { km: 'រចនាសម្ព័ន្ធ', en: 'Structure' },
    heroTitle: { km: 'រចនាសម្ព័ន្ធគ្រប់គ្រង', en: 'Management Structure' },
    heroSubtitle: { km: 'ស្វែងយល់ពីរចនាសម្ព័ន្ធ និងការគ្រប់គ្រងរបស់ UME', en: 'Learn about UME\'s organizational structure and governance' },
    orgChartTitle: { km: 'ដ្យាក្រាមរចនាសម្ព័ន្ធគ្រប់គ្រង', en: 'Management Structure Chart' },
    auditCommittee: { km: 'គណៈកម្មាធិការសវនកម្ម', en: 'Audit Committee' },
    branchesTitle: { km: 'សាខា', en: 'Branches' },
    vicePresidentsTitle: { km: 'សាកលវិទ្យាធិការរង និងអង្គភាព', en: 'Vice-Presidents & Departments' },
    unitsUnderPresident: { km: 'អង្គភាពក្រោមឱវាទផ្ទាល់', en: 'Units under President' },
  };

  return (
    <div className="min-h-screen bg-offwhite dark:bg-navy-dark font-sans transition-colors duration-300">
      {/* ========== HERO ========== */}
      <section className="relative bg-navy overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full border-2 border-white/20"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full border-2 border-white/10"></div>
        </div>
        <div className="relative z-10 pt-16 pb-12 md:pt-20 md:pb-16">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex items-center gap-2 text-white/50 text-xs mb-5">
              <Link to="/" className="hover:text-gold transition-colors">{t('footer.home')}</Link>
              <i className="bi bi-chevron-right text-[10px]"></i>
              <Link to="/about" className="hover:text-gold transition-colors">{t('footer.about')}</Link>
              <i className="bi bi-chevron-right text-[10px]"></i>
              <span className="text-gold">{text.breadcrumb[lang]}</span>
            </div>
            <p className="flex items-center gap-2 text-gold text-xs tracking-[0.25em] uppercase font-bold mb-4">
              <i className="bi bi-diagram-3-fill"></i>
              {text.breadcrumb[lang]}
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">{text.heroTitle[lang]}</h1>
            <p className="text-lg text-white/60">{text.heroSubtitle[lang]}</p>
          </div>
        </div>
      </section>

      {/* ========== ORGANIZATIONAL CHART ========== */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <SectionLabel 
            eyebrow={text.breadcrumb[lang]} 
            title={text.orgChartTitle[lang]} 
          />

          {/* ===== CHAIRMAN ===== */}
          <div className="flex justify-center mb-0">
            <div className="bg-navy text-white px-8 py-5 rounded-2xl text-center shadow-xl min-w-[280px] border-2 border-gold/30">
              <i className="bi bi-star-fill text-3xl text-gold block mb-2"></i>
              <div className="font-bold text-lg">{chairman.name[lang]}</div>
              <div className="text-gold text-sm font-semibold mt-1">{chairman.role[lang]}</div>
            </div>
          </div>

          {/* Connector line */}
          <div className="flex justify-center">
            <div className="w-px h-10 bg-navy/30 dark:bg-white/30"></div>
          </div>

          {/* Audit Committee */}
          <div className="flex justify-center mb-2">
            <div className="bg-white dark:bg-navy-dark border-2 border-navy/10 dark:border-white/10 px-6 py-3 rounded-xl text-center shadow-md">
              <i className="bi bi-shield-check text-gold text-xl block mb-1"></i>
              <div className="font-bold text-navy dark:text-white text-sm">{text.auditCommittee[lang]}</div>
            </div>
          </div>

          {/* Connector line */}
          <div className="flex justify-center">
            <div className="w-px h-10 bg-navy/30 dark:bg-white/30"></div>
          </div>

          {/* ===== PRESIDENT ===== */}
          <div className="flex justify-center mb-0">
            <div className="bg-gold text-navy px-8 py-5 rounded-2xl text-center shadow-xl min-w-[280px]">
              <i className="bi bi-building-fill text-3xl text-navy block mb-2"></i>
              <div className="font-bold text-lg">{president.name[lang]}</div>
              <div className="text-navy/70 text-sm font-semibold mt-1">{president.role[lang]}</div>
            </div>
          </div>

          {/* Advisor + Units under President */}
          <div className="flex justify-center items-start gap-4 mt-4 mb-2">
            {/* Advisor */}
            <div className="bg-white dark:bg-navy-dark border-2 border-navy/10 dark:border-white/10 px-5 py-3 rounded-xl text-center shadow-md">
              <i className="bi bi-person-check text-blue-600 text-xl block mb-1"></i>
              <div className="font-bold text-navy dark:text-white text-xs">{advisor.name[lang]}</div>
              <div className="text-navy/50 dark:text-white/50 text-[11px] mt-0.5">{advisor.role[lang]}</div>
            </div>
            
            {/* President Units */}
            <div className="bg-white dark:bg-navy-dark border-2 border-navy/10 dark:border-white/10 px-5 py-3 rounded-xl text-center shadow-md">
              <div className="text-navy/50 dark:text-white/50 text-[10px] uppercase tracking-wider font-semibold mb-2">{text.unitsUnderPresident[lang]}</div>
              <div className="space-y-1">
                {presidentUnits.map((unit, i) => (
                  <div key={i} className="text-navy dark:text-white text-xs font-medium">{unit[lang]}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Connector line to VPs */}
          <div className="flex justify-center mt-2">
            <div className="w-px h-8 bg-navy/30 dark:bg-white/30"></div>
          </div>
          <div className="flex justify-center mb-6">
            <div className="h-px w-3/4 bg-navy/20 dark:bg-white/20"></div>
          </div>

          {/* ===== VICE PRESIDENTS ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {vicePresidents.map((vp, index) => (
              <div key={index} className={`${vp.bgColor} rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-navy/5 dark:border-white/10`}>
                {/* VP Header */}
                <div className={`${vp.color} bg-white dark:bg-navy-dark p-5`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-full bg-white dark:bg-navy-dark flex items-center justify-center shadow-sm`}>
                      <i className={`bi ${vp.icon} ${vp.iconColor} text-lg`}></i>
                    </div>
                    <div>
                      <div className="font-bold text-navy dark:text-white text-sm">{vp.name[lang]}</div>
                      <div className="text-navy/50 dark:text-white/50 text-[11px]">{vp.role[lang]}</div>
                    </div>
                  </div>
                  <div className={`text-xs font-semibold ${vp.iconColor} mt-1`}>{vp.department[lang]}</div>
                </div>

                {/* Units */}
                <div className="p-4">
                  <ul className="space-y-1.5">
                    {vp.units.map((unit, uIdx) => (
                      <li key={uIdx} className="text-navy/60 dark:text-white/50 text-[11px] flex items-start gap-2">
                        <i className="bi bi-dot text-gold text-base leading-none mt-0.5"></i>
                        <span>{unit[lang]}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Branches if available */}
                  {vp.branches && (
                    <div className="mt-4 pt-3 border-t border-navy/10 dark:border-white/10">
                      <div className="text-[10px] uppercase tracking-wider font-bold text-gold mb-2">{text.branchesTitle[lang]}</div>
                      <ul className="space-y-1">
                        {vp.branches.map((branch, bIdx) => (
                          <li key={bIdx} className="text-navy/50 dark:text-white/40 text-[11px] flex items-start gap-2">
                            <i className="bi bi-geo-alt-fill text-navy/30 dark:text-white/30 text-[10px] mt-0.5"></i>
                            <span>{branch[lang]}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FOOTER NOTE ========== */}
      <section className="py-10 bg-navy text-center">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-white/50 text-xs">
            {lang === 'km' 
              ? 'រចនាសម្ព័ន្ធគ្រប់គ្រងនេះឆ្លុះបញ្ចាំងពីការរៀបចំរបស់សាកលវិទ្យាល័យគ្រប់គ្រង និងសេដ្ឋកិច្ច (UME)'
              : 'This management structure reflects the organization of the University of Management and Economics (UME)'
            }
          </p>
        </div>
      </section>
    </div>
  );
}