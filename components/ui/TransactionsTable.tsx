"use client";
import React, { useEffect, useState } from "react";
import { getTransactionsTable } from "@/app/actions/transaction.actions";
import { useAccount } from "@/contexts/AccountContext";

const TransactionsTable: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const { selectedAccount } = useAccount();

  useEffect(() => {
    const fetchTransactions = async () => {
      if (selectedAccount) {
        const transactions = await getTransactionsTable(selectedAccount);
        setTransactions(transactions);
      }
    };

    fetchTransactions();
  }, [selectedAccount]);

  return (
    <div className="overflow-x-auto bg-neutral rounded-box col-span-2 w-full h-full">
      {transactions.length > 0 ? (
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
            {transactions.map((transaction, index) => (
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
