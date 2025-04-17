'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Hammer } from 'lucide-react'; // Or any icon you'd like

export default function AnimatedContent() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full text-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Icon */}
      <Hammer className="w-16 h-16 text-yellow-500 mb-4 animate-bounce" />

      {/* Text */}
      <h1 className="text-5xl font-bold text-gray-800 mb-2">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">We are still developing this page</h2>
      <h3 className="text-gray-600 mb-6">Please try to open this page later</h3>

      {/* Back Button */}
      <Link href="/" passHref>
        <span className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          Back to Home
        </span>
      </Link>
    </motion.div>
  );
}
