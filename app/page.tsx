import Balance from "@/components/ui/Balance";
import MonthlyBudget from "@/components/ui/MonthlyBudget";
import TransactionsTable from "@/components/ui/TransactionsTable";

export default function Home() {
  const balance = 89400;
  const percentageChange = 21;

  const transactions = [
    {
      subject: "Cy Ganderton",
      context: "Quality Control Specialist",
      amount: 10,
    },
    {
      subject: "Hart Hagerty",
      context: "Desktop Support Technician",
      amount: 10,
    },
    { subject: "Brice Swyre", context: "Tax Accountant", amount: 10 },
  ];

  return (
    <div className="grid grid-cols-1 grid-row-auto lg:grid-cols-3 gap-3">
      <Balance balance={balance} percentageChange={percentageChange} />
      <TransactionsTable transactions={transactions} />
      <MonthlyBudget
        budgetAmount={2000} 
        spentAmount={850} 
        startDate="2024-08-01" 
        endDate="2024-08-31" 
      />
    </div>
  );
}
