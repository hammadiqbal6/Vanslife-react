import { SEED_VERSION, seedUsers, seedVans } from "./seedData";

const USERS_KEY = "vanlife_users";
const VANS_KEY = "vanlife_vans";
const VERSION_KEY = "vanlife_seed_version";
const TOKEN_PREFIX = "vanlife_token_";

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function ensureSeeded() {
  const currentVersion = localStorage.getItem(VERSION_KEY);
  if (currentVersion !== String(SEED_VERSION)) {
    write(USERS_KEY, seedUsers);
    write(VANS_KEY, seedVans);
    localStorage.setItem(VERSION_KEY, String(SEED_VERSION));
    return;
  }
  if (!localStorage.getItem(USERS_KEY)) {
    write(USERS_KEY, seedUsers);
  }
  if (!localStorage.getItem(VANS_KEY)) {
    write(VANS_KEY, seedVans);
  }
}

export function getUsers() {
  ensureSeeded();
  return read(USERS_KEY, seedUsers);
}

export function saveUsers(users) {
  write(USERS_KEY, users);
}

export function getVansList() {
  ensureSeeded();
  return read(VANS_KEY, seedVans);
}

export function saveVans(vans) {
  write(VANS_KEY, vans);
}

export function nextId(items) {
  return items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}

export function createToken(userId) {
  return `${TOKEN_PREFIX}${userId}_${Date.now()}`;
}

export function userIdFromToken(token) {
  if (!token || !token.startsWith(TOKEN_PREFIX)) return null;
  const parts = token.slice(TOKEN_PREFIX.length).split("_");
  const id = Number(parts[0]);
  return Number.isFinite(id) ? id : null;
}

export function publicUser(user) {
  if (!user) return null;
  const { password, ...rest } = user;
  return rest;
}

export function fileToDataUrl(file) {
  if (!file || typeof file === "string") {
    return Promise.resolve(file || "");
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function delay(ms = 350) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function httpError(status, message) {
  const error = new Error(message);
  error.response = {
    status,
    data: { error: message },
  };
  return error;
}
