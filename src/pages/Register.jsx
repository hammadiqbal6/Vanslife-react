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
  password: Yup.string().required(),
  profileImage: Yup.mixed().required().label("Profile Image"),
});

function Register() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [formError, setFormError] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      console.log(key);
      formData.append(key, values[key]);
    });
    try {
      const response = await registerUser(formData);
      const data = response.data;
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("userToken", data.token);
      setUser(data.user);
      navigate("/host", { replace: true });
    } catch (error) {
      setFormError(error.response.data.error);
    } finally {
      setSubmitting(false);
    }
  };

  const onKeyDown = (event, submit) => {
    if (event.which === 13) {
      submit();
    }
  };

  return (
    <div className="wrapper relative flex min-h-screen flex-col justify-center overflow-hidden">
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
          handleSubmit,
        }) => (
          <>
            <div className="m-auto w-full rounded-md bg-white p-6 shadow-xl lg:max-w-xl">
              <h1 className="text-center text-3xl font-semibold uppercase text-purple-700">
                Register
              </h1>
              <div className="mt-6">
                {formError && <div className="text-red-600">{formError}</div>}
                <div className="mb-2">
                  <label
                    htmlFor="profileImage"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Profile Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="main-input"
                    name="profileImage"
                    onChange={(e) =>
                      setFieldValue("profileImage", e.target.files[0])
                    }
                    onBlur={() => setFieldTouched("profileImage")}
                  />
                </div>
                {errors.profileImage && touched.profileImage && (
                  <div className="text-red-600">{errors.profileImage}</div>
                )}
                <div className="mb-2">
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    className="main-input"
                    name="first_name"
                    onChange={(e) =>
                      setFieldValue("first_name", e.target.value)
                    }
                    onKeyDown={(e) => {
                      onKeyDown(e, handleSubmit);
                    }}
                    onBlur={() => setFieldTouched("first_name")}
                  />
                </div>
                {errors.first_name && touched.first_name && (
                  <div className="text-red-600">{errors.first_name}</div>
                )}
                <div className="mb-2">
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="main-input"
                    name="last_name"
                    onChange={(e) => setFieldValue("last_name", e.target.value)}
                    onKeyDown={(e) => {
                      onKeyDown(e, handleSubmit);
                    }}
                    onBlur={() => setFieldTouched("last_name")}
                  />
                </div>
                {errors.last_name && touched.last_name && (
                  <div className="text-red-600">{errors.last_name}</div>
                )}
                <div className="mb-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="main-input"
                    name="email"
                    onChange={(e) => setFieldValue("email", e.target.value)}
                    onKeyDown={(e) => {
                      onKeyDown(e, handleSubmit);
                    }}
                    onBlur={() => setFieldTouched("email")}
                  />
                </div>
                {errors.email && touched.email && (
                  <div className="text-red-600">{errors.email}</div>
                )}
                <div className="mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="main-input"
                    name="password"
                    onChange={(e) => setFieldValue("password", e.target.value)}
                    onKeyDown={(e) => {
                      onKeyDown(e, handleSubmit);
                    }}
                    onBlur={() => setFieldTouched("password")}
                  />
                </div>
                {errors.password && touched.password && (
                  <div className="text-red-600">{errors.password}</div>
                )}
                <div className="mt-6">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full transform rounded-md bg-purple-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-purple-600 focus:bg-purple-600 focus:outline-none"
                  >
                    {isSubmitting ? "Please wait..." : "Register"}
                  </button>
                </div>
              </div>
              <div className="relative mt-6 flex w-full items-center justify-center border border-t">
                <div className="absolute bg-white px-5">Or</div>
              </div>

              <p className="mt-8 text-center text-xs font-light text-gray-700">
                {" "}
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-purple-600 hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
}

export default Register;
