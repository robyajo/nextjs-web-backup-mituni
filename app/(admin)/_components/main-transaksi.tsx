"use client";

import { DatabaseBackup, ScanLine, ScanText } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";

export function MainTransaksi() {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
        Transaksi
      </SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem
          className={
            pathname === "/transaksi"
              ? "active bg-main outline-border outline-2 rounded-md text-main-foreground"
              : ""
          }
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarMenuButton
                asChild
                className={
                  pathname === "/transaction/create"
                    ? "active bg-main outline-border outline-2 rounded-md text-main-foreground"
                    : ""
                }
              >
                <Link href="/transaction/create">
                  <ScanText />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Transaksi
                  </span>
                </Link>
              </SidebarMenuButton>
            </TooltipTrigger>
            <TooltipContent side="right">Transaksi</TooltipContent>
          </Tooltip>
        </SidebarMenuItem>

        <SidebarMenuItem
          className={
            pathname === "/transaction"
              ? "active bg-main outline-border outline-2 rounded-md text-main-foreground"
              : ""
          }
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarMenuButton
                asChild
                className={
                  pathname === "/transaction"
                    ? "active bg-main outline-border outline-2 rounded-md text-main-foreground"
                    : ""
                }
              >
                <Link href="/transaction">
                  <DatabaseBackup />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Data Transaksi
                  </span>
                </Link>
              </SidebarMenuButton>
            </TooltipTrigger>
            <TooltipContent side="right">Data Transaksi</TooltipContent>
          </Tooltip>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
