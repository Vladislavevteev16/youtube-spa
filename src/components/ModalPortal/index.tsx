import { createPortal } from "react-dom";

import { useAppSelector, useAppDispatch } from "../../redux/store/hooks";

import {
  closeQueryModal,
  selectIsOpenModal,
} from "../../redux/slices/savedQueriesSlice";

import { Modal } from "../ModalSavedQuery";

import s from "./index.module.css";

export const ModalPortal = () => {
  const modalRoot = document.getElementById("modal");

  const dispatch = useAppDispatch();

  const isOpenModal = useAppSelector(selectIsOpenModal);

  const handleCloseModal = () => dispatch(closeQueryModal());

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) =>
    e.stopPropagation();

  if (!isOpenModal || !modalRoot) return null;

  return createPortal(
    <div className={s.modalOverlay} onClick={handleCloseModal}>
      <div className={s.modalContainer} onClick={stopPropagation}>
        <Modal />
      </div>
    </div>,
    modalRoot,
  );
};
