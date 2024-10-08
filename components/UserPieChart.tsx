"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getAllStatistics } from "@/lib/data/statistics";
import { Skeleton } from "./ui/skeleton";

// const { statistics } = getAllStatistics()

// const chartData = [
//   { userType: "eneamien", visitors: statistics?.eneamiensNumber, fill: "var(--color-eneamien)" },
//   { userType: "externe", visitors: statistics?.externesNumber, fill: "var(--color-externe)" },
//   { userType: "enseignant", visitors: statistics?.teachersNumber, fill: "var(--color-enseignant)" },
//   // { userType: "edge", visitors: 173, fill: "var(--color-edge)" },
//   // { userType: "other", visitors: 190, fill: "var(--color-other)" },
// ];

// const chartConfig = {
//   visitors: {
//     label: "Visiteurs",
//   },
//   eneamien: {
//     label: "Eneamien",
//     color: "hsl(var(--chart-1))",
//   },
//   externe: {
//     label: "Externe",
//     color: "hsl(var(--chart-2))",
//   },
//   enseignant: {
//     label: "Enseignant",
//     color: "hsl(var(--chart-5))",
//   },
//   // edge: {
//   //   label: "Edge",
//   //   color: "hsl(var(--chart-4))",
//   // },
//   // other: {
//   //   label: "Other",
//   //   color: "hsl(var(--chart-3))",
//   // },
// } satisfies ChartConfig;

interface UserPieChartProps {
  eneamiensNumber: number;
  externesNumber: number;
  teachersNumber: number;
}

export function UserPieChart({eneamiensNumber, externesNumber, teachersNumber}: UserPieChartProps) {

  const chartData = [
    {
      userType: "eneamien",
      visitors: eneamiensNumber,
      // visitors: statistics?.eneamiensNumber,
      fill: "var(--color-eneamien)",
    },
    {
      userType: "externe",
      visitors: externesNumber,
      fill: "var(--color-externe)",
    },
    {
      userType: "enseignant",
      visitors: teachersNumber,
      fill: "var(--color-enseignant)",
    },
  ];

  const chartConfig = {
    visitors: {
      label: "Visiteurs",
    },
    eneamien: {
      label: "Eneamien",
      color: "hsl(var(--chart-1))",
    },
    externe: {
      label: "Externe",
      color: "hsl(var(--chart-2))",
    },
    enseignant: {
      label: "Enseignant",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <div>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[180px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="visitors"
            nameKey="userType"
            innerRadius={60}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-2xl font-bold"
                      >
                        {totalVisitors.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Utilisateurs
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
}
