"use client";

import { FileCog, Home, UserCog } from "lucide-react";

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

export function MainSetting() {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
        Setting
      </SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem
          className={
            pathname === "/setting/outlet"
              ? "active bg-sidebar-accent rounded-md text-foreground"
              : ""
          }
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarMenuButton
                asChild
                className={
                  pathname === "/setting/outlet"
                    ? "active bg-sidebar-accent rounded-md text-foreground"
                    : ""
                }
              >
                <Link href="/setting/outlet">
                  <FileCog />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Pengaturan Outlet
                  </span>
                </Link>
              </SidebarMenuButton>
            </TooltipTrigger>
            <TooltipContent side="right">Pengaturan Outlet</TooltipContent>
          </Tooltip>
        </SidebarMenuItem>
        <SidebarMenuItem
          className={
            pathname === "/setting/membership"
              ? "active bg-sidebar-accent rounded-md text-foreground"
              : ""
          }
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarMenuButton
                asChild
                className={
                  pathname === "/setting/membership"
                    ? "active bg-sidebar-accent rounded-md text-foreground"
                    : ""
                }
              >
                <Link href="/setting/membership">
                  <UserCog />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Membership
                  </span>
                </Link>
              </SidebarMenuButton>
            </TooltipTrigger>
            <TooltipContent side="right">Membership</TooltipContent>
          </Tooltip>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
