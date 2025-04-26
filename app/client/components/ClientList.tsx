"use client";

import { ClientItem } from "./ClientItem";

import { Client } from "@/types/client";

type Props = {
  clients: Array<Client>;
};

export const ClientList = ({ clients }: Props) => {
  return (
    <div className="flex flex-wrap mt-4 justify-between">
      {clients.map((client, index) => (
        <ClientItem key={index} data={client} />
      ))}
    </div>
  );
};
