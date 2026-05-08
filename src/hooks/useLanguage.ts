import languages from "../data/languages.json";

type Language = keyof typeof languages;
type LanguageSection<T extends Language> = keyof (typeof languages)[T];

export const useLanguage = <L extends Language, K extends LanguageSection<L>>(
  lang: L,
  propertyKey: K,
): (typeof languages)[L][K] => languages[lang][propertyKey];
