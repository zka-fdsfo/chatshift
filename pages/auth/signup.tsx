import Box from "@mui/material/Box";
import { useState } from "react";
import {
  signupMutation,
  signupMutationPayload
} from "@/api/functions/user.api";
import NewLogo from "@/components/logo/new-logo";
import validationText from "@/json/messages/validationText";
import CustomInput from "@/ui/Inputs/CustomInput";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { Typography, Card, Stack } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import RostrHeader from "@/layout/dashboard/header/rostrheader";
import RostrFooter from "@/layout/dashboard/footer/rostrfooter";

// ---------------- Styled Layout ----------------
const StyledSignupPage = styled(Box)`
  height: 100vh;
  position: relative;
  overflow: hidden;
  perspective: 1200px;
`;

// ---------------- 3D Cubes ----------------
const FloatingCubes = styled("div")`
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;

  .cube {
    position: absolute;
    transform-style: preserve-3d;
    animation: float linear infinite;
  }

  .face {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(29, 42, 51, 0.08);
    border: 1px solid rgba(29, 42, 51, 0.12);
  }

  .front  { transform: rotateY(0deg) translateZ(calc(var(--size) / 2)); }
  .back   { transform: rotateY(180deg) translateZ(calc(var(--size) / 2)); }
  .right  { transform: rotateY(90deg) translateZ(calc(var(--size) / 2)); }
  .left   { transform: rotateY(-90deg) translateZ(calc(var(--size) / 2)); }
  .top    { transform: rotateX(90deg) translateZ(calc(var(--size) / 2)); }
  .bottom { transform: rotateX(-90deg) translateZ(calc(var(--size) / 2)); }

  @keyframes float {
    0% {
      transform: translateY(120vh) rotateX(0deg) rotateY(0deg);
      opacity: 0;
    }
    20% { opacity: 1; }
    100% {
      transform: translateY(-140vh) rotateX(360deg) rotateY(360deg);
      opacity: 0;
    }
  }
`;

// ---------------- Validation ----------------
const schema = yup.object().shape({
  name: yup.string().trim().required(validationText.error.fullName),
  company: yup.string().trim().required(validationText.error.company_name),
  email: yup
    .string()
    .trim()
    .email(validationText.error.email_format)
    .required(validationText.error.enter_email)
});

// ---------------- Component ----------------
export default function SignupView() {
  const router = useRouter();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      company: ""
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signupMutation,
    onSuccess: () => {
      methods.reset();
      router.push("/auth/employee/signin");
    }
  });

  const handleSignup = (data: signupMutationPayload) => mutate(data);

  // -------- Generate Cubes --------
  const cubes = Array.from({ length: 26 }).map((_, i) => {
    const size = Math.random() * 40 + 20;
    const left = Math.random() * 100;
    const duration = Math.random() * 20 + 14;
    const delay = Math.random() * -20;
    const opacity = Math.random() * 0.18 + 0.05;

    return (
      <div
        key={i}
        className="cube"
        style={{
          width: size,
          height: size,
          left: `${left}%`,
          "--size": `${size}px`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`
        } as React.CSSProperties}
      >
        {["front","back","right","left","top","bottom"].map(face => (
          <div
            key={face}
            className={`face ${face}`}
            style={{ background: `rgba(29,42,51,${opacity})` }}
          />
        ))}
      </div>
    );
  });

  return (
    <><RostrHeader></RostrHeader>
    <StyledSignupPage
      sx={{
        background: `
          linear-gradient(
            135deg,
            ${alpha("#1D2A33", 0.08)},
            ${alpha("#5A7A8C", 0.08)}
          ),
          #F7FAFC
        `
      }}
    >
      {/* 3D Background */}
      <FloatingCubes>{cubes}</FloatingCubes>

      {/* Logo */}
      {/* <NewLogo
        sx={{
          position: "fixed",
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
          zIndex: 1
        }} /> */}

      {/* Content */}
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ height: 1, position: "relative", zIndex: 1 }}
      >
        {/* <Typography variant="h5" fontWeight={600} mb={1}>
      Create your account
    </Typography> */}



        <Card
          elevation={0}
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
            borderRadius: 3,
            backgroundColor: "#FFFFFF",
            border: "1px solid rgba(0,0,0,0.04)",
            boxShadow: `
              0px 2px 6px rgba(0,0,0,0.04),
              0px 12px 24px rgba(0,0,0,0.08)
            `
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "#1D2A33", mb: 3, fontWeight: 600, textAlign: "center", letterSpacing: 0.3 }}
          >
            Create your account
          </Typography>
          <Box component="form" onSubmit={methods.handleSubmit(handleSignup)}>
            <FormProvider {...methods}>
              <Stack spacing={3}>
                <CustomInput
                  fullWidth
                  name="name"
                  label="Full Name"
                  placeholder="Enter your full name"
                  size="small" />

                <CustomInput
                  fullWidth
                  name="email"
                  label="Email Address"
                  placeholder="Enter your email"
                  size="small" />

                <CustomInput
                  fullWidth
                  name="company"
                  label="Company Name"
                  placeholder="Enter company name"
                  size="small" />



                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isPending}
                >
                  Sign Up
                </LoadingButton>
                <Typography variant="body2" mb={3} style={{ textAlign: 'center' }}>
                  Already have an account?{" "}
                  <Link href="/auth/employee/signin">Sign in</Link>
                </Typography>
              </Stack>
            </FormProvider>
          </Box>
        </Card>
      </Stack>
    </StyledSignupPage>
    <RostrFooter></RostrFooter>
    </>
  );
}
