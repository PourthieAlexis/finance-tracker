import { cookies } from "next/headers";
import React from "react";

const fetchBudget = async () => {
  try {
    const callbackUrl = cookies().get("next-auth.callback-url");
    const csrfToken = cookies().get("next-auth.csrf-token");
    const sessionCookie = cookies().get("next-auth.session-token");

    const response = await fetch("http://localhost:3000/api/budget", {
      headers: {
        Cookie: `${callbackUrl?.name}=${callbackUrl?.value};${csrfToken?.name}=${csrfToken?.value};${sessionCookie?.name}=${sessionCookie?.value};`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch budget");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching budget:", error);
    return null;
  }
};

const MonthlyBudget: React.FC = async () => {
  const budget: Budget = await fetchBudget();

  if (!budget) {
    return (
      <div className="stats shadow p-4 w-full h-full flex flex-col justify-between bg-neutral">
        <div className="stat p-2 text-center">
          <div className="stat-title text-white">Budget</div>
        </div>
        <div className="flex-grow flex items-center justify-center border-none">
          <div className="stat-value text-sm text-white">
            No budget available for this month
          </div>
        </div>
      </div>
    );
  }

  const percentageUsed = (budget.totalSpent / budget.amount) * 100;

  return (
    <div className="stats shadow bg-neutral p-4 flex flex-col">
      <div className="stat flex-1 p-2">
        <div className="stat-title text-white">Budget</div>
        <div className="stat-value text-primary">{budget.amount}€</div>
        <div className="text-white">
          <div className="stat-desc">
            Start Date : {new Date(budget.start_date).toLocaleDateString()}
          </div>
          <div className="stat-desc">
            End Date : {new Date(budget.end_date).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="stat border-none p-2">
        <div className="mb-2">
          <span className="badge">{budget.category || "N/A"}</span>
        </div>
        <div className="text-white">
          <div className="font-semibold mb-2">
            Amount Spent : {budget.totalSpent}€
          </div>
        </div>
        <div className="bg-gray-700 rounded-full h-6 mt-4 sm:mt-0">
          <div
            className={`${
              percentageUsed > 100 ? "bg-red-500" : "bg-primary"
            } h-full rounded-full text-center`}
            style={{ width: `${percentageUsed > 100 ? 100 : percentageUsed}%` }}
          ></div>
          <div className="relative w-full flex justify-center bottom-6 text-white font-bold">
            {percentageUsed.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyBudget;
