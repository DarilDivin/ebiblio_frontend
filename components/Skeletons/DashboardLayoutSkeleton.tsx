import React from "react";
import { Skeleton } from "../ui/skeleton";

const DashboardLayoutSkeleton = () => {
  return (
    <div
      className={`w-full h-screen overflow-hidden bg-primary/10 p-2 grid gap-2 grid-cols-[200px_1fr]`}
    >
      <div className="w-fit">
        <Skeleton className="w-[200px] h-[98vh]"></Skeleton>
      </div>
      <div className="bg-background rounded-md w-full h-screen overflow-y-scroll">
        <div className="p-2">
          <Skeleton className="w-full h-16" />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayoutSkeleton;
