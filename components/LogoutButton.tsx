"use client";

import { host } from "@/utils/host";
import { Button } from "@heroui/button";
import { signOut, useSession } from "next-auth/react";

export const LogoutButton = () => {


  const { data } = useSession();

  const handleLogout = async () => {

    await signOut({ redirect: false });
    window.location.href = `${host}/oidc/session/end?post_logout_redirect_uri=${host}&id_token_hint=${data?.idToken}`;
  };

  return (
    <Button
      className="w-full text-center"
      color="danger"
      variant="solid"
      onPress={handleLogout}
    >
      Sign Out
    </Button>
  );
};
