import RegisterForm from "@/components/Forms/Register";
import { Container, Heading, Link, Text } from "@chakra-ui/react";

const RegisterPage = () => {
  return (
    <Container maxW="container.md" minH={"100vh"} centerContent>
      <Heading as="h1" size="xl" textAlign="center" mb={6}>
        Create your yalsh account
      </Heading>
      <RegisterForm />
      <Text mt={4} textAlign="center">
        Already have an account?{" "}
        <Link textDecorationLine={"underline"} href="/login">
          Log in
        </Link>
      </Text>
    </Container>
  );
};

export default RegisterPage;
