import { redirect } from "react-router-dom";

export function getAuthToken() {
  const token = localStorage.getItem("token");
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
