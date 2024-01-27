import axios from "axios";
import { useQuery } from "react-query";
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
  linkId: number;
  url: string;
  key: string;
  clicks: number;
};

const HomePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading, isError } = useQuery(
    "links",
    async function getLinks(): Promise<LinkType[]> {
      const res = await axios.get("http://localhost:3001/links", {
        withCredentials: true,
      });
      return res.data.links;
    }
  );

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
          />

          <IconButton
            aria-label="Sort Links"
            icon={<ArrowDownWideNarrow />}
            onClick={onOpen}
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

      <ShortLinkForm isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default HomePage;
