import React, { useState } from "react";
import { getVans, updateVan } from "../../utils";
import { Link, defer, useLoaderData, useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import VanForm from "../../components/VanForm";

export async function loader(params) {
  return defer({ vanPromise: await getVans(params.id) });
}

function EditVan() {
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const {
    vanPromise: { data: van },
  } = useLoaderData();
  const initialValues = { ...van };

  const getDirty = (original, updated) => {
    const dirty = {};

    for (let key in original) {
      if (original.hasOwnProperty(key) && original[key] !== updated[key]) {
        dirty[key] = updated[key];
      }
    }

    return dirty;
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const dirty = getDirty(van, values);
    if (dirty) {
      try {
        const vanData = new FormData();
        Object.keys(dirty).forEach((key) => {
          vanData.append(key, dirty[key]);
        });
        vanData.append("_method", "patch");
        await updateVan(van.id, vanData);
        navigate("..", { relative: "route" });
      } catch (error) {
        setFormError(error.response.data.error);
      } finally {
        setSubmitting(false);
      }
    } else {
      navigate("..", { relative: "route" });
    }
  };

  return (
    <section className="wrapper">
      <Link
        to=".."
        relative="route"
        className="flex items-center gap-x-2 text-lg"
      >
        <MdKeyboardBackspace /> Back to all vans
      </Link>
      <div className="wrapper relative flex min-h-screen flex-col justify-center overflow-hidden">
        <VanForm
          initialValues={initialValues}
          handleSubmit={handleSubmit}
          formError={formError}
          title="Update Van"
          buttonText="Update Van"
        />
      </div>
    </section>
  );
}

export default EditVan;
