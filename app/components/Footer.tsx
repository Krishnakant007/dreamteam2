// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">Fashtra</h3>
            <p className="mb-4">
              AI-powered Algoritham fantasy sports Team Builder platform. Participate at your own self well being.
            </p>
                      <div className="flex items-center space-x-4">
                          <h1> Contact us:</h1>
              <a href="mailto:support@fashtra.com" className="text-blue-400 hover:text-blue-300 underline">
                support@fashtra.com
              </a>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Our Term </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/terms" className="hover:text-white underline">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-white underline">
                 Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-white underline">
                  Full Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="hover:text-white underline">Home</Link></li>
              <li><Link href="/history" className="hover:text-white underline">History</Link></li>
              <li><Link href="/responsible-gaming" className="hover:text-white underline">Responsible Gaming</Link></li>
            </ul>
          </div>
        </div>

        {/* Short Disclaimer */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-sm text-white text-center">
             Create Ai logic Algorithamic Team Builder . Fashtra accepts no liability for any losses.
            By using our platform, you agree to our <Link href="/terms" className="underline">Terms</Link>.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-gray-500 text-xs">
          <p>© {new Date().getFullYear()} Fashtra Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}