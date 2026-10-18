import { redirect } from "react-router-dom";
import * as api from "./api/mockApi";

export async function requireAuth(request) {
  const pathname = new URL(request?.url)?.pathname || "/host";
  const isLoggedIn = !!localStorage.getItem("userToken");

  if (!isLoggedIn) {
    throw redirect(
      `/login?message=${encodeURIComponent(
        "You must log in first."
      )}&redirectTo=${encodeURIComponent(pathname)}`
    );
  }
}

export async function loginUser(email, password) {
  return api.login(email, password);
}

export async function registerUser(userData) {
  return api.register(userData);
}

export async function logoutUser() {
  return api.logout();
}

export async function getHost() {
  return api.getHost();
}

export async function getHostVan(id) {
  return api.getHostVan(id);
}

export async function getVans(id) {
  return api.getVans(id);
}

export async function registerVan(vanData) {
  return api.registerVan(vanData);
}

export async function updateVan(id, vanData) {
  return api.updateVan(id, vanData);
}

export async function deleteVan(id) {
  return api.deleteVan(id);
}
