import React from "react";

interface BalanceProps {
  balance: number;
  percentageChange: number;
}

const Balance: React.FC<BalanceProps> = ({ balance, percentageChange }) => {
  return (
    <div className="stats shadow bg-neutral">
      <div className="stat">
        <div className="stat-title">Soldes</div>
        <div className="stat-value">{balance.toLocaleString()}€</div>
        <div className="stat-desc">
          {percentageChange}% more than last month
        </div>
      </div>
    </div>
  );
};

export default Balance;
