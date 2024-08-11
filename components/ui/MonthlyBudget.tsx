import React from 'react';

interface MonthlyBudgetProps {
  budgetAmount: number;
  spentAmount: number;
  startDate: string;  // format: 'YYYY-MM-DD'
  endDate: string;    // format: 'YYYY-MM-DD'
}

const MonthlyBudget: React.FC<MonthlyBudgetProps> = ({ budgetAmount, spentAmount, startDate, endDate }) => {
  const percentageUsed = (spentAmount / budgetAmount) * 100;

  return (
    <div className="stats shadow bg-neutral p-4 flex flex-col flex-row">
      <div className="stat flex-1 p-2">
        <div className="stat-title text-white">Budget Mensuel</div>
        <div className="stat-value text-primary">{budgetAmount.toLocaleString()}€</div>
        <div className="text-white">
          <div className="stat-desc">
            Début : {new Date(startDate).toLocaleDateString()}
          </div>
          <div className="stat-desc">
            Fin : {new Date(endDate).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="stat border-none p-2">
        <div className="text-white">
          <div className="font-semibold mb-2">Montant Dépensé : {spentAmount.toLocaleString()}€</div>
        </div>
        <div className="bg-gray-700 rounded-full h-6 mt-4 sm:mt-0">
          <div
            className={`bg-primary h-full rounded-full text-center text-white font-bold`}
            style={{ width: `${percentageUsed}%` }}
          >
            {percentageUsed.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyBudget;
