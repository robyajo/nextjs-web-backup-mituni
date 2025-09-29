"use client";
import React from "react";
import { useOutletStore } from "@/store/useOutletStore";

export default function ClientDashboard() {
  const outletId = useOutletStore((state) => state.outlet_id_active);

  // Debug log
  // React.useEffect(() => {
  //   console.log("Current outletId:", outletId);
  // }, [outletId]);

  return (
    <div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        {Array.from({ length: 24 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-200 aspect-video h-12 w-full rounded-lg"
          />
        ))}
      </div>
    </div>
  );
}
