"use server";

import prisma from "@/lib/db";

export async function getBudget(userId: string) {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const budget = await prisma.budget.findFirst({
    where: {
      user_id: userId,
      start_date: {
        lte: endOfMonth,
      },
      end_date: {
        gte: startOfMonth,
      },
    },
  });

  if (!budget) {
    return null;
  }

  const accounts = await prisma.account.findMany({
    where: {
      user_id: userId,
    },
    select: {
      id: true,
    },
  });

  const accountIds = accounts.map((account) => account.id);

  const totalSpent = await prisma.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      account_id: {
        in: accountIds,
      },
      transaction_type: "EXPENSE",
      date: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
  });

  return {
    ...budget,
    totalSpent: totalSpent._sum.amount || 0,
  };
}
