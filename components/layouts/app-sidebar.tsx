"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { doctorSidebarLinks, patientSidebarLinks } from "@/lib/constants"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  role: "doctor" | "patient"
}

export function AppSidebar({ role, ...props }: AppSidebarProps) {
  const pathname = usePathname()
  const links = role === "doctor" ? doctorSidebarLinks : patientSidebarLinks

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex flex-col  gap-0.5 leading-none">
                  <span className="font-medium">
                    {role === "doctor" ? "Doctor Portal" : "Patient Portal"}
                  </span>
                  <span className="text-xs text-muted-foreground capitalize">{role}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {links.map((link) => {
  const isActive = pathname === link.href;

  return (
    <SidebarMenuItem key={link.href}>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        className={
          isActive
            ? "bg-green-600/70! text-white! hover:bg-green-500/90!"
            : ""
        }
      >
        <Link href={link.href}>
          <HugeiconsIcon icon={link.icon} size={16} strokeWidth={2} />
          <span>{link.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
})}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}