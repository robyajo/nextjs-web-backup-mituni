"use client";

import {
  Archive,
  ChevronRight,
  Home,
  Layers,
  Shirt,
  SoapDispenserDroplet,
  Store,
  Users,
} from "lucide-react";

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
import { CollapsibleMenu } from "./collapsible-menu";

export function MainLayanan() {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem
          className={
            pathname === "/dashboard"
              ? "active bg-main outline-border outline-2 rounded-md text-main-foreground"
              : ""
          }
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarMenuButton asChild>
                <Link href="/dashboard">
                  <Home />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Dashboard
                  </span>
                </Link>
              </SidebarMenuButton>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
        </SidebarMenuItem>
      </SidebarMenu>
      <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
        Layanan
      </SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarMenuButton
                asChild
                className={
                  pathname === "/services/items"
                    ? "active bg-main outline-border outline-2 rounded-md text-main-foreground"
                    : ""
                }
              >
                <Link href="/services/items">
                  <Layers />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Layanan
                  </span>
                </Link>
              </SidebarMenuButton>
            </TooltipTrigger>
            <TooltipContent side="right">Layanan</TooltipContent>
          </Tooltip>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarMenuButton
                asChild
                className={
                  pathname === "/services/dry"
                    ? "active bg-main outline-border outline-2 rounded-md text-main-foreground"
                    : ""
                }
              >
                <Link href="/services/dry">
                  <Shirt />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Dry
                  </span>
                </Link>
              </SidebarMenuButton>
            </TooltipTrigger>
            <TooltipContent side="right">Dry</TooltipContent>
          </Tooltip>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarMenuButton
                asChild
                className={
                  pathname === "/services/rak"
                    ? "active bg-main outline-border outline-2 rounded-md text-main-foreground"
                    : ""
                }
              >
                <Link href="/services/rak">
                  <Archive />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Rak
                  </span>
                </Link>
              </SidebarMenuButton>
            </TooltipTrigger>
            <TooltipContent side="right">Rak</TooltipContent>
          </Tooltip>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarMenuButton
                asChild
                className={
                  pathname === "/services/perfume"
                    ? "active bg-main outline-border outline-2 rounded-md text-main-foreground"
                    : ""
                }
              >
                <Link href="/services/perfume">
                  <SoapDispenserDroplet />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Parfum
                  </span>
                </Link>
              </SidebarMenuButton>
            </TooltipTrigger>
            <TooltipContent side="right">Parfum</TooltipContent>
          </Tooltip>
        </SidebarMenuItem>

        <CollapsibleMenu
          item={{
            title: "Pelanggan",
            url: "/services/customers",
            icon: Users,
            isActive: pathname === "/services/customers",
            items: [
              {
                title: "List Pelanggan",
                url: "/services/customers",
              },
              {
                title: "Rekap Data",
                url: "/services/customers/rekap",
              },
            ],
          }}
        />
        <CollapsibleMenu
          item={{
            title: "Outlet",
            url: "/services/outlet",
            icon: Store,
            isActive: pathname === "/services/outlet",
            items: [
              {
                title: "List Outlet",
                url: "/services/outlet",
              },
              {
                title: "Tambah Outlet",
                url: "/services/outlet/tambah",
              },
            ],
          }}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
}
