"use client";
import { getAccountBalanceAndChange } from "@/app/actions/account.actions";
import { useAccount } from "@/contexts/AccountContext";
import React, { useEffect, useState } from "react";

const Balance: React.FC = () => {
  const [balance, setBalance] = useState<{
    currentBalance: number;
    balanceChangePercentage: number;
  } | null>(null);
  const { selectedAccount } = useAccount();

  useEffect(() => {
    const getBalance = async () => {
      if (selectedAccount) {
        const balance = await getAccountBalanceAndChange(selectedAccount);
        setBalance(balance);
      }
    };

    getBalance();
  }, [selectedAccount]);

  return (
    <div className="stats shadow bg-neutral w-full h-full">
      {balance ? (
        <div className="stat">
          <div className="stat-title">Soldes</div>
          <div className="stat-value">{balance.currentBalance}€</div>
          <div className="stat-desc">
            {balance.balanceChangePercentage.toFixed(2)}% more than last month
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full w-full text-white">
          No data available
        </div>
      )}
    </div>
  );
};

export default Balance;
