import React from "react";

interface Transaction {
  subject: string;
  context: string;
  amount: number;
}

interface TransactionsTableProps {
  transactions: Transaction[];
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
}) => {
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
              <td>{transaction.subject}</td>
              <td>
                <span className="badge">{transaction.context}</span>
              </td>
              <td>{transaction.amount}€</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
