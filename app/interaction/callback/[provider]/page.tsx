import { RedirectForm } from "./components/redirect-form";

type Props = {
  searchParams: Promise<Record<string, string>>;
  params: Promise<Record<string, string>>;
};

const CallbackPage = async ({ searchParams, params }: Props) => {
  const { state, code } = await searchParams;
  const { provider } = await params;

  const { interactionId, userNameField } = JSON.parse(state);

  return <RedirectForm code={code} interactionId={interactionId} provider={provider} userNameField={userNameField} />;
};

export default CallbackPage;
