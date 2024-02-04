import { toast } from "sonner";
import { customAlphabet } from "nanoid";
import { useState, FormEvent } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Plus, Filter, ArrowDownWideNarrow, Search } from "lucide-react";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Text,
  Input,
  IconButton,
  HStack,
  InputGroup,
  InputLeftElement,
  List,
} from "@chakra-ui/react";

import axiosInstance from "@/lib/axios";
import ShortLinkForm from "@/components/Forms/Link";
import { LinkItem } from "@/components/Link/LinkItem";

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

type LinkType = {
  linkId: number;
  url: string;
  key: string;
  clicks: number;
};

const alphabet =
  "pV9Z7gT4F0vORxbdWkyNUezJawGfs5Dr2cn8BiHmKClojX3ASuqQIY61tEMPhL";
const randomKey = customAlphabet(alphabet, 8);

const HomePage = () => {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [generatedKey, setGeneratedKey] = useState("");
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { data, isLoading, isError } = useQuery(
    "links",
    async function getLinks(): Promise<LinkType[]> {
      const res = await axiosInstance.get("/links", {
        withCredentials: true,
      });
      return res.data.links;
    }
  );

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

  function resetFormState() {
    setGeneratedKey("");
    setFormData({
      url: "",
      key: "",
      expiryDate: "",
      password: "",
    });
  }

  function generateKey() {
    const key = randomKey();
    setGeneratedKey(key);
    setFormData({
      ...formData,
      key,
    });
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axiosInstance.post("/links", formData, {
          withCredentials: true,
        });
        if (response.status == 200) {
          toast.success("Link successfully created");
          resetFormState();
          queryClient.refetchQueries("links");
          onClose();
        }
      } catch (error) {
        toast.error("Couldn't create link");
        console.error("Error submitting form:", error);
      }
    }
  };

  function openLinkFormModal() {
    generateKey();
    onOpen();
  }

  if (isLoading) {
    return <div>loading</div>;
  }

  if (isError) {
    return <div>An error occured, please retry</div>;
  }
  return (
    <Box py={4} width={"100%"}>
      <Flex
        align="center"
        justify="space-between"
        flexWrap="wrap"
        borderBottom="1px solid #e1e1e1"
        mb={10}
        py={2}
      >
        <div>
          <Text fontSize="md" fontWeight="bold">
            Links
          </Text>
          <Text color="gray.500">Manage your links here</Text>
        </div>

        <Button
          color="white"
          bgColor="#333333"
          fontSize={"xs"}
          fontWeight={"400"}
          _hover={{ bgColor: "black" }}
          leftIcon={<Plus size={16} />}
          onClick={openLinkFormModal}
        >
          Create link
        </Button>
      </Flex>
      <Flex align="center">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search size={16} color="#718096" />
          </InputLeftElement>
          <Input
            type="search"
            focusBorderColor="#333333"
            placeholder="Search..."
            mr={2}
            isDisabled
          />
        </InputGroup>

        <HStack spacing={2} display={{ base: "none", md: "flex" }}>
          <Button
            fontSize={"xs"}
            fontWeight={"400"}
            leftIcon={<Filter size={16} />}
            isDisabled
          >
            Filter
          </Button>

          <Button
            fontSize={"xs"}
            fontWeight={"400"}
            leftIcon={<ArrowDownWideNarrow size={16} />}
            isDisabled
          >
            Sort
          </Button>
        </HStack>
        <HStack spacing={2} display={{ base: "flex", md: "none" }}>
          <IconButton
            aria-label="Filter Links"
            icon={<Filter />}
            onClick={onOpen}
            isDisabled
          />

          <IconButton
            aria-label="Sort Links"
            icon={<ArrowDownWideNarrow />}
            onClick={onOpen}
            isDisabled
          />
        </HStack>
      </Flex>

      {data && data.length ? (
        <Text mb={4}>
          Showing {data.length} of {data.length} links
        </Text>
      ) : (
        <Text>No links found</Text>
      )}

      <List spacing={3}>
        {data && data.length > 0
          ? data.map((link) => <LinkItem key={link.linkId} link={link} />)
          : null}
      </List>

      <ShortLinkForm
        errors={errors}
        isOpen={isOpen}
        onClose={onClose}
        formData={formData}
        generateKey={generateKey}
        handleChange={handleChange}
        generatedKey={generatedKey}
        handleSubmit={handleSubmit}
      />
    </Box>
  );
};

export default HomePage;
