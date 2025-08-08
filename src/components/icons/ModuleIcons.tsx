
import { Grid2X2, LayoutGrid, Square } from "lucide-react";

export type ModuleIconName = "grid" | "layout" | "square";

interface ModuleIconProps {
  name: ModuleIconName;
  className?: string;
  size?: number;
}

export const ModuleIcon = ({ name, className, size = 24 }: ModuleIconProps) => {
  switch (name) {
    case "grid":
      return <Grid2X2 size={size} className={className} />;
    case "layout":
      return <LayoutGrid size={size} className={className} />;
    case "square":
      return <Square size={size} className={className} />;
    default:
      return <Square size={size} className={className} />;
  }
};
