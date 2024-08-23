import React, { useEffect, useState } from "react";
import { getReminders } from "@/app/actions/reminder.action";
import { AiOutlineCalendar } from "react-icons/ai";

const ReminderList: React.FC = async () => {
  const reminders = await getReminders();

  return (
    <div className="flex flex-col items-center p-4 bg-neutral rounded-box h-full">
      <h2 className="text-2xl font-semibold mb-4 text-white">
        Rappels à faire
      </h2>
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
                      Échéance :{" "}
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
