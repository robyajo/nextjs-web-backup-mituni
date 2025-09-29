import PageConponentsAdmin from "../../_components/page-components";
import { BreadcrumbType } from "@/types";
import { Metadata } from "next";
import ViewPageRak from "./_components/v-page";

export const metadata: Metadata = {
  title: "Rak",
  description: "Rak",
};

export default async function Page() {
  const breadcrumbs: BreadcrumbType[] = [
    {
      label: "Rak",
      href: "/rak",
      isCurrent: true,
    },
  ];
  return (
    <>
      <PageConponentsAdmin breadcrumb={breadcrumbs}>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <ViewPageRak />
        </div>
      </PageConponentsAdmin>
    </>
  );
}
