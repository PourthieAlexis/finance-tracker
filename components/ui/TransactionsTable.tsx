"use client";

import React from "react";
import useSWR from "swr";
import { useAccount } from "@/contexts/AccountContext";

const fetchTransactions = async (accountId: string) => {
  const response = await fetch(`/api/accounts/${accountId}/transaction`);
  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }
  return response.json();
};

const TransactionsTable: React.FC = () => {
  const { selectedAccount } = useAccount();

  const {
    data: transactions,
    error,
    isLoading,
  } = useSWR(["/api/accounts/transaction", selectedAccount], () =>
    fetchTransactions(selectedAccount!)
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full w-full text-white bg-neutral rounded-box">
        <div className="loading loading-spinner loading-md"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-white flex justify-center items-center h-full bg-neutral rounded-box">
        Failed to load transactions
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-neutral rounded-box col-span-2 w-full h-full">
      {transactions && transactions.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Context</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction: any, index: number) => (
              <tr key={index}>
                <td>{transaction.transaction_type}</td>
                <td>
                  <span className="badge">{transaction.category}</span>
                </td>
                <td>
                  {transaction.transaction_type === "EXPENSE"
                    ? `-${transaction.amount}`
                    : `+${transaction.amount}`}
                  €
                </td>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="p-4 text-white flex justify-center items-center h-full">
          No transactions available
        </div>
      )}
    </div>
  );
};

export default TransactionsTable;
