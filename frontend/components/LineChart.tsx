"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, ReferenceLine, XAxis, YAxis } from "recharts";

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

interface LineChartProps {
  chartData: any;
  chartConfig: any;
  dataKey: string;
  processCategory: any;
  title: string;
  description: string;
  type: string;
}

export function LineChartDemo({
  chartConfig,
  dataKey,
  chartData,
  processCategory,
  title,
  description,
  type,
}: LineChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-4 ">
          {title} <TrendingUp />
        </CardTitle>
        <CardDescription className="text-gray-400">
          {description}
        </CardDescription>
      </CardHeader>
      {chartData.every((item: any) => item.entriesPerCategory === 0) ? (
        <div className="text-center text-gray-500 min-h-[200px] flex justify-center items-center">Data not available</div>
      ) : (
        <>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 0,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="category"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.split(" ").join("\n")}
                  tick={{
                    fontSize: 7,
                    textAnchor: "middle",
                    width: 10,
                    transform: "translate(0, 0)",
                    style: {
                      display: "block",
                      textAlign: "center",
                      fontWeight: "bold",
                    },
                  }}
                  interval={0}
                />
                <YAxis
                  width={40}
                  label={{
                    value: "Registrations",
                    angle: -90,
                    position: "insideLeft",
                    style: { fontWeight: "bold" },
                  }}
                />
                <ReferenceLine y={0} stroke="#17202a" />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Line
                  dataKey={dataKey}
                  type="linear"
                  stroke="#4186f5"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-center justify-center gap-2 text-md font-semibold  ">
            <h1>Category</h1>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
