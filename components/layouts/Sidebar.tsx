"use client";

import { useAccount } from "@/contexts/AccountContext";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { getBankAccount } from "@/app/actions/account.actions";
import { usePathname, useRouter } from "next/navigation";
import { GrTransaction } from "react-icons/gr";
import { FaClock, FaHome } from "react-icons/fa";
import { TbPigMoney } from "react-icons/tb";
import { MdAccountBalance } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";

export default function Sidebar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useSession();
  const { selectedAccount, setSelectedAccount } = useAccount();
  const router = useRouter();
  const pathname = usePathname();
  const [accounts, setAccounts] = useState<
    { id: string; account_name: string }[]
  >([]);

  useEffect(() => {
    const getAccounts = async () => {
      const accounts = await getBankAccount();
      if (accounts) {
        setAccounts(accounts);
      } else {
        router.push("/create-account");
      }
    };

    getAccounts();
  }, []);

  const navLinks = [
    {
      href: "/",
      label: "Home",
      icon: <FaHome />,
    },
    {
      href: "/create-transaction",
      label: "Create transaction",
      icon: <GrTransaction />,
    },
    {
      href: "/create-budget",
      label: "Create budget",
      icon: <TbPigMoney />,
    },
    {
      href: "/create-account",
      label: "Create account",
      icon: <MdAccountBalance />,
    },
    {
      href: "/create-reminder",
      label: "Create reminder",
      icon: <FaClock />,
    },
  ];

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-neutral m-4 drawer-button lg:hidden text-base"
        >
          <GiHamburgerMenu />
        </label>
        {children}
      </div>
      <div className="drawer-side rounded-r-box">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="flex flex-col bg-base-200 text-base-content min-h-full w-80 p-4">
          <div className="mb-4">
            <label htmlFor="account-select" className="block mb-2 text-lg">
              Select Account:
            </label>
            <select
              id="account-select"
              value={selectedAccount || ""}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="" disabled>
                -- Select an account --
              </option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.account_name}
                </option>
              ))}
            </select>
          </div>
          <ul className="menu gap-4 flex-grow flex flex-col justify-center">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-lg ${
                    pathname === link.href ? "active" : ""
                  }`}
                >
                  {link.icon}
                  <span className="ml-2">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          {session && (
            <button
              onClick={() => signOut()}
              className="btn btn-error absolute bottom-0 left-0 m-4 text-base"
            >
              <BiLogOut />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
