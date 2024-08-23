"use client";
import { createAccount } from "@/app/actions/account.actions";
import React from "react";
import { useFormState } from "react-dom";

const initialState = { message: "", errors: {} };

export default function AddAccountForm() {
  const [state, formAction] = useFormState(createAccount, initialState);

  return (
    <form
      className="p-6 bg-neutral rounded-lg shadow-md space-y-4"
      action={formAction}
    >
      <h2 className="text-2xl font-bold text-white">Ajouter un compte</h2>

      <div className="form-control">
        <label className="label">
          <span className="label-text text-white">Nom du compte</span>
        </label>
        <input
          name="accountName"
          type="text"
          placeholder="Ex: Epargne"
          className="input input-bordered w-full"
        />
        {state.errors?.accountName &&
          state.errors.accountName.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text text-white">Solde (€)</span>
        </label>
        <input
          name="balance"
          type="number"
          placeholder="Ex: 3000"
          className="input input-bordered w-full"
        />
        {state.errors?.balance &&
          state.errors.balance.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

      <button type="submit" className="btn btn-primary w-full">
        Ajouter
      </button>
    </form>
  );
}
