import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

import Icons, { IconName } from "./icons";

type Props = {
  key: string;
  name: string;
  href: string;
  onPress?: () => void;
  active?: boolean;
  icon: IconName;
};

export const NavItem = ({ onPress, name, href, icon, ...props }: Props) => {
  const Icon = Icons[icon];
  const router = useRouter();

  return (
    <Button
      variant="light"
      {...props}
      className="flex"
      onPress={() => {
        router.push(href);
      }}
    >
      <Icon />
      <p>{name}</p>
    </Button>
  );
};
