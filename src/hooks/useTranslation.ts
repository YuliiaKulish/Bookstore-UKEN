import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export const useTranslation = () => {
  const { lang } = useLanguage();

  const translate = (key: keyof (typeof translations)['en']) => {
    return translations[lang][key];
  };

  return { translate };
};
