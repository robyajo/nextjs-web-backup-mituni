"use client";
import React, { useState, useCallback } from "react";
import { DataTable } from "./table/data-table";

import { HeadingAdmin } from "../../_components/patrials/heading-admin";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTransactionData } from "./resource-api";
import { columns } from "./table/columns";

type Customer = {
  id: string | number;
  name: string;
  gender: string;
  phone_number: string;
  email: string;
  address: string;
  [key: string]: any; // For any additional properties
};

export default function ViewPageTransaction() {
  const [pagination, setPagination] = useState({
    pageSize: 10, // Default page size
    pageIndex: 0, // 0-based index
  });
  // Filter state
  const [filters, setFilters] = useState({
    search: "",
    status: "",
  });
  const {
    data: apiResponse,
    isLoading: loadingInfo,
    error: errorInfo,
    refetch: refetchInfo,
  } = useTransactionData(
    filters.search,
    filters.status,
    pagination.pageSize,
    pagination.pageIndex + 1 // Convert 0-based to 1-based for API
  );
  // console.log("apiResponse", apiResponse);
  // Handle API response with no data - don't treat as error
  const apiData = (apiResponse as unknown as any)?.data;
  const isNoDataFound =
    apiResponse?.success === false &&
    apiResponse?.message === "Tidak ada data balita ditemukan.";

  // If no data found, return empty array but keep the table visible
  const userData: any[] = isNoDataFound ? [] : apiData?.data || [];
  const pageCount = Math.ceil((apiData?.total || 0) / pagination.pageSize) || 1;
  const totalItems = isNoDataFound ? 0 : apiData?.total || 0;

  // Debug logging
  console.log("Pagination State:", {
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    totalItems,
    pageCount,
    hasNextPage: pagination.pageIndex < pageCount - 1,
    apiData: {
      last_page: apiData?.last_page,
      current_page: apiData?.current_page,
      total: apiData?.total,
      per_page: apiData?.per_page,
    },
    // Add more detailed logging for debugging
    calculatedPageCount: Math.ceil((apiData?.total || 0) / pagination.pageSize),
    isLastPage: pagination.pageIndex >= pageCount - 1,
    isFirstPage: pagination.pageIndex <= 0,
  });

  const handleFilter = useCallback(
    (newFilters: { search: string; status: string }) => {
      // Only update if filters actually changed
      if (
        filters.search !== newFilters.search ||
        filters.status !== newFilters.status
      ) {
        console.log("Filter changed, resetting to page 1");
        setFilters(newFilters);
        // Reset to first page when filters change
        setPagination((prev) => ({
          ...prev,
          pageIndex: 0, // Reset to first page
        }));
      }
    },
    [filters]
  );

  // Handle pagination changes
  const handlePaginationChange = useCallback(
    ({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) => {
      console.log("Pagination changed:", { pageIndex, pageSize });
      // Update the pagination state
      setPagination((prev) => ({
        pageIndex,
        pageSize,
      }));

      // Trigger a refetch with the new pagination
      refetchInfo();
    },
    [refetchInfo]
  );
  return (
    <>
      <div className="space-y-6 lg:space-y-4">
        <div className="flex items-start justify-between">
          <HeadingAdmin
            title="Transaksi"
            description="Data transaksi yang telah dibuat."
          />
        </div>
        {errorInfo ? (
          <Alert variant="destructive">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertTitle>Oops! Terjadi Error!</AlertTitle>
            <AlertDescription>
              <p>
                {typeof errorInfo === "string"
                  ? errorInfo
                  : errorInfo &&
                    typeof errorInfo === "object" &&
                    "response" in errorInfo &&
                    errorInfo.response &&
                    (errorInfo.response as any).data?.message
                  ? (errorInfo as any).response.data?.message
                  : errorInfo?.message || "Gagal memuat data dari API."}
              </p>
            </AlertDescription>
          </Alert>
        ) : (
          <DataTable
            columns={columns}
            data={userData}
            isLoading={loadingInfo}
            onFilter={handleFilter}
            // refetchData={refetchInfo}
            stickyColumns={["customer_name"]}
            pageCount={pageCount}
            pageIndex={pagination.pageIndex}
            pageSize={pagination.pageSize}
            onPaginationChange={handlePaginationChange}
            totalItems={totalItems}
          />
        )}
      </div>
    </>
  );
}
