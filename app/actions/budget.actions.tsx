"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { budgetSchema, BudgetState } from "@/types/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getBudget() {
  const session = await auth();
  if (!session?.user.id) {
    redirect("/auth/signin");
  }
  const user_id = session.user.id;

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const budget = await prisma.budget.findFirst({
    where: {
      user_id,
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

  const accounts = await prisma.bankAccount.findMany({
    where: {
      user_id,
    },
    select: {
      id: true,
    },
  });

  const accountIds = accounts.map((account) => account.id);

  const totalSpent = await prisma.bankTransaction.aggregate({
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

export async function createBudget(prevState: BudgetState, formData: FormData) {
  const session = await auth();
  if (!session?.user.id) {
    redirect("/auth/signin");
  }
  const user_id = session.user.id;

  const parse = budgetSchema.safeParse({
    category: formData.get("category"),
    amount: Number(formData.get("amount")),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
  });

  if (!parse.success) {
    return {
      errors: parse.error.flatten().fieldErrors,
      message: "Failed to create budget",
    };
  }

  try {
    const { amount, category, startDate, endDate } = parse.data;
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);
    await prisma.budget.create({
      data: {
        category,
        amount,
        start_date: parsedStartDate,
        end_date: parsedEndDate,
        User: {
          connect: { id: user_id },
        },
      },
    });

    revalidatePath("/");
  } catch (error: any) {
    return { message: "Failed to create budget", errors: error.message };
  }
  redirect("/");
}
