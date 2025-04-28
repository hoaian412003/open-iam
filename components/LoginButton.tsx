"use client";

import { Button } from "@heroui/button";
import { signIn } from "next-auth/react";

export const LoginButton = () => {
  return <Button id='login-btn' onPress={() => signIn("admin")}>Signin</Button>;
};
