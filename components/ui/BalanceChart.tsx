"use client";

import React, { useEffect, useState } from "react";
import { Line } from "@/lib/chart";
import useSWR from "swr";
import { useAccount } from "@/contexts/AccountContext";

const fetchBalanceChart = async (accountId: string) => {
  const response = await fetch(`/api/accounts/${accountId}/balance/charts`);
  if (!response.ok) {
    throw new Error("Failed to fetch balance chart");
  }
  return response.json();
};

const BalanceChart: React.FC = () => {
  const { selectedAccount } = useAccount();

  const [chartData, setChartData] = useState<any>(null);

  const { data, error, isLoading } = useSWR(
    ["/api/accounts/balance/charts", selectedAccount],
    () => fetchBalanceChart(selectedAccount!)
  );

  useEffect(() => {
    if (data) {
      setChartData({
        labels: data.labels,
        datasets: [
          {
            label: "Total Balance (€)",
            data: data.dataPoints,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
          },
        ],
      });
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full w-full text-white bg-neutral rounded-box">
        <div className="loading loading-spinner loading-md"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full w-full text-white bg-neutral rounded-box">
        Failed to load data
      </div>
    );
  }
  return (
    <div className="bg-neutral p-6 rounded-box justify-center flex relative h-full">
      {chartData && chartData.datasets ? (
        <Line
          data={chartData}
          options={{
            maintainAspectRatio: false,
          }}
        />
      ) : (
        <div className="flex justify-center items-center h-full w-full text-white bg-neutral rounded-box">
          No data available
        </div>
      )}
    </div>
  );
};

export default BalanceChart;
