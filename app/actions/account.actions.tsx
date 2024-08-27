"use server";
import { auth } from "@/auth";
import prisma from "@/lib/db";
import { accountSchema, AccountState } from "@/types/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
