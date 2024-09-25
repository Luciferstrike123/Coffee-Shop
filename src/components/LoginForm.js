import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLoginState } from "../Recoil/User/useLoginState";
import { useToastState } from "../Recoil/Error/useToastState";
import { useLoadingState } from "../Recoil/Loading/useLoadingState";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { Eye, EyeOff } from "lucide-react";

function LoginForm() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useLoginState();
  const { setToastMsg } = useToastState();
  const { setIsLoading } = useLoadingState();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(30, "Username must be less than 30 characters.")
        .required("This field is required."),
      password: Yup.string()
        .max(128, "Password must be less than 128 characters.")
        .min(6, "Password must be more than 6 characters.")
        .required("This field is required."),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      await axios
        .post(
          'https://dummyjson.com/auth/login',
          {
            username: values.username,
            password: values.password,
            expiresInMins: 30, // Optional, you can adjust this
          },
          {
            headers: { 'Content-Type': 'application/json' },
            // withCredentials: true, // To include cookies for tokens
          }
        )
        .then((resp) => {
          // Store the tokens in localStorage
          localStorage.setItem("access-token", resp.data.accessToken);
          localStorage.setItem("refresh-token", resp.data.refreshToken);
          localStorage.setItem("user-id", resp.data.id); // Store userId from login response

          // Reset form
          resetForm();

          // Set login state
          setIsLoggedIn(true);

          // Show success toast message
          setToastMsg({
            isError: false,
            message: "You have logged in successfully.",
          });

          // Redirect user
          navigate("/user");
        })
        .catch((err) => {
          // Show error toast message
          setToastMsg({
            isError: true,
            message: err.response?.data?.message || "Login failed",
          });
        })
        .finally(() => setIsLoading(false));
    },
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      autoComplete="off"
      className={`flex flex-col ${Object.keys(formik.errors).length > 0 ? "gap-2.5" : "gap-4"
        }`}
      noValidate
    >
      {formik.errors.username && formik.touched.username ? (
        <small className="text-xs text-red-500">{formik.errors.username}</small>
      ) : null}
      <InputField
        label="Username"
        name="username"
        value={formik.values.username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`${formik.errors.username && formik.touched.username
            ? "border-red-500 hover:border-red-500 focus:border-red-500"
            : ""
          }`}
      />
      {formik.errors.password && formik.touched.password ? (
        <small className="text-xs text-red-500">{formik.errors.password}</small>
      ) : null}
      <div className="relative">
        <InputField
          label="Password"
          name="password"
          value={formik.values.password}
          type={showPassword ? "text" : "password"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`${formik.errors.password && formik.touched.password
              ? "border-red-500 hover:border-red-500 focus:border-red-500"
              : ""
            }`}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
        >
          {showPassword ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>
      </div>
      <div className="w-full">
        <Button type="submit" name="Enter" />
      </div>
    </form>
  );
}

export default LoginForm;
