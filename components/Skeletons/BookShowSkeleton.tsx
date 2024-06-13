import React from "react";
import { Skeleton } from "../ui/skeleton";

const BookShowSkeleton = () => {
  return (
    <div className="w-full h-auto pt-16 px-28 max-sm:px-0 bg-primary/5">
      <div className="grid grid-cols-[300px_300px_1fr] max-lg:grid-cols-[300px_300px] max-sm:grid-cols-1 p-4 h-72 justify-center">
        <div className="flex flex-col font-thin justify-center items-center gap-8 h-full max-sm:hidden">
          <Skeleton className=" w-14 h-14 rounded-full "></Skeleton>
          <Skeleton className=" w-14 h-14 rounded-full "></Skeleton>
        </div>
        <div className="relative mr-8">
          <Skeleton className="h-[350px] max-lg:h-[250px] max-lg:w-[170px] max-sm:left-1/4"></Skeleton>
        </div>
        <div className=" pr-20 max-lg:col-span-2 max-lg:mt-32 max-sm:mt-[280px]">
          <Skeleton className="h-8 w-[150px] mb-8"></Skeleton>
          <Skeleton className="h-4 w-[150px] mb-8"></Skeleton>
          <div className="flex flex-wrap gap-4">
            <Skeleton className="h-8 w-40 rounded-xl" />
            <Skeleton className="h-8 w-52 rounded-xl" />
            <Skeleton className="h-8 w-28 rounded-xl" />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full py-8 bg-background rounded-md px-12 max-lg:mt-56">
        <div className="flex justify-end">
          <div className="flex justify-between gap-4 w-[500px]">
            <Skeleton className="h-12 w-36 rounded-3xl"></Skeleton>
            <div className=" flex gap-3">
              <Skeleton className=" h-12 w-12 rounded-full "></Skeleton>
              <Skeleton className="h-12 w-12 rounded-full"></Skeleton>
              <Skeleton className="h-12 w-12 rounded-full"></Skeleton>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 max-lg:grid-cols-1 mt-16">
          <div className="flex gap-4 flex-col px-10 max-sm:px-0">
            <div className="flex flex-col gap-4">
              <Skeleton className="w-28 h-12"></Skeleton>
              <Skeleton className=" w-full h-8"></Skeleton>
              <Skeleton className=" w-full h-8"></Skeleton>
              <Skeleton className=" w-full h-8"></Skeleton>
            </div>
          </div>

          <div className="flex gap-4 flex-col px-10 max-sm:px-0">
            <div className="flex flex-col gap-4">
              <Skeleton className="w-28 h-12"></Skeleton>
              <Skeleton className=" w-full h-8"></Skeleton>
            </div>
            <div className="flex flex-col gap-4">
              <Skeleton className="w-28 h-12"></Skeleton>
              <Skeleton className=" w-full h-8"></Skeleton>
            </div>
            <div className="flex flex-col gap-4">
              <Skeleton className="w-28 h-12"></Skeleton>
              <Skeleton className=" w-full h-8"></Skeleton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookShowSkeleton;
