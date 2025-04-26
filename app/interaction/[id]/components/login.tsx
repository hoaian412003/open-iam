"use client";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { Image } from "@heroui/image";
import { Link } from "@heroui/link";
import { Form, Input } from "@heroui/react";
import { CredentialProvider } from "@prisma/client";

import { InteractionParams } from "@/types/interaction";
import { SSOOption } from "@/components/ssoOption";

type Props = {
  interactionParams: InteractionParams;
  credentialProviders: Array<CredentialProvider>;
  interactionId: string;
};

const LoginPage = ({
  interactionParams,
  credentialProviders,
  interactionId,
}: Props) => {
  return (
    <div className="flex h-screen p-2">
      <div
        className="flex-[1]  flex justify-center items-center h-full"
        id="left"
      >
        <div className="w-full max-w-[300px] flex flex-col" id="login-form">
          <h1 className="font-bold text-2xl">
            Sign In to{" "}
            <span className="text-blue-900">{interactionParams.client_id}</span>
          </h1>
          <p>If you don't have an account</p>
          <p>
            Register <Link>here</Link>
          </p>

          <Form
            action={`/interaction/${interactionId}/password`}
            className="mt-10 gap-6"
            method="post"
          >
            <Input
              isRequired
              label="Username"
              labelPlacement="outside"
              name="username"
              placeholder="Enter your username"
            />

            <Input
              isRequired
              label="Password"
              labelPlacement="outside"
              name="password"
              placeholder="Enter your password"
              type="password"
            />

            <div className="flex justify-between w-full">
              <Checkbox>
                <p className="text-sm text-secondary">Rememeber me?</p>
              </Checkbox>
              <Link className="text-sm" href="/forgotpassword">
                Forgot password
              </Link>
            </div>

            <Button
              className="w-full"
              color="primary"
              type="submit"
              variant="solid"
            >
              Login
            </Button>
          </Form>

          <p className="mx-auto text-gray-400 my-2">or continue with</p>

          <div className="flex flex-col justify-around w-full gap-2">
            {credentialProviders?.map((c, i) => (
              <SSOOption key={i} data={c} interactionId={interactionId} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex-[1] bg-blue-950 rounded-xl" id="right">
        <Image src="/images/login-thumbnail.png" />
      </div>
    </div>
  );
};

export default LoginPage;
