import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../contexts/AuthContext";
import { loginUser } from "../utils";
import { DEMO_PASSWORD } from "../api/seedData";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(5).required(),
});

function Login() {
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [searchParams] = useSearchParams();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { email, password } = values;
      const response = await loginUser(email, password);
      const data = response.data;
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("userToken", data.token);
      setUser(data.user);
      const redirect = searchParams.get("redirectTo") || "/host";
      navigate(redirect, { replace: true });
    } catch (error) {
      setFormError(error?.response?.data?.error || "Unable to log in.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    setFormError(searchParams.get("message") || "");
  }, [searchParams]);

  return (
    <div className="wrapper flex flex-col items-center justify-center">
      <Formik
        initialValues={{ email: "host@vanlife.com", password: DEMO_PASSWORD }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          setFieldTouched,
          setFieldValue,
          isSubmitting,
          handleSubmit,
          touched,
          values,
        }) => (
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-sm">
            <h1 className="text-center text-3xl font-semibold uppercase text-amber-550">
              Sign in
            </h1>
            <p className="mt-2 text-center text-sm text-stone-500">
              Demo host: host@vanlife.com / {DEMO_PASSWORD}
            </p>
            <div className="mt-6 space-y-3">
              {formError && (
                <div className="rounded-md bg-rose-50 px-3 py-2 text-rose-700">
                  {formError}
                </div>
              )}
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
                  onChange={(e) => {
                    setFieldValue("email", e.target.value);
                    setFormError("");
                  }}
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
                  onChange={(e) => {
                    setFieldValue("password", e.target.value);
                    setFormError("");
                  }}
                  onBlur={() => setFieldTouched("password")}
                />
                {errors.password && touched.password && (
                  <div className="text-sm text-rose-600">{errors.password}</div>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="w-full rounded-lg bg-amber-550 px-4 py-2.5 font-medium tracking-wide text-white transition hover:bg-amber-600 disabled:opacity-70"
              >
                {isSubmitting ? "Please wait…" : "Login"}
              </button>
            </div>
            <p className="mt-8 text-center text-sm text-stone-600">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-amber-550 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default Login;
