"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { roleBasedLinks } from "@/lib/roleBasedLinks";

export default function Sidebar({ role }: { role: string }) {
  const { locale } = useParams();
  const t = useTranslations("dashboard");

  const links = roleBasedLinks[role.toUpperCase()] || [];

  return (
    <aside className="w-64 bg-white p-6 shadow-lg">
      <h2 className="text-xl font-bold text-blue-700">AzEUConnect</h2>
      <nav className="mt-6 space-y-4">
        {links.map(({ href, icon, labelKey }) => (
          <Link
            key={href}
            href={`/${locale}/${href}`}
            className="flex items-center p-2 text-gray-600 hover:text-blue-700"
          >
            <span className="mr-2">{icon}</span> {t(labelKey)}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
