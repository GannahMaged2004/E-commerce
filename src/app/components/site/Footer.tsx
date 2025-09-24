import Link from "next/link";
import Image from "next/image";
import QRCode from "react-qr-code";

const ANDROID_URL = "https://play.google.com/store/apps/details?id=com.example.app";
const IOS_URL = "https://apps.apple.com/app/id000000000";
const QR_TARGET = ANDROID_URL;

function IconArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M5 12h14M13 5l7 7-7 7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconFacebook(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M13.5 9H15V6.5h-1.5c-2 0-3.5 1.5-3.5 3.5V12H8v2.5h2v6h2.5v-6H15L15.5 12H12v-1c0-1 .5-2 1.5-2Z"/></svg>;
}
function IconTwitterX(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="m4 4 7.3 9.1L4.6 20H7l5-5.7L16.8 20H20l-7.7-9.6L19.4 4H17l-4.6 5.2L9 4H4Z"/></svg>;
}
function IconInstagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  );
}
function IconLinkedIn(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M6.5 9H4v11h2.5V9ZM5.3 4.5A1.8 1.8 0 1 0 5.3 8 1.8 1.8 0 0 0 5.3 4.5ZM20 20h-2.5v-6.1c0-1.9-.8-2.9-2.2-2.9s-2.3 1-2.3 2.9V20H10V9h2.4v1.5c.5-.9 1.7-1.8 3.3-1.8 2.4 0 4.3 1.5 4.3 4.9V20Z"/></svg>;
}

export default function Footer() {
  return (
    <footer className="mt-16 bg-black text-white">
      <div className="container grid grid-cols-1 gap-12 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <h3 className="text-xl font-semibold">Exclusive</h3>
          <p className="mt-5 font-medium">Subscribe</p>
          <p className="mt-3 text-white/70">Get 10% off your first order</p>

          <form className="mt-4">
            <div className="flex items-stretch gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="min-w-0 flex-1 rounded-md border border-white/15 bg-transparent px-3 py-3 text-sm placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-brand-300"
              />
              <button
                type="submit"
                className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-white/15 hover:bg-white/10"
                aria-label="Subscribe"
              >
                <IconArrowRight className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>


        <div>
          <h3 className="text-xl font-semibold">Support</h3>
          <div className="mt-5 space-y-2 text-white/70 leading-relaxed">
            <p>111 Bijoy sarani, Dhaka,<br/> DH 1515, Bangladesh.</p>
            <p>exclusive@gmail.com</p>
            <p>+88015-88888-9999</p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Account</h3>
          <ul className="mt-5 space-y-3 text-white/70">
            <li><Link href="/account" className="hover:text-white">My Account</Link></li>
            <li className="space-x-1">
              <Link href="/login" className="hover:text-white">Login</Link><span>/</span>
              <Link href="/register" className="hover:text-white">Register</Link>
            </li>
            <li><Link href="/cart" className="hover:text-white">Cart</Link></li>
            <li><Link href="/wishlist" className="hover:text-white">Wishlist</Link></li>
            <li><Link href="/shop" className="hover:text-white">Shop</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Quick Link</h3>
          <ul className="mt-5 space-y-3 text-white/70">
            <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms Of Use</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Download App</h3>
          <p className="mt-5 text-xs text-white/70">Save $3 with App New User Only</p>

          <div className="mt-4 flex items-start gap-4">
            <div className="grid h-20 w-20 shrink-0 place-content-center place-items-center rounded-md border border-white/15 bg-white/5 p-2">
              <Link href={QR_TARGET} target="_blank" rel="noopener noreferrer" aria-label="Open the app download page">
                <QRCode value={QR_TARGET} size={84} bgColor="transparent" fgColor="#ffffff" />
              </Link>
            </div>


            <div className="flex flex-col gap-2">

              <div className="flex items-center gap-2 ">

                 <Link
                href={ANDROID_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get it on Google Play"
                className="inline-flex border border-neutral-300 rounded gap-0.5"
              >
                <Image
                  src="/footer/google-play.png"
                  alt="Get it on Google Play"
                  width={180}
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
                <span className="leading-tight">
                <span className="block text-[10px] uppercase tracking-widest text-white/80">
                Get it on
                </span>
                <span className="block text-[15px] font-semibold">Google Play</span>
                </span>
              </Link>
              </div>

              <Link
                href={IOS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download on the App Store"
                className="inline-flex border border-neutral-300 rounded gap-0.5"
              >
                <Image
                  src="/footer/apple.jpg"
                  alt="Download on the App Store"
                  width={180}
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
                <span className="leading-tight">
                <span className="block text-[10px] uppercase tracking-widest text-white/80">
                Download on the
                </span>
                <span className="block text-[15px] font-semibold">App Store</span>
                </span>
              </Link>
            </div>
          </div>


          <div className="mt-5 flex items-center gap-6 text-white/80">
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white">
              <IconFacebook className="h-5 w-5" />
            </Link>
            <Link href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X" className="hover:text-white">
              <IconTwitterX className="h-5 w-5" />
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white">
              <IconInstagram className="h-5 w-5" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white">
              <IconLinkedIn className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-4 text-center text-xs text-white/40">
          © Copyright Rimel 2022. All right reserved
        </div>
      </div>
    </footer>
  );
}
