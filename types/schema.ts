import { z } from "zod";

export type TransactionState = {
    errors?: {
        amount?: string[],
        transaction_type?: string[],
        category?: string[],
        description?: string[],
        account_id?: string[],
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
