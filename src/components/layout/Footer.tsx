import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Linkedin, Facebook } from 'lucide-react'
import { COMPANY_INFO } from '@/lib/constants'

// X/Twitter icon (Lucide doesn't ship an X icon, use a simple SVG inline)
function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/prescriptcreatives_logo.png"
              alt="Prescript Digital Solutions"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <span className="font-syne font-extrabold text-base tracking-tight text-gray-900">
              PRESCRIPT<span className="text-prescript-green">.</span>
            </span>
          </Link>

          {/* Copyright */}
          <p className="text-xs font-sans text-gray-400 text-center">
            © 2025 Prescript Digital Solutions · Lagos, Nigeria
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <Link
              href={COMPANY_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-prescript-green transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </Link>
            <Link
              href={COMPANY_INFO.x}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-prescript-green transition-colors"
              aria-label="X (Twitter)"
            >
              <XIcon size={16} />
            </Link>
            <Link
              href={COMPANY_INFO.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-prescript-green transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </Link>
            <Link
              href={COMPANY_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-prescript-green transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </Link>
            <Link
              href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-sans text-gray-400 hover:text-prescript-green transition-colors"
            >
              WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
