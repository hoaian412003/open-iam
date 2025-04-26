import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Snippet,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { HTMLAttributes, useRef } from "react";

import { deleteClient } from "../actions/delete";

import { EditClientModal } from "./EditClientModal";

import { ModalAction } from "@/components/Modal";
import { Client } from "@/types/client";
import { Image } from "@/components/Image";
import Icons from "@/components/icons";

type Props = {
  data: Client;
} & HTMLAttributes<"div">;

export const ClientItem = ({ data, ...props }: Props) => {
  // Need to show:  name, icon, scope, clientSecret, grantype, redirectUri
  const router = useRouter();
  const editRef = useRef<ModalAction>(null);

  return (
    <div className="p-2 w-full">
      <div className="bg-purple-50 rounded-lg flex gap-6 p-6">
        <Image
          diceOption={{
            seed: data.client_id,
          }}
          height={60}
          src={data.image}
          width={60}
        />
        <div className="" id="information">
          <p className="font-bold">{data.client_id}</p>

          <div className="flex items-center" id="app-secret">
            <p className="font-bold text-gray-500">App Secret: </p>
            <Snippet
              hideSymbol
              className="ml-2"
              codeString={data.client_secret}
              size="sm"
            >
              <p className="font-bold">
                {data.client_secret.replace(/./g, "*")}
              </p>
            </Snippet>
          </div>
        </div>
        <div className="ml-auto" id="options">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button className="h-full" size="sm" variant="bordered">
                <Icons.Option />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="edit">
                <Button
                  className="flex gap-2 w-full"
                  color="primary"
                  onPress={() => {
                    editRef.current?.open();
                  }}
                >
                  <Icons.Edit />
                  <p>Edit</p>
                </Button>
              </DropdownItem>

              <DropdownItem key="delete">
                <Button
                  className="flex gap-2 w-full"
                  color="danger"
                  onPress={() => {
                    deleteClient(data.client_id).then(() => router.refresh());
                  }}
                >
                  <Icons.Delete />
                  <p>Delete</p>
                </Button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <EditClientModal ref={editRef} data={data} />
    </div>
  );
};
