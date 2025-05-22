import * as Yup from "yup";

export default Yup.object({
  currentPassword: Yup.string().required("Current Password is required."),
  newPassword: Yup.string()
    .required("New Password is required.")
    .min(8, "Password must be at least 8 characters."),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match.")
    .required("Password confirmation is required."),
});
