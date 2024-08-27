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

  const { accountId } = params;

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

    return NextResponse.json({ labels, dataPoints });
  } catch (error) {
    console.error("Error fetching transactions chart data:", error);
    return NextResponse.json(
      { error: "Failed to fetch chart data" },
      { status: 500 }
    );
  }
}
