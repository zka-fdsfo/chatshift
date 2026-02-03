// import { Box, CircularProgress, Typography } from '@mui/material'
// import React from 'react'

// const Loader = () => {
//     return (
//         <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, height: "70vh"}}>
//             <CircularProgress />
//             <Typography sx={{ color: "black", fontSize: 14 }}>Fetching data..</Typography>
//         </Box>
//     )
// }

// export default Loader

import { Box, Typography } from '@mui/material'
import React from 'react'

export default function Loader() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        height: '70vh',
      }}
    >
      <Box
        component="img"
        src="/assets/logo/ROSTR.png"
        alt="Loading"
        sx={{
          width: 120,
          height: 'auto',
          animation: 'pulse 1.5s ease-in-out infinite',
        }}
      />

      <Typography sx={{ color: 'black', fontSize: 14 }}>
        Please wait...
      </Typography>
    </Box>
  )
}
