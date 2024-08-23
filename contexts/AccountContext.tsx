"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

interface AccountContextType {
  selectedAccount: string | null;
  setSelectedAccount: Dispatch<SetStateAction<string | null>>;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("selectedAccount")
      : null
  );

  useEffect(() => {
    if (selectedAccount !== null) {
      localStorage.setItem("selectedAccount", selectedAccount);
    }
  }, [selectedAccount]);

  return (
    <AccountContext.Provider value={{ selectedAccount, setSelectedAccount }}>
      {children}
    </AccountContext.Provider>
  );
};

export function useAccount() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
}
