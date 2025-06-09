"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface NavLinkProps {
  locale: string;
  navLinks: { href: string; label: string }[];
  pathname: string;
  t: (key: string) => string;
}

export default function NavLinks({ locale, navLinks, pathname, t }: NavLinkProps) {
  const isActive = (href: string) => pathname === `/${locale}/${href}`;

  const SubLink = ({ href, label }: { href: string; label: string }) => (
    <NavigationMenuLink asChild>
      <Link
        href={href}
        className="block rounded-md px-4 py-2 hover:bg-muted transition"
      >
        <div className="font-semibold">{label}</div>
      </Link>
    </NavigationMenuLink>
  );

  const serviceItems = [
    { href: `/${locale}/dashboard/add-service`, label: "Post a job", category: "For Service Providers" },
    { href: `/${locale}/get-promoted`, label: "Get promoted", category: "For Service Providers" },
    { href: `/${locale}/get-advise`, label: "Get advise from experts", category: "For Service Providers" },
    { href: `/${locale}/get-verified`, label: "Get verified", category: "For Service Providers" },
    { href: `/${locale}/search`, label: "Search for services", category: "For Customers" },
    { href: `/${locale}/advertise`, label: "Advertise on AzEUConnect", category: "For Customers" },
  ];

  const aboutItems = [
    { href: `/${locale}/who-we-are`, label: "Who we are", category: "Company" },
    { href: `/${locale}/partners`, label: "Partners", category: "Company" },
    { href: `/${locale}/customer-stories`, label: "Customer Stories", category: "Company" },
    { href: `/${locale}/testimonials`, label: "Testimonials", category: "Company" },
    { href: `/${locale}/contact`, label: "Contact", category: "Company" },
    { href: `/${locale}/media-publications`, label: "Media & Publications", category: "Press" },
    { href: `/${locale}/documents`, label: "Legal Database", category: "Press" },
    { href: `/${locale}/blog`, label: "Blog", category: "Press" },
    { href: `/${locale}/news`, label: "News", category: "Press" },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList className="hidden md:flex space-x-2 items-center">
        {navLinks.map(({ href, label }) => {
          if (href === "services") {
            return (
              <NavigationMenuItem key={href}>
                <NavigationMenuTrigger className="px-4 py-2 rounded-md">
                  {label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] gap-4 p-4 md:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-bold uppercase mb-2">For Service Providers</h3>
                      <ul className="space-y-1">
                        {serviceItems
                          .filter(item => item.category === "For Service Providers")
                          .map(item => (
                            <li key={item.href}>
                              <SubLink href={item.href} label={item.label} />
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase mb-2">For Customers</h3>
                      <ul className="space-y-1">
                        {serviceItems
                          .filter(item => item.category === "For Customers")
                          .map(item => (
                            <li key={item.href}>
                              <SubLink href={item.href} label={item.label} />
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

          if (href === "about") {
            return (
              <NavigationMenuItem key={href}>
                <NavigationMenuTrigger className="px-4 py-2 rounded-md">
                  {label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] gap-4 p-4 md:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-bold uppercase mb-2">Company</h3>
                      <ul className="space-y-1">
                        {aboutItems
                          .filter(item => item.category === "Company")
                          .map(item => (
                            <li key={item.href}>
                              <SubLink href={item.href} label={item.label} />
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase mb-2">Press</h3>
                      <ul className="space-y-1">
                        {aboutItems
                          .filter(item => item.category === "Press")
                          .map(item => (
                            <li key={item.href}>
                              <SubLink href={item.href} label={item.label} />
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

          return (
            <NavigationMenuItem key={href}>
              <NavigationMenuLink asChild>
                <Link
                  href={`/${locale}/${href}`}
                  className={`group relative px-4 py-2 rounded-md transition duration-300 ease-in-out ${
                    isActive(href) ? "bg-secondary-foreground text-secondary font-bold" : ""
                  }`}
                >
                  <span className="relative z-10">{label}</span>
                  <span className="absolute left-4 bottom-1 w-0 h-[2px] bg-accent opacity-0 group-hover:opacity-100 group-hover:w-[calc(100%-2rem)] transition-all duration-300 ease-out origin-left"></span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
