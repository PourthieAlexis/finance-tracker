"use client";

import useSWR from "swr";
import { useAccount } from "@/contexts/AccountContext";
import React from "react";

const fetchBalance = async (accountId: string) => {
  const response = await fetch(`/api/accounts/${accountId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch balance");
  }
  return response.json();
};

const Balance: React.FC = () => {
  const { selectedAccount } = useAccount();

  const {
    data: balance,
    error,
    isLoading,
  } = useSWR(["/api/accounts", selectedAccount], () =>
    fetchBalance(selectedAccount!)
  );

  if (error) {
    return (
      <div className="flex justify-center items-center h-full w-full text-white bg-neutral rounded-box">
        Failed to load data
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full w-full text-white bg-neutral rounded-box">
        <div className="loading loading-spinner loading-md"></div>
      </div>
    );
  }

  return (
    <div className="stats shadow bg-neutral w-full h-full">
      <div className="stat">
        <div className="stat-title">Balances</div>
        <div className="stat-value">{balance.currentBalance}€</div>
        <div className="stat-desc">
          {balance.balanceChangePercentage.toFixed(2)}% more than last month
        </div>
      </div>
    </div>
  );
};

export default Balance;
