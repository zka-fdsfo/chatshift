import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import { useState } from "react";

import { clientLoginMutation, loginMutationPayload } from "@/api/functions/user.api";
import NewLogo from "@/components/logo/new-logo";
import validationText from "@/json/messages/validationText";
import { setCookieClient } from "@/lib/functions/storage.lib";
import CustomInput from "@/ui/Inputs/CustomInput";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  Typography
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import RostrHeader from "@/layout/dashboard/header/rostrheader";
import RostrFooter from "@/layout/dashboard/footer/rostrfooter";

// ---------------------- Styled Components ----------------------
const StyledLoginPage = styled(Box)`
  height: 100vh;
  position: relative;
  overflow: hidden;
  perspective: 1200px;
`;

const FloatingCubes = styled("div")`
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;

  .cube {
    position: absolute;
    transform-style: preserve-3d;
    animation: floatUp linear infinite;
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

  @keyframes floatUp {
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

// ---------------------- Validation ----------------------
const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email(validationText.error.email_format)
    .required(validationText.error.enter_email),
  password: yup.string().trim().required(validationText.error.enter_password),
});

// ---------------------- Component ----------------------
export default function ClientLoginView() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: clientLoginMutation,
    onSuccess: (data: any) => {
      console.log("----------:CLIENT SIGN IN DATA:----------",data);
      setCookieClient(process.env.NEXT_APP_TOKEN_NAME!, data.jwtToken);
      sessionStorage.setItem("user_role", data.role[0]?.name);
      localStorage.setItem("user_role", data.role[0]?.name);
      delete data.jwtToken;
      setCookieClient("client", JSON.stringify(data));
      window.location.href = "/client-roster";
    },
  });

  const handleLogin = (data: loginMutationPayload) => mutate(data);
  const handleGoHome = () => router.push("/");

  // ----------- Generate 3D Cubes -----------
  const cubes = Array.from({ length: 24 }).map((_, i) => {
    const size = Math.random() * 40 + 20;
    const left = Math.random() * 100;
    const duration = Math.random() * 18 + 12;
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
          animationDelay: `${delay}s`,
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
    <>
    <RostrHeader></RostrHeader>
    <StyledLoginPage
      sx={{
        background: `
          linear-gradient(
            135deg,
            ${alpha("#1D2A33", 0.08)},
            ${alpha("#5A7A8C", 0.08)}
          ),
          #F7FAFC
        `,
      }}
    >
      {/* Floating 3D Cubes */}
      <FloatingCubes>{cubes}</FloatingCubes>

      {/* Logo */}
      {/* <NewLogo
        sx={{
          position: "fixed",
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
          zIndex: 1,
        }} /> */}

      {/* Login Card */}
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1, zIndex: 1, position: "relative" }}>
        {/* <Typography variant="h5" mb={3} fontWeight={600}>
      Client Sign In
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
            `,
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "#1D2A33", mb: 3, fontWeight: 600, textAlign: "center", letterSpacing: 0.3 }}
          >
            Client Sign In
          </Typography>
          <Box component="form" onSubmit={methods.handleSubmit(handleLogin)}>
            <FormProvider {...methods}>
              <Stack spacing={3}>
                <CustomInput fullWidth name="email" label="Email Address" type="email" size="small" />

                <CustomInput
                  fullWidth
                  name="password"
                  label="Password"
                  size="small"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOffIcon fontSize="small" /> : <RemoveRedEyeIcon fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }} />

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
                  <Link href="/auth/forgot-password">Forgot password?</Link>
                </Stack>

                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isPending}>
                  Sign In
                </LoadingButton>

                <Button onClick={handleGoHome} variant="text">
                  Go to Home
                </Button>
              </Stack>
            </FormProvider>
          </Box>
        </Card>
      </Stack>
    </StyledLoginPage>
    <RostrFooter></RostrFooter>
    </>
  );
}
