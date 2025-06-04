"use client"

import * as React from "react";
import { ModuleGrid } from "@/components/dashboard/ModuleGrid";
import { AddModuleDialog } from "@/components/dashboard/AddModuleDialog";
import { UserProfileSection } from "@/components/dashboard/UserProfileSection";
import { Module } from "@/components/dashboard/ModuleCard";

const Dashboard = () => {
  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    // Random avatar from uifaces.co
    avatarUrl: "https://randomuser.me/api/portraits/men/44.jpg",
  };

  // Mock initial modules (in a real app this would come from API)
  const [modules, setModules] = React.useState<Module[]>([
    {
      id: "1",
      name: "Task Manager",
      description: "Organize and track your tasks and projects",
      icon: "layout",
      color: "#4f46e5",
      route: "/modules/tasks",
    },
    {
      id: "2",
      name: "Calendar",
      description: "Schedule and manage your events",
      icon: "grid",
      color: "#0ea5e9",
      route: "/modules/calendar",
    },
  ]);

 // const handleAddModule = (module: Module) => {
  const handleAddModule = (module: any) => {
    setModules((prev) => [...prev, module]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
        <div className="container flex items-center justify-between h-16">
          <h1 className="text-xl font-semibold">Module Hub</h1>
          <UserProfileSection user={user} />
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground mt-1">
              Manage your modules and applications
            </p>
          </div>
          <AddModuleDialog onAddModule={handleAddModule} />
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Your Modules</h3>
            </div>
            <ModuleGrid modules={modules} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;