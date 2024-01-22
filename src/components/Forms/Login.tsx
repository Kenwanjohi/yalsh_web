import { useState, FormEvent } from "react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Box,
} from "@chakra-ui/react";
import { useAuth } from "@/contexts/authentication";
import { useRouter } from "next/router";
export interface FormData {
  email: string;
  password: string;
}
export interface FormErrors {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { setIsAuthenticated, setAuthenticatedLocal } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    email: "",
    password: "",
  });

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = { ...errors };

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", formData);
      try {
        const response = await axios.post(
          "http://localhost:3001/session",
          formData,
          {
            withCredentials: true, // Include credentials (cookies)
          }
        );
        const { authenticated } = response?.data || {};
        if (authenticated) {
          setIsAuthenticated(true);
          setAuthenticatedLocal(true);
          router.push("/");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <Box width={["100%", "80%", "60%"]}>
      <form onSubmit={handleSubmit} style={{ maxWidth: "100%" }}>
        <FormControl id="email" mb={4} isInvalid={!!errors.email}>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            name="email"
            variant="filled"
            background="#EEEEEE"
            focusBorderColor="#333333"
            value={formData.email}
            onChange={handleChange}
          />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>
        <FormControl id="password" mb={4} isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            name="password"
            variant="filled"
            background="#EEEEEE"
            focusBorderColor="#333333"
            value={formData.password}
            onChange={handleChange}
          />
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        </FormControl>
        <Button
          type="submit"
          color="white"
          bgColor="#333333"
          fontSize={"small"}
          fontWeight={"400"}
          _hover={{ bgColor: "black" }}
          width="full"
          mt={4}
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
