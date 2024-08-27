"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { budgetSchema, BudgetState } from "@/types/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
