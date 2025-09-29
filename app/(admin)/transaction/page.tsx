import { BreadcrumbType } from "@/types";
import { Metadata } from "next";
import PageConponentsAdmin from "../_components/page-components";
import ViewPageTransaction from "./client/c-transaction";

export const metadata: Metadata = {
  title: "Transaksi",
  description: "Transaksi",
};

export default async function Page() {
  const breadcrumbs: BreadcrumbType[] = [
    {
      label: "Transaksi",
      href: "/transaction",
      isCurrent: true,
    },
  ];
  return (
    <>
      <PageConponentsAdmin breadcrumb={breadcrumbs}>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <ViewPageTransaction />
        </div>
      </PageConponentsAdmin>
    </>
  );
}
