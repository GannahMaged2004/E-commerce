//src app contact => page.tsx
import Link from "next/link";

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 stroke-current text-white" {...props}>
      <path d="M7 3h3l2 5-2 1a12 12 0 0 0 7 7l1-2 5 2v3a2 2 0 0 1-2 2c-9.4 0-17-7.6-17-17a2 2 0 0 1 2-2Z" strokeWidth="1.6" />
    </svg>
  );
}
function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 stroke-current text-white" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="1.6" />
      <path d="M4 7l8 6 8-6" strokeWidth="1.6" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <>
      <div className="container py-6 text-sm text-neutral-300">
        <nav className="flex items-center gap-2">
          <Link href="/" className="hover:text-neutral-600">Home</Link>
          <span>/</span>
          <span className="text-neutral-600">Contact</span>
        </nav>
      </div>

      <section className="container pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">

          <div className="rounded-md  bg-white p-6 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-600">
                <PhoneIcon />
              </div>
              <div>
                <div className="font-semibold text-neutral-900">Call To Us</div>
                <p className="mt-1 text-sm text-neutral-500">We are available 24/7, 7 days a week.</p>
                <p className="mt-1 text-sm text-neutral-500">Phone: +8801611112222</p>
              </div>
            </div>

            <hr className="my-5 border-neutral-200" />

            <div className="flex items-start gap-3 ">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-600">
                <MailIcon />
              </div>
              <div>
                <div className="font-semibold text-neutral-900">Write To Us</div>
                <p className="mt-1 text-sm text-neutral-500">
                  Fill out our form and we will contact you within 24 hours.
                </p>
                <p className="mt-1 text-sm text-neutral-500">Emails: customer@exclusive.com</p>
                <p className="text-sm text-neutral-500">support@exclusive.com</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 rounded-md border border-neutral-100 bg-white p-6 shadow-lg">
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-neutral-500">
                 <span className="text-brand-600">*</span>
                  </label>
                  <input
                    className="h-12 w-full rounded-md bg-neutral-50 px-3 text-sm text-neutral-600 placeholder:text-neutral-300 outline-none"
                    placeholder="Your Name"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-neutral-500">
                 <span className="text-brand-600">*</span>
                  </label>
                  <input
                    type="email"
                    className="h-12 w-full rounded-md bg-neutral-50 px-3 text-sm text-neutral-600 placeholder:text-neutral-300 outline-none"
                    placeholder="Your Email"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-neutral-500">
                  <span className="text-brand-600">*</span>
                  </label>
                  <input
                    className="h-12 w-full rounded-md bg-neutral-50 px-3 text-sm text-neutral-600 placeholder:text-neutral-300 outline-none"
                    placeholder="Your Phone"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-500">Your Message</label>
                <textarea
                  className="min-h-[180px] w-full rounded-md bg-neutral-50 p-3 text-sm text-neutral-600 placeholder:text-neutral-300 outline-none"
                  placeholder="Your Message"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded bg-red-700 px-6 py-3 text-sm font-medium text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
