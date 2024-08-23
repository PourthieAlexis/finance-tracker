"use client";
import { getBankAccount } from "@/app/actions/account.actions";
import { createTransaction } from "@/app/actions/transaction.actions";
import { useAccount } from "@/contexts/AccountContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";

const initialState = { message: "", errors: {} };

export default function AddTransactionForm() {
  const [state, formAction] = useFormState(createTransaction, initialState);
  const [accounts, setAccounts] = useState<
    { id: string; account_name: string }[]
  >([]);
  const router = useRouter();
  const { selectedAccount, setSelectedAccount } = useAccount();

  useEffect(() => {
    const getAccounts = async () => {
      const accounts = await getBankAccount();
      if (accounts) {
        setAccounts(accounts);
        if (!selectedAccount) {
          setSelectedAccount(accounts[0].id);
        }
      } else {
        router.push("/create-account");
      }
    };

    getAccounts();
  }, []);

  const handleAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAccount(e.target.value);
  };

  return (
    <form
      className="p-6 bg-neutral rounded-lg shadow-md space-y-4"
      action={formAction}
    >
      <h2 className="text-2xl font-bold text-white">Ajouter une Transaction</h2>

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
        {state.errors?.transaction_type &&
          state.errors.transaction_type.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
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
        {state.errors?.category &&
          state.errors.category.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
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
        {state.errors?.amount &&
          state.errors.amount.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text text-white">Compte</span>
        </label>
        <select
          name="account_id"
          className="select select-bordered w-full"
          value={selectedAccount || ""}
          onChange={handleAccountChange}
        >
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.account_name}
            </option>
          ))}
        </select>
        {state.errors?.account_id &&
          state.errors.account_id.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
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
        {state.errors?.description &&
          state.errors.description.map((error: string) => (
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
