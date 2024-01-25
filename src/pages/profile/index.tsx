import ProfileForm from "@/components/Forms/Profile";
import NavBar from "@/components/Navigation/NavBar";
import { useProfile } from "@/hooks/useProfile";
import { Container, Text, Flex, Button } from "@chakra-ui/react";
import axios from "axios";
import { LogOut } from "lucide-react";
import { useRouter } from "next/router";
const UserProfile = () => {
  return (
    <Container maxW="container.md" minH={"100vh"}>
      <NavBar />
      <UserProfileHeader />
      <ProfileForm />
    </Container>
  );
};

const UserProfileHeader = () => {
  const router = useRouter();
  const { data: user, isLoading, isError } = useProfile();
  if (isError) {
    return null; // Handle effectively
  }

  if (isLoading) {
    return null; // Maybe loader
  }

  async function logout() {
    try {
      const response = await axios.post(
        "http://localhost:3001/logout",
        {},
        { withCredentials: true }
      );

      if (response.status === 204) {
        localStorage.removeItem("authenticated");
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
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
          {user.username}
        </Text>
        <Text color="gray.500">{user.email}</Text>
      </div>

      <Button
        bgColor="#ffffff"
        border="1px"
        borderColor="#333333"
        fontSize={"xs"}
        fontWeight={"400"}
        variant="outline"
        leftIcon={<LogOut size={16} />}
        onClick={logout}
      >
        Logout
      </Button>
    </Flex>
  );
};

export default UserProfile;
