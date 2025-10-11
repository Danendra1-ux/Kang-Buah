import { jwtDecode } from "jwt-decode";

export function decodeJwt(token) {
  try {
    return jwtDecode(token);
  } catch (e) {
    console.error("Invalid token:", e);
    return null;
  }
}
