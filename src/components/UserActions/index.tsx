import { ToggleLanguage } from "../ToggleLanguage";
import { ToggleTheme } from "../ToggleTheme";
import { Button } from "../../shared/Button";
import { LogoutOutlined } from "@ant-design/icons";

import s from "./index.module.css";

type UserActionsProps = {
  onLogout: () => void;
  className?: string;
  logoutText?: string;
  isMobile: boolean;
};

export const UserActions = ({
  onLogout,
  className,
  logoutText,
  isMobile,
}: UserActionsProps) => {
  return (
    <div className={className}>
      <ToggleLanguage isMobile={isMobile} />
      <ToggleTheme />
      <Button
        onClick={onLogout}
        className={`${s.buttonLogout} ${isMobile ? s.isMobile : ""}`}
        type="button"
      >
        <LogoutOutlined
          className={`${s.logoutImage} ${isMobile ? s.isMobile : ""}`}
        />
        {!isMobile && logoutText}
      </Button>
    </div>
  );
};
