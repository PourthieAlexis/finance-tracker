"use client";

import { createReminder } from "@/app/actions/reminder.action";
import React, { useState } from "react";
import { useFormState } from "react-dom";

const initialState = { message: "", errors: {} };

export default function AddBudgetForm() {
  const [state, formAction] = useFormState(createReminder, initialState);
  const [priority, setPriority] = useState<"LOW" | "NORMAL" | "HIGH">("NORMAL");

  return (
    <form
      className="p-6 bg-neutral rounded-lg shadow-md space-y-4"
      action={formAction}
    >
      <h2 className="text-2xl font-bold text-white">Ajouter un Rappel</h2>

      <div className="form-control">
        <label className="label">
          <span className="label-text text-white">Text</span>
        </label>
        <input
          type="text"
          name="text"
          placeholder="Nouveau rappel"
          className="input input-bordered w-full"
        />
        {state.errors?.text &&
          state.errors.text.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text text-white">Priorité</span>
        </label>
        <select
          value={priority}
          name="priority"
          onChange={(e) =>
            setPriority(e.target.value as "LOW" | "NORMAL" | "HIGH")
          }
          className="select select-bordered w-full"
        >
          <option value="LOW">Pas urgent</option>
          <option value="NORMAL">Moyen</option>
          <option value="HIGH">Urgent</option>
        </select>
        {state.errors?.priority &&
          state.errors.priority.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text text-white">Date d'échéance</span>
        </label>
        <input
          name="dueDate"
          type="date"
          className="input input-bordered w-full"
        />
        {state.errors?.dueDate &&
          state.errors.dueDate.map((error: string) => (
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
