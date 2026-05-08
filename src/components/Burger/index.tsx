import { useRef, useState } from "react";

import { MenuOutlined } from "@ant-design/icons";

import { useCloseOnOutsideClick } from "../../hooks/useCloseOnOutsideClick";

import s from "./index.module.css";

export const Burger = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropDown = () => setIsOpen((prev) => !prev);

  const handleCloseBurgerDropDown = () => setIsOpen(false);

  const burgerWrapperRef = useRef<HTMLDivElement>(null);

  useCloseOnOutsideClick(burgerWrapperRef, handleCloseBurgerDropDown);

  return (
    <div ref={burgerWrapperRef} className={s.burgerContainer}>
      <MenuOutlined onClick={handleDropDown} />
      {isOpen && <div className={s.dropDownContainer}>{children}</div>}
    </div>
  );
};
