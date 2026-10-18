import { Formik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { registerUser } from "../utils";
import { useAuth } from "../contexts/AuthContext";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required().label("First Name"),
  last_name: Yup.string().required().label("Last Name"),
  email: Yup.string().email().required(),
  password: Yup.string().min(5).required(),
  profileImage: Yup.mixed().nullable().label("Profile Image"),
});

function Register() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [formError, setFormError] = useState("");
  const [preview, setPreview] = useState(null);

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (values[key] != null) {
        formData.append(key, values[key]);
      }
    });
    try {
      const response = await registerUser(formData);
      const data = response.data;
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("userToken", data.token);
      setUser(data.user);
      navigate("/host", { replace: true });
    } catch (error) {
      setFormError(error?.response?.data?.error || "Unable to register.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="wrapper flex flex-col items-center justify-center">
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          profileImage: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          setFieldTouched,
          setFieldValue,
          isSubmitting,
          touched,
          values,
          handleSubmit,
        }) => (
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-sm">
            <h1 className="text-center text-3xl font-semibold uppercase text-amber-550">
              Register
            </h1>
            <div className="mt-6 space-y-3">
              {formError && (
                <div className="rounded-md bg-rose-50 px-3 py-2 text-rose-700">
                  {formError}
                </div>
              )}
              <div>
                <label
                  htmlFor="profileImage"
                  className="block text-sm font-semibold text-stone-800"
                >
                  Profile Image (optional)
                </label>
                <input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  className="main-input"
                  name="profileImage"
                  onChange={(e) => {
                    const file = e.target.files[0] || null;
                    setFieldValue("profileImage", file);
                    setPreview(file ? URL.createObjectURL(file) : null);
                  }}
                  onBlur={() => setFieldTouched("profileImage")}
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Profile preview"
                    className="mt-2 h-16 w-16 rounded-full object-cover"
                  />
                )}
              </div>
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-sm font-semibold text-stone-800"
                >
                  First Name
                </label>
                <input
                  id="first_name"
                  type="text"
                  className="main-input"
                  name="first_name"
                  value={values.first_name}
                  onChange={(e) => setFieldValue("first_name", e.target.value)}
                  onBlur={() => setFieldTouched("first_name")}
                />
                {errors.first_name && touched.first_name && (
                  <div className="text-sm text-rose-600">{errors.first_name}</div>
                )}
              </div>
              <div>
                <label
                  htmlFor="last_name"
                  className="block text-sm font-semibold text-stone-800"
                >
                  Last Name
                </label>
                <input
                  id="last_name"
                  type="text"
                  className="main-input"
                  name="last_name"
                  value={values.last_name}
                  onChange={(e) => setFieldValue("last_name", e.target.value)}
                  onBlur={() => setFieldTouched("last_name")}
                />
                {errors.last_name && touched.last_name && (
                  <div className="text-sm text-rose-600">{errors.last_name}</div>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-stone-800"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="main-input"
                  name="email"
                  value={values.email}
                  onChange={(e) => setFieldValue("email", e.target.value)}
                  onBlur={() => setFieldTouched("email")}
                />
                {errors.email && touched.email && (
                  <div className="text-sm text-rose-600">{errors.email}</div>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-stone-800"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="main-input"
                  name="password"
                  value={values.password}
                  onChange={(e) => setFieldValue("password", e.target.value)}
                  onBlur={() => setFieldTouched("password")}
                />
                {errors.password && touched.password && (
                  <div className="text-sm text-rose-600">{errors.password}</div>
                )}
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full rounded-lg bg-amber-550 px-4 py-2.5 font-medium tracking-wide text-white transition hover:bg-amber-600 disabled:opacity-70"
              >
                {isSubmitting ? "Please wait…" : "Register"}
              </button>
            </div>
            <p className="mt-8 text-center text-sm text-stone-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-amber-550 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default Register;
