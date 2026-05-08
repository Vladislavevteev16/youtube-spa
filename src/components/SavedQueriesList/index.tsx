import { useLanguage } from "../../hooks/useLanguage";

import { selectCurrentLanguage } from "../../redux/slices/languageSlice";
import { selectSavedQueries } from "../../redux/slices/savedQueriesSlice";

import { useAppSelector } from "../../redux/store/hooks";

import { SavedQueriesItem } from "../SavedQueriesItem";

import { LanguageOptions } from "../../constants/enums";

import s from "./index.module.css";

export const SavedQueriesList = () => {
  const query = useAppSelector(selectSavedQueries);
  const lang = useAppSelector(selectCurrentLanguage);

  const { emptyText, favorite } = useLanguage(
    lang,
    LanguageOptions.SAVED_QUERY,
  );

  return (
    <div className={s.savedQueriesListContainer}>
      <h1>{favorite}</h1>
      {query.length === 0 && <p>{emptyText}</p>}
      <ul>
        {query.map((item) => (
          <SavedQueriesItem key={item.id} id={item.id} query={item.query} />
        ))}
      </ul>
    </div>
  );
};
