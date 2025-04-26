import { getInteraction, getSession } from "../action";

import LoginPage from "./components/login";
import ConsentPage from "./components/consent";

import { InteractionParams, InteractionPrompt } from "@/types/interaction";
import { prisma } from "@/config/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async ({ params }: Props) => {
  const { id } = await params;
  const interaction = await getInteraction(id);

  console.log("interaction: ", interaction);

  const prompt = interaction?.prompt as InteractionPrompt;
  const interactionParams = interaction?.params as InteractionParams;
  const details = (interaction?.prompt as InteractionPrompt).details;

  const missingScopes = details["missingOIDCScope"] || [];

  const credentialProviders = await prisma.credentialProvider.findMany({});

  if (prompt.name === "login") {
    return (
      <LoginPage
        credentialProviders={credentialProviders}
        interactionId={id}
        interactionParams={interactionParams}
      />
    );
  }

  const session = await getSession(interaction.session.uid);

  const user = await prisma.user.findUnique({
    where: {
      username: session?.accountId!,
    },
    include: {
      profile: true,
    },
  });

  return (
    <ConsentPage
      interactionId={id}
      interactionParams={interactionParams}
      missingScopes={missingScopes}
      user={user as any}
    />
  );
};
