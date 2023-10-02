import * as yup from "yup";

export const registrationValidationSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup
    .string()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Please enter valid email")
    .required("Email Address is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
      "Must consist of letters and numbers",
    )
    .min(6, ({ min }) => `Password must be minimum ${min} symbols`)
    .max(16, ({ max }) => `Password must be maximum ${max} symbols`)
    .required("Password is required"),
});
