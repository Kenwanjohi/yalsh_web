import { useAuth } from "@/contexts/authentication";
import { Flex, Heading, Button, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
const NavBar = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Flex p={4} align="center" justify="space-between" w={"100%"}>
      <Link href="/">
        <Heading size="md">Yalsh</Heading>
      </Link>
      {isAuthenticated ? (
        <Text fontWeight="bold">Profile</Text>
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
