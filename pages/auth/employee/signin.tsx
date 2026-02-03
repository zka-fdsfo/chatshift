import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

import { loginMutation, loginMutationPayload } from "@/api/functions/user.api";
import NewLogo from "@/components/logo/new-logo";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import validationText from "@/json/messages/validationText";
import { setCookieClient } from "@/lib/functions/storage.lib";
import CustomInput from "@/ui/Inputs/CustomInput";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button,Card, Checkbox, FormControlLabel,IconButton, InputAdornment,Stack, Typography } from "@mui/material";
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
  perspective: 1000px;
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
    box-sizing: border-box;
  }

  .front  { transform: rotateY(0deg) translateZ(calc(var(--size)/2)); }
  .back   { transform: rotateY(180deg) translateZ(calc(var(--size)/2)); }
  .right  { transform: rotateY(90deg) translateZ(calc(var(--size)/2)); }
  .left   { transform: rotateY(-90deg) translateZ(calc(var(--size)/2)); }
  .top    { transform: rotateX(90deg) translateZ(calc(var(--size)/2)); }
  .bottom { transform: rotateX(-90deg) translateZ(calc(var(--size)/2)); }

  @keyframes floatUp {
    0% { transform: translateY(100vh) rotateX(0deg) rotateY(0deg); opacity: 0; }
    20% { opacity: 1; }
    100% { transform: translateY(-120vh) rotateX(360deg) rotateY(360deg); opacity: 0; }
  }
`;

// ---------------------- Form Validation ----------------------
const schema = yup.object().shape({
  email: yup.string().trim().email(validationText.error.email_format).required(validationText.error.enter_email),
  password: yup.string().trim().required(validationText.error.enter_password),
});

// ---------------------- Main Component ----------------------
export default function LoginView() {
  const router = useRouter();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "" },
  });
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: loginMutation,
    onSuccess: (data: any) => {

      if (data.message === "Logged In Successfully") {
      console.log("----------:EMPLOYEE SIGN IN DATA:----------",data);
      // setCookieClient(process.env.NEXT_PUBLIC_APP_TOKEN_NAME!, data.jwtToken);
      // setCookieClient(process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME!, data.refreshToken);

      setCookieClient(process.env.NEXT_PUBLIC_APP_TOKEN_NAME!, data.jwtToken);
      setCookieClient(process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME!, data.refreshToken);
      
      
      sessionStorage.setItem("user_role", data.role[0]?.name);
      localStorage.setItem("user_role", data.role[0]?.name);
      setCookieClient("user", JSON.stringify(data));
      // delete data.jwtToken;
      if (data.role[0].name === "ROLE_ADMIN") window.location.href = "/admin-dashboard";
      else if (data.role[0].name === "ROLE_CARER") window.location.href = "/staff-roster";
      else if (data.role[0].name === "ROLE_KIOSK") window.location.href = "/kiosk_scheduler";
      else window.location.href = "/home";
      }
    },
  });

  const handleLogin = (data: loginMutationPayload) => mutate(data);
  const handleGoHome = () => router.push("/");

  // Generate multiple 3D cubes
  const totalCubes = 20;
  const cubes = Array.from({ length: totalCubes }).map((_, i) => {
    const size = Math.random() * 40 + 20; // 20px - 60px
    const left = Math.random() * 100; // 0% - 100%
    const duration = Math.random() * 20 + 10; // 10s - 30s
    const delay = Math.random() * -20; // start offset
    const opacity = Math.random() * 0.2 + 0.05;

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
        <div className="face front" style={{ background: `rgba(29,42,51,${opacity})` }} />
        <div className="face back" style={{ background: `rgba(29,42,51,${opacity})` }} />
        <div className="face right" style={{ background: `rgba(29,42,51,${opacity})` }} />
        <div className="face left" style={{ background: `rgba(29,42,51,${opacity})` }} />
        <div className="face top" style={{ background: `rgba(29,42,51,${opacity})` }} />
        <div className="face bottom" style={{ background: `rgba(29,42,51,${opacity})` }} />
      </div>
    );
  });

  return (
    <>
    <RostrHeader></RostrHeader>
    <StyledLoginPage
      sx={{
        background: `
          linear-gradient(135deg, ${alpha("#1D2A33", 0.08)}, ${alpha("#5A7A8C", 0.08)}),
          #F7FAFC
        `,
      }}
    >
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
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1, position: "relative", zIndex: 1 }}>
        <Card
          elevation={0}
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
            borderRadius: 3,
            backgroundColor: "#FFFFFF",
            boxShadow: `0px 2px 6px rgba(0,0,0,0.04), 0px 12px 24px rgba(0,0,0,0.08)`,
            border: "1px solid rgba(0,0,0,0.04)",
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "#1D2A33", mb: 3, fontWeight: 600, textAlign: "center", letterSpacing: 0.3 }}
          >
            Admin and Employee Login
          </Typography>

          <Box component="form" onSubmit={methods.handleSubmit(handleLogin)}>
            <FormProvider {...methods}>
              <Stack spacing={3}>
                <CustomInput name="email" label="Email Address" type="email" size="small" sx={{ width: "100%" }} />

                <CustomInput
                  label="Password"
                  name="password"
                  size="small"
                  sx={{ width: "100%" }}
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

                <Stack direction="row" alignItems="center" justifyContent="space-between" className="more-info">
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
                  <Link href="/auth/forgot-password">Forgot your password?</Link>
                </Stack>

                <LoadingButton fullWidth size="large" type="submit" variant="contained" color="primary" loading={isPending}>
                  Sign In
                </LoadingButton>
                <Button onClick={handleGoHome} variant="text" color="primary">
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
