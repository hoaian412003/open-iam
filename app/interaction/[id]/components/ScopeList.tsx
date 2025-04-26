"use client";

import { Accordion, AccordionItem } from "@heroui/accordion";
import { Chip } from "@heroui/chip";

import Icons from "@/components/icons";
import { Scopes } from "@/config/scope";

type Props = {
  scopes: Array<string>;
};
export const ScopeList: React.FC<Props> = ({ scopes }) => {
  return (
    <div className="border border-gray-300 rounded-xl">
      <Accordion>
        {scopes
          .filter((s) => !!Scopes[s])
          .map((scopeName: string, index: number) => {
            const scope = Scopes[scopeName];

            console.log(scope);

            return (
              <AccordionItem
                key={index}
                aria-label={`Accordion ${index}`}
                startContent={<Icons.LockClosed />}
                title={scope.details}
              >
                Give Access:{" "}
                {scope.claims.map((c, index) => (
                  <Chip key={index} className="ml-2" color="primary" size="sm">
                    {c}
                  </Chip>
                ))}
              </AccordionItem>
            );
          })}
      </Accordion>
    </div>
  );
};
