"use client";

import { ModalProps as HModalProps, useDisclosure } from "@heroui/modal";
import { forwardRef, useImperativeHandle } from "react";

export type ModalProps<P> = Omit<HModalProps, "children"> & P;
export type Modal<P> = React.FC<ModalProps<P>>;

export type ModalAction = {
  open: () => void;
  close: () => void;
};

export const createModal = <P extends any>(ModalElement: Modal<P>) => {
  return forwardRef<ModalAction, ModalProps<P>>((props, ref) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    useImperativeHandle(ref, () => ({
      open: onOpen,
      close: onClose,
    }));

    return <ModalElement isOpen={isOpen} onClose={onClose} {...props} />;
  });
};
