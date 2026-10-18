import {
  getVans,
  login,
  logout,
  registerVan,
  deleteVan,
  getHost,
} from "./mockApi";
import { DEMO_PASSWORD } from "./seedData";

beforeEach(() => {
  localStorage.clear();
});

test("seeds vans and returns the fleet", async () => {
  const response = await getVans();
  expect(response.data.length).toBeGreaterThanOrEqual(6);
  expect(response.data[0]).toHaveProperty("name");
  expect(response.data[0]).toHaveProperty("price");
});

test("logs in demo host and lists host vans", async () => {
  const auth = await login("host@vanlife.com", DEMO_PASSWORD);
  expect(auth.data.token).toBeTruthy();
  localStorage.setItem("userToken", auth.data.token);
  localStorage.setItem("user", JSON.stringify(auth.data.user));

  const host = await getHost();
  expect(host.data.email).toBe("host@vanlife.com");
  expect(host.data.vans.length).toBeGreaterThan(0);

  await logout();
});

test("rejects invalid credentials", async () => {
  await expect(login("host@vanlife.com", "wrong")).rejects.toMatchObject({
    response: { status: 401 },
  });
});

test("creates and deletes a van for the authenticated host", async () => {
  const auth = await login("host@vanlife.com", DEMO_PASSWORD);
  localStorage.setItem("userToken", auth.data.token);

  const form = new FormData();
  form.append("name", "Test Van");
  form.append("type", "simple");
  form.append("description", "A temporary test van");
  form.append("price", "55");
  form.append(
    "image",
    "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=400&q=60"
  );

  const created = await registerVan(form);
  expect(created.data.status).toBe("Success");
  const vanId = created.data.van.id;

  await deleteVan(vanId);
  const host = await getHost();
  expect(host.data.vans.find((van) => van.id === vanId)).toBeUndefined();
});
