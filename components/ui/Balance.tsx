import { getAccountBalanceAndChange } from "@/app/actions/account.actions";
import React from "react";

const Balance: React.FC = async () => {
  const balance = await getAccountBalanceAndChange(
    "7008acf8-fc0d-46d8-847e-09ac449bddc3"
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
