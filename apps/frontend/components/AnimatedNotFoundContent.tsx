'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AnimatedContent() {
  return (
    <div className="w-full h-full bg-red-400 flex items-center justify-center">
      <motion.div
      
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">This page is under development.</p>
        <Link href="/" passHref>
          <span className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
            Back to Home
          </span>
        </Link>
      </motion.div>
   </div>
  );
}
