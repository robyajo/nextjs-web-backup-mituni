import PageConponentsAdmin from "../_components/page-components";
import { BreadcrumbType } from "@/types";
import { Metadata } from "next";
import ClientDashboard from "./client/c-dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};
export default function Page() {
  const breadcrumbs: BreadcrumbType[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
      isCurrent: true,
    },
  ];
  return (
    <>
      <PageConponentsAdmin breadcrumb={breadcrumbs}>
        <ClientDashboard />
      </PageConponentsAdmin>
    </>
  );
}
