'use client';
import { Handle, Position } from "@xyflow/react";


type Props = {
  data: {
    name: string;
    scopes: Array<{
      name: string,
      output: string
    }>
  };
};

export const OutputNode = ({ data }: Props) => {

  return <div className="border rounded bg-blue-100">
    <p className="mb-3 pl-2 bg-blue-300">
      {data.name}
    </p >
    {
      data.scopes.map((scope, index) => (
        <div key={index} className="relative">
          <Handle id={`${data.name}:${scope.name}`}
            type="target"
            position={Position.Left}
            style={{
              position: 'relative',
              top: '18px',
              right: '100%'
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
