
import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ModuleIcon, ModuleIconName } from "../icons/ModuleIcons";
import { toast } from 'sonner';
import { Module } from "./ModuleCard";

// Mock module list
const availableModules: Array<Omit<Module, "id">> = [
  {
    name: "Task Manager",
    description: "Organize and track your tasks and projects",
    icon: "square",
    color: "#4f46e5",
    route: "/modules/tasks"
  },
  {
    name: "Calendar",
    description: "Schedule and manage your events",
    icon: "layout",
    color: "#0ea5e9",
    route: "/modules/calendar"
  },
  {
    name: "Notes",
    description: "Take and organize your notes",
    icon: "grid",
    color: "#22c55e",
    route: "/modules/notes"
  },
  {
    name: "Analytics",
    description: "Visualize and analyze your data",
    icon: "layout",
    color: "#f59e0b",
    route: "/modules/analytics"
  },
  {
    name: "CRM",
    description: "Manage your customer relationships",
    icon: "square",
    color: "#ec4899",
    route: "/modules/crm"
  },
];

interface AddModuleDialogProps {
  onAddModule: (module: Module) => void;
}

export function AddModuleDialog({ onAddModule }: AddModuleDialogProps) {
  const [open, setOpen] = React.useState(false);

  const handleAddModule = (moduleTemplate: Omit<Module, "id">) => {
    // In a real app, you'd make an API call here
    const newModule: Module = {
      ...moduleTemplate,
      id: Math.random().toString(36).substring(2, 9)
    };
    
    onAddModule(newModule);
    
    toast.success("Module Added");
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Add Module
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="mb-4">Add New Module</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {availableModules.map((module) => (
            <div 
              key={module.name}
              className="border rounded-lg p-4 flex flex-col gap-2 cursor-pointer hover:border-primary/50 transition-all"
              onClick={() => handleAddModule(module)}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="p-2 rounded-md" 
                  style={{ backgroundColor: `${module.color}20` }}
                >
                  <ModuleIcon 
                    name={module.icon as ModuleIconName} 
                    className="text-foreground"
                    size={20}
                  />
                </div>
                <h3 className="font-medium">{module.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{module.description}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
