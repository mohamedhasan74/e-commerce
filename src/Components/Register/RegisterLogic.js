import * as Yup from "yup";

export const initialValues = {
  name: "",
  email: "",
  password: "",
  rePassword: "",
  phone: "",
};
export const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name Is Required")
    .min(3, "Must Be At Least 3 Chars")
    .max(15, "Must Be 15 Chars Or Less"),
  email: Yup.string()
    .required("Email Is Required")
    .email("Invalid Email Address"),
  password: Yup.string()
    .required("Password Is Required")
    .matches(
      /^[A-Z][a-z0-9]{5,9}$/,
      "Must Start With Capital Char And More Than 6 Chars"
    ),
  rePassword: Yup.string()
    .required("Repassword Is Required")
    .oneOf([Yup.ref("password")], "Password And Repassword Doesn't Match"),
  phone: Yup.string()
    .required("Phone Is Required")
    .matches(/^01[0125][0-9]{8}$/, "Invalid Eg Number"),
});
