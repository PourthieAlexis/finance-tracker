import Balance from "@/components/ui/Balance";
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
    <div className="grid grid-cols-3 gap-3">
      <Balance balance={balance} percentageChange={percentageChange} />
      <TransactionsTable transactions={transactions} />
    </div>
  );
}
