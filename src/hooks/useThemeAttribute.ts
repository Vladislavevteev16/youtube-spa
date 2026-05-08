import { useEffect } from "react";

import { useAppSelector } from "../redux/store/hooks";

import { selectTheme } from "../redux/slices/themeSlice";

export const useThemeAttribute = () => {
  const theme = useAppSelector(selectTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
};
