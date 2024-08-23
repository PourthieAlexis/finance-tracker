"use server";
import { auth } from "@/auth";
import prisma from "@/lib/db";
import { accountSchema, AccountState } from "@/types/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAccountBalanceAndChange(accountId: string) {
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
    redirect("/create-account");
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

  return {
    currentBalance,
    balanceChangePercentage,
  };
}

export async function createAccount(
  prevState: AccountState,
  formData: FormData
) {
  const session = await auth();

  if (!session?.user.id) {
    redirect("/auth/signin");
  }
  const user_id = session.user.id;

  const parse = accountSchema.safeParse({
    accountName: formData.get("accountName"),
    balance: Number(formData.get("balance")),
  });

  if (!parse.success) {
    return {
      errors: parse.error.flatten().fieldErrors,
      message: "Failed to create account",
    };
  }

  try {
    const { accountName, balance } = parse.data;

    await prisma.bankAccount.create({
      data: {
        account_name: accountName,
        balance,
        User: {
          connect: { id: user_id },
        },
      },
    });

    revalidatePath("/");
  } catch (error: any) {
    return { message: "Failed to create account", errors: error.message };
  }
  redirect("/");
}

export async function getBankAccount() {
  const session = await auth();

  if (!session?.user.id) {
    redirect("/auth/signin");
  }
  const user_id = session.user.id;

  return await prisma.bankAccount.findMany({
    where: {
      user_id,
    },
  });
}
