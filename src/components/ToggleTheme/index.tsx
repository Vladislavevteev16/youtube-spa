import { Button } from "../../shared/Button";

import { useAppSelector, useAppDispatch } from "../../redux/store/hooks";

import { selectTheme, setTheme } from "../../redux/slices/themeSlice";

import { ThemeOptions } from "../../constants/enums";

import { MoonOutlined, SunOutlined } from "@ant-design/icons";

import s from "./index.module.css";

export const ToggleTheme = () => {
  const dispatch = useAppDispatch();

  const theme = useAppSelector(selectTheme);

  const handleChangeTheme = () => dispatch(setTheme());

  return (
    <div>
      <Button onClick={handleChangeTheme} className={s.toggle} type="button">
        {theme === ThemeOptions.LIGHT ? <MoonOutlined /> : <SunOutlined />}
      </Button>
    </div>
  );
};
