import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLanguage } from '../context/LanguageContext';

const branches = [
  {
    name: { km: 'បាត់ដំបង (ទីតាំងគោល)', en: 'Battambang (Main Campus)' },
    address: { km: 'ផ្លូវជាតិលេខ 5, សង្កាត់ស្វាយប៉ោ, ក្រុងបាត់ដំបង', en: 'National Road 5, Svay Por Commune, Battambang City' },
    phone: '053 730 336',
  },
  {
    name: { km: 'បន្ទាយមានជ័យ', en: 'Banteay Meanchey' },
    address: { km: 'ក្រុងសិរីសោភ័ណ, ខេត្តបន្ទាយមានជ័យ', en: 'Serei Saophoan City, Banteay Meanchey Province' },
    phone: '',
  },
  {
    name: { km: 'កំពង់ចាម', en: 'Kampong Cham' },
    address: { km: 'ក្រុងកំពង់ចាម, ខេត្តកំពង់ចាម', en: 'Kampong Cham City, Kampong Cham Province' },
    phone: '',
  },
  {
    name: { km: 'ពោធិ៍សាត់', en: 'Pursat' },
    address: { km: 'ក្រុងពោធិ៍សាត់, ខេត្តពោធិ៍សាត់', en: 'Pursat City, Pursat Province' },
    phone: '',
  },
  {
    name: { km: 'ព្រះសីហនុ', en: 'Preah Sihanouk' },
    address: { km: 'ក្រុងព្រះសីហនុ, ខេត្តព្រះសីហនុ', en: 'Preah Sihanouk City, Preah Sihanouk Province' },
    phone: '',
  },
  {
    name: { km: 'កោះកុង', en: 'Koh Kong' },
    address: { km: 'ក្រុងខេមរភូមិន្ទ, ខេត្តកោះកុង', en: 'Khemarak Phoumin City, Koh Kong Province' },
    phone: '',
  },
  {
    name: { km: 'ក្រចេះ', en: 'Kratie' },
    address: { km: 'ក្រុងក្រចេះ, ខេត្តក្រចេះ', en: 'Kratie City, Kratie Province' },
    phone: '',
  },
];

const contactCards = [
  { icon: 'bi-geo-alt-fill', label: { km: 'អាសយដ្ឋាន', en: 'Address' }, value: { km: 'ផ្លូវជាតិលេខ 5, សង្កាត់ស្វាយប៉ោ, ក្រុងបាត់ដំបង, ខេត្តបាត់ដំបង', en: 'National Road 5, Svay Por Commune, Battambang City, Battambang Province' } },
  { icon: 'bi-telephone-fill', label: { km: 'ទូរស័ព្ទ', en: 'Phone' }, value: '053 730 336' },
  { icon: 'bi-envelope-fill', label: { km: 'អ៊ីមែល', en: 'Email' }, value: 'info@ume.edu.kh' },
  { icon: 'bi-globe', label: { km: 'គេហទំព័រ', en: 'Website' }, value: 'www.ume.edu.kh' },
];

const socials = [
  { icon: 'bi-facebook', label: 'Facebook', href: 'https://facebook.com' },
  { icon: 'bi-youtube', label: 'YouTube', href: 'https://youtube.com' },
  { icon: 'bi-telegram', label: 'Telegram', href: 'https://telegram.org' },
];

function FormField({ label, required, placeholder, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-navy/70 dark:text-white/60 mb-2">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      {props.textarea ? (
        <textarea
          required={required}
          rows={4}
          placeholder={placeholder}
          className="w-full px-4 py-3 border border-navy/15 dark:border-white/15 bg-white dark:bg-white/5 text-navy dark:text-white rounded-xl focus:ring-2 focus:ring-gold/40 focus:border-gold outline-none transition-all resize-none placeholder:text-navy/30 dark:placeholder:text-white/30"
        ></textarea>
      ) : (
        <input
          type={props.type || 'text'}
          required={required}
          placeholder={placeholder}
          className="w-full px-4 py-3 border border-navy/15 dark:border-white/15 bg-white dark:bg-white/5 text-navy dark:text-white rounded-xl focus:ring-2 focus:ring-gold/40 focus:border-gold outline-none transition-all placeholder:text-navy/30 dark:placeholder:text-white/30"
        />
      )}
    </div>
  );
}

export default function ContactPage() {
  const { lang, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const text = {
    breadcrumb: { km: 'ទំនាក់ទំនង', en: 'Contact' },
    heroBadge: { km: 'ទំនាក់ទំនង', en: 'Contact' },
    heroTitle: { km: 'ទំនាក់ទំនងយើងខ្ញុំ', en: 'Contact Us' },
    heroSubtitle: { km: 'សូមទំនាក់ទំនងមកយើងខ្ញុំសម្រាប់ព័ត៌មានបន្ថែម', en: 'Reach out to us for more information' },
    contactInfoTitle: { km: 'ព័ត៌មានទំនាក់ទំនង', en: 'Contact Information' },
    followUs: { km: 'តាមដានយើង', en: 'Follow Us' },
    formTitle: { km: 'ផ្ញើសារមកយើង', en: 'Send Us a Message' },
    formNameLabel: { km: 'ឈ្មោះ', en: 'Name' },
    formNamePlaceholder: { km: 'ឈ្មោះរបស់អ្នក', en: 'Your name' },
    formEmailLabel: { km: 'អ៊ីមែល', en: 'Email' },
    formEmailPlaceholder: { km: 'example@email.com', en: 'example@email.com' },
    formPhoneLabel: { km: 'លេខទូរស័ព្ទ', en: 'Phone' },
    formPhonePlaceholder: { km: '012 345 678', en: '012 345 678' },
    formSubjectLabel: { km: 'ប្រធានបទ', en: 'Subject' },
    formSubjectPlaceholder: { km: 'ប្រធានបទសារ', en: 'Message subject' },
    formMessageLabel: { km: 'សារ', en: 'Message' },
    formMessagePlaceholder: { km: 'សរសេរសាររបស់អ្នកនៅទីនេះ...', en: 'Write your message here...' },
    formSubmit: { km: 'ផ្ញើសារ', en: 'Send Message' },
    successTitle: { km: 'សារត្រូវបានផ្ញើដោយជោគជ័យ!', en: 'Message Sent Successfully!' },
    successDesc: { km: 'សូមអរគុណ! យើងនឹងឆ្លើយតបទៅកាន់អ្នកក្នុងពេលឆាប់ៗនេះ។', en: 'Thank you! We will respond to you shortly.' },
    sendAnother: { km: 'ផ្ញើសារមួយទៀត', en: 'Send another message' },
    branchesEyebrow: { km: 'ទីតាំង', en: 'Locations' },
    branchesTitle: { km: 'សាខារបស់យើង', en: 'Our Branches' },
    phoneLabel: { km: 'ទូរស័ព្ទ', en: 'Phone' },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-navy-dark transition-colors duration-300">
      {/* HERO */}
      <section className="relative h-[300px] overflow-hidden bg-gradient-to-br from-navy via-navy-light to-navy">
        <div className="relative z-10 h-full flex items-end pb-10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="flex items-center gap-2 text-white/50 text-xs mb-5">
              <Link to="/" className="hover:text-gold transition-colors">{t('nav.home')}</Link>
              <i className="bi bi-chevron-right text-[10px]"></i>
              <span className="text-gold">{text.breadcrumb[lang]}</span>
            </div>
            <span className="inline-flex items-center gap-2 bg-white/10 text-gold border border-gold/30 px-4 py-1.5 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
              <i className="bi bi-telephone-fill"></i>
              {text.heroBadge[lang]}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">{text.heroTitle[lang]}</h1>
            <p className="text-lg text-white/60">{text.heroSubtitle[lang]}</p>
          </div>
        </div>
      </section>

      {/* CONTACT INFO & FORM */}
      <section className="py-16 md:py-24 bg-white dark:bg-navy-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-navy dark:text-white mb-8">{text.contactInfoTitle[lang]}</h2>

              <div className="space-y-4">
                {contactCards.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-5 bg-offwhite dark:bg-white/5 rounded-xl hover:bg-gold/5 dark:hover:bg-white/10 transition-colors"
                  >
                    <div className="w-12 h-12 bg-navy/10 dark:bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className={`bi ${c.icon} text-gold text-xl`}></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-navy dark:text-white mb-1">{c.label[lang]}</h3>
                      <p className="text-navy/60 dark:text-white/50">{c.value[lang] || c.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="font-bold text-navy dark:text-white mb-4">{text.followUs[lang]}</h3>
                <div className="flex gap-3">
                  {socials.map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-10 h-10 bg-navy/5 dark:bg-white/10 text-navy dark:text-white/70 rounded-full flex items-center justify-center hover:bg-gold hover:text-navy transition-colors"
                    >
                      <i className={`bi ${s.icon}`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-navy dark:text-white mb-8">{text.formTitle[lang]}</h2>

              {submitted ? (
                <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-2xl p-8 text-center">
                  <i className="bi bi-check-circle text-green-500 text-5xl mb-4 block"></i>
                  <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">{text.successTitle[lang]}</h3>
                  <p className="text-green-600 dark:text-green-400/80">{text.successDesc[lang]}</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-green-700 dark:text-green-400 underline hover:no-underline"
                  >
                    {text.sendAnother[lang]}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <FormField label={text.formNameLabel[lang]} required placeholder={text.formNamePlaceholder[lang]} />
                  <FormField label={text.formEmailLabel[lang]} required type="email" placeholder={text.formEmailPlaceholder[lang]} />
                  <FormField label={text.formPhoneLabel[lang]} type="tel" placeholder={text.formPhonePlaceholder[lang]} />
                  <FormField label={text.formSubjectLabel[lang]} required placeholder={text.formSubjectPlaceholder[lang]} />
                  <FormField label={text.formMessageLabel[lang]} required textarea placeholder={text.formMessagePlaceholder[lang]} />
                  <button
                    type="submit"
                    className="w-full bg-navy text-white py-3.5 rounded-xl font-bold text-lg hover:bg-navy-light transition-all duration-300 hover:shadow-navy flex items-center justify-center gap-2"
                  >
                    <i className="bi bi-send"></i> {text.formSubmit[lang]}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* BRANCHES */}
      <section className="py-16 md:py-24 bg-offwhite dark:bg-white/[0.03]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-10">
            <p className="text-gold text-xs tracking-[0.25em] uppercase font-bold mb-3">{text.branchesEyebrow[lang]}</p>
            <h2 className="text-3xl font-bold text-navy dark:text-white">{text.branchesTitle[lang]}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {branches.map((branch, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-navy-dark rounded-xl p-5 shadow-sm hover:shadow-navy transition-all duration-300 hover:-translate-y-1 border border-navy/5 dark:border-white/10"
              >
                <i className="bi bi-geo-alt-fill text-2xl text-gold mb-2 block"></i>
                <h3 className="font-bold text-navy dark:text-white">{branch.name[lang]}</h3>
                <p className="text-sm text-navy/50 dark:text-white/50 mt-1">{branch.address[lang]}</p>
                {branch.phone && (
                  <p className="text-sm text-navy/40 dark:text-white/40 mt-1">{text.phoneLabel[lang]}: {branch.phone}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}