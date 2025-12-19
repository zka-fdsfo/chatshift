/* eslint-disable react/require-default-props */
import Box, { BoxProps } from "@mui/material/Box";
import Link from "next/link";
import Image from "next/image";
import { forwardRef } from "react";

interface NewLogoProps extends BoxProps {
  disabledLink?: boolean;
}

const NewLogo = forwardRef<HTMLAnchorElement, NewLogoProps>(
  ({ disabledLink, sx, ...other }, ref) => {
    const logo = (
      <Box
        ref={ref}
        component="a"
        sx={{
          width: 120,
          height: 40,
          display: "inline-flex",
          alignItems: "center",
          cursor: "pointer",
          ...sx
        }}
        {...other}
      >
        <Image
          src="/assets/logo/ROSTR.png"
          alt="ROSTR Logo"
          width={120}
          height={40}
          priority
          style={{ objectFit: "contain" }}
        />
      </Box>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link href="/" passHref legacyBehavior>
        {logo}
      </Link>
    );
  }
);

// ✅ ADD THIS LINE
NewLogo.displayName = "NewLogo";

export default NewLogo;
