import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const storedExpiredDuration = localStorage.getItem('expiration');
  const expirationDuration = new Date(storedExpiredDuration);
  const timeLeft = expirationDuration.getTime();
  const now = new Date().getTime();
  const tokenDuration = timeLeft - now;
  return tokenDuration;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const expiredToken = getTokenDuration();

  if (expiredToken < 0) {
    return 'EXPIRED';
  }

  return token;
}

export function loaderToken() {
  const getToken = getAuthToken();
  return getToken;
}

export function loaderCheckAuth() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/");
  }

  return null;
}
