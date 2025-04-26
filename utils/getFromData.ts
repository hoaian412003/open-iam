import { FormEvent } from "react";

export const getFormData = <T = any>(e: FormEvent<HTMLFormElement>) => {
  return Object.fromEntries(new FormData(e.currentTarget)) as T;
};
