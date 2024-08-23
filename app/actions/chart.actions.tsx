"use server";

import prisma from "@/lib/db";

export async function getBalanceChartData(
  accountId: string
): Promise<ChartData> {
  const now = new Date();
  const fiveMonthsAgo = new Date();
  fiveMonthsAgo.setMonth(now.getMonth() - 4);

  const transactions = await prisma.bankTransaction.findMany({
    where: {
      date: {
        gte: fiveMonthsAgo,
        lte: now,
      },
      account_id: accountId,
    },
    orderBy: {
      date: "desc",
    },
    include: {
      BankAccount: true,
    },
  });

  const monthlyBalances: Record<string, number> = {};

  transactions.forEach((transaction) => {
    const year = transaction.date.getFullYear();
    const month = transaction.date.getMonth() + 1;
    const monthYear = `${year}-${month.toString().padStart(2, "0")}`;

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentMonthYear = `${currentYear}-${currentMonth
      .toString()
      .padStart(2, "0")}`;

    if (monthYear === currentMonthYear) {
      monthlyBalances[monthYear] = transaction.BankAccount.balance;
      return;
    }

    if (!monthlyBalances[monthYear]) {
      const previousMonth = Object.keys(monthlyBalances).sort().slice(0, 1)[0];
      monthlyBalances[monthYear] = monthlyBalances[previousMonth];
    }

    switch (transaction.transaction_type) {
      case "INCOME":
        monthlyBalances[monthYear] -= transaction.amount;
        break;
      case "EXPENSE":
        monthlyBalances[monthYear] += transaction.amount;
        break;
      case "TRANSFER":
        break;
    }
  });

  const { labels, dataPoints } = Object.keys(monthlyBalances)
    .sort()
    .reduce(
      (acc, month) => {
        acc.labels.push(month);
        acc.dataPoints.push(monthlyBalances[month]);
        return acc;
      },
      { labels: [], dataPoints: [] } as ChartData
    );

  return { labels, dataPoints };
}

export async function getTransactionsChartData(
  accountId: string
): Promise<ChartData> {
  const now = new Date();
  const fiveMonthsAgo = new Date();
  fiveMonthsAgo.setMonth(now.getMonth() - 4);

  const transactions = await prisma.bankTransaction.findMany({
    where: {
      date: {
        gte: fiveMonthsAgo,
        lte: now,
      },
      account_id: accountId,
    },
    orderBy: {
      date: "asc",
    },
    include: {
      BankAccount: true,
    },
  });

  const categoryTotals: Record<string, number> = {};

  transactions.forEach(({ category, transaction_type, amount }) => {
    if (transaction_type === "EXPENSE") {
      categoryTotals[category] = (categoryTotals[category] || 0) + amount;
    }
  });

  const labels = Object.keys(categoryTotals);
  const dataPoints = Object.values(categoryTotals);

  return { labels, dataPoints };
}
