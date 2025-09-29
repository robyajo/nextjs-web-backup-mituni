import PageConponentsAdmin from "../../_components/page-components";
import { BreadcrumbType } from "@/types";
import { Metadata } from "next";
import ViewPageServices from "./_components/v-page";

export const metadata: Metadata = {
  title: "Services",
  description: "Services",
};

export default async function Page() {
  const breadcrumbs: BreadcrumbType[] = [
    {
      label: "Services",
      href: "/services",
      isCurrent: true,
    },
  ];
  return (
    <>
      <PageConponentsAdmin breadcrumb={breadcrumbs}>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <ViewPageServices />
        </div>
      </PageConponentsAdmin>
    </>
  );
}
