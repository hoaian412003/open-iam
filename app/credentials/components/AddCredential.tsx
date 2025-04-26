"use client";

import { Button } from "@heroui/button";
import { useRef } from "react";

import { CreateCredentialModal } from "./CreateCredentialModal";

import { ModalAction } from "@/components/Modal";
import Icons from "@/components/icons";

export const AddCredential = () => {
  const ref = useRef<ModalAction>(null);

  return (
    <div>
      <Button
        className="w-auto p-2"
        id="add-credential"
        variant="light"
        onPress={() => {
          ref.current?.open();
        }}
      >
        <Icons.Create className="stroke-primary" width={20} />
        <p className="font-bold text-md text-primary">Add another</p>
      </Button>

      <CreateCredentialModal ref={ref} />
    </div>
  );
};
