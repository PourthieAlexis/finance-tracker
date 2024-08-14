"use client";
import { createTransaction } from "@/app/actions/transaction.actions";
import React from "react";
import { useFormState } from "react-dom";
const initialState = {
  message: "",
};

export default async function AddTransactionForm() {
  const [state, formAction] = useFormState(createTransaction, initialState);

  const userAccount = "f4963e41-59e4-4691-b760-15f192b5731e";
  return (
    <form
      className="p-6 bg-neutral rounded-lg shadow-md space-y-4"
      action={formAction}
    >
      <h2 className="text-2xl font-bold text-white">Ajouter une Transaction</h2>
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-white">Type de Transaction</span>
        </label>
        <select
          name="transaction_type"
          className="select select-bordered w-full"
        >
          <option value="INCOME">INCOME</option>
          <option value="EXPENSE">EXPENSE</option>
        </select>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text text-white">Contexte</span>
        </label>
        <input
          name="category"
          type="text"
          placeholder="Ex: Alimentation"
          className="input input-bordered w-full"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text text-white">Montant (€)</span>
        </label>
        <input
          name="amount"
          type="number"
          placeholder="Ex: 10"
          className="input input-bordered w-full"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text text-white">Compte</span>
        </label>
        <select name="account_id" className="select select-bordered w-full">
          <option value={userAccount}>zaeaze</option>
        </select>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text text-white">Description</span>
        </label>
        <textarea
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          rows={4}
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary w-full">
        Ajouter
      </button>
    </form>
  );
}
