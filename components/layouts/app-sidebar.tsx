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
import { SidebarLinks } from "@/lib/constants"
import Image from "next/image"

export function AppSidebar({  ...props }) {
  const pathname = usePathname()
  const links = SidebarLinks 

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex flex-col  gap-0.5 leading-none">
                  <Image
                                  src="/logo1.png"
                                  alt="CareInktake Logo"
                                  width={800}
                                  height={800}
                                  loading="eager"
                                  className="h-12 w-auto object-contain hidden dark:block"
                                />
                  
                                <Image
                                  src="/logo2.png"
                                  alt="CareInktake Logo"
                                  width={800}
                                  height={800}
                                  loading="eager"
                                  className="h-12 w-auto object-contain dark:hidden block"
                                />
                  
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
            ? "bg-blue-500! text-white! hover:bg-blue-600/90!"
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