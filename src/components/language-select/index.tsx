"use client";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";

export default function SelectLanguage() {
  const [language, setLanguage] = useState<string>("EN");

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    setLanguage(event.target.value as string);
  };

  return (
    <>
      <FormControl size="small">
        <Select
          value={language}
          onChange={handleLanguageChange}
          displayEmpty
          inputProps={{ "aria-label": "Language selector" }}
          // sx={{
          //   border: "none",
          //   boxShadow: "none",
          //   "&:hover": { border: "none", boxShadow: "none" },
          // }}
        >
          <MenuItem value="EN">English</MenuItem>
          <MenuItem value="FR">French</MenuItem>
          <MenuItem value="AR">Arabic</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}
