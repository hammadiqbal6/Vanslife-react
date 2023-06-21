import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Vans, { loader as VansLoader } from "./pages/Vans/Vans";
import VanDetails, {
  Loader as VanDetailsLoader,
} from "./pages/Vans/VanDetails";
import AuthProvider from "./contexts/AuthContext";
import { requireAuth } from "./utils";
import HostVans, { loader as HostVansLoader } from "./pages/Host/HostVans";
import Error from "./components/Error";
import HostVanDetail, {
  loader as HostValDetailLoader,
} from "./pages/Host/HostVanDetail";
import HostVanInfo from "./pages/Host/HostVanInfo";
import HostVanPrice from "./pages/Host/HostVanPrice";
import HostVanPhotos from "./pages/Host/HostVanPhotos";
import AddVan from "./pages/Host/AddVan";
import EditVan, { loader as editVanLoader } from "./pages/Host/EditVan";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import Cart from "./pages/Cart";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="about" element={<About />} />
      <Route path="vans">
        <Route
          index
          element={<Vans />}
          loader={VansLoader}
          errorElement={<Error />}
        />
        <Route
          path=":id"
          element={<VanDetails />}
          loader={VanDetailsLoader}
          errorElement={<Error />}
        />
      </Route>
      <Route path="cart" element={<Cart />} />
      <Route path="host">
        <Route
          index
          loader={async ({ request }) => {
            await requireAuth(request);
            return HostVansLoader();
          }}
          errorElement={<Error />}
          element={<HostVans />}
        />
        <Route
          path="add-van"
          loader={async ({ request }) => {
            await requireAuth(request);
            return null;
          }}
          errorElement={<Error />}
          element={<AddVan />}
        />
        <Route
          path="edit-van/:id"
          loader={async ({ request, params }) => {
            await requireAuth(request);
            return editVanLoader(params);
          }}
          errorElement={<Error />}
          element={<EditVan />}
        />
        <Route
          path=":id"
          element={<HostVanDetail />}
          loader={async ({ request, params }) => {
            await requireAuth(request);
            return HostValDetailLoader(params);
          }}
          errorElement={<Error />}
        >
          <Route
            index
            element={<HostVanInfo />}
            loader={({ request }) => {
              requireAuth(request);
              return null;
            }}
            errorElement={<Error />}
          />
          <Route
            path="pricing"
            element={<HostVanPrice />}
            loader={({ request }) => {
              requireAuth(request);
              return null;
            }}
            errorElement={<Error />}
          />
          <Route
            path="photos"
            element={<HostVanPhotos />}
            loader={({ request }) => {
              requireAuth(request);
              return null;
            }}
            errorElement={<Error />}
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
