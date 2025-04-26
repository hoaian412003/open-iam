"use client";
import { Button, ButtonProps } from "@heroui/button";
import { Image } from "@heroui/image";
import { CredentialProvider } from "@prisma/client";

import { oauthLogin } from "@/utils/getOauthProvider";

type Props = {
  data: CredentialProvider;
  interactionId: string;
} & ButtonProps;

export const SSOOption = ({ data, interactionId, ...props }: Props) => {
  return (
    <Button
      isIconOnly
      className="w-full flex px-2"
      variant="bordered"
      onPress={() => {
        oauthLogin(data.name, JSON.stringify({ interactionId, userNameField: data.userNameField }))
      }}
      {...props}
    >
      <Image height={20} src={data.icon} width={20} />
      <p className="text-center flex-1">Continue with {data.name}</p>
    </Button>
  );
};
