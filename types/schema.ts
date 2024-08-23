import { z } from "zod";

export type TransactionState = {
  errors?: {
    amount?: string[];
    transaction_type?: string[];
    category?: string[];
    description?: string[];
    account_id?: string[];
  };
  message?: string;
};

enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
  TRANSFER = "TRANSFER",
}

export const transactionSchema = z.object({
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

export type BudgetState = {
  errors?: {
    category?: string[];
    amount?: string[];
    startDate?: string[];
    endDate?: string[];
  };
  message?: string;
};

export const budgetSchema = z
  .object({
    category: z.string().min(1, "La catégorie est obligatoire"),
    amount: z
      .number()
      .positive("Le montant doit être un nombre positif")
      .min(1, { message: "Le montant est requis." }),
    startDate: z
      .string()
      .min(1, "La date de début est obligatoire")
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "Le format de la date de début doit être yyyy-mm-dd"
      ),
    endDate: z
      .string()
      .min(1, "La date de fin est obligatoire")
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "Le format de la date de fin doit être yyyy-mm-dd"
      ),
  })
  .superRefine((data, ctx) => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    if (endDate < startDate) {
      ctx.addIssue({
        code: "custom",
        message: "La date de fin doit être après la date de début.",
        path: ["endDate"],
      });
    }
  });

export type AccountState = {
  errors?: {
    accountName?: string[];
    balance?: string[];
  };
  message?: string;
};

export const accountSchema = z.object({
  accountName: z.string().min(1, "La nom du compte est obligatoire"),
  balance: z
    .number()
    .positive("Le montant doit être un nombre positif.")
    .min(1, { message: "Le montant est requis." }),
});

export type ReminderState = {
  errors?: {
    text?: string[];
    priority?: string[];
    dueDate?: string[];
  };
  message?: string;
};

export const reminderSchema = z.object({
  text: z
    .string()
    .min(1, { message: "Le texte du rappel est requis" })
    .max(255, {
      message: "Le texte du rappel ne peut pas dépasser 255 caractères",
    }),

  priority: z.enum(["HIGH", "LOW", "NORMAL"], {
    invalid_type_error:
      "La priorité doit être l'une des valeurs suivantes: HIGH, LOW, NORMAL",
  }),
  dueDate: z
    .string()
    .min(1, "La date d'échéance est obligatoire")
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Le format de la date d'échéance doit être yyyy-mm-dd"
    ),
});
