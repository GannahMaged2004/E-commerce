import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="container py-6 text-sm text-neutral-900">
        <nav className="flex items-center gap-2">
          <Link href="/" className="text-neutral-300">Home</Link>
          <span className="text-neutral-300">/</span>
          <span>404 Error</span>
        </nav>
      </div>
      <section className="container pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-[64px] leading-none text-neutral-900">
            404 Not Found
          </h1>
          <p className="mt-4 text-neutral-400 font-semibold">
            Your visited page not found. You may go home page.
          </p>

          <div className="mt-8">
            <Link
              href="/"
              className="btn bg-brand-500 text-white hover:bg-error-700"
            >
              Back to home page
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
