import {
  createToken,
  delay,
  ensureSeeded,
  fileToDataUrl,
  getUsers,
  getVansList,
  httpError,
  nextId,
  publicUser,
  saveUsers,
  saveVans,
  userIdFromToken,
} from "./mockStore";

function authUserId() {
  return userIdFromToken(localStorage.getItem("userToken"));
}

function requireAuth() {
  const userId = authUserId();
  if (!userId) {
    throw httpError(401, "Unauthenticated");
  }
  const user = getUsers().find((u) => u.id === userId);
  if (!user) {
    throw httpError(401, "Unauthenticated");
  }
  return user;
}

function formValue(data, key) {
  if (data instanceof FormData) {
    return data.get(key);
  }
  return data?.[key];
}

/** Mimic axios response shape used by the app */
function ok(data) {
  return { data, status: 200 };
}

export async function login(email, password) {
  await delay();
  ensureSeeded();
  const user = getUsers().find(
    (u) => u.email.toLowerCase() === String(email).toLowerCase()
  );
  if (!user || user.password !== password) {
    throw httpError(401, "Invalid credentials");
  }
  const token = createToken(user.id);
  return ok({ user: publicUser(user), token });
}

export async function register(userData) {
  await delay(500);
  ensureSeeded();
  const email = formValue(userData, "email");
  const first_name = formValue(userData, "first_name");
  const last_name = formValue(userData, "last_name");
  const password = formValue(userData, "password");
  const profileImage = formValue(userData, "profileImage");

  if (!email || !password || !first_name || !last_name) {
    throw httpError(400, "Missing required fields");
  }

  const users = getUsers();
  if (users.some((u) => u.email.toLowerCase() === String(email).toLowerCase())) {
    throw httpError(400, "Email already registered");
  }

  const picture_url = profileImage
    ? await fileToDataUrl(profileImage)
    : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80";

  const user = {
    id: nextId(users),
    first_name,
    last_name,
    email,
    password,
    picture_url,
  };
  saveUsers([...users, user]);
  const token = createToken(user.id);
  return ok({ user: publicUser(user), token });
}

export async function logout() {
  await delay(150);
  requireAuth();
  return ok({ message: "Logged out" });
}

export async function getHost() {
  await delay();
  const user = requireAuth();
  const vans = getVansList().filter((van) => van.user_id === user.id);
  return ok({
    ...publicUser(user),
    vans,
  });
}

export async function getHostVan(id) {
  await delay();
  const user = requireAuth();
  const van = getVansList().find((v) => String(v.id) === String(id));
  if (!van) {
    throw httpError(404, "Van not found");
  }
  if (van.user_id !== user.id) {
    throw httpError(403, "You do not own this van");
  }
  return ok(van);
}

export async function getVans(id) {
  await delay();
  const vans = getVansList();
  if (id) {
    const van = vans.find((v) => String(v.id) === String(id));
    if (!van) {
      throw httpError(404, "Van not found");
    }
    return ok(van);
  }
  return ok(vans);
}

export async function registerVan(vanData) {
  await delay(500);
  const user = requireAuth();
  const vans = getVansList();
  const imageFile = formValue(vanData, "image");
  const image = await fileToDataUrl(imageFile);

  const van = {
    id: nextId(vans),
    user_id: user.id,
    name: formValue(vanData, "name"),
    type: formValue(vanData, "type"),
    description: formValue(vanData, "description"),
    price: Number(formValue(vanData, "price")),
    image:
      image ||
      "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80",
  };

  saveVans([...vans, van]);
  return ok({ status: "Success", van });
}

export async function updateVan(id, vanData) {
  await delay(500);
  const user = requireAuth();
  const vans = getVansList();
  const index = vans.findIndex((v) => String(v.id) === String(id));
  if (index === -1) {
    throw httpError(404, "Van not found");
  }
  if (vans[index].user_id !== user.id) {
    throw httpError(403, "You do not own this van");
  }

  const updates = {};
  ["type", "name", "price", "description"].forEach((key) => {
    const value = formValue(vanData, key);
    if (value !== null && value !== undefined && value !== "") {
      updates[key] = key === "price" ? Number(value) : value;
    }
  });

  const imageFile = formValue(vanData, "image");
  if (imageFile && typeof imageFile !== "string") {
    updates.image = await fileToDataUrl(imageFile);
  }

  const updated = { ...vans[index], ...updates };
  const next = [...vans];
  next[index] = updated;
  saveVans(next);
  return ok({ status: "Success", van: updated });
}

export async function deleteVan(id) {
  await delay(250);
  const user = requireAuth();
  const vans = getVansList();
  const van = vans.find((v) => String(v.id) === String(id));
  if (!van) {
    throw httpError(404, "Van not found");
  }
  if (van.user_id !== user.id) {
    throw httpError(403, "You do not own this van");
  }
  saveVans(vans.filter((v) => String(v.id) !== String(id)));
  return ok({ status: "Success" });
}
