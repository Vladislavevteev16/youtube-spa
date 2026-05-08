import { Outlet } from "react-router-dom";

import { Header } from "../Header";

import s from "./index.module.css";

export const Layout = () => {
  return (
    <div className={s.layoutContainer}>
      <Header />
      <div className={`${s.outletContainer}`}>
        <Outlet />
      </div>
    </div>
  );
};


