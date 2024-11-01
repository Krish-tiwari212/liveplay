"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, Rectangle, XAxis, YAxis } from "recharts";

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
import { useEffect } from "react";

export const description = "A bar chart with an active bar";

const chartData = [
  { category: "category1", salsepercategory: 187, fill: "#17202a" },
  { category: "category2", salsepercategory: 200, fill: "#17202a" },
  { category: "category3", salsepercategory: 275, fill: "#21bd5c" },
  { category: "category4", salsepercategory: 173, fill: "#17202a" },
  { category: "category5", salsepercategory: 90, fill: "#17202a" },
];

const chartConfig = {
  salsepercategory: {
    label: "Sales Per Category : Rs",
  },
  category1: {
    label: "category1",
    color: "hsl(var(--chart-1))",
  },
  category2: {
    label: "category2",
    color: "hsl(var(--chart-2))",
  },
  category3: {
    label: "category3",
    color: "hsl(var(--chart-3))",
  },
  category4: {
    label: "category4",
    color: "hsl(var(--chart-4))",
  },
  category5: {
    label: "category5",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

interface ChartBarProps {
  chartData: any;
  chartConfig: any;
  dataKey: string;
  processCategory: any;
  title: string;
  description: string
  type:string
}

export function ChartBar({
  chartConfig,
  dataKey,
  chartData,
  processCategory,
  title,
  description,
  type,
}: ChartBarProps) {
  useEffect(() => {
    console.log(processCategory);
  }, []);
  return (
    <Card className="bg-[#17202a]">
      <CardHeader>
        <CardTitle className="flex items-center gap-4 text-white">
          {title} <TrendingUp />
        </CardTitle>
        <CardDescription className="text-gray-400">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          {type === "vertical" ? (
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                left: 0,
              }}
            >
              <YAxis
                dataKey="category"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={processCategory}
              />
              <XAxis dataKey={dataKey} type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar dataKey={dataKey} layout="vertical" radius={5}>
                <LabelList
                  dataKey={dataKey}
                  position="right"
                  offset={8}
                  className="fill-[#fff]"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          ) : (
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={processCategory}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                dataKey={dataKey}
                radius={8}
                activeBar={({ ...props }) => {
                  return <Rectangle {...props} />;
                }}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-[#fff]"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          )}
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
}
