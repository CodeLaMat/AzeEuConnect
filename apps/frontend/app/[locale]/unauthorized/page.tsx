"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-red-100 to-purple-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-xl p-8 md:p-12 flex flex-col items-center space-y-6"
      >
        <ShieldAlert className="h-20 w-20 text-red-500" />
        <h1 className="text-4xl font-bold text-gray-800">
          Unauthorized Access
        </h1>
        <p className="text-center text-gray-600 max-w-md">
          Sorry, you don't have permission to access this page. If you believe
          this is a mistake, please contact your administrator or return to the
          previous page.
        </p>

        <Button className="mt-4" size="lg" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-5 w-5" /> Go Back
        </Button>
      </motion.div>
    </div>
  );
}
