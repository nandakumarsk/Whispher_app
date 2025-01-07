import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { baseUrl } from "../constant/url"


// Custom hook for signup functionality
export const useSignup = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    password: "",
  });

  const { mutate, isError, isLoading, error } = useMutation({
    mutationFn: async ({ email, username, fullName, password }) => {
      const res = await fetch(`${baseUrl}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, fullName, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create account");
      return data;
    },
    onSuccess: () => {
      toast.success("User created successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Signup failed!");
    },
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    isError,
    isLoading,
    error,
  };
};

export default useSignup;