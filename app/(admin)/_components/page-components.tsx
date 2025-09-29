import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { BreadcrumbType } from "@/types";
import { ThemeSwitcher } from "@/components/theme-switcher";

// import { Footer } from "./footer";

export default function PageConponentsAdmin({
  children,
  breadcrumb,
}: {
  children: React.ReactNode;
  breadcrumb: BreadcrumbType[];
}) {
  return (
    <>
      <header className="sticky top-0 z-50 bg-background/10 backdrop-blur supports-[backdrop-filter]:bg-background/10 flex h-15 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b border:black/10 dark:border-white/10">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumb.map((item, idx) => (
                <React.Fragment key={item.href}>
                  <BreadcrumbItem>
                    {item.isCurrent ? (
                      <BreadcrumbPage className="font-bold">
                        {item.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={item.href} className="font-medium">
                        {item.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {idx < breadcrumb.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto flex items-center gap-2 mr-4">
          <ThemeSwitcher />
        </div>
      </header>
      <div className="@container my-4">{children}</div>
      {/* <Footer /> */}
    </>
  );
}
