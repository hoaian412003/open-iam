"use client";

import { Image } from "@heroui/image";
import { CredentialProvider } from "@prisma/client";
import { Switch } from "@heroui/switch";

import Icons from "@/components/icons";
import { Button } from "@heroui/react";
import { EditCredentialModal } from "./EditCredentailModal";
import { useRef } from "react";
import { ModalAction } from "@/components/Modal";

type Props = {
  data: CredentialProvider;
};
export const CredentialItem = ({ data }: Props) => {
  const ref = useRef<ModalAction>(null);
  return (
    <Button
      className="bg-gray-100 rounded-lg p-2 flex gap-2 items-center cursor-pointer"
      id="credential-item"
      onPress={() => ref.current?.open()}
    >
      <Icons.Drag />
      <Image height={20} src={data.icon} width={20} />
      <p className="font-bold">{data.name}</p>

      <Switch className="ml-auto" size="sm" />
      <EditCredentialModal data={data} ref={ref} />
    </Button>
  );
};
