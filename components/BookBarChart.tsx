"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "Janvier", livre: 186, ebook: 80 },
  { month: "Février", livre: 305, ebook: 200 },
  { month: "Mars", livre: 237, ebook: 120 },
  { month: "Avril", livre: 73, ebook: 190 },
  { month: "Mai", livre: 209, ebook: 130 },
  { month: "Juin", livre: 214, ebook: 140 },
];

const chartConfig = {
  livre: {
    label: "Physiques",
    color: "hsl(var(--chart-1))",
  },
  ebook: {
    label: "Ebook",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function BookBarChart() {
  return (
    <div className="w-full h-[155px]">
      <ChartContainer className="h-full w-full" config={chartConfig}>
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          <Bar dataKey="livre" fill="var(--color-livre)" radius={4} />
          <Bar dataKey="ebook" fill="var(--color-ebook)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
