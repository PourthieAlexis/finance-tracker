import React from "react";
import { Bar } from "@/lib/chart";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getTransactionsChartData } from "@/app/actions/chart.actions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TransactionsChart: React.FC = async () => {
  const { labels, dataPoints } = await getTransactionsChartData();

  const data = {
    labels,
    datasets: [
      {
        label: "Solde par catégorie (€)",
        data: dataPoints,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-neutral p-6 rounded-box justify-center flex relative h-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default TransactionsChart;
