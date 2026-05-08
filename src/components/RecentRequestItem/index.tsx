import { memo, type FC } from "react";

import { useAppDispatch } from "../../redux/store/hooks";

import { deleteRequest } from "../../redux/slices/recentRequestSlice";

import { ClockCircleOutlined, CloseOutlined } from "@ant-design/icons";

import s from "./index.module.css";

type RecentRequestItemProps = {
  id: string;
  value: string;
  handleSelectRecentRequest: (request: string) => void;
};

export const RecentRequestItem: FC<RecentRequestItemProps> = memo(
  ({ id, value, handleSelectRecentRequest }) => {
    const dispatch = useAppDispatch();

    const handleSelectedRequest = () => {
      handleSelectRecentRequest(value);
    };

    const handleDeleteRequest = (e: React.MouseEvent) => {
      e.stopPropagation();
      dispatch(deleteRequest(id));
    };

    return (
      <li
        className={s.recentRequestItemContainer}
        onClick={handleSelectedRequest}
      >
        <div className={s.contentContainer}>
          <ClockCircleOutlined /> <p>{value}</p>
        </div>
        <CloseOutlined
          onClick={handleDeleteRequest}
          className={s.closeButton}
        />
      </li>
    );
  },
);
