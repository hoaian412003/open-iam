"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Form, Image, Input, Select, SelectItem } from "@heroui/react";
import { CredentialProvider } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@heroui/button";

import { createCredential } from "../actions/create";
import { createModal } from "@/components/Modal";
import { editCredentail } from "../actions/edit";

type Props = {
  data: CredentialProvider;
};

export const EditCredentialModal = createModal<Props>(({ data, ...props }) => {

  const [credential, setCredential] = useState<Partial<CredentialProvider>>(data);
  const router = useRouter();
  const handleFormChange = (e: any) => {
    setCredential({
      ...credential,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal {...props} size="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Add Social Login</ModalHeader>
            <ModalBody>
              <Form
                className="flex flex-col gap-4"
                id="create-credentials"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = Object.fromEntries(
                    new FormData(e.currentTarget),
                  );

                  editCredentail(data.id, formData).then(() => {
                    onClose();
                    router.refresh();
                  });
                }}
              >
                <Input
                  isRequired
                  label="Name"
                  labelPlacement="outside"
                  name="name"
                  placeholder="Enter name eg: Google"
                  value={credential.name}
                  onChange={handleFormChange}
                />

                <Input
                  isRequired
                  label="Callback URI"
                  labelPlacement="outside"
                  name="callbackUrl"
                  placeholder="https://"
                  value={`http://localhost:3000/interaction/callback/${credential.name}`}
                  onChange={handleFormChange}
                />

                <Input
                  isRequired
                  label="Authorize Url"
                  labelPlacement="outside"
                  name="authorizeUrl"
                  placeholder="https://"
                  value={credential.authorizeUrl}
                  onChange={handleFormChange}
                />

                <Input
                  isRequired
                  label="Token Url"
                  labelPlacement="outside"
                  name="tokenUrl"
                  placeholder="https://"
                  value={credential.tokenUrl}
                  onChange={handleFormChange}
                />

                <Input
                  isRequired
                  label="Scope"
                  labelPlacement="outside"
                  name="scope"
                  placeholder="openid profile"
                  value={credential.scope}
                  onChange={handleFormChange}
                />

                <Input
                  isRequired
                  label="Userinfo Url"
                  labelPlacement="outside"
                  name="userInfoUrl"
                  placeholder="https://"
                  value={credential.userInfoUrl}
                  onChange={handleFormChange}
                />

                <Input
                  isRequired
                  label="Client ID"
                  labelPlacement="outside"
                  name="clientId"
                  placeholder="Client Id"
                  value={credential.clientId}
                  onChange={handleFormChange}
                />

                <Input
                  isRequired
                  label="Client Secret"
                  labelPlacement="outside"
                  name="clientSecret"
                  placeholder="Client Secret"
                  value={credential.clientSecret}
                  onChange={handleFormChange}
                />

                <Input
                  isRequired
                  label="Username Field"
                  labelPlacement="outside"
                  name="userNameField"
                  placeholder="email"
                  value={credential.userNameField || "email"}
                  onChange={handleFormChange}
                />

                <Input
                  label="Icon Url"
                  labelPlacement="outside"
                  name="icon"
                  placeholder="Icon Url"
                  value={credential.icon}
                  onChange={handleFormChange}
                />

                <Button className="w-full mt-2" color="primary" type="submit">
                  Edit
                </Button>
              </Form>
            </ModalBody>
            <ModalFooter />
          </>
        )}
      </ModalContent>
    </Modal>
  );
});
