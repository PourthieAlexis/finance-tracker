import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user.id) {
      return NextResponse.redirect("/auth/signin");
    }

    const user_id = session.user.id;

    const bankAccounts = await prisma.bankAccount.findMany({
      where: {
        user_id,
      },
    });

    return NextResponse.json(bankAccounts);
  } catch (error) {
    console.error("Error fetching bank accounts:", error);
    return NextResponse.json(
      { error: "Failed to fetch bank accounts" },
      { status: 500 }
    );
  }
}
