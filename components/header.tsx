import { Button } from "@heroui/button";
import { Image } from "@heroui/image";

import Icons from "./icons";
import { UserProfile } from "./UserProfile";

type Props = {};

export default function Header() {
  return (
    <div className="px-4 py-2 flex items-center justify-between" id="header">
      <div className="flex items-center gap-2" id="left">
        <Image height={40} src="/images/logo.png" />
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          Open IAM
        </h1>
      </div>

      <div className="flex items-center" id="right">
        <Button id="docs-button" variant="light">
          <Icons.Documentation />
          Docs
        </Button>

        <Button id="help-button" variant="light">
          <Icons.QuestionMark />
          Help
        </Button>

        <UserProfile />
      </div>
    </div>
  );
}
