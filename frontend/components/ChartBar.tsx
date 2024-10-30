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
import { useEffect } from "react";

export const description = "A multiple bar chart";

interface ChartBarprops {
  data: any;
  title: string;
  chartConfig: any;
  description: string;
  footertitle: string;
  xaxis: string
  processCategory:any
}

export function ChartBar({
  data,
  chartConfig,
  title,
  description,
  footertitle,
  xaxis,
  processCategory,
}: ChartBarprops) {
  useEffect(()=>{
    console.log(processCategory);
  },[])
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
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
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey={xaxis} fill="#cddc29" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {footertitle} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">{description}</div>
      </CardFooter>
    </Card>
  );
}
