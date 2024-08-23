"use client";
import React, { useEffect, useState } from "react";
import { Bar } from "@/lib/chart";
import { getTransactionsChartData } from "@/app/actions/chart.actions";
import { useAccount } from "@/contexts/AccountContext";

const TransactionsChart: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);
  const { selectedAccount } = useAccount();

  useEffect(() => {
    const getTransactionsChart = async () => {
      if (selectedAccount) {
        const { labels, dataPoints } = await getTransactionsChartData(
          selectedAccount
        );
        if (labels.length > 0 && dataPoints.length > 0) {
          setChartData({
            labels,
            datasets: [
              {
                label: "Solde par catégorie (€)",
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

    getTransactionsChart();
  }, [selectedAccount]);

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
