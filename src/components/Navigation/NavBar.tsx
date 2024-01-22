import { useAuth } from "@/contexts/authentication";
import {
  Flex,
  Heading,
  Button,
  HStack,
  Text,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";
const NavBar = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Flex p={4} align="center" justify="space-between" w={"100%"}>
      <Link href="/">
        <Heading size="md">Yalsh</Heading>
      </Link>
      {isAuthenticated ? (
        <Link href="/profile">
          <Flex align="center">
            <AccountIcon />
            <Box ml={2}>
              <Text fontSize="sm" fontWeight="bold">
                Velociraptor
              </Text>
            </Box>
          </Flex>
        </Link>
      ) : (
        <HStack>
          <Link href="/login">
            <Button
              bgColor="#ffffff"
              border="1px"
              borderColor="#333333"
              borderRadius={"unset"}
              fontSize={"small"}
              fontWeight={"400"}
              variant="outline"
            >
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button
              color="white"
              bgColor="#333333"
              borderRadius={"unset"}
              fontSize={"small"}
              fontWeight={"400"}
              _hover={{ bgColor: "black" }}
            >
              Register
            </Button>
          </Link>
        </HStack>
      )}
    </Flex>
  );
};

export default NavBar;

const AccountIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-user"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
};
