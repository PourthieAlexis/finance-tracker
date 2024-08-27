"use client";
import { createTransaction } from "@/app/actions/transaction.actions";
import { useAccount } from "@/contexts/AccountContext";
import { useFormState } from "react-dom";
import useSWR from "swr";

const initialState = { message: "", errors: {} };

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AddTransactionForm() {
  const [state, formAction] = useFormState(createTransaction, initialState);

  const { selectedAccount, setSelectedAccount } = useAccount();

  const { data: accounts, isLoading } = useSWR<Account[], boolean>(
    "/api/accounts",
    fetcher
  );

  const handleAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAccount(e.target.value);
  };

  return (
    <form
      className="p-6 bg-neutral rounded-lg shadow-md space-y-4"
      action={formAction}
    >
      <h2 className="text-2xl font-bold text-white">Add a Transaction</h2>

      <div className="form-control">
        <label className="label">
          <span className="label-text text-white">Transaction Type</span>
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
          <span className="label-text text-white">Category</span>
        </label>
        <input
          name="category"
          type="text"
          placeholder="E.g., Food"
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
          <span className="label-text text-white">Amount (€)</span>
        </label>
        <input
          name="amount"
          type="number"
          placeholder="E.g., 10"
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
          <span className="label-text text-white">Account</span>
        </label>
        <select
          name="account_id"
          className="select select-bordered w-full"
          value={selectedAccount || "loading"}
          onChange={handleAccountChange}
        >
          {isLoading ? (
            <option value="loading" disabled>
              Loading...
            </option>
          ) : (
            accounts &&
            accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.account_name}
              </option>
            ))
          )}
        </select>
        {state.errors?.account_id &&
          state.errors.account_id.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
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
        {state.errors?.description &&
          state.errors.description.map((error: string) => (
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
