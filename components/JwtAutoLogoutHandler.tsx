import { useJwtAutoLogout } from "@/hooks/useJwtAutoLogout";

export default function JwtAutoLogoutHandler() {
  useJwtAutoLogout();
  return null; // renders nothing
}
