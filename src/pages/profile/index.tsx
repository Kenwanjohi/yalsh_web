import ProfileForm from "@/components/Forms/Profile";
import NavBar from "@/components/Navigation/NavBar";
import { useProfile } from "@/hooks/useProfile";
import { Container, Text, Flex, Button } from "@chakra-ui/react";
import axios from "axios";
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
        fontSize={"small"}
        fontWeight={"400"}
        variant="outline"
        leftIcon={<LogoutIcon />}
        onClick={logout}
      >
        Logout
      </Button>
    </Flex>
  );
};

const LogoutIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-log-out"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
};

export default UserProfile;
