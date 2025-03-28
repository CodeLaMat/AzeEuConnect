"use client";

import Link from "next/link";

export default function Logo({ locale }: { locale: string }) {
  return (
    <Link
      href={`/${locale}`}
      className="text-2xl font-bold flex items-center space-x-2"
    >
      <span className="bg-white text-blue-700 px-3 py-1 rounded-lg font-bold">
        EU
      </span>
      <span>AzEUConnect</span>
    </Link>
  );
}
