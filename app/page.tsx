import Balance from "@/components/ui/Balance";
import BalanceChart from "@/components/ui/BalanceChart";
import MonthlyBudget from "@/components/ui/MonthlyBudget";
import TransactionsChart from "@/components/ui/TransactionsChart";
import TransactionsTable from "@/components/ui/TransactionsTable";

export default function Home() {
  const balance = 89400;
  const percentageChange = 21;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-full">
      <div className="col-span-4 lg:col-span-1">
        <Balance />
      </div>
      <div className="col-span-4 lg:col-span-3">
        <TransactionsTable />
      </div>
      <div className="col-span-4 lg:col-span-1">
        <MonthlyBudget />
      </div>
      <div className="lg:row-start-3 col-span-4 lg:col-span-2">
        <BalanceChart />
      </div>
      <div className="lg:row-start-3 col-span-4 lg:col-span-2">
        <TransactionsChart />
      </div>
    </div>
  );
}
