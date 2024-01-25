import { useState, FormEvent } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Heading,
  Text,
  HStack,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useQueryClient } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { Trash2 } from "lucide-react";

export interface FormData {
  username?: string;
  email?: string;
  newPassword?: string;
  currentPassword?: string;
}

export interface FormErrors {
  username?: string;
  email?: string;
  newPassword?: string;
  currentPassword?: string;
}

const ProfileForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {};

    if (formData.newPassword && !formData.currentPassword) {
      newErrors.currentPassword =
        "Current password is required when updating the new password.";
      isValid = false;
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
        const response = await axios.patch(
          `http://localhost:3001/accounts/84`,
          formData,
          {
            withCredentials: true,
          }
        );
        if (response?.data?.updated) {
          queryClient.refetchQueries("profile");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete(`http://localhost:3001/accounts/83`, {
        withCredentials: true,
      });
      if (response?.data?.deleted) {
        localStorage.removeItem("authenticated");
        router.push("/register");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <Box>
      <Box as="section" width={["100%", "80%", "60%"]} mb={10}>
        <form onSubmit={handleSubmit} style={{ maxWidth: "100%" }}>
          <FormControl id="username" mb={4} isInvalid={!!errors.username}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Enter your username"
              name="username"
              variant="filled"
              background="#EEEEEE"
              focusBorderColor="#333333"
              value={formData.username || ""}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.username}</FormErrorMessage>
          </FormControl>

          <FormControl id="email" mb={4} isInvalid={!!errors.email}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              name="email"
              variant="filled"
              background="#EEEEEE"
              focusBorderColor="#333333"
              value={formData.email || ""}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl id="newPassword" mb={4} isInvalid={!!errors.newPassword}>
            <FormLabel>New Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter new password"
              name="newPassword"
              variant="filled"
              background="#EEEEEE"
              focusBorderColor="#333333"
              value={formData.newPassword || ""}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
          </FormControl>

          <FormControl
            id="currentPassword"
            mb={4}
            isInvalid={!!errors.currentPassword}
          >
            <FormLabel>Current Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter current password"
              name="currentPassword"
              variant="filled"
              background="#EEEEEE"
              focusBorderColor="#333333"
              value={formData.currentPassword || ""}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.currentPassword}</FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            color="white"
            bgColor="#333333"
            fontSize={"small"}
            fontWeight={"400"}
            _hover={{ bgColor: "black" }}
            mt={4}
          >
            Update Profile
          </Button>
        </form>
      </Box>
      <Box as="section">
        <Heading as="h4" fontSize="sm">
          Delete account
        </Heading>
        <Text>
          This irreversible action will permanently delete all associated data.
        </Text>
        <Button
          fontSize={"small"}
          fontWeight={"400"}
          mt={4}
          onClick={onOpen}
          leftIcon={<Trash2 size={16} />}
        >
          Delete Account
        </Button>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={{ base: "xs", sm: "md" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading as="h4" fontSize="sm">
              Confirm Deletion
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </ModalBody>

          <ModalFooter>
            <HStack>
              <Button fontSize={"small"} fontWeight={"400"} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                fontSize={"small"}
                fontWeight={"400"}
                onClick={handleDeleteAccount}
              >
                Delete
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};


export default ProfileForm;
