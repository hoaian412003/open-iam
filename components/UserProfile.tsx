"use client";

import { useSession } from "next-auth/react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Spinner,
} from "@heroui/react";

import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";

type Props = {};

export const UserProfile = ({}: Props) => {
  const session = useSession();

  if (session.status === "loading") {
    return <Spinner />;
  }

  if (!session?.data?.user) {
    return <LoginButton />;
  }

  const {
    data: { user },
  } = session;

  return (
    <div className="ml-4" id="user-profile">
      <Dropdown placement="bottom-end">
        <DropdownTrigger className="cursor-pointer">
          <Image src={user.image} width={40} />
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem key="settings">My Settings</DropdownItem>
          <DropdownItem key="team_settings">Team Settings</DropdownItem>
          <DropdownItem key="analytics">Analytics</DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" color="danger">
            <LogoutButton />
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
