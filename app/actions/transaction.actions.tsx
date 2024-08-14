"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function getTransactionsTable() {
  const transactions = await prisma.transaction.findMany({
    orderBy: {
      date: "desc",
    },
    take: 10,
    select: {
      category: true,
      amount: true,
      transaction_type: true,
    },
  });

  return transactions;
}

enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
  TRANSFER = "TRANSFER",
}

const transactionSchema = z.object({
  amount: z
    .string()
    .min(1, { message: "Le montant est requis." })
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: "Le montant doit être un nombre valide.",
    }),
  transaction_type: z.nativeEnum(TransactionType, {
    message: "Le type de transaction doit être INCOME ou EXPENSE ou TRANSFER.",
  }),
  category: z.string().min(1, { message: "La catégorie est requise." }),
  description: z.string().optional(),
  account_id: z.string().min(1, { message: "L'ID du compte est requis." }),
});

export async function createTransaction(
  prevState: {
    message: string;
  },
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
    const errorMessage = parse.error.errors
      .map((error) => error.message)
      .join(", ");

    return { message: errorMessage };
  }

  try {
    const { amount, transaction_type, category, description, account_id } =
      parse.data;

    await prisma.transaction.create({
      data: {
        amount: parseFloat(amount),
        transaction_type:
          transaction_type as Prisma.TransactionCreateInput["transaction_type"],
        category,
        description: description || null,
        Account: {
          connect: { id: account_id },
        },
      },
    });

    return { message: `Added transaction ${parse.data}` };
  } catch (error) {
    return { message: `Failed to create transaction ${error}` };
  }
}
