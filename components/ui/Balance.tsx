import { getAccountBalanceAndChange } from "@/app/actions/account.actions";
import React from "react";

const Balance: React.FC = async () => {
  const balance = await getAccountBalanceAndChange(
    "2ae1aa92-361e-427e-8d2f-2fef598a51f1"
  );
  
  return (
    <div className="stats shadow bg-neutral w-full h-full">
      <div className="stat">
        <div className="stat-title">Soldes</div>
        <div className="stat-value">{balance.currentBalance}€</div>
        <div className="stat-desc">
          {balance.balanceChangePercentage.toFixed(2)}% more than last month
        </div>
      </div>
    </div>
  );
};

export default Balance;
