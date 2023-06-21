import axios from "axios";
import { redirect } from "react-router-dom";

const baseURL = "http://127.0.0.1:8000/api";
const Api = axios.create({
  baseURL: baseURL,
});

Api.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("userToken")) {
      config.headers["Authorization"] = `Bearer ${localStorage.getItem(
        "userToken"
      )}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response.status === 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("userToken");
    }
    throw error;
  }
);

export async function requireAuth(request) {
  const pathname = new URL(request?.url)?.pathname || "/host";
  const isLoggedIn = !!localStorage.getItem("userToken");

  if (!isLoggedIn) {
    throw redirect(
      `/login?message=You must log in first.&redirectTo=${pathname}`
    );
  }
}

export async function loginUser(email, password) {
  return await Api.post("/login", { email, password });
}

export async function registerUser(userData) {
  return await Api.post("/register", userData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function logoutUser() {
  return await Api.post("/logout");
}

export async function getHost(id) {
  return await Api.get(`/user/${id}`);
}

export async function getHostVan(id) {
  return await Api.get(`/user/van/${id}`);
}

export async function getVans(id) {
  const endpoint = id ? `/vans/${id}` : `/vans`;
  return await Api.get(endpoint);
}

export async function registerVan(vanData) {
  return await Api.post("/vans", vanData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function updateVan(id, vanData) {
  return await Api.post(`/vans/${id}`, vanData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function deleteVan(id) {
  return await Api.delete(`vans/${id}`);
}
