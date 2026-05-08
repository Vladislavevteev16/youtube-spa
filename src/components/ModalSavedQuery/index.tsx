import { Form, Input, Select, Col, InputNumber, Row, Slider } from "antd";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

import { v4 as uuid } from "uuid";

import { Button } from "../../shared/Button";
import {
  addQuery,
  closeQueryModal,
  editQueryName,
  selectCurrentModeValue,
  selectCurrentQueryName,
  selectIsSaveMode,
  selectQueriesId,
  selectSavedQuery,
} from "../../redux/slices/savedQueriesSlice";

import { useLanguage } from "../../hooks/useLanguage";
import { selectCurrentLanguage } from "../../redux/slices/languageSlice";

import { useAppDispatch } from "../../redux/store/hooks";
import { useAppSelector } from "../../redux/store/hooks";

import { YoutubeOrderValue } from "../../constants/enums";

import s from "./index.module.css";

export type FormInputType = {
  query: string;
  name: string;
  sortBy: "date" | "rating" | "relevance" | "title" | "viewCount";
  maxResults: number;
};

type FormConfigType = {
  defaultValues: FormInputType;
  mode: "onBlur" | "onChange" | "onSubmit" | "onTouched" | "all";
};

export const Modal = () => {
  const dispatch = useAppDispatch();

  const currentLanguage = useAppSelector((state) =>
    selectCurrentLanguage(state),
  );

  const currentQueryName = useAppSelector((state) =>
    selectCurrentQueryName(state),
  );

  const isSaveMode = useAppSelector((state) => selectIsSaveMode(state));

  const queriesId = useAppSelector((state) => selectQueriesId(state));

  const savedQuery = useAppSelector((state) =>
    selectSavedQuery(state, queriesId || ""),
  );

  const currentModeValue = useAppSelector((state) =>
    selectCurrentModeValue(state),
  );

  const {
    request,
    title,
    titleModal,
    titlePlaceholder,
    save,
    cancel,
    byDate,
    byName,
    byNumberOfViews,
    byRating,
    defaultSort,
    sortBy,
    maxQty,
    requierdField,
    minLength,
  } = useLanguage(currentLanguage, "modal");

  const selectOptions = [
    { value: YoutubeOrderValue.RELEVANCE, label: defaultSort },
    { value: YoutubeOrderValue.VIEW_COUNT, label: byNumberOfViews },
    { value: YoutubeOrderValue.DATE, label: byDate },
    { value: YoutubeOrderValue.RATING, label: byRating },
    { value: YoutubeOrderValue.TITLE, label: byName },
  ];

  const modeModalTitle = titleModal[currentModeValue];

  const formConfig: FormConfigType = {
    defaultValues: {
      query: isSaveMode ? currentQueryName : (savedQuery?.query ?? ""),
      name: isSaveMode ? "" : (savedQuery?.name ?? ""),
      sortBy: isSaveMode
        ? YoutubeOrderValue.RELEVANCE
        : (savedQuery?.sortBy ?? YoutubeOrderValue.RELEVANCE),
      maxResults: isSaveMode ? 12 : (savedQuery?.maxResults ?? 12),
    },
    mode: "onBlur",
  };

  const validatesNameRules = {
    required: true,
    validate: (value: string) => {
      const trimValue = value.trim();

      if (!trimValue) return requierdField;
      if (trimValue.length < 3) return minLength;

      return true;
    },
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm(formConfig);

  const handleCloseModal = () => dispatch(closeQueryModal());

  const onSubmit: SubmitHandler<FormInputType> = (data) => {
    const extentionData = { ...data, id: uuid() };
    if (isSaveMode) {
      dispatch(addQuery(extentionData));
      dispatch(closeQueryModal());
    } else {
      if (queriesId) {
        dispatch(editQueryName({ id: queriesId, data: extentionData }));
        dispatch(closeQueryModal());
      }
    }
  };

  return (
    <div className={s.modalForm}>
      <h1 className={s.title}>{modeModalTitle}</h1>
      <Form
        onFinish={handleSubmit(onSubmit)}
        layout="vertical"
        name="basic"
        autoComplete="off"
      >
        <Form.Item label={request}>
          <Controller
            name="query"
            control={control}
            render={({ field }) => (
              <Input defaultValue={"dsad"} {...field} disabled={isSaveMode} />
            )}
          />
        </Form.Item>
        <Form.Item
          label={title}
          required
          validateStatus={errors.name ? "error" : ""}
          help={errors.name?.message?.toString()}
        >
          <Controller
            name="name"
            rules={validatesNameRules}
            control={control}
            render={({ field }) => (
              <Input placeholder={titlePlaceholder} {...field} />
            )}
          />
        </Form.Item>
        <Form.Item label={sortBy}>
          <Controller
            name="sortBy"
            control={control}
            render={({ field }) => (
              <Select
                getPopupContainer={(trigger) => trigger.parentNode}
                {...field}
                options={selectOptions}
              />
            )}
          />
        </Form.Item>
        <Form.Item label={maxQty}>
          <Controller
            name="maxResults"
            control={control}
            defaultValue={10}
            render={({ field }) => (
              <Row>
                <Col span={12}>
                  <Slider
                    min={1}
                    max={50}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber
                    style={{ color: "white" }}
                    min={1}
                    max={20}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </Col>
              </Row>
            )}
          />
        </Form.Item>
        <div className={s.btnContainer}>
          <Button
            onClick={handleCloseModal}
            type="button"
            className={s.dontSaveBtn}
          >
            {cancel}
          </Button>
          <Button type="submit" className={s.saveBtn} disabled={!isValid}>
            {save}
          </Button>
        </div>
      </Form>
    </div>
  );
};
