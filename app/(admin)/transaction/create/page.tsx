import { BreadcrumbType } from "@/types";
import { Metadata } from "next";

import LaundryCheckout from "./client/c-create-transaction";
import PageConponentsAdmin from "../../_components/page-components";

export const metadata: Metadata = {
  title: "Buat Transaksi",
  description: "Buat Transaksi",
};

export default async function Page() {
  const breadcrumbs: BreadcrumbType[] = [
    {
      label: "Buat Transaksi",
      href: "/transaction/create",
      isCurrent: true,
    },
  ];
  return (
    <>
      <PageConponentsAdmin breadcrumb={breadcrumbs}>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <LaundryCheckout />
        </div>
      </PageConponentsAdmin>
    </>
  );
}
