import { Metadata } from "next";
import React from "react";
import CreateNewPasswordClientPage from "./CreateNewPasswordClientPage";

export const metadata: Metadata = {
  title: "Tekram | Create New Password",
};
function CreateNewPassword() {
  return <CreateNewPasswordClientPage />;
}

export default CreateNewPassword;
