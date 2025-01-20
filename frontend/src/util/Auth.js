import { redirect } from "react-router-dom";

export function saveAuthToken(token) {
  localStorage.setItem("token", token);
}

export function getAuthToken() {
  const authToken = localStorage.getItem("token");
  return authToken;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth");
  }

  return null;
}
