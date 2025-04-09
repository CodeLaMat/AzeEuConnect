"use client";

import Link from "next/link";

export default function Logo({ locale }: { locale: string }) {
  return (
    <Link
      href={`/${locale}`}
      className="text-2xl font-bold flex items-center space-x-2"
    >
      <span className=" text-secondary px-3 py-1 rounded-lg font-bold">
        AzEUConnect
      </span>
    </Link>
  );
}
