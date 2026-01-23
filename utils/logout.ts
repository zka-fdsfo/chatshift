export function logout() {
    console.log("*************: Log Out :**************");
  
    // Clear access token cookie
    document.cookie = `${process.env.NEXT_APP_TOKEN_NAME}=; Max-Age=0; path=/`;
  
    // Clear refresh token cookie
    document.cookie = `${process.env.NEXT_REFRESH_TOKEN_NAME}=; Max-Age=0; path=/`;
  
    // Redirect
    window.location.href = "/";
  }
  