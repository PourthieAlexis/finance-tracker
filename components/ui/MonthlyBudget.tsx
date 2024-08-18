import { getBudget } from "@/app/actions/budget.actions";
import React from "react";

const MonthlyBudget: React.FC = async () => {
  const budget = await getBudget("2ae1aa92-361e-427e-8d2f-2fef598a51f1");

  if (!budget) {
    return (
      <div className="stats shadow bg-neutral p-4 flex flex-col">
        <div className="stat flex-1 p-2">
          <div className="stat-title text-white">Budget Mensuel</div>
          <div className="stat-value text-sm">Aucun budget pour ce mois</div>
        </div>
      </div>
    );
  }

  const percentageUsed = (budget.totalSpent / budget.amount) * 100;

  return (
    <div className="stats shadow bg-neutral p-4 flex flex-col">
      <div className="stat flex-1 p-2">
        <div className="stat-title text-white">Budget Mensuel</div>
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
        <div className="text-white">
          <div className="font-semibold mb-2">
            Montant Dépensé : {budget.totalSpent}€
          </div>
        </div>
        <div className="bg-gray-700 rounded-full h-6 mt-4 sm:mt-0">
          <div
            className={`bg-primary h-full rounded-full text-center`}
            style={{ width: `${percentageUsed}%` }}
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
