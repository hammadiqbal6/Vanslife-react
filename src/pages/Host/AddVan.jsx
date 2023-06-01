import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { registerVan } from "../../utils";
import VanForm from "../../components/VanForm";

function AddVan() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formError, setFormError] = useState(false);

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
      formData.append(key, values[key]);
    });
    formData.append("user_id", user.id);
    try {
      await registerVan(formData);
      navigate("..", { relative: "path" });
    } catch (error) {
      setFormError(error.response.data.error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="wrapper relative flex min-h-screen flex-col justify-center overflow-hidden">
      <VanForm
        initialValues={initialValues}
        formError={formError}
        handleSubmit={handleSubmit}
        title="Add Van"
        buttonText="Add Van"
      />
    </div>
  );
}

export default AddVan;
