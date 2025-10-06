import jwtDecode from "jwt-decode";

export function decodeJwt(token) {
  if (!token || typeof token !== "string") return null;
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}
