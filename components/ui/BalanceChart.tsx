"use client";

import React, { useEffect, useState } from "react";
import { Line } from "@/lib/chart";
import { getBalanceChartData } from "@/app/actions/chart.actions";
import { useAccount } from "@/contexts/AccountContext";

const BalanceChart: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);
  const { selectedAccount } = useAccount();

  useEffect(() => {
    const getBalanceChart = async () => {
      if (selectedAccount) {
        const { labels, dataPoints } = await getBalanceChartData(
          selectedAccount
        );
        if (labels.length > 0 && dataPoints.length > 0) {
          setChartData({
            labels,
            datasets: [
              {
                label: "Solde Total (€)",
                data: dataPoints,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
              },
            ],
          });
        } else {
          setChartData(null);
        }
      }
    };

    getBalanceChart();
  }, [selectedAccount]);

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
        <div className="flex justify-center items-center h-full w-full text-white">
          No data available
        </div>
      )}
    </div>
  );
};

export default BalanceChart;
