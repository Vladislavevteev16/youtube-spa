import { SavedQueriesList } from "../../components/SavedQueriesList";

import s from "./index.module.css";

export const QueriesPage = () => {
  return (
    <div className={s.queriesPageContainer}>
      <SavedQueriesList />
    </div>
  );
};
