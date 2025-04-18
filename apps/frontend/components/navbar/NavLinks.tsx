"use client";

import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface NavLinkProps {
  locale: string;
  navLinks: { href: string; label: string }[];
  pathname: string;
  showAboutDropdown: boolean;
  setShowAboutDropdown: Dispatch<SetStateAction<boolean>>;
  setShowServicesDropdown: Dispatch<SetStateAction<boolean>>;
  showServicesDropdown: boolean;
  t: (key: string) => string;
}

export default function NavLinks({
  locale,
  navLinks,
  pathname,
  showAboutDropdown,
  setShowAboutDropdown,
  setShowServicesDropdown,
  showServicesDropdown,
  t,
}: NavLinkProps) {
  const SubLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      className="group relative inline-block px-1 py-0.5 transition duration-300"
    >
      <span className="relative z-10">{label}</span>
      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-accent opacity-0 group-hover:opacity-100 group-hover:w-full transition-all duration-300 ease-out origin-left"></span>
    </Link>
  );

  return (
    <div className="hidden md:flex space-x-2 items-center">
      {navLinks.map(({ href, label }) => {
        const isActive = pathname === `/${locale}/${href}`;
        if (href === "services") {
          return (
            <div
              key={href}
              className="cursor-pointer"
              onMouseEnter={() => setShowServicesDropdown(true)}
            >
              <Link
                href={`/${locale}/${href}`}
                className={`group relative px-4 py-2 rounded-md transition duration-300 ease-in-out ${
                  isActive
                    ? "bg-secondary-foreground text-secondary font-bold"
                    : ""
                }`}
              >
                <span className="relative z-10">{label}</span>
                <span className="absolute left-4 bottom-1 w-0 h-[2px] bg-accent opacity-0 group-hover:opacity-100 group-hover:w-[calc(100%-2rem)] transition-all duration-300 ease-out origin-left"></span>
              </Link>
              {showServicesDropdown && (
                <div
                  className="absolute left-50 top-full w-5xl bg-white text-black shadow-lg z-50"
                  onMouseEnter={() => setShowServicesDropdown(true)}
                  onMouseLeave={() => setShowServicesDropdown(false)}
                >
                  <div className="max-w-4xl mx-auto px-8 py-6 grid grid-cols-2 gap-8">
                    <div>
                      <h3 className="uppercase font-bold text-sm mb-2">
                        For Service Providers
                      </h3>
                      <ul className="space-y-1">
                        <li>
                          <SubLink
                            href={`/${locale}/dashboard/add-service`}
                            label="Post a job"
                          />
                        </li>
                        <li>
                          <SubLink
                            href={`/${locale}/get-promoted`}
                            label="Get promoted"
                          />
                        </li>
                        <li>
                          <SubLink
                            href={`/${locale}/get-advise`}
                            label="Get advise from experts"
                          />
                        </li>
                        <li>
                          <SubLink
                            href={`/${locale}/get-verified`}
                            label="Get verified"
                          />
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="uppercase font-bold text-sm mb-2">
                        For customers
                      </h3>
                      <ul className="space-y-1">
                        <li>
                          <SubLink
                            href={`/${locale}/search`}
                            label="Search for services"
                          />
                        </li>

                        <li>
                          <SubLink
                            href={`/${locale}/advertise`}
                            label="Advertise on AzEUConnect"
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        }

        if (href === "about") {
          return (
            <div
              key={href}
              className="cursor-pointer"
              onMouseEnter={() => setShowAboutDropdown(true)}
            >
              <Link
                href={`/${locale}/${href}`}
                className={`group relative px-4 py-2 rounded-md transition duration-300 ease-in-out ${
                  isActive
                    ? "bg-secondary-foreground text-secondary font-bold"
                    : ""
                }`}
              >
                <span className="relative z-10">{label}</span>
                <span className="absolute left-4 bottom-1 w-0 h-[2px] bg-accent opacity-0 group-hover:opacity-100 group-hover:w-[calc(100%-2rem)] transition-all duration-300 ease-out origin-left"></span>
              </Link>
              {showAboutDropdown && (
                <div
                  className="absolute left-50 top-full w-5xl bg-white text-black shadow-lg z-50"
                  onMouseEnter={() => setShowAboutDropdown(true)}
                  onMouseLeave={() => setShowAboutDropdown(false)}
                >
                  <div className="max-w-4xl mx-auto px-8 py-6 grid grid-cols-2 gap-8">
                    <div>
                      <h3 className="uppercase font-bold text-sm mb-2">
                        Company
                      </h3>
                      <ul className="space-y-1">
                        <li>
                          <SubLink
                            href={`/${locale}/who-we-are`}
                            label="Who we are"
                          />
                        </li>
                        <li>
                          <SubLink
                            href={`/${locale}/partners`}
                            label="Partners"
                          />
                        </li>
                        <li>
                          <SubLink
                            href={`/${locale}/customer-stories`}
                            label="Customer Stories"
                          />
                        </li>
                        <li>
                          <SubLink
                            href={`/${locale}/testimonials`}
                            label="Testimonials"
                          />
                        </li>
                        <li>
                          <SubLink
                            href={`/${locale}/contact`}
                            label="Contact"
                          />
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="uppercase font-bold text-sm mb-2">
                        Press
                      </h3>
                      <ul className="space-y-1">
                        <li>
                          <SubLink
                            href={`/${locale}/media-publications`}
                            label="Media & Publications"
                          />
                        </li>
                        <li>
                          <SubLink
                            href={`/${locale}/documents`}
                            label="Legal Database"
                          />
                        </li>

                        <li>
                          <SubLink href={`/${locale}/blog`} label="Blog" />
                        </li>
                        <li>
                          <SubLink href={`/${locale}/news`} label="News" />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        }

        return (
          <Link
            key={href}
            href={`/${locale}/${href}`}
            className={`group relative px-4 py-2 rounded-md transition duration-300 ease-in-out ${
              isActive ? "bg-secondary-foreground text-secondary font-bold" : ""
            }`}
          >
            <span className="relative z-10">{label}</span>
            <span className="absolute left-4 bottom-1 w-0 h-[2px] bg-accent opacity-0 group-hover:opacity-100 group-hover:w-[calc(100%-2rem)] transition-all duration-300 ease-out origin-left"></span>
          </Link>
        );
      })}
    </div>
  );
}
