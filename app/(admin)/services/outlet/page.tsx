import PageConponentsAdmin from "../../_components/page-components";
import { BreadcrumbType } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Outlet",
  description: "Outlet",
};
export default function Page() {
  const breadcrumbs: BreadcrumbType[] = [
    {
      label: "Outlet",
      href: "/services/outlet",
      isCurrent: true,
    },
  ];
  return (
    <>
      <PageConponentsAdmin breadcrumb={breadcrumbs}>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
      </PageConponentsAdmin>
    </>
  );
}
