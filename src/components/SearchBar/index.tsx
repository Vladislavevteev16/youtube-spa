import { useCallback, useEffect, type ChangeEventHandler } from "react";

import { useSearch } from "../../hooks/useSearch";

import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";

import { v4 as uuid } from "uuid";

import { RecentRequestList } from "../RecentRequestList";

import { useCloseOnOutsideClick } from "../../hooks/useCloseOnOutsideClick";

import { Input } from "antd";
import { HeartOutlined } from "@ant-design/icons";

import { selectCurrentLanguage } from "../../redux/slices/languageSlice";

import { useLanguage } from "../../hooks/useLanguage";

import { setSearchResultViewMode } from "../../redux/slices/viewModeSlice";
import { searchVideos, selectHasVideos } from "../../redux/slices/videosSlice";

import {
  openQuerySaveModal,
  saveCurrentQueryName,
  selectCurrentQueryName,
  selectIsOpenModal,
} from "../../redux/slices/savedQueriesSlice";

import {
  addNewRequest,
  closeRequestList,
  openRequestList,
} from "../../redux/slices/recentRequestSlice";

import type { GetProps } from "antd";

const { Search } = Input;

type SearchProps = GetProps<typeof Input.Search>;

import { LanguageOptions } from "../../constants/enums";

import s from "./index.module.css";

const DELAY = 250;

export const SearchBar = () => {
  const dispatch = useAppDispatch();

  const isOpenModal = useAppSelector(selectIsOpenModal);

  const currentLanguage = useAppSelector(selectCurrentLanguage);

  const hasVideos = useAppSelector(selectHasVideos);

  const queryFromSavedQueries = useAppSelector(selectCurrentQueryName);

  const {
    inputWrapperRef,
    isHeartVisible,
    isRecentRequestHidden,
    searchText,
    setIsHeartVisible,
    setIsRecentRequestHidden,
    setSearchText,
    debounceTimerRef,
  } = useSearch();

  useEffect(() => {
    setSearchText(queryFromSavedQueries);
    return () => {
      if (!hasVideos) {
        localStorage.removeItem("savedQuery");
      }
    };
  }, [queryFromSavedQueries, setSearchText, hasVideos]);

  useCloseOnOutsideClick(inputWrapperRef, closeRequestList);

  const { searchVideo, searchPlaceholder, buttonText } = useLanguage(
    currentLanguage,
    LanguageOptions.SEARCH_BAR,
  );

  const handleSearchSubmit: SearchProps["onSearch"] = (searchValue) => {
    const trimmedValue = searchValue.trim();

    if (!trimmedValue) return;

    dispatch(addNewRequest({ id: uuid(), value: trimmedValue }));
    dispatch(setSearchResultViewMode(trimmedValue));
    dispatch(closeRequestList());
    dispatch(searchVideos({ q: trimmedValue }));
  };

  const handleOpenRequestListIfEmpty = () => {
    if (searchText.length === 0) {
      dispatch(openRequestList());
    }
  };

  const handleOpenSaveModal = () => dispatch(openQuerySaveModal());

  const handleSelectRecentRequest = useCallback(
    (request: string) => {
      setSearchText(request);
      setIsHeartVisible(true);
      dispatch(saveCurrentQueryName(request));
    },
    [dispatch, setIsHeartVisible, setSearchText],
  );

  const handleQueryChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;

    setSearchText(value);
    setIsHeartVisible(value.length > 2);
    setIsRecentRequestHidden(value.length > 0);

    if (!value.trim()) return;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      dispatch(saveCurrentQueryName(value.trim()));
    }, DELAY);
  };

  return (
    <div className={`${s.searchBarContainer} ${hasVideos ? s.hasVideos : ""} `}>
      <h1>{searchVideo}</h1>
      <div ref={inputWrapperRef}>
        <Search
          value={searchText}
          onClick={handleOpenRequestListIfEmpty}
          disabled={isOpenModal}
          onChange={handleQueryChange}
          className={`${s.customStyle}  ${hasVideos ? s.hasVideos : ""}`}
          placeholder={searchPlaceholder}
          allowClear
          enterButton={buttonText}
          suffix={
            isHeartVisible ? (
              <HeartOutlined
                className={s.addToFavoritesBtn}
                onClick={handleOpenSaveModal}
              />
            ) : null
          }
          size="large"
          onSearch={handleSearchSubmit}
        />
      </div>

      <RecentRequestList
        handleSelectRecentRequest={handleSelectRecentRequest}
        isRecentRequestHidden={isRecentRequestHidden}
      />
    </div>
  );
};
