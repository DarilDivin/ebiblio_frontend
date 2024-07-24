"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "Janvier", validé: 186, enAttente: 80 },
  { month: "Février", validé: 305, enAttente: 200 },
  { month: "Mars", validé: 237, enAttente: 120 },
  { month: "Avril", validé: 73, enAttente: 190 },
  { month: "Mai", validé: 209, enAttente: 130 },
  { month: "Juin", validé: 214, enAttente: 140 },
];

const chartConfig = {
  validé: {
    label: "Validé",
    color: "hsl(var(--chart-1))",
  },
  enAttente: {
    label: "En attente de validation",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function MemoireLineChart() {
  return (
    <div className="h-[155px] w-full">
      <ChartContainer className="h-full w-full" config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Area
            dataKey="enAttente"
            type="natural"
            fill="var(--color-enAttente)"
            fillOpacity={0.4}
            stroke="var(--color-enAttente)"
            stackId="a"
          />
          <Area
            dataKey="validé"
            type="natural"
            fill="var(--color-validé)"
            fillOpacity={0.4}
            stroke="var(--color-validé)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}

export function MemoireLineChartGradient() {
  return (
    <div className="h-[155px] w-full">
      <ChartContainer className="h-full w-full" config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <defs>
            <linearGradient id="fillValidated" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-validé)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-validé)"
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id="fillWaiting" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-enAttente)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-enAttente)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area
            dataKey="enAttente"
            type="natural"
            fill="url(#fillWaiting)"
            fillOpacity={0.4}
            stroke="var(--color-enAttente)"
            stackId="a"
          />
          <Area
            dataKey="validé"
            type="natural"
            fill="url(#fillValidated)"
            fillOpacity={0.4}
            stroke="var(--color-validé)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
