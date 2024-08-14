import { getTransactionsTable } from "@/app/actions/transaction.actions";
import React from "react";

const TransactionsTable: React.FC = async () => {
  const transactions = await getTransactionsTable();

  return (
    <div className="overflow-x-auto bg-neutral rounded-box col-span-2 w-full">
      <table className="table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Context</th>
            <th>Amount</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
