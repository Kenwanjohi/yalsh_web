import { useState, FormEvent } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  HStack,
  Heading,
} from "@chakra-ui/react";
import { useQueryClient } from "react-query";
import axiosInstance from "@/lib/axios";
export interface FormData {
  url: string;
  key: string;
  expiryDate: string;
  password: string;
}

export interface FormErrors {
  url: string;
  key: string;
  expiryDate: string;
  password: string;
}

const ShortLinkForm = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<FormData>({
    url: "",
    key: "",
    expiryDate: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    url: "",
    key: "",
    expiryDate: "",
    password: "",
  });

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = { ...errors };

    function isValidHttpUrl(url: string): boolean {
      let parsedUrl: URL;
      try {
        parsedUrl = new URL(url);
      } catch (error) {
        return false;
      }
      return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
    }

    if (!formData.url.trim()) {
      newErrors.url = "URL is required";
      isValid = false;
    } else if (!isValidHttpUrl(formData.url.trim())) {
      newErrors.url = "Invalid URL";
      isValid = false;
    }

    if (!formData.key.trim()) {
      newErrors.key = "Key is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  function resetFormState() {
    setFormData({
      url: "",
      key: "",
      expiryDate: "",
      password: "",
    });
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      try {
        const response = await axiosInstance.post("/links", formData, {
          withCredentials: true,
        });
        queryClient.refetchQueries("links");
        resetFormState();
        onClose();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <Modal
      size={{ base: "sm", sm: "md" }}
      isCentered
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading as="h4" fontSize="sm">
            Create short link
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit} style={{ maxWidth: "100%" }}>
          <ModalBody>
            <FormControl id="url" mb={4} isInvalid={!!errors.url}>
              <FormLabel>URL</FormLabel>
              <Input
                type="url"
                placeholder="Enter the URL"
                name="url"
                variant="filled"
                background="#EEEEEE"
                focusBorderColor="#333333"
                value={formData.url}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.url}</FormErrorMessage>
            </FormControl>
            <FormControl id="key" mb={4} isInvalid={!!errors.key}>
              <FormLabel>Short Key</FormLabel>
              <Input
                type="text"
                placeholder="Enter the short key"
                name="key"
                variant="filled"
                background="#EEEEEE"
                focusBorderColor="#333333"
                value={formData.key}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.key}</FormErrorMessage>
            </FormControl>
            <FormControl
              id="expiryDate"
              mb={4}
              isInvalid={!!errors.expiryDate}
              isDisabled
            >
              <FormLabel>Expiry Date</FormLabel>
              <Input
                type="date"
                name="expiryDate"
                variant="filled"
                background="#EEEEEE"
                focusBorderColor="#333333"
                value={formData.expiryDate}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.expiryDate}</FormErrorMessage>
            </FormControl>
            <FormControl
              id="password"
              mb={4}
              isInvalid={!!errors.password}
              isDisabled
            >
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter a password"
                name="password"
                variant="filled"
                background="#EEEEEE"
                focusBorderColor="#333333"
                value={formData.password}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Button onClick={onClose} fontSize={"xs"} fontWeight={"400"}>
                Cancel
              </Button>
              <Button
                color="white"
                bgColor="#333333"
                fontSize={"xs"}
                fontWeight={"400"}
                _hover={{ bgColor: "black" }}
                type="submit"
              >
                Create link
              </Button>
            </HStack>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ShortLinkForm;
