import { Metadata } from "next";
import React from "react";
import ChangePasswordClientPage from "./ChangePasswordClientPage2";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: "Templeat | Change Password",
};
function ChangePassword() {
  return (<Box >
    <ChangePasswordClientPage />
  </Box>);
}

export default ChangePassword;
