import { useRef, type FC } from "react";

import { useCloseOnOutsideClick } from "../../hooks/useCloseOnOutsideClick";

import { GlobalOutlined } from "@ant-design/icons";
import { Button } from "../../shared/Button";

import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";

import {
  isOpenLanguageMenu,
  closeLanguageMenu,
  selectIsOpenLanguagePopup,
} from "../../redux/slices/languageSlice";

import { LanguageMenu } from "./LanguageMenu";

import s from "./index.module.css";

type ToggleLanguageProps = {
  isMobile: boolean;
};

export const ToggleLanguage: FC<ToggleLanguageProps> = ({ isMobile }) => {
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector(selectIsOpenLanguagePopup);

  const languageWrapperRef = useRef<HTMLDivElement>(null);

  useCloseOnOutsideClick(languageWrapperRef, closeLanguageMenu);

  const handleOpenLanguageMenu = () => dispatch(isOpenLanguageMenu());

  return (
    <div ref={languageWrapperRef} className={s.languageWrapper}>
      <Button
        onClick={handleOpenLanguageMenu}
        className={`${s.toggleLanguage} ${isMobile ? s.isMobile : ""}`}
        type="button"
      >
        <GlobalOutlined />
      </Button>
      {isOpen && <LanguageMenu />}
    </div>
  );
};
