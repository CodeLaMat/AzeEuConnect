"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-lg font-bold">AzEUConnect</h3>
          <p className="mt-2 text-gray-400">
            Your trusted partner for business formation and expansion in the EU.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold">Quick Links</h4>
          <ul className="mt-2 space-y-2">
            <li>
              <Link href="/about" className="text-gray-400 hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/services" className="text-gray-400 hover:text-white">
                Services
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="text-gray-400 hover:text-white">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-gray-400 hover:text-white">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-400 hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-semibold">Services</h4>
          <ul className="mt-2 space-y-2">
            <li>
              <Link
                href="/company-formation"
                className="text-gray-400 hover:text-white"
              >
                Company Formation
              </Link>
            </li>
            <li>
              <Link
                href="/legal-services"
                className="text-gray-400 hover:text-white"
              >
                Legal & Tax Advisory
              </Link>
            </li>
            <li>
              <Link href="/banking" className="text-gray-400 hover:text-white">
                Business Banking
              </Link>
            </li>
            <li>
              <Link
                href="/virtual-office"
                className="text-gray-400 hover:text-white"
              >
                Virtual Office
              </Link>
            </li>
            <li>
              <Link
                href="/trademark"
                className="text-gray-400 hover:text-white"
              >
                Trademark Registration
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold">Contact Us</h4>
          <p className="mt-2 text-gray-400">
            📍 123 Business Street, Berlin, Germany
          </p>
          <p className="mt-2 text-gray-400">📞 +49 123 456 7890</p>
          <p className="mt-2 text-gray-400">✉️ info@azeuconnect.com</p>
          <div className="mt-4 flex space-x-4">
            <Link href="#" className="text-gray-400 hover:text-white">
              🔗 LinkedIn
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              📘 Facebook
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              📷 Instagram
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 text-gray-500">
        <p>© {new Date().getFullYear()} AzEUConnect. All rights reserved.</p>
      </div>
    </footer>
  );
}
