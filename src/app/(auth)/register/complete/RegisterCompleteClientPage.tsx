"use client";
import { useState } from "react";
import Input from "@/components/ui/input/Input";
import InputFile from "@/components/ui/inputFile/InputFile";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import Link from "next/link";
import {
  formContainer,
  h1Text,
  haveAccont,
  imageContainer,
  registerPageContainer,
  submitBtn,
  googleBtn,
} from "./RegisterCompleteClientPage.style";
import useGoogleLogin from "../../hooks/useGoogleLogin";

export default function RegisterCompleteClientPage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const { loginWithGoogle, loading, error, success } = useGoogleLogin();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address || !description || !logo) {
      return;
    }

    const formData = {
      name,
      address,
      description,
      logo,
    };
    // console.log(formData);

    // Send the form data to the server
  };

  return (
    <Box sx={registerPageContainer}>
      <Grid container>
        <Grid
          // item
          // xs={12}
          // md={7}
          // lg={6}
          sx={{ ...formContainer, px: { xs: 2, sm: 6, md: 16 } }}
        >
          <Typography sx={h1Text} component="h4">
            Information about your company
          </Typography>
          <Box component="form" onSubmit={handleFormSubmit}>
            <Input
              label="Name of the company"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Address of the company"
              name="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Input
              label="Description"
              name="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <InputFile
              label="Logo of the company"
              name="logo"
              onFileChange={(file: File | null) => setLogo(file)}
            />
            <Button
              sx={submitBtn}
              variant="contained"
              fullWidth
              size="large"
              type="submit"
              disabled={!name || !address || !description || !logo}
            >
              Sign up
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                loginWithGoogle();
              }}
              sx={googleBtn}
              size="large"
            >
              <img
                src="https://authjs.dev/img/providers/google.svg"
                alt="Google logo"
                height="24"
                width="24"
              />
              <Box
                component="span"
                sx={{
                  textTransform: "capitalize",
                  color: "text.primary",
                  fontWeight: "500",
                }}
              >
                {loading ? "Loading..." : "Sign up with Google"}
              </Box>
            </Button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
          </Box>
          <Typography
            textAlign="center"
            sx={haveAccont}
            color="text.secondary"
            mt={2}
          >
            Already have an account?{" "}
            <Link
              href="/login"
              style={{ textDecoration: "none", color: "primary.main" }}
            >
              Sign in
            </Link>
          </Typography>
        </Grid>

        {/* Image Section */}
        <Grid
          // item
          // xs={0}
          // md={5}
          // lg={6}
          sx={{ ...imageContainer, display: { xs: "none", md: "block" } }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <Image
              src="/images2/information.png"
              width={500}
              height={500}
              alt="Company information illustration"
              style={{ marginLeft: "auto" }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
