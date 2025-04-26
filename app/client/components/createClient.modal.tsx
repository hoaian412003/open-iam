"use client";

import type { Selection } from "@heroui/react";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalProps,
  useDisclosure,
} from "@heroui/modal";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "../actions/create";

import { generateClientSecret } from "@/utils/client";
import Icons from "@/components/icons/index";
import { SupportedGrantTypes } from "@/config/grantTypes";
import { SupportedReponseTypes } from "@/config/reponseTypes";
import { SupportedScopes } from "@/config/scope";

type Props = {} & ModalProps;

export const CreateClientModal: React.FC<Props> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [redirectUris, setRedirectUris] = useState<string[]>([]);
  const [redirectUri, setRedirectUri] = useState("");
  const [grantTypes, setGrantTypes] = useState<Selection>(new Set([]));
  const [responseTypes, setResponseTypes] = useState<Selection>(new Set([]));
  const [scope, setScope] = useState<Selection>(new Set(["openid"]));
  const router = useRouter();

  return (
    <>
      <Button className="mr-2" color="primary" onPress={onOpen}>
        <Icons.Create />
        Create
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} {...props}>
        <ModalContent>
          {(onClose) => (
            <div>
              <ModalHeader>Create New Client</ModalHeader>
              <ModalBody>
                <Form
                  className="flex flex-col gap-6"
                  id="create-client-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const data = Object.fromEntries(
                      new FormData(e.currentTarget),
                    );

                    setLoading(true);
                    createClient({
                      ...data,
                      redirect_uris: redirectUris,
                      grant_types: Array.from(grantTypes),
                      response_types: Array.from(responseTypes),
                      scope: Array.from(scope).join(" "),
                    }).then(() => {
                      router.refresh();
                    });
                    onClose();
                  }}
                >
                  <Input
                    isRequired
                    label="Client Id"
                    labelPlacement="outside"
                    name="client_id"
                    placeholder="Enter Client Id"
                  />

                  <Input
                    isRequired
                    defaultValue={generateClientSecret()}
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

                  <div className="w-full flex flex-col gap-3">
                    <Input
                      className="pr-0"
                      endContent={
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            setRedirectUris([...redirectUris, redirectUri]);
                            setRedirectUri("");
                          }}
                        >
                          <Icons.PlusCircle />
                        </div>
                      }
                      label="Client Uris"
                      labelPlacement="outside"
                      placeholder="https://"
                      type="url"
                      value={redirectUri}
                      onChange={(e) => setRedirectUri(e.target.value)}
                    />

                    {redirectUris.map((r, i) => (
                      <Input
                        key={i}
                        color="secondary"
                        contentEditable={false}
                        disabled={true}
                        endContent={
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              setRedirectUris(
                                redirectUris.filter((_, _i) => _i !== i),
                              );
                            }}
                          >
                            <Icons.MinusCircle />
                          </div>
                        }
                        labelPlacement="outside"
                        value={r}
                      />
                    ))}
                  </div>

                  <Button
                    className="w-full"
                    color="primary"
                    isLoading={loading}
                    type="submit"
                  >
                    Create
                  </Button>
                </Form>
              </ModalBody>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
