import prisma from "@/lib/db";

export async function getAccountBalanceAndChange(userId: string) {
  const now = new Date();
  const currentAccount = await prisma.account.findFirst({
    where: {
      user_id: userId,
    },
    select: {
      id: true,
      balance: true,
    },
  });

  if (!currentAccount) {
    throw new Error("Compte non trouvé");
  }

  const currentBalance = currentAccount.balance;

  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

  const lastMonthTransactions = await prisma.transaction.findMany({
    where: {
      account_id: currentAccount.id,
      date: {
        gte: lastMonthStart,
        lte: lastMonthEnd,
      },
    },
  });

  let lastMonthBalance = currentBalance;
  lastMonthTransactions.forEach((transaction) => {
    if (transaction.transaction_type === "INCOME") {
      lastMonthBalance -= transaction.amount;
    } else if (transaction.transaction_type === "EXPENSE") {
      lastMonthBalance += transaction.amount;
    }
  });
  
  const balanceChangePercentage =
    lastMonthBalance > 0
      ? ((currentBalance - lastMonthBalance) / lastMonthBalance) * 100
      : 100;

  return {
    currentBalance,
    balanceChangePercentage,
  };
}
