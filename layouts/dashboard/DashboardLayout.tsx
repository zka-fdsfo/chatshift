import { useEffect, useState } from "react";

import Box from "@mui/material/Box";

import Header from "./header/header";
import Main from "./main";
import Sidebar from "./sidebar/Sidebar";
import Loader from "@/components/Loader";


// ----------------------------------------------------------------------

export default function DashboardLayout({
  children,
  isLoading = false
}: {
  children: React.ReactNode;
  isLoading?: boolean;
}) {
  const [openNav, setOpenNav] = useState(false);
  const [reload, setReload] = useState(false);

  // Trigger reload on initial load
  useEffect(() => {
    setReload(true);
  }, []);

  // useUser()

  if (isLoading || !reload) return <Loader />;

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />
      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" }
        }}
      >
        <Sidebar openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main  sx={{
  minHeight: "100vh",
  backgroundColor: "#F7FAFC",
  backgroundImage: `
    radial-gradient(circle at 30% 40%, rgba(56, 189, 248, 0.35), transparent 45%),

    repeating-radial-gradient(
      circle at center,
      rgba(29, 42, 51, 0.05) 0px,
      rgba(29, 42, 51, 0.05) 1px,
      transparent 6px,
      transparent 14px
    )
  `,
  backgroundSize: "cover",
}}
>{children}</Main>
      </Box>
    </>
  );
}
