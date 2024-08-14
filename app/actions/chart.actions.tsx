"use server";

import prisma from "@/lib/db";

export async function getBalanceChartData(): Promise<ChartData> {
  const now = new Date();
  const fiveMonthsAgo = new Date();
  fiveMonthsAgo.setMonth(now.getMonth() - 4);

  const transactions = await prisma.transaction.findMany({
    where: {
      date: {
        gte: fiveMonthsAgo,
        lte: now,
      },
    },
    orderBy: {
      date: "asc",
    },
    include: {
      Account: true,
    },
  });

  const monthlyBalances: Record<string, number> = {};

  transactions.forEach((transaction) => {
    const monthYear = `${transaction.date.getFullYear()}-${
      transaction.date.getMonth() + 1
    }`;

    if (!monthlyBalances[monthYear]) {
      if (Object.keys(monthlyBalances).length === 0) {
        monthlyBalances[monthYear] = transaction.Account.balance;
      } else {
        const previousMonth = Object.keys(monthlyBalances).sort().slice(-1)[0];
        monthlyBalances[monthYear] = monthlyBalances[previousMonth];
      }
    }

    switch (transaction.transaction_type) {
      case "INCOME":
        monthlyBalances[monthYear] += transaction.amount;
        break;
      case "EXPENSE":
        monthlyBalances[monthYear] -= transaction.amount;
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

export async function getTransactionsChartData(): Promise<ChartData> {
  const now = new Date();
  const fiveMonthsAgo = new Date();
  fiveMonthsAgo.setMonth(now.getMonth() - 4);

  const transactions = await prisma.transaction.findMany({
    where: {
      date: {
        gte: fiveMonthsAgo,
        lte: now,
      },
    },
    orderBy: {
      date: "asc",
    },
    include: {
      Account: true,
    },
  });

  const categoryTotals: Record<string, number> = {};

  transactions.forEach((transaction) => {
    const category = transaction.category;
    const amount =
      transaction.transaction_type === "EXPENSE" ? transaction.amount : 0;

    if (!categoryTotals[category]) {
      categoryTotals[category] = 0;
    }

    categoryTotals[category] += amount;
  });

  const labels = Object.keys(categoryTotals);
  const dataPoints = Object.values(categoryTotals);

  return { labels, dataPoints };
}
