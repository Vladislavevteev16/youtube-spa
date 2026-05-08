import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";

import { CheckOutlined } from "@ant-design/icons";

import {
  setLanguage,
  selectCurrentLanguage,
  type LanguageState,
} from "../../../redux/slices/languageSlice";

import s from "./index.module.css";

type LanguageOption = {
  id: number;
  title: string;
  value: LanguageState["currentLanguage"];
};

const LANGUAGES_OPTIONS: LanguageOption[] = [
  { id: 0, title: "Русский", value: "ru" },
  { id: 1, title: "English", value: "en" },
];

export const LanguageMenu = () => {
  const dispatch = useAppDispatch();

  const selectedLanguage = useAppSelector(selectCurrentLanguage);

  const handleLanguageChange = (lang: LanguageState["currentLanguage"]) => () =>
    dispatch(setLanguage(lang));

  return (
    <div className={s.languageMenuContainer}>
      <ul>
        {LANGUAGES_OPTIONS.map((lang) => (
          <li onClick={handleLanguageChange(lang.value)} key={lang.id}>
            <div className={s.languageText}>
              <span className={s.languageCode}>{lang.value}</span>
              <span className={s.languageName}>{lang.title}</span>
            </div>
            <div className={s.iconWrapper}>
              {selectedLanguage === lang.value && <CheckOutlined />}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
