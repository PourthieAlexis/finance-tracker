import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user_id = session.user.id;
    const now = new Date();
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1,
      0,
      0,
      0
    );

    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59
    );

    const budget = await prisma.budget.findFirst({
      where: {
        user_id,
        start_date: { lte: endOfMonth },
        end_date: { gte: startOfMonth },
      },
    });

    if (!budget) {
      return NextResponse.json(
        { message: "No budget found for the current month." },
        { status: 404 }
      );
    }

    const accounts = await prisma.bankAccount.findMany({
      where: { user_id },
      select: { id: true },
    });

    const accountIds = accounts.map((account) => account.id);

    const totalSpent = await prisma.bankTransaction.aggregate({
      _sum: { amount: true },
      where: {
        account_id: { in: accountIds },
        transaction_type: "EXPENSE",
        date: { gte: startOfMonth, lte: endOfMonth },
      },
    });

    return NextResponse.json({
      ...budget,
      totalSpent: totalSpent._sum.amount || 0,
    });
  } catch (error) {
    console.error("Error fetching budget:", error);
    return NextResponse.json(
      { error: "Failed to fetch budget" },
      { status: 500 }
    );
  }
}
