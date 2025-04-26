"use client";

import { Form, Input } from "@heroui/react";
import { useEffect, useRef } from "react";

type Props = {
  provider: string;
  interactionId: string;
  code: string;
  userNameField: string;
};
export const RedirectForm = (props: Props) => {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    formRef.current?.submit();
  }, [formRef.current]);

  return (
    <Form
      ref={formRef}
      action={`/interaction/${props.interactionId}/${props.provider}`}
      method="post"
    >
      <Input name="code" value={props.code} />
      <Input name="userNameField" value={props.userNameField} />
    </Form>
  );
};
