// DashboardContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface DashboardContextType {
  title: string;
  setTitle: (title: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState<string>("Tableau de bord");

  return (
    <DashboardContext.Provider value={{ title, setTitle }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
