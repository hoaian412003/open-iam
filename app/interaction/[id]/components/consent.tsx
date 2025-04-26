import { Image } from "@heroui/image";
import React from "react";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { User } from "@prisma/client";

import { ScopeList } from "./ScopeList";

import { InteractionParams } from "@/types/interaction";

type Props = {
  missingScopes: string[];
  user: User & { profile: { name: string; avatar: string } };
  interactionParams: InteractionParams;
  interactionId: string;
};

const ConsentPage: React.FC<Props> = async ({
  missingScopes,
  interactionParams,
  user,
  interactionId,
}) => {
  console.log("missingScopes: ", missingScopes);

  return (
    <div className="h-screen w-screen justify-center flex items-center">
      <div className="w-[400px] flex flex-col gap-6">
        <h1 className="text-xl font-bold text-center">
          Authorize {interactionParams.client_id}
        </h1>
        <div className="flex border border-gray-200 rounded-lg p-2 gap-2 w-full">
          <Image src={user?.profile?.avatar || ""} width={40} />
          <div>
            <h1 className="font-semibold text-md">{user?.profile?.name}</h1>
            <p className="text-gray-500 text-sm">{user?.email}</p>
          </div>
        </div>

        <h2 className="font-semibold text-md">
          Authorize the use of your personal data:{" "}
        </h2>
        <ScopeList scopes={missingScopes} />

        <Form
          action={`/interaction/${interactionId}/confirm`}
          className="flex w-full flex-row"
          method="post"
        >
          <Button className="w-1/2">Cancel</Button>
          <Button className="w-1/2" color="primary" type="submit">
            Authorize
          </Button>
        </Form>

        <p className="text-gray-500 text-sm">
          By authorize the access, you agree with the musicFun’s Terms of Use
          and Privacy Policy, and will be redirected to
          “https://www.third-party.cloud.io”.
        </p>
        <p className="text-center">
          Not you? <span className="text-secondary">Use another account</span>
        </p>
      </div>
    </div>
  );
};

export default ConsentPage;
