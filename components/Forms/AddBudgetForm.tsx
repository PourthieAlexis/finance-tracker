"use client";
import { createBudget } from "@/app/actions/budget.actions";
import React from "react";
import { useFormState } from "react-dom";

const initialState = { message: "", errors: {} };

export default function AddBudgetForm() {
  const [state, formAction] = useFormState(createBudget, initialState);

  return (
    <form
      className="p-6 bg-neutral rounded-lg shadow-md space-y-4"
      action={formAction}
    >
      <h2 className="text-2xl font-bold text-white">Ajouter un budget</h2>

      <div className="form-control">
        <label className="label">
          <span className="label-text text-white">Catégorie</span>
        </label>
        <input
          name="category"
          type="text"
          placeholder="Ex: Alimentation"
          className="input input-bordered w-full"
        />
        {state.errors?.category &&
          state.errors.category.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text text-white">Montant</span>
        </label>
        <input
          name="amount"
          type="number"
          placeholder="Ex: 5000"
          className="input input-bordered w-full"
        />
        {state.errors?.amount &&
          state.errors.amount.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text text-white">Date de début</span>
        </label>
        <input
          name="startDate"
          type="date"
          className="input input-bordered w-full"
        />
        {state.errors?.startDate &&
          state.errors.startDate.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text text-white">Date de fin</span>
        </label>
        <input
          name="endDate"
          type="date"
          className="input input-bordered w-full"
        />
        {state.errors?.endDate &&
          state.errors.endDate.map((error: string) => (
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
