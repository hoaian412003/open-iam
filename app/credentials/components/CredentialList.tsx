"use client";

import { CredentialProvider } from "@prisma/client";

import { CredentialItem } from "./CredentialItem";
import { AddCredential } from "./AddCredential";

type Props = {
  data: Array<CredentialProvider>;
};

export const CredentialList = ({ data }: Props) => {
  return (
    <div className="flex flex-col gap-2 mt-6" id="credential-list">
      {data.map((credential, index) => (
        <CredentialItem key={index} data={credential} />
      ))}

      <AddCredential />
    </div>
  );
};
