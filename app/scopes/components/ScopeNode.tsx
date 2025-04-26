'use client';
import Icons from "@/components/icons";
import { Button } from "@heroui/button";
import { Handle, Position } from "@xyflow/react";
import { completionScope } from "../action/completion";
import { useState } from "react";
import { Scope } from "@prisma/client";


type Props = {
  data: {
    name: string;
    scopes: Array<Scope>
  };
};

export const ScopeNode = ({ data }: Props) => {

  const [loading, setLoading] = useState(false);
  const [scopes, setScopes] = useState(data.scopes);

  return <div className="border rounded bg-gray-50">
    <div className="mb-3 pl-2 bg-gray-300 flex justify-between items-center" >
      <p>{data.name}</p>
      <Button
        isIconOnly
        onPress={() => {
          setLoading(true);
          completionScope(data.name).then((data) => {
            setScopes(data);
          }).finally(() => {
            setLoading(false);
          });
        }}
        isLoading={loading}
      >
        {<Icons.Ai className="size-4" />}
      </Button>
    </div>
    {
      scopes.map((scope, index) => (
        <div key={index} className="relative">
          <Handle id={`${data.name}:${scope.name}`}
            type="source"
            position={Position.Right}
            style={{
              position: 'relative',
              top: '18px',
              left: '100%'
            }}
          />
          <div className="pl-2 pr-5">
            <p>{scope.name}</p>
          </div>
        </div>
      ))
    }
  </div >
}
