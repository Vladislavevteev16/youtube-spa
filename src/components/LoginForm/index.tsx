import { useEffect, useMemo } from "react";

import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";

import { Form, Input, notification } from "antd";

import { login, selectAuthProperty } from "../../redux/slices/authSlice";

import { useForm, Controller } from "react-hook-form";

import { Button } from "../../shared/Button";

import s from "./index.module.css";

export type CredentialsType = {
  email: string;
  password: string;
};

type FormConfigType = {
  defaultValues: CredentialsType;
  mode: "onBlur" | "onChange" | "onSubmit" | "onTouched" | "all";
};

export const LoginForm = () => {
  const [api, contextHolder] = notification.useNotification();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { isError, isLoading, errorMessage } =
    useAppSelector(selectAuthProperty);

  const formConfig: FormConfigType = {
    defaultValues: {
      email: "vbabangida@bk.ru",
      password: "VladEvteev$1996",
    },
    mode: "onChange",
  };

  const formRules = useMemo(
    () => ({
      email: {
        required: "Email is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email",
        },
      },
      password: {
        required: true,
        validate: (value: string) => {
          if (value.length < 6) {
            return "Password must be at least 6 characters";
          }
          if (!/\d/.test(value)) {
            return "Must be contain at number";
          }

          return true;
        },
      },
    }),
    [],
  );

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm(formConfig);

  useEffect(() => {
    if (isError) {
      api.error({
        title: errorMessage,
        placement: "topRight",
        duration: 3,
      });
    }
  }, [isError, api, errorMessage]);

  const handleMySubmit = async (credentials: CredentialsType) => {
    await dispatch(login(credentials)).unwrap();
    navigate("/");
  };

  return (
    <div className={s.loginFormContainer}>
      {contextHolder}
      <div className={s.loginForm}>
        <h1 className={isLoading ? s.loading : ""}>Login</h1>
        <Form
          onFinish={handleSubmit(handleMySubmit)}
          layout="vertical"
          name="basic"
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            validateStatus={errors.email ? "error" : ""}
            help={errors.email?.message?.toString()}
          >
            <Controller
              control={control}
              rules={formRules.email}
              name="email"
              render={({ field }) => <Input placeholder="email" {...field} />}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message?.toString()}
          >
            <Controller
              control={control}
              rules={formRules.password}
              name="password"
              render={({ field }) => (
                <Input type="password" placeholder="password" {...field} />
              )}
            />
          </Form.Item>
          <Button className={s.button} type="submit" disabled={!isValid}>
            Log in
          </Button>
        </Form>
      </div>
    </div>
  );
};
