"use client";

import { Button } from "@/components/ui/button";
import { Table, Grid } from "lucide-react";

interface ViewToggleProps {
  viewMode: "table" | "card";
  onViewModeChange: (mode: "table" | "card") => void;
}

export function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 border rounded-md p-1">
      <Button
        variant={viewMode === "table" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewModeChange("table")}
        className="h-8 px-2"
      >
        <Table className="h-4 w-4" />
      </Button>
      <Button
        variant={viewMode === "card" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewModeChange("card")}
        className="h-8 px-2"
      >
        <Grid className="h-4 w-4" />
      </Button>
    </div>
  );
}