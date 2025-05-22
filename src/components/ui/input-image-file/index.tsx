"use client";
import { Box } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { CustomButton } from "../button";
import InputFile from "../inputFile/InputFile";

interface ImageFileProps {
  initialImage?: string;
  onImageChange: (file: File | null) => void;
}

export default function ImageFile({
  initialImage,
  onImageChange,
}: ImageFileProps) {
  const [image, setImage] = useState<string>(
    initialImage || "/images/logo/no-image.png"
  );

  const handleFileChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result && typeof e.target.result === "string") {
          setImage(e.target.result); // عرض الصورة المرفوعة
          onImageChange(file); // إرسال الملف للمكون الأب
        }
      };
      reader.readAsDataURL(file); // قراءة الملف
    }
  };

  const handleDeleteImage = () => {
    setImage("/images/logo/no-image.png");
    onImageChange(null); // إرسال حالة الحذف
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          borderRadius: "50px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.04)",
          margin: "0 0 10px",
          width: 180,
          height: 180,
          backgroundColor: "background.paper",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={image}
          alt="company image"
          width={180}
          height={180}
          style={{ objectFit: "cover" }}
        />
      </Box>
      <InputFile label="" name="companyImage" onFileChange={handleFileChange}>
        <CustomButton
          variant="outlined"
          color="error.main"
          onClick={handleDeleteImage}
        >
          Delete Image
        </CustomButton>
      </InputFile>
    </Box>
  );
}
