import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { useAuth } from "../../contexts/AuthContext";
import { registerVan } from "../../utils";
import VanForm from "../../components/VanForm";

function AddVan() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formError, setFormError] = useState("");

  const initialValues = {
    image: null,
    name: "",
    type: "",
    description: "",
    price: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (values[key] != null) {
        formData.append(key, values[key]);
      }
    });
    formData.append("user_id", user.id);
    try {
      await registerVan(formData);
      navigate("..", { relative: "path" });
    } catch (error) {
      setFormError(error?.response?.data?.error || "Could not add van.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="wrapper mx-auto max-w-3xl">
      <Link
        to=".."
        relative="path"
        className="mb-4 inline-flex items-center gap-x-2 text-stone-700 hover:text-stone-900"
      >
        <MdKeyboardBackspace /> Back to dashboard
      </Link>
      <VanForm
        initialValues={initialValues}
        formError={formError}
        handleSubmit={handleSubmit}
        title="Add Van"
        buttonText="Add Van"
        requireImage
      />
    </div>
  );
}

export default AddVan;
