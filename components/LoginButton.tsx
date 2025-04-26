"use client";

import { Button } from "@heroui/button";
import { signIn } from "next-auth/react";

export const LoginButton = () => {
  return <Button onPress={() => signIn("admin")}>Signin</Button>;
};
