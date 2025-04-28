"use client";

import { useSession } from "next-auth/react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from "@heroui/react";

import { Image } from '@/components/Image';

import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";
import { UNSTABLE_REVALIDATE_RENAME_ERROR } from "next/dist/lib/constants";

type Props = {};

export const UserProfile = ({ }: Props) => {
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
          <Image src={user.avatar} width={40} diceOption={{ seed: user.name }} className="rounded-full" />
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem key="account">
            <div className="flex flex-row gap-2 items-center">
              <Image src={user.avatar} width={30} />
              <div>
                <p>@{user.name}</p>
                <p>{user.username}</p>
              </div>
            </div>
          </DropdownItem>
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
