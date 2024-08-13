"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getAllStatistics } from "@/lib/data/statistics";

type GroupedData = {
  month: string
  ebooks_number: number
  physical_books_number: number
};


export function BookBarChart() {
  const { statistics, isLoading, error } = getAllStatistics();

  if (error) return <div>Erreur</div>;

  if (isLoading || !statistics) return <div>Loading</div>

  const data = statistics.monthlyStats
  const groupedData: GroupedData[]  = [];

  Object.values(data).forEach((item) => {
    // const { month, valid_memories_number, invalid_memories_number } = item;
    groupedData.push(item)
  });
  
  // console.log(groupedData);
  const chartData = groupedData.map((month) => ({
    month: month.month,
    ebook: month.ebooks_number,
    livre: month.physical_books_number,
  }));

  // const chartData = [
  //   { month: "Janvier", livre: 186, ebook: 80 },
  //   { month: "Février", livre: 305, ebook: 200 },
  //   { month: "Mars", livre: 237, ebook: 120 },
  //   { month: "Avril", livre: 73, ebook: 190 },
  //   { month: "Mai", livre: 209, ebook: 130 },
  //   { month: "Juin", livre: 214, ebook: 140 },
  // ];
  
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
