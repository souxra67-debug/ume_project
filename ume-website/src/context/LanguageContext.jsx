import { createContext, useContext, useState, useEffect } from 'react';
import { translate } from '../i18n/translations';

// ============================================================
// LANGUAGE CONTEXT — ដូច ThemeContext ដែរ ប៉ុន្តែសម្រាប់ភាសា (km / en)
// ប្រើ Context ព្រោះ Navbar, Footer, និង page ផ្សេងទៀតទាំងអស់ត្រូវការចូលដំណើរការ
// ភាសាបច្ចុប្បន្ន — ដាក់ក្នុង Context តែមួយកន្លែង ជាជាង useState ដាច់ដោយឡែកក្នុងរាល់ file
// ============================================================
const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'km';
    return localStorage.getItem('ume-lang') || 'km';
  });

  useEffect(() => {
    localStorage.setItem('ume-lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === 'km' ? 'en' : 'km'));

  const t = (key) => translate(lang, key);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage ត្រូវប្រើនៅក្នុង <LanguageProvider> ប៉ុណ្ណោះ');
  }
  return ctx;
}