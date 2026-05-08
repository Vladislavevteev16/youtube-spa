import { useMemo } from "react";

import { NavLink, useLocation } from "react-router-dom";

import { logout as userLogout } from "../../redux/slices/authSlice";

import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";

import { Burger } from "../Burger";

import { selectIsMobile } from "../../redux/slices/viewModeSlice";
import { selectCurrentLanguage } from "../../redux/slices/languageSlice";
import { resetVideos, selectIsLoading } from "../../redux/slices/videosSlice";
import { resetCurrentQuery } from "../../redux/slices/savedQueriesSlice";

import { useMobileDetection } from "../../hooks/useMobileDetection";
import { useThemeAttribute } from "../../hooks/useThemeAttribute";

import { useLanguage } from "../../hooks/useLanguage";
import { LanguageOptions } from "../../constants/enums";

import { SearchOutlined, StarOutlined } from "@ant-design/icons";

import { UserActions } from "../UserActions";

import logo from "../../assets/youtube-icon.svg";

type Items = {
  id: number;
  title: string;
  path: string;
  component: React.ReactNode;
};

import s from "./index.module.css";

type ReferensListType = Items[];

export const Header = () => {
  const dispatch = useAppDispatch();

  const currentPage = useLocation().pathname.slice(1);

  const currentLanguage = useAppSelector(selectCurrentLanguage);

  const isLoading = useAppSelector(selectIsLoading);

  const isMobile = useAppSelector(selectIsMobile);

  const handleLogout = () => {
    dispatch(userLogout());
    localStorage.clear();
  };

  const handleOutMainPage = () => {
    dispatch(resetVideos());
    dispatch(resetCurrentQuery());
  };

  const { favorites, logout, search } = useLanguage(
    currentLanguage,
    LanguageOptions.HEADER,
  );

  useThemeAttribute();

  useMobileDetection(dispatch);

  const referensList: ReferensListType = useMemo(
    () => [
      {
        id: 0,
        title: search,
        path: "/",
        component: <SearchOutlined />,
      },
      { id: 1, title: favorites, path: "queries", component: <StarOutlined /> },
    ],
    [favorites, search],
  );

  return (
    <header
      className={`${s.headerContainer} ${isMobile ? s.mobile : ""} ${isLoading ? s.loading : ""}`}
    >
      <nav>
        <div>
          <NavLink onClick={handleOutMainPage} className={s.logoLink} to="/">
            <img className={s.logo} src={logo} alt="LOGO" />
          </NavLink>

          <ul className={s.headerList}>
            {referensList.map((item) => (
              <li key={item.id}>
                <NavLink
                  className={
                    !currentPage && item.id === 0
                      ? s.active
                      : currentPage === item.path
                        ? s.active
                        : ""
                  }
                  to={item.path}
                >
                  {item.component}
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className={s.headerLeft}>
          {isMobile ? (
            <Burger>
              <UserActions
                onLogout={handleLogout}
                isMobile
                logoutText={logout}
              />
            </Burger>
          ) : (
            <UserActions
              onLogout={handleLogout}
              isMobile={isMobile}
              logoutText={logout}
            />
          )}
        </div>
      </nav>
    </header>
  );
};
