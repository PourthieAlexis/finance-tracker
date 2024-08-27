import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { accountId: string } }
) {
  const { accountId } = params;

  if (!accountId) {
    return NextResponse.json(
      { error: "Account ID is required" },
      { status: 400 }
    );
  }

  try {
    const transactions = await prisma.bankTransaction.findMany({
      where: {
        account_id: accountId,
      },
      orderBy: {
        date: "desc",
      },
      take: 3,
      select: {
        category: true,
        amount: true,
        transaction_type: true,
        date: true,
      },
    });

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
