import { Metadata } from "next";
import React from "react";
import ResetPasswordClientPage from "./ResetPasswordClientPage";

export const metadata: Metadata = {
  title: "Tekram | ResetPassword",
};
const ResetPassword = () => <ResetPasswordClientPage />;

export default ResetPassword;
