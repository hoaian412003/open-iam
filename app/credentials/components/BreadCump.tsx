"use client";

import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";

export const BreadCump = () => {
  return (
    <Breadcrumbs size="lg" variant="solid">
      <BreadcrumbItem>Authentication</BreadcrumbItem>
      <BreadcrumbItem>Credentials</BreadcrumbItem>
    </Breadcrumbs>
  );
};
