import { Flex, Heading, Button, HStack } from "@chakra-ui/react";
import Link from "next/link";

const NavBar = () => {
  return (
    <Flex p={4} align="center" justify="space-between" w={"100%"}>
      <Link href="/">
        <Heading size="md">Yalsh</Heading>
      </Link>
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
    </Flex>
  );
};

export default NavBar;
