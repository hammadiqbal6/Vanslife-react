import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

const vanTypes = ["simple", "luxury", "rugged"];

function VanForm({
  formError,
  initialValues,
  handleSubmit,
  title,
  buttonText,
  requireImage = true,
}) {
  const [previewUrl, setPreviewUrl] = useState();

  const validationSchema = Yup.object().shape({
    image: requireImage
      ? Yup.mixed().required().label("Van Image")
      : Yup.mixed().nullable().label("Van Image"),
    name: Yup.string().required().label("Name"),
    type: Yup.string().required(),
    description: Yup.string().required(),
    price: Yup.number().positive().required().label("Price per day"),
  });

  useEffect(() => {
    setPreviewUrl(initialValues.image);
  }, [initialValues]);

  const onKeyDown = (event, submit) => {
    if (event.which === 13 && event.target.tagName !== "TEXTAREA") {
      event.preventDefault();
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
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({
        errors,
        setFieldTouched,
        setFieldValue,
        isSubmitting,
        touched,
        values,
        handleSubmit: submitForm,
      }) => (
        <div className="mx-auto w-full max-w-xl rounded-xl bg-white p-6 shadow-sm">
          <h1 className="text-center text-2xl font-bold uppercase tracking-wide text-amber-550 md:text-3xl">
            {title}
          </h1>
          <div className="mt-6 space-y-3">
            {formError && (
              <div className="rounded-md bg-rose-50 px-3 py-2 text-rose-700">
                {formError}
              </div>
            )}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-semibold text-stone-800"
              >
                Van Image
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                className="main-input"
                name="image"
                onChange={(e) => handleFileChange(e, setFieldValue)}
                onBlur={() => setFieldTouched("image")}
              />
            </div>
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Van preview"
                className="my-2 h-24 w-24 rounded-lg object-cover"
              />
            )}
            {errors.image && touched.image && (
              <div className="text-sm text-rose-600">{errors.image}</div>
            )}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-stone-800"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                className="main-input"
                name="name"
                value={values.name}
                onChange={(e) => setFieldValue("name", e.target.value)}
                onKeyDown={(e) => onKeyDown(e, submitForm)}
                onBlur={() => setFieldTouched("name")}
              />
              {errors.name && touched.name && (
                <div className="text-sm text-rose-600">{errors.name}</div>
              )}
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-semibold text-stone-800"
              >
                Price per day
              </label>
              <input
                id="price"
                type="number"
                min="1"
                className="main-input"
                name="price"
                value={values.price}
                onChange={(e) => setFieldValue("price", e.target.value)}
                onKeyDown={(e) => onKeyDown(e, submitForm)}
                onBlur={() => setFieldTouched("price")}
              />
              {errors.price && touched.price && (
                <div className="text-sm text-rose-600">{errors.price}</div>
              )}
            </div>
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-semibold text-stone-800"
              >
                Type
              </label>
              <select
                id="type"
                name="type"
                value={values.type}
                className="main-input"
                onChange={(e) => setFieldValue("type", e.target.value)}
                onBlur={() => setFieldTouched("type")}
              >
                <option value="" hidden>
                  Select an option
                </option>
                {vanTypes.map((type) => (
                  <option value={type} key={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.type && touched.type && (
                <div className="text-sm text-rose-600">{errors.type}</div>
              )}
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-stone-800"
              >
                Description
              </label>
              <textarea
                id="description"
                className="main-input min-h-[120px]"
                name="description"
                value={values.description}
                onChange={(e) => setFieldValue("description", e.target.value)}
                onBlur={() => setFieldTouched("description")}
              />
              {errors.description && touched.description && (
                <div className="text-sm text-rose-600">{errors.description}</div>
              )}
            </div>
            <button
              type="submit"
              onClick={submitForm}
              disabled={isSubmitting}
              className="mt-2 w-full rounded-lg bg-amber-550 px-4 py-2.5 font-medium tracking-wide text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Please wait…" : buttonText}
            </button>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default VanForm;
