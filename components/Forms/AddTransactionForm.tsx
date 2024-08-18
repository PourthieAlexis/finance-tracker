"use client"
import { createTransaction } from "@/app/actions/transaction.actions";
import React from "react";
import { useFormState } from "react-dom";

const initialState = { message: "", errors: {} };

export default function AddTransactionForm() {
  const [state, formAction] = useFormState(createTransaction, initialState);
  console.log(state);

  const userAccount = "3df120e5-c64a-4acb-a98c-76898fb8f94d";

  return (
    <form
      className="p-6 bg-neutral rounded-lg shadow-md space-y-4"
      action={formAction}
    >
      <h2 className="text-2xl font-bold text-white">Ajouter une Transaction</h2>

      {/* Type de Transaction */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-white">Type de Transaction</span>
        </label>
        <select name="transaction_type" className="select select-bordered w-full">
          <option value="INCOME">INCOME</option>
          <option value="EXPENSE">EXPENSE</option>
        </select>
        {state.errors?.transaction_type && (
          state.errors.transaction_type.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          )))}
      </div>

      {/* Contexte */}
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
        {state.errors?.category && (
          state.errors.category.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          )))}
      </div>

      {/* Montant */}
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
        {state.errors?.amount && (
          state.errors.amount.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          )))}
      </div>

      {/* Compte */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-white">Compte</span>
        </label>
        <select name="account_id" className="select select-bordered w-full">
          <option value={userAccount}>zaeaze</option>
        </select>
        {state.errors?.account_id && (
          state.errors.account_id.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          )))}
      </div>

      {/* Description */}
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
        {state.errors?.description && (
          state.errors.description.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          )))}
      </div>

      <button type="submit" className="btn btn-primary w-full">
        Ajouter
      </button>
    </form>
  );
}