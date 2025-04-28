'use client'


import { DivProps } from "@/types/props"
import { Button } from "@heroui/button";
import { Input, InputProps } from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import Icons from "./icons";

type Props = {
  values?: Array<string>;
  defaultValues?: Array<string>;
  onValueChange?: (values: string[]) => void;
  baseInputProps?: InputProps;
  listInputProps?: InputProps;
} & DivProps;

export const ListInput = ({ onValueChange, baseInputProps, listInputProps, defaultValues, ...props }: Props) => {

  const [localValues, setLocalValues] = useState<string[]>(props.values || []);
  const [value, setValue] = useState<string>('');

  const values: string[] = useMemo(() => {
    if (props.values) return props.values;
    return localValues;
  }, [localValues, props.values])

  const onChange = () => {
    onValueChange && onValueChange(localValues);
  }

  const onAddValue = () => {
    if (!value) return;
    setLocalValues([...localValues, value]);
    setValue('');
  }

  const onRemoveValue = (index: number) => {
    setLocalValues(
      localValues.filter((_, _i) => _i !== index),
    );
  }

  useEffect(() => {
    onChange();
  }, [localValues])



  return <div className="w-full flex flex-col gap-3" {...props}>
    <Input
      className="pr-0"
      endContent={
        <div
          className="cursor-pointer p-0 m-0"
          onClick={onAddValue}
        >
          <Icons.PlusCircle />
        </div>
      }
      labelPlacement="outside"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...baseInputProps}
    />

    {values.map((v, i) => (
      <Input
        key={i}
        color="secondary"
        contentEditable={false}
        disabled={true}
        endContent={
          <div
            className="cursor-pointer"
            onClick={() => onRemoveValue(i)}
          >
            <Icons.MinusCircle />
          </div>
        }
        labelPlacement="outside"
        value={v}
        {...listInputProps}
      />
    ))}
  </div>

}
