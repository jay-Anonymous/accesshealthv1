import React from "react";
import AuthLayout from "../components/layouts/AuthLayout";
import Register from "../components/fragments/Register";

const RegisterPage = () => {
  return (
    <AuthLayout>
      <Register />
    </AuthLayout>
  );
};

export default RegisterPage;
