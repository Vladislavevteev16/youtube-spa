import { useAppSelector, useAppDispatch } from "../../redux/store/hooks";

import { AppstoreOutlined, UnorderedListOutlined } from "@ant-design/icons";
import {
  selectIsMobile,
  selectSearchResult,
  selectViewMode,
  setCurrentViewMode,
} from "../../redux/slices/viewModeSlice";

import { useLanguage } from "../../hooks/useLanguage";

import { selectCurrentLanguage } from "../../redux/slices/languageSlice";

import { LanguageOptions } from "../../constants/enums";

import { ViewModeOptions } from "../../constants/enums";

import s from "./index.module.css";


export const ListGridSwitcher = () => {
  const dispatch = useAppDispatch();

  const searchResult = useAppSelector(selectSearchResult);
  const currentViewMode = useAppSelector(selectViewMode);

  const currentLanguage = useAppSelector(selectCurrentLanguage);

  const isMobile = useAppSelector(selectIsMobile);

  const handleСhoiceDisplayedAsList = () =>
    dispatch(setCurrentViewMode(ViewModeOptions.LIST));

  const handleСhoiceDisplayedAsGrid = () =>
    dispatch(setCurrentViewMode(ViewModeOptions.GRID));

  const { videoOnDemandText } = useLanguage(
    currentLanguage,
    LanguageOptions.SEARCH_BAR,
  );


  return (
    <div className={s.listGridSwitcherContainer}>
      <p>
        {videoOnDemandText} "{searchResult}"
      </p>
      {!isMobile && (
        <div className={s.controlButtons}>
          <UnorderedListOutlined
            className={`${s.grid} ${currentViewMode !== ViewModeOptions.GRID ? s.gridActive : ""}`}
            onClick={handleСhoiceDisplayedAsList}
          />
          <AppstoreOutlined
            className={`${s.list} ${currentViewMode !== ViewModeOptions.LIST ? s.listActive : ""}`}
            onClick={handleСhoiceDisplayedAsGrid}
          />
        </div>
      )}
    </div>
  );
};
