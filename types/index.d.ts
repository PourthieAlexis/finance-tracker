declare interface MonthlyBalance {
  month: string;
  balance: number;
}

declare interface ChartData {
  labels: string[];
  dataPoints: number[];
}

declare interface Reminder {
  id: string;
  text: string;
  priority: "HIGH" | "NORMAL" | "LOW";
  createdAt: string;
}

interface Budget {
  id: string;
  amount: number;
  start_date: string;
  end_date: string;
  category: string;
  totalSpent: number;
}

type Account = {
  id: string; // Unique identifier for the account
  account_name: string; // Name of the account
};
