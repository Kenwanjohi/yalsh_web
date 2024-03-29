import Head from "next/head";
import { Container } from "@chakra-ui/react";
import { useAuth } from "@/contexts/authentication";
import Landing from "@/layouts/Landing";
import NavBar from "@/components/Navigation/NavBar";
import AuthWrapper from "@/components/AuthWrapper/AuthWrapper";
import HomePage from "@/layouts/Home";

export default function Home() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <Head>
        <title>Yalsh</title>
        <meta name="description" content="Yalsh- Yet Another Link Shortener" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="container.md" minH={"100vh"} centerContent>
        {!isAuthenticated ? (
          <>
            {isAuthenticated !== null ? (
              <>
                <NavBar />
                <Landing />
              </>
            ) : null}
          </>
        ) : (
          <AuthWrapper>
            <NavBar />
            <HomePage />
          </AuthWrapper>
        )}
      </Container>
    </>
  );
}
