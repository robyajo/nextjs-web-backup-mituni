import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonTable({
  columns,
  rows,
}: {
  columns: any;
  rows: number;
}) {
  return (
    <>
      {Array(rows)
        .fill(0)
        .map((_, rowIndex) => (
          <tr
            key={`skeleton-row-${rowIndex}`}
            className="border border-gray-200 dark:border-gray-700"
          >
            {columns.map((column: any, colIndex: any) => (
              <td
                key={`skeleton-cell-${rowIndex}-${colIndex}`}
                className="px-3 py-2 border border-gray-200 dark:border-gray-700"
              >
                <div
                  className="h-4 bg-muted/50 rounded animate-pulse"
                  style={{
                    width: column.size ? `${column.size}px` : "100%",
                    minWidth: "50px",
                    maxWidth: "100%",
                  }}
                />
              </td>
            ))}
          </tr>
        ))}
    </>
  );
}
