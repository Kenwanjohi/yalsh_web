import LoginForm from "@/components/Forms/Login";
import { Container, Heading, Link, Text } from "@chakra-ui/react";

const LoginPage = () => {
  return (
    <Container maxW="container.md" minH={"100vh"} centerContent>
      <Heading as="h1" size="xl" textAlign="center" mb={6}>
        Welcome back to Yalsh
      </Heading>
      <LoginForm />
      <Text mt={4} textAlign="center">
        I don&apos;t have an account{" "}
        <Link textDecorationLine={"underline"} href="/register">
          Create one
        </Link>
      </Text>
    </Container>
  );
};

export default LoginPage;
