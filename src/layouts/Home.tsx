import ShortLinkForm from "@/components/Forms/Link";
import { LinkItem } from "@/components/Link/LinkItem";
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
// import LinkForm from "./LinkForm";
import { Plus, Filter, ArrowDownWideNarrow, Search } from "lucide-react";

type LinkType = {
  id: number;
  domain: string;
  url: string;
};

const HomePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const totalLinks = 10;

  const sampleLinks: LinkType[] = [
    {
      id: 1,
      domain: "example1.com",
      url: "https://www.example1.com",
    },
    {
      id: 2,
      domain: "example2.com",
      url: "https://blog.platformatic.dev/handling-environment-variables-in-nodejs?utm_content=279281157&utm_medium=social&utm_source=twitter&hss_channel=tw-15979784",
    },
    {
      id: 3,
      domain: "example3.com",
      url: "https://www.example3.com",
    },
  ];

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
          onClick={onOpen}
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
          />
        </InputGroup>

        <HStack spacing={2} display={{ base: "none", md: "flex" }}>
          <Button
            fontSize={"xs"}
            fontWeight={"400"}
            onClick={onOpen}
            leftIcon={<Filter size={16} />}
          >
            Filter
          </Button>

          <Button
            fontSize={"xs"}
            fontWeight={"400"}
            onClick={onOpen}
            leftIcon={<ArrowDownWideNarrow size={16} />}
          >
            Sort
          </Button>
        </HStack>
        <HStack spacing={2} display={{ base: "flex", md: "none" }}>
          <IconButton
            aria-label="Filter Links"
            icon={<Filter />}
            onClick={onOpen}
          />

          <IconButton
            aria-label="Sort Links"
            icon={<ArrowDownWideNarrow />}
            onClick={onOpen}
          />
        </HStack>
      </Flex>

      <Text mb={4}>Showing {totalLinks} of total links</Text>
      <List spacing={3}>
        {sampleLinks.map((link) => (
          <LinkItem key={link.id} link={link} />
        ))}
      </List>

      <ShortLinkForm isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default HomePage;
