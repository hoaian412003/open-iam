"use client";

import { ImageProps, Image as HImage } from "@heroui/image";
import { useState } from "react";

type Props = {
  diceOption?: {
    seed?: string;
    style?: string;
  };
} & ImageProps;

export const Image = ({ diceOption, ...props }: Props) => {
  const [error, setError] = useState(false);

  if (error || !props.src)
    return (
      <HImage
        {...props}
        src={`https://api.dicebear.com/9.x/${diceOption?.style || "initials"}/png?seed=${diceOption?.seed || "no-seed"}`}
      />
    );

  return <HImage {...props} onError={() => setError(true)} />;
};
