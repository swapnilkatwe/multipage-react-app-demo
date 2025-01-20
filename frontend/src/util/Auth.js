import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const currentDate = new Date();
  const duration = expirationDate.getTime() - currentDate.getTime();
  return duration;
}

export function saveAuthToken(token) {
  localStorage.setItem("token", token);
}

export function getAuthToken() {
  const authToken = localStorage.getItem("token");
  
  if(!authToken) {
    return null;
  }
  const tokenDuration = getTokenDuration();
  
  if(tokenDuration < 0) {
    return "expired";
  }
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

