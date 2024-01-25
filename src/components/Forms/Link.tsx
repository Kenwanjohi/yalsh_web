import { useState, FormEvent } from "react";
import axios from "axios";
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
          "http://localhost:3001/links",
          formData,
          {
            withCredentials: true,
          }
        );
        console.log(response);
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
            Create Short Link
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit} style={{ maxWidth: "100%" }}>
          <ModalBody>
            <form onSubmit={handleSubmit} style={{ maxWidth: "100%" }}>
              <FormControl id="url" mb={4} isInvalid={!!errors.url}>
                <FormLabel>URL</FormLabel>
                <Input
                  type="text"
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
              <FormControl id="password" mb={4} isInvalid={!!errors.password}>
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
            </form>
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