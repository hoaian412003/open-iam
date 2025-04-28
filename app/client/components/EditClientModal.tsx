"use client";

import type { Selection } from "@heroui/react";

import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { updateClient } from "../actions/edit";

import { SupportedGrantTypes } from "@/config/grantTypes";
import { SupportedReponseTypes } from "@/config/reponseTypes";
import { SupportedScopes } from "@/config/scope";
import { Client } from "@/types/client";
import { generateClientSecret } from "@/utils/client";
import { createModal } from "@/components/Modal";
import { ListInput } from "@/components/ListInput";

type Props = {
  data: Client;
};

export const EditClientModal = createModal<Props>(({ data, ...props }) => {
  const [loading, setLoading] = useState(false);
  const [redirectUris, setRedirectUris] = useState<string[]>(
    data.redirect_uris,
  );
  const [redirectUri, setRedirectUri] = useState("");
  const [grantTypes, setGrantTypes] = useState<Selection>(
    new Set(data.grant_types),
  );
  const [responseTypes, setResponseTypes] = useState<Selection>(
    new Set(data.response_types),
  );
  const [postLogoutUris, setPostLogoutUris] = useState<string[]>(data.post_logout_redirect_uris);
  const [scope, setScope] = useState<Selection>(new Set(data.scope.split(" ")));
  const router = useRouter();


  return (
    <Modal {...props}>
      <ModalContent>
        {(onClose) => (
          <div>
            <ModalHeader>Update Client</ModalHeader>
            <ModalBody>
              <Form
                className="flex flex-col gap-6"
                id="update-client-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = Object.fromEntries(
                    new FormData(e.currentTarget),
                  );

                  setLoading(true);
                  updateClient(data.client_id as string, {
                    ...formData,
                    redirect_uris: redirectUris,
                    grant_types: Array.from(grantTypes),
                    response_types: Array.from(responseTypes),
                    scope: Array.from(scope).join(" "),
                    post_logout_redirect_uris: postLogoutUris,
                  }).then(() => {
                    router.refresh();
                    setLoading(false);
                    onClose();
                  });
                }}
              >
                <Input
                  isRequired
                  defaultValue={data.client_id}
                  label="Client Id"
                  labelPlacement="outside"
                  name="client_id"
                  placeholder="Enter Client Id"
                />

                <Input
                  isRequired
                  label="Client Secret"
                  labelPlacement="outside"
                  name="client_secret"
                />

                <Select
                  isRequired
                  label="Grant Types"
                  labelPlacement="outside"
                  name="grant_types"
                  placeholder="Choose Grant Types"
                  selectedKeys={grantTypes}
                  selectionMode="multiple"
                  onSelectionChange={setGrantTypes}
                >
                  {SupportedGrantTypes.map((g) => (
                    <SelectItem key={g}>{g}</SelectItem>
                  ))}
                </Select>

                <Select
                  isRequired
                  label="Scope"
                  labelPlacement="outside"
                  name="scope"
                  placeholder="Choose Scope"
                  selectedKeys={scope}
                  selectionMode="multiple"
                  onSelectionChange={setScope}
                >
                  <>
                    <SelectItem key={"openid"} isDisabled>
                      openid
                    </SelectItem>
                    {SupportedScopes.map((s) => (
                      <SelectItem key={s}>{s}</SelectItem>
                    ))}
                  </>
                </Select>

                <Select
                  isRequired
                  label="Response Types"
                  labelPlacement="outside"
                  name="response_types"
                  placeholder="Choose Response Types"
                  selectedKeys={responseTypes}
                  selectionMode="multiple"
                  onSelectionChange={setResponseTypes}
                >
                  {SupportedReponseTypes.map((g) => (
                    <SelectItem key={g}>{g}</SelectItem>
                  ))}
                </Select>

                <ListInput values={redirectUris}
                  onValueChange={setRedirectUris}
                  baseInputProps={{
                    placeholder: 'https://',
                    type: 'url',
                    label: "Redirect Uris",
                  }}
                />

                <ListInput values={postLogoutUris}
                  onValueChange={setPostLogoutUris}
                  baseInputProps={{
                    placeholder: 'https://',
                    type: 'url',
                    label: "Post logout Uris",
                  }} />

                <Button
                  className="w-full"
                  color="primary"
                  isLoading={loading}
                  type="submit"
                >
                  Update
                </Button>
              </Form>
            </ModalBody>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
});
