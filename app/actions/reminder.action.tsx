"use server";
import { auth } from "@/auth";
import prisma from "@/lib/db";
import { reminderSchema, ReminderState } from "@/types/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getReminders = async () => {
  const session = await auth();
  if (!session?.user.id) {
    redirect("/auth/signin");
  }
  const userId = session.user.id;

  return await prisma.reminder.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const createReminder = async (
  prevState: ReminderState,
  formData: FormData
) => {
  const session = await auth();
  if (!session?.user.id) {
    redirect("/auth/signin");
  }
  const userId = session.user.id;

  const parse = reminderSchema.safeParse({
    text: formData.get("text"),
    priority: formData.get("priority"),
    dueDate: formData.get("dueDate"),
  });

  if (!parse.success) {
    return {
      errors: parse.error.flatten().fieldErrors,
      message: "Failed to create reminder",
    };
  }

  try {
    const { text, priority, dueDate } = parse.data;
    await prisma.reminder.create({
      data: {
        text,
        priority,
        userId,
        dueDate: new Date(dueDate),
      },
    });

    revalidatePath("/");
  } catch (error: any) {
    return { message: "Failed to create reminder", errors: error.message };
  }
  redirect("/");
};
