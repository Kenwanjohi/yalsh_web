import { Shuffle } from "lucide-react";
import React, { ChangeEvent, FormEvent } from "react";
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
  IconButton,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import { FormData } from "@/layouts/Home";
import { FormErrors } from "@/layouts/Home";

interface ShortLinkFormProps {
  isOpen: boolean;
  formData: FormData;
  errors: FormErrors;
  generatedKey: string;
  onClose: () => void;
  generateKey: () => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ShortLinkForm: React.FC<ShortLinkFormProps> = ({
  isOpen,
  onClose,
  handleSubmit,
  handleChange,
  errors,
  formData,
  generateKey,
  generatedKey,
}) => {
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

              <InputGroup>
                <Input
                  type="text"
                  placeholder="Enter the short key"
                  name="key"
                  variant="filled"
                  background="#EEEEEE"
                  focusBorderColor="#333333"
                  value={formData.key || generatedKey}
                  onChange={handleChange}
                />
                <InputRightElement>
                  <IconButton
                    variant="ghost"
                    onClick={generateKey}
                    aria-label="Shuffle"
                    icon={<Shuffle />}
                  />
                </InputRightElement>
              </InputGroup>
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
