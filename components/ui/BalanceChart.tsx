import React from "react";
import { Line } from "@/lib/chart";
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
import { getBalanceChartData } from "@/app/actions/chart.actions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BalanceChart: React.FC = async () => {
  const { labels, dataPoints } = await getBalanceChartData();

  const data = {
    labels,
    datasets: [
      {
        label: "Solde Total (€)",
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
    <div className="bg-neutral p-6 rounded-box justify-center flex relative h-full ">
      <Line data={data} options={options} />
    </div>
  );
};

export default BalanceChart;
