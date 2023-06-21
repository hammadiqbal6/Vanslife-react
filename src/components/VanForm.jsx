import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

const vanTypes = ["simple", "luxury", "rugged"];

const validationSchema = Yup.object().shape({
  image: Yup.mixed().required().label("Van Image"),
  name: Yup.string().required().label("Name"),
  type: Yup.string().required(),
  description: Yup.string().required(),
  price: Yup.number().required().label("Price per day"),
});

function VanForm({
  formError,
  initialValues,
  handleSubmit,
  title,
  buttonText,
}) {
  const [previewUrl, setPreviewUrl] = useState();

  useEffect(() => {
    setPreviewUrl(initialValues.image);
  }, [initialValues]);

  const onKeyDown = (event, submit) => {
    if (event.which === 13) {
      submit();
    }
  };

  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setFieldValue("image", file);
      setPreviewUrl(URL.createObjectURL(file));
    } else if (initialValues.image) {
      setFieldValue("image", initialValues.image);
      setPreviewUrl(initialValues.image);
    } else {
      setFieldValue("image", null);
      setPreviewUrl(null);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
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
        <>
          <div className="m-auto w-full rounded-md bg-white p-6 shadow-xl lg:max-w-xl">
            <h1 className="text-center text-3xl font-semibold uppercase text-purple-700">
              {title}
            </h1>
            <div className="mt-6">
              {formError && <div className="text-red-600">{formError}</div>}
              <div className="mb-2">
                <label
                  htmlFor="image"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Van Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="main-input"
                  name="image"
                  onChange={(e) => handleFileChange(e, setFieldValue)}
                  onInput={() => setFieldTouched("image")}
                />
              </div>
              {values["image"] && (
                <img src={previewUrl} alt="" className="my-2 h-20 w-20" />
              )}
              {errors.image && touched.image && (
                <div className="text-red-600">{errors.image}</div>
              )}
              <div className="mb-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="main-input"
                  name="name"
                  value={values["name"]}
                  onChange={(e) => setFieldValue("name", e.target.value)}
                  onKeyDown={(e) => {
                    onKeyDown(e, handleSubmit);
                  }}
                  onBlur={() => setFieldTouched("name")}
                />
              </div>
              {errors.name && touched.name && (
                <div className="text-red-600">{errors.name}</div>
              )}
              <div className="mb-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Price per day
                </label>
                <input
                  type="number"
                  className="main-input"
                  name="price"
                  value={values["price"]}
                  onChange={(e) => setFieldValue("price", e.target.value)}
                  onKeyDown={(e) => {
                    onKeyDown(e, handleSubmit);
                  }}
                  onBlur={() => setFieldTouched("price")}
                />
              </div>
              {errors.price && touched.price && (
                <div className="text-red-600">{errors.price}</div>
              )}
              <div className="mb-2">
                <label
                  htmlFor="type"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Type
                </label>
                <select
                  name="type"
                  value={values["type"]}
                  className="main-input"
                  onChange={(e) => setFieldValue("type", e.target.value)}
                  onBlur={() => setFieldTouched("type")}
                >
                  <option value="" hidden>
                    Select an option
                  </option>
                  {vanTypes.map((type, index) => (
                    <option value={type} key={index}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              {errors.type && touched.type && (
                <div className="text-red-600">{errors.type}</div>
              )}
              <div className="mb-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Description
                </label>
                <textarea
                  className="main-input"
                  name="description"
                  value={values["description"]}
                  onChange={(e) => setFieldValue("description", e.target.value)}
                  onKeyDown={(e) => {
                    onKeyDown(e, handleSubmit);
                  }}
                  onBlur={() => setFieldTouched("description")}
                />
              </div>
              {errors.description && touched.description && (
                <div className="text-red-600">{errors.description}</div>
              )}
              <div className="mt-6">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full transform rounded-md bg-purple-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-purple-600 focus:bg-purple-600 focus:outline-none"
                >
                  {isSubmitting ? "Please wait..." : buttonText}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </Formik>
  );
}

export default VanForm;
