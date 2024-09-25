import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import InputField from "../../../../components/InputField";
import Button from "../../../../components/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToastState } from "../../../../Recoil/Error/useToastState";
import { useLoadingState } from "../../../../Recoil/Loading/useLoadingState";

function Password() {
  const navigate = useNavigate();
  const { setToastMsg } = useToastState();
  const { setIsLoading } = useLoadingState();

  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);
  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .max(128, "Password must be less than 128 characters.")
        .min(6, "Password must be more than 6 characters.")
        .required("This field is required."),
      newPassword: Yup.string()
        .max(128, "Password must be less than 128 characters.")
        .min(6, "Şifre 6 karakterden fazla olmalı.")
        .required("This field is required."),
      newPasswordConfirm: Yup.string()
        .max(128, "Password must be less than 128 characters.")
        .min(6, "Password must be more than 6 characters.")
        .oneOf([Yup.ref("newPassword"), null], "Passwords do not match.")
        .required("This field is required."),
    }),
    validateOnChange: validateAfterSubmit,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      await axios
        .post(`${import.meta.env.VITE_BASE_URL}/user/changepassword`, values, {
          headers: {
            "x-access-token": `${localStorage.getItem("access-token")}`,
          },
        })
        .then((resp) => {
          resetForm();
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
    <div className="h-full w-full flex flex-col justify-center items-center px-4 py-16 text-white relative">
      <Link to="/user/edit" className="absolute top-4 left-6">
        <FontAwesomeIcon
          icon={faArrowLeftLong}
          className="text-3xl hover:text-[#cda154]"
        />
      </Link>
      <form
        onSubmit={formik.handleSubmit}
        noValidate
        autoComplete="off"
        className="flex flex-col gap-5 w-full md:w-4/5"
      >
        <div
          className={`flex flex-col ${
            Object.keys(formik.errors).length > 0 ? "gap-2.5 md:gap-3" : "gap-4"
          }`}
        >
          {formik.errors.password ? (
            <small className="text-xs text-red-500">
              {formik.errors.password}
            </small>
          ) : null}
          <InputField
            label="Current Password"
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
          {formik.errors.newPassword ? (
            <small className="text-xs text-red-500">
              {formik.errors.newPassword}
            </small>
          ) : null}
          <InputField
            label="New Password"
            name="newPassword"
            value={formik.values.newPassword}
            type="password"
            onChange={formik.handleChange}
            className={`${
              formik.errors.newPassword
                ? "border-red-500 hover:border-red-500 focus:border-red-500"
                : ""
            }`}
          />
          {formik.errors.newPasswordConfirm ? (
            <small className="text-xs text-red-500">
              {formik.errors.newPasswordConfirm}
            </small>
          ) : null}
          <InputField
            label="New Password Again"
            name="newPasswordConfirm"
            value={formik.values.newPasswordConfirm}
            type="password"
            onChange={formik.handleChange}
            className={`${
              formik.errors.newPasswordConfirm
                ? "border-red-500 hover:border-red-500 focus:border-red-500"
                : ""
            }`}
          />
        </div>
        <div>
          <Button
            name="Change"
            onClick={() => {
              setValidateAfterSubmit(true);
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default Password;
