"use client";

import Link from "next/link";

export default function Logo({ locale }: { locale: string }) {
  return (

         <Link href={`/${locale}`} className="flex items-center space-x-2">
         <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
          
           <span className="text-white font-bold text-lg">Az</span>
         </div>
         <div className="hidden sm:block">
           <h1 className="text-xl font-display font-bold text-gray-900">AzEUConnect</h1>
           <p className="text-xs text-gray-500 -mt-1">Connecting Europe</p>
         </div>
       </Link>
  );
}
