import { getBudget } from "@/app/actions/budget.actions";
import React from "react";

const MonthlyBudget: React.FC = async () => {
  const budget = await getBudget();

  if (!budget) {
    return (
      <div className="stats shadow bg-neutral p-4 flex flex-col h-full">
        <div className="stat flex-1 p-2">
          <div className="stat-title text-white">Budget</div>
          <div className="stat-value text-sm">Aucun budget pour ce mois</div>
        </div>
      </div>
    );
  }

  const percentageUsed = (budget.totalSpent / budget.amount) * 100;

  return (
    <div className="stats shadow bg-neutral p-4 flex flex-col">
      <div className="stat flex-1 p-2">
        <div className="stat-title text-white">Budget</div>
        <div className="stat-value text-primary">{budget.amount}€</div>
        <div className="text-white">
          <div className="stat-desc">
            Début : {budget.start_date.toLocaleDateString()}
          </div>
          <div className="stat-desc">
            Fin : {budget.end_date.toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="stat border-none p-2">
        <div className="mb-2">
          <span className="badge">{budget.category || "N/A"}</span>
        </div>
        <div className="text-white">
          <div className="font-semibold mb-2">
            Montant Dépensé : {budget.totalSpent}€
          </div>
        </div>
        <div className="bg-gray-700 rounded-full h-6 mt-4 sm:mt-0">
          <div
            className={`${
              percentageUsed > 100 ? "bg-red-500" : "bg-primary"
            } h-full rounded-full text-center`}
            style={{ width: `${percentageUsed > 100 ? 100 : percentageUsed}%` }}
          ></div>
          <div className="relative w-full flex justify-center bottom-6 text-white font-bold">
            {percentageUsed.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyBudget;
