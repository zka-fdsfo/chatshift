import { getCookie } from "@/lib/functions/storage.lib";
import axiosInstance from "../axiosInstance"
import { endpoints } from "../endpoints";
import axios from "axios";

export const getAdminDashboard = async(date: string) => {
    const res = await axiosInstance.get(endpoints.admin.admin_dashboard(date)); 
    return res.data;
}


// export const updateToken = async () => {
//      const refreshToken = getCookie(process.env.NEXT_REFRESH_TOKEN_NAME!) as string | undefined;
//     if (!refreshToken) throw new Error('No refresh token found');
  
//     const res = await axiosInstance.post(
//       endpoints.auth.update_token,
//       {},
//       {  
//         headers: {
//           Authorization: `Bearer ${refreshToken}`,
//         },
//       }
//     );
  
//     return res.data;
//   };

export const updateToken = async () => {
    const refreshToken = getCookie(
      process.env.NEXT_REFRESH_TOKEN_NAME!
    ) as string | undefined;
  
    if (!refreshToken) throw new Error("No refresh token found");
  
    const res = await axios.post(
      "https://roastermanagement.jrhosting.in/teamtest/api/auth/refreshToken",
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
  
    return res.data;
  };
  