import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { cookies } from "next/headers";

const fetchReminders = async () => {
  const callbackUrl = cookies().get("next-auth.callback-url");
  const csrfToken = cookies().get("next-auth.csrf-token");
  const sessionCookie = cookies().get("next-auth.session-token");

  const response = await fetch("http://localhost:3000/api/reminders", {
    headers: {
      Cookie: `${callbackUrl?.name}=${callbackUrl?.value}; ${csrfToken?.name}=${csrfToken?.value}; ${sessionCookie?.name}=${sessionCookie?.value};`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch reminders");
  }

  return await response.json();
};

const ReminderList: React.FC = async () => {
  const reminders: Reminder[] = await fetchReminders();

  return (
    <div className="flex flex-col items-center p-4 bg-neutral rounded-box h-full">
      <h2 className="text-2xl font-semibold mb-4 text-white">Reminders</h2>
      <div className="flex overflow-x-auto w-full h-full">
        {reminders.length > 0 ? (
          <ul className="flex flex-col lg:flex-row m-auto gap-4">
            {reminders.map((reminder) => (
              <li
                key={reminder.id}
                className={`p-4 rounded-lg flex items-center space-x-4 text-white shadow-lg ${
                  reminder.priority === "HIGH"
                    ? "bg-red-500"
                    : reminder.priority === "NORMAL"
                    ? "bg-yellow-500"
                    : reminder.priority === "LOW"
                    ? "bg-green-500"
                    : "bg-blue-500"
                }`}
              >
                <div className="flex flex-col">
                  <div className="text-lg font-medium">{reminder.text}</div>
                  <div className="text-sm text-gray-100 flex justify-center items-center gap-2">
                    <AiOutlineCalendar size={16} />
                    <span>
                      Due date :{" "}
                      {new Date(reminder.createdAt).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-white flex justify-center items-center w-full">
            Aucun rappel pour le moment
          </div>
        )}
      </div>
    </div>
  );
};

export default ReminderList;
