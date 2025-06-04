
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ModuleIcon, ModuleIconName } from "../icons/ModuleIcons";
import { cn } from "@/lib/utils";

export interface Module {
  id: string;
  name: string;
  description: string;
  icon: ModuleIconName;
  color: string;
  route: string;
}

interface ModuleCardProps {
  module: Module;
  className?: string;
}

export function ModuleCard({ module, className }: ModuleCardProps) {
  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:shadow-md group cursor-pointer",
        className
      )}
      onClick={() => window.location.href = module.route}
    >
      <div 
        className="absolute top-0 left-0 h-1 w-full" 
        style={{ backgroundColor: module.color }}
      />
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center justify-between">
          <div 
            className="p-2 rounded-md" 
            style={{ backgroundColor: `${module.color}20` }}
          >
            <ModuleIcon 
              name={module.icon} 
              className="text-foreground"
              size={20}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-3">
        <CardTitle className="text-lg font-medium mb-1">{module.name}</CardTitle>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {module.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-xs text-muted-foreground">Click to open</p>
      </CardFooter>
    </Card>
  );
}
