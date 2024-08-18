"use server";

import prisma from "@/lib/db";
import { transactionSchema, TransactionState } from "@/types/schema";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getTransactionsTable() {
  const transactions = await prisma.transaction.findMany({
    orderBy: {
      date: "desc",
    },
    take: 3,
    select: {
      category: true,
      amount: true,
      transaction_type: true,
    },
  });

  return transactions;
}


export async function createTransaction(
  prevState: TransactionState,
  formData: FormData
) {
  const parse = transactionSchema.safeParse({
    amount: formData.get("amount"),
    transaction_type: formData.get("transaction_type"),
    category: formData.get("category"),
    description: formData.get("description"),
    account_id: formData.get("account_id"),
  });

  if (!parse.success) {
    return { errors:  parse.error.flatten().fieldErrors, message: "Failed to create transaction"};
 }
  

  try {
    const { amount, transaction_type, category, description, account_id } = parse.data;
    const numericAmount = parseFloat(amount);

    await prisma.$transaction(async (tx) => {
      await tx.transaction.create({
        data: {
          amount: numericAmount,
          transaction_type,
          category,
          description: description || null,
          Account: {
            connect: { id: account_id },
          },
        },
      });

      const account = await tx.account.findUnique({
        where: { id: account_id },
        select: { balance: true },
      });

      if (!account) {
        return { message: "Failed to create transaction"};
      }

      const newBalance = transaction_type === 'INCOME'
        ? account.balance + numericAmount
        : account.balance - numericAmount;

      await tx.account.update({
        where: { id: account_id },
        data: { balance: newBalance },
      });
    });

    revalidatePath("/");
    } catch (error: any) {
      return { message: "Failed to create transaction",errors: error.message};  
    }
    redirect("/");
}
