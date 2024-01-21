import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/authentication";

const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, refreshAccessToken, accessToken } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!accessToken) {
      setLoading(true);
      const checkAuthentication = async () => {
        try {
          await refreshAccessToken();
        } catch (error) {
          // Maybe show toast
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      checkAuthentication();
    }
  }, [refreshAccessToken, accessToken]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/register");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default AuthWrapper;
