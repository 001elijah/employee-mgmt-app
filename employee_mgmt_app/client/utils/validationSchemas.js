import * as yup from "yup";

export const registrationValidationSchema = yup.object().shape({
  fullName: yup
  .string()
  .matches(/^([^0-9]*)$/, "Numbers are not allowed")
  .required("Full name is required"),

  email: yup
    .string()
    .matches(/^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/, "E-mail address not valid")
    .required("E-mail address is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
      "Must consist of letters and numbers",
    )
    .min(6, ({ min }) => `Minimum password length is ${min} characters`)
    .max(16, ({ max }) => `Password must not exceed ${max} characters`)
    .required("Password is required"),
});
