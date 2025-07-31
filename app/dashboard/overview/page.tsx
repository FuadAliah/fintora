"use client"
import React from "react";
import DashboardHeader from "@/components/dashboard-header";
import DashboardStats from "@/components/dashboard/dashboard-stats";
import { BarCharts } from "@/components/bar-charts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { chartConfig, chartData } from "@/constant";
import { useSession } from "next-auth/react";

export default function overview() {
  const { data: session } = useSession();

  return (
    <>
      <div className="w-full bg-[var(--secondary-dark-color)]">
        <div className="max-w-[1248px] mx-auto">
          <DashboardHeader
            title={`Welcome back, ${session?.user?.name ?? "Guest"}`}
            subtitle="This is your overview report for the selected period"
          />
          <DashboardStats />
        </div>
      </div>
      <div className="max-w-[1248px] mx-auto m-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Transaction Overview</CardTitle>
              <CardDescription>
                This chart shows your transaction overview for the selected
                period.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarCharts chartConfig={chartConfig} chartData={chartData} />
            </CardContent>
          </Card>
          <div className="lg:col-span-1">Fuad</div>
        </div>
      </div>
    </>
  );
}
