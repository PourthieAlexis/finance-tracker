import { auth } from "@/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { accountId: string } }
) {
  try {
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

    const now = new Date();

    const currentAccount = await prisma.bankAccount.findFirst({
      where: {
        id: accountId,
      },
      select: {
        id: true,
        balance: true,
      },
    });

    if (!currentAccount) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    const currentBalance = currentAccount.balance;

    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

    const lastMonthTransactions = await prisma.bankTransaction.findMany({
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
    return NextResponse.json(
      {
        currentBalance,
        balanceChangePercentage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching account balance:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
