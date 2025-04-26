import { HTMLAttributes } from "react";

type Props = {
  name: string;
} & HTMLAttributes<HTMLDivElement>;

export const NavSection = ({ name, children, ...props }: Props) => {
  return (
    <div {...props}>
      <p className="text-xs text-secondary font-semibold mb-2">{name}</p>
      {children}
    </div>
  );
};
