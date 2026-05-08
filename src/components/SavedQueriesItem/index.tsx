import { memo, type FC } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";

import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { searchVideos } from "../../redux/slices/videosSlice";
import { useNavigate } from "react-router-dom";

import {
  deleteQuery,
  openQueryEditModal,
  saveCurrentQueryName,
  selectSavedQuery,
  type Query,
} from "../../redux/slices/savedQueriesSlice";
import { setSearchResultViewMode } from "../../redux/slices/viewModeSlice";

import s from "./index.module.css";

export const SavedQueriesItem: FC<Pick<Query, "id" | "query">> = memo(
  ({ id, query }) => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const handleDeleteQuery = () => dispatch(deleteQuery(id));

    const handleOpenEditModal = () => dispatch(openQueryEditModal(id));

    const savedQueryParams = useAppSelector((state) =>
      selectSavedQuery(state, id),
    );

    const handleGetVideosByQuery = async () => {
      await dispatch(
        searchVideos({
          q: savedQueryParams?.query || "",
          maxResults: savedQueryParams?.maxResults,
          order: savedQueryParams?.sortBy,
        }),
      ).unwrap();
      dispatch(saveCurrentQueryName(savedQueryParams?.query || ""));
      dispatch(setSearchResultViewMode(savedQueryParams?.query || ""));
      navigate("/");
    };

    return (
      <li className={s.listItem}>
        <div>
          <p>{query}</p>
          <div className={s.controlContainer}>
            <EditOutlined onClick={handleOpenEditModal} />
            <DeleteOutlined onClick={handleDeleteQuery} />
            <CheckOutlined onClick={handleGetVideosByQuery} />
          </div>
        </div>
      </li>
    );
  },
);
