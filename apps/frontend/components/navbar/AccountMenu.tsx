"use client";

import Link from "next/link";
import { MutableRefObject } from "react";
import { signOut } from "next-auth/react";
import { accountMenuLinks } from "@/lib/roleBasedLinks";

interface AccountMenuProps {
  locale: string;
  session: any;
  profile: any;
  userRole: string;
  showAccountMenu: boolean;
  setShowAccountMenuAction: (val: boolean) => void;
  menuRef: MutableRefObject<HTMLDivElement | null>;
  t: (key: string) => string;
}

export default function AccountMenu({
  locale,
  session,
  profile,
  userRole,
  showAccountMenu,
  setShowAccountMenuAction,
  menuRef,
  t,
}: AccountMenuProps) {
  const links =
    accountMenuLinks[userRole as keyof typeof accountMenuLinks] ?? [];

  return (
    <div className="relative" ref={menuRef}>
      <div
        className="cursor-pointer flex items-center space-x-2"
        onClick={() => setShowAccountMenuAction(!showAccountMenu)}
      >
        <img
          src={profile?.image || "/media/images/profile_icon.svg"}
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
      </div>

      {showAccountMenu && (
        <div className="absolute right-0 mt-2 w-64 bg-white text-black shadow-lg p-4 rounded-md z-50">
          <div className="flex items-center space-x-2 mb-3">
            <img
              src={profile?.image || "/media/images/profile_icon.svg"}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col">
              <span className="font-bold">
                {session.user?.firstName || session.user?.name || "User"}{" "}
                {session.user?.lastName || ""}
              </span>
              <span className="text-sm text-gray-500">
                {session.user?.role || "Member"} •{" "}
                {profile?.location || t("account.noLocation")}
              </span>
            </div>
          </div>
          <hr className="my-2" />
          {links.map(({ href, labelKey }) => (
            <Link
              key={href}
              href={`/${locale}/${href}`}
              className="block px-2 py-1 text-gray-700 hover:bg-gray-100 rounded"
            >
              {t(labelKey)}
            </Link>
          ))}
          <hr className="my-2" />
          <button
            onClick={() => signOut({ callbackUrl: `/${locale}/signin` })}
            className="w-full text-left px-2 py-1 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
          >
            {t("account.logout")}
          </button>
        </div>
      )}
    </div>
  );
}
