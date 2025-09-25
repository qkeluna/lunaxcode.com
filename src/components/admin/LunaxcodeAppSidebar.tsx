"use client";

import { GalleryVerticalEnd, Users, DollarSign, Star, CheckSquare, Settings, FileText, Package } from "lucide-react";
import { Text } from '@/components/ui/text';
// import { cn } from '@/lib/design-tokens'; // Removed unused import
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: GalleryVerticalEnd,
    },
    {
      title: "Submissions",
      url: "/admin/submissions",
      icon: Users,
    },
    {
      title: "Pricing Plans",
      url: "/admin/pricing",
      icon: DollarSign,
    },
    {
      title: "Add-On Services",
      url: "/admin/addons",
      icon: Package,
    },
    {
      title: "Features",
      url: "/admin/features",
      icon: Star,
    },
    {
      title: "Process Steps",
      url: "/admin/process",
      icon: CheckSquare,
    },
    {
      title: "Content Management",
      url: "/admin/content",
      icon: FileText,
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: Settings,
    },
  ],
};

export function LunaxcodeAppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/admin/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-bg-fill-brand)] text-[var(--color-text-brand-on-bg-fill)]">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <Text variant="bodySm" weight="semibold">Lunaxcode</Text>
                  <Text variant="caption" tone="secondary">Admin Panel</Text>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}