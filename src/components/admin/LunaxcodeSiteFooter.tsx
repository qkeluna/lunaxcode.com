"use client";

import { Separator } from "@/components/ui/separator";

export function LunaxcodeSiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>© 2024 Lunaxcode. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Admin Panel v1.0</span>
          <Separator orientation="vertical" className="h-4" />
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </footer>
  );
}