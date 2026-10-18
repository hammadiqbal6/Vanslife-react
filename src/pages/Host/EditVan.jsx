import React, { useState } from "react";
import { getVans, updateVan } from "../../utils";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import VanForm from "../../components/VanForm";

export async function loader(params) {
  const response = await getVans(params.id);
  return response.data;
}

function EditVan() {
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();
  const van = useLoaderData();
  const initialValues = { ...van };

  const getDirty = (original, updated) => {
    const dirty = {};
    for (const key of ["name", "type", "description", "price", "image"]) {
      if (original[key] !== updated[key]) {
        dirty[key] = updated[key];
      }
    }
    return dirty;
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const dirty = getDirty(van, values);
    if (Object.keys(dirty).length === 0) {
      navigate("..", { relative: "path" });
      setSubmitting(false);
      return;
    }
    try {
      const vanData = new FormData();
      Object.keys(dirty).forEach((key) => {
        if (dirty[key] != null) {
          vanData.append(key, dirty[key]);
        }
      });
      await updateVan(van.id, vanData);
      navigate("..", { relative: "path" });
    } catch (error) {
      setFormError(error?.response?.data?.error || "Could not update van.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="wrapper mx-auto max-w-3xl">
      <Link
        to=".."
        relative="path"
        className="mb-4 inline-flex items-center gap-x-2 text-stone-700 hover:text-stone-900"
      >
        <MdKeyboardBackspace /> Back to dashboard
      </Link>
      <VanForm
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        formError={formError}
        title="Update Van"
        buttonText="Update Van"
        requireImage={false}
      />
    </section>
  );
}

export default EditVan;
