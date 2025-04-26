"use client";

import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";

export const BreadCrumb = () => {
  return (
    <>
      <Breadcrumbs size="lg" variant="solid">
        <BreadcrumbItem>Authentication</BreadcrumbItem>
        <BreadcrumbItem className="text-purple-500">
          Applications
        </BreadcrumbItem>
      </Breadcrumbs>
    </>
  );
};
