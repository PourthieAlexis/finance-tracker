"use client";

import React, { useEffect, useState } from "react";
import { Bar } from "@/lib/chart";
import useSWR from "swr";
import { useAccount } from "@/contexts/AccountContext";

const fetchTransactionsChart = async (accountId: string) => {
  const response = await fetch(`/api/accounts/${accountId}/transaction/charts`);
  if (!response.ok) {
    throw new Error("Failed to fetch transactions chart");
  }
  return response.json();
};

const TransactionsChart: React.FC = () => {
  const { selectedAccount } = useAccount();
  const [chartData, setChartData] = useState<any>(null);

  const { data, error, isLoading } = useSWR(
    ["/api/accounts/transaction/charts", selectedAccount],
    () => fetchTransactionsChart(selectedAccount!)
  );

  useEffect(() => {
    if (data) {
      setChartData({
        labels: data.labels,
        datasets: [
          {
            label: "Balance by Category (€)",
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
        <Bar
          data={chartData}
          options={{
            maintainAspectRatio: false,
          }}
        />
      ) : (
        <div className="flex justify-center items-center h-full w-full text-white">
          No data available
        </div>
      )}
    </div>
  );
};

export default TransactionsChart;
