import * as Yup from "yup";
export const initialValues = {
  email: "",
  password: "",
};
export const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email Is Required")
    .email("Invalid Email Address"),
  password: Yup.string().required("Password Is Required"),
});
