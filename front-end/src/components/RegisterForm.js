import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLoginState } from "../Recoil/User/useLoginState";
import { useToastState } from "../Recoil/Error/useToastState";
import { useLoadingState } from "../Recoil/Loading/useLoadingState";

function RegisterForm() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useLoginState();
  const { setToastMsg } = useToastState();
  const { setIsLoading } = useLoadingState();

  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, "Username must be less than 20 characters.")
        .required("This field is required."),
      surname: Yup.string()
        .max(20, "Last name must be less than 20 characters.")
        .required("This field is required."),
      email: Yup.string()
        .max(254, "Email must be less than 254 characters.")
        .email("Invalid email address.")
        .required("This field is required."),
      password: Yup.string()
        .max(128, "Password must be less than 128 characters.")
        .min(6, "Password must be more than 6 characters.")
        .required("This field is required."),
      confirmPassword: Yup.string()
        .max(128, "Password must be less than 128 characters.")
        .min(6, "Password must be more than 6 characters.")
        .oneOf([Yup.ref("password"), null], "Passwords do not match.")
        .required("This field is required."),
    }),
    validateOnChange: validateAfterSubmit,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      await axios
        .post(`https://dummyjson.com/user/login`, values)
        .then((resp) => {
          localStorage.setItem("access-token", resp.data.token);
          resetForm();
          setIsLoggedIn(true);
          navigate("/user");
          setToastMsg({ isError: false, message: resp.data.message });
        })
        .catch((err) => {
          setToastMsg({ isError: true, message: err.response.data.message });
        })
        .finally(() => setIsLoading(false));
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={`flex flex-col ${
        Object.keys(formik.errors).length > 0 ? "gap-2.5" : "gap-4"
      }`}
      autoComplete="off"
      noValidate
    >
      {formik.errors.name ? (
        <small className="text-xs text-red-500">{formik.errors.name}</small>
      ) : null}
      <InputField
        label="First Name"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        className={`${
          formik.errors.name
            ? "border-red-500 hover:border-red-500 focus:border-red-500"
            : ""
        }`}
      />
      {formik.errors.surname ? (
        <small className="text-xs text-red-500">{formik.errors.surname}</small>
      ) : null}
      <InputField
        label="Last Name"
        name="surname"
        value={formik.values.surname}
        onChange={formik.handleChange}
        className={`${
          formik.errors.surname
            ? "border-red-500 hover:border-red-500 focus:border-red-500"
            : ""
        }`}
      />
      {formik.errors.email ? (
        <small className="text-xs text-red-500">{formik.errors.email}</small>
      ) : null}
      <InputField
        label="E-mail"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        className={`${
          formik.errors.email
            ? "border-red-500 hover:border-red-500 focus:border-red-500"
            : ""
        }`}
      />
      {formik.errors.password ? (
        <small className="text-xs text-red-500">{formik.errors.password}</small>
      ) : null}
      <InputField
        label="Password"
        name="password"
        value={formik.values.password}
        type="password"
        onChange={formik.handleChange}
        className={`${
          formik.errors.password
            ? "border-red-500 hover:border-red-500 focus:border-red-500"
            : ""
        }`}
      />
      {formik.errors.confirmPassword ? (
        <small className="text-xs text-red-500">
          {formik.errors.confirmPassword}
        </small>
      ) : null}
      <InputField
        label="Confirm Password"
        name="confirmPassword"
        value={formik.values.confirmPassword}
        type="password"
        onChange={formik.handleChange}
        className={`${
          formik.errors.confirmPassword
            ? "border-red-500 hover:border-red-500 focus:border-red-500"
            : ""
        }`}
      />
      <div className="w-full">
        <Button
          name="Register"
          onClick={() => {
            setValidateAfterSubmit(true);
          }}
        />
      </div>
    </form>
  );
}

export default RegisterForm;
