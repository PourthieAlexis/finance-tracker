"use client";

import { createReminder } from "@/app/actions/reminder.action";
import React, { useState } from "react";
import { useFormState } from "react-dom";

const initialState = { message: "", errors: {} };

export default function AddReminderForm() {
  const [state, formAction] = useFormState(createReminder, initialState);
  const [priority, setPriority] = useState<"LOW" | "NORMAL" | "HIGH">("NORMAL");

  return (
    <form
      className="p-6 bg-neutral rounded-lg shadow-md space-y-4"
      action={formAction}
    >
      <h2 className="text-2xl font-bold text-white">Add a Reminder</h2>

      <div className="form-control">
        <label className="label">
          <span className="label-text text-white">Text</span>
        </label>
        <input
          type="text"
          name="text"
          placeholder="New reminder"
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
          <span className="label-text text-white">Priority</span>
        </label>
        <select
          value={priority}
          name="priority"
          onChange={(e) =>
            setPriority(e.target.value as "LOW" | "NORMAL" | "HIGH")
          }
          className="select select-bordered w-full"
        >
          <option value="LOW">Not Urgent</option>
          <option value="NORMAL">Medium</option>
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
          <span className="label-text text-white">Due Date</span>
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
        Add
      </button>
    </form>
  );
}
