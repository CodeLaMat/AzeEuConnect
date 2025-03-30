"use client";

import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface NavLinkProps {
  locale: string;
  navLinks: { href: string; label: string }[];
  pathname: string;
  showAboutDropdown: boolean;
  setShowAboutDropdown: Dispatch<SetStateAction<boolean>>;
}

export default function NavLinks({
  locale,
  navLinks,
  pathname,
  showAboutDropdown,
  setShowAboutDropdown,
}: NavLinkProps) {
  return (
    <div className="hidden md:flex space-x-2 items-center">
      {navLinks.map(({ href, label }) => {
        if (href === "about") {
          return (
            <div
              key={href}
              className="cursor-pointer"
              onMouseEnter={() => setShowAboutDropdown(true)}
            >
              <Link
                href={`/${locale}/${href}`}
                className="px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-accent"
              >
                {label}
              </Link>
              {showAboutDropdown && (
                <div
                  className="absolute left-0 top-full w-screen bg-white text-black shadow-lg z-50"
                  onMouseEnter={() => setShowAboutDropdown(true)}
                  onMouseLeave={() => setShowAboutDropdown(false)}
                >
                  <div className="max-w-7xl mx-auto px-8 py-6 grid grid-cols-2 gap-8">
                    <div>
                      <h3 className="uppercase font-bold text-sm mb-2">
                        Company
                      </h3>
                      <ul className="space-y-1">
                        <li>
                          <Link
                            href={`/${locale}/who-we-are`}
                            className="hover:underline"
                          >
                            Who we are
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={`/${locale}/career`}
                            className="hover:underline"
                          >
                            Career
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={`/${locale}/partners`}
                            className="hover:underline"
                          >
                            Partners
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={`/${locale}/customer-stories`}
                            className="hover:underline"
                          >
                            Customer Stories
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={`/${locale}/testimonials`}
                            className="hover:underline"
                          >
                            Testimonials
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={`/${locale}/contact`}
                            className="hover:underline"
                          >
                            Contact
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="uppercase font-bold text-sm mb-2">
                        Press
                      </h3>
                      <ul className="space-y-1">
                        <li>
                          <Link
                            href={`/${locale}/media-publications`}
                            className="hover:underline"
                          >
                            Media & Publications
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={`/${locale}/documents`}
                            className="hover:underline"
                          >
                            Legal Database
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={`/${locale}/advertise`}
                            className="hover:underline"
                          >
                            Advertise on AzEUConnect
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={`/${locale}/blog`}
                            className="hover:underline"
                          >
                            Blog
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={`/${locale}/news`}
                            className="hover:underline"
                          >
                            News
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        }

        const isActive = pathname === `/${locale}/${href}`;
        return (
          <Link
            key={href}
            href={`/${locale}/${href}`}
            className={`px-4 py-2 rounded-md transition duration-300 ease-in-out ${
              isActive
                ? "bg-secondary-foreground text-secondary font-bold"
                : "hover:bg-accent"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
