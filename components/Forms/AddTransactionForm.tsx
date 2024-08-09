import React from "react";

export default function AddTransactionForm() {
  return (
    <form className="p-6 bg-neutral rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-white">Ajouter une Transaction</h2>

      <div className="form-control">
        <label className="label">
          <span className="label-text text-white">Sujet</span>
        </label>
        <input
          type="text"
          placeholder="Ex: Cy Ganderton"
          className="input input-bordered w-full"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text text-white">Contexte</span>
        </label>
        <input
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
          type="number"
          placeholder="Ex: 10"
          className="input input-bordered w-full"
        />
      </div>

      <button type="submit" className="btn btn-primary w-full">
        Ajouter
      </button>
    </form>
  );
}
