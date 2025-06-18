
import { ModuleCard, Module } from "./ModuleCard";

interface ModuleGridProps {
  modules: Module[];
}

export function ModuleGrid({ modules }: ModuleGridProps) {
  if (modules.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-60 bg-muted/30 rounded-lg">
        <p className="text-muted-foreground text-center max-w-md">
          You haven't added any modules yet. 
          Click the "Add Module" button to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {modules.map((module) => (
        <ModuleCard key={module.id} module={module} />
      ))}
    </div>
  );
}
