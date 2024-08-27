import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { accountId: string } }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const accountId = params.accountId;

  if (!accountId) {
    return NextResponse.json(
      { error: "Account ID is required" },
      { status: 400 }
    );
  }

  try {
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
        const previousMonth = Object.keys(monthlyBalances)
          .sort()
          .slice(0, 1)[0];
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
        { labels: [], dataPoints: [] } as {
          labels: string[];
          dataPoints: number[];
        }
      );

    return NextResponse.json({ labels, dataPoints });
  } catch (error) {
    console.error("Error fetching balance chart data:", error);
    return NextResponse.json(
      { error: "Failed to fetch chart data" },
      { status: 500 }
    );
  }
}
