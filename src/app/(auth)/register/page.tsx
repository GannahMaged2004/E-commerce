// src app (auth) register => page.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { registerReq } from "@/app/lib/auth-api";
import { saveAuth } from "@/app/lib/auth";

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path fill="#FFC107" d="M43.6 20.5H42V20.4H24v7.2h11.3c-1.6 4.6-6 7.9-11.3 7.9-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 6 .9 8.3 3l5.1-5.1C33.2 6.3 28.8 4.8 24 4.8 12 4.8 3.8 13.8 3.8 25S12 45.2 24 45.2c11 0 20.2-9 20.2-20.2"/>
      <path fill="#FF3D00" d="M6.3 14.7l5.9 4.3C13.9 15.2 18.6 12 24 12c3.1 0 6 .9 8.3 3l5.1-5.1C33.2 6.3 28.8 4.8 24 4.8 16 4.8 9.1 9.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 45.2c5.9 0 11.2-2.2 15.2-5.9l-5.6-4.6c-2.5 1.8-5.7 2.9-9.6 2.9-4.7 0-8.8-2.7-10.8-6.6l-5.8 4.5C10 40.6 16.5 45.2 24 45.2z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20.4H24v7.2h11.3c-1.1 3.1-3.6 5.5-6.7 6.6l5.6 4.6c3.3-3 5.4-7.5 5.4-12.8 0-1.6-.2-2.8-.6-4.5z"/>
    </svg>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData(e.currentTarget);
      const name = String(form.get("name") || "");
      const email = String(form.get("identifier") || "");
      const password = String(form.get("password") || "");
      const rePassword = password;           
      const phone = "+201234567890";          
      const res = await registerReq({ name, email, password, rePassword, phone });
      if (res?.token) saveAuth(res.token, res.user);
      router.push("/");
    } catch (err: any) {
      alert(err.message || "Registration failed :(");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="relative aspect-[4/4] w-full overflow-hidden border border-neutral-100 bg-neutral-50">
          <Image src="/images/login.png" alt="login preview" fill className="object-fill" priority />
        </div>

        <div className="flex items-center">
          <div className="w-full max-w-md lg:mx-auto">
            <h1 className="text-3xl font-semibold text-neutral-600">Create an account</h1>
            <p className="mt-2 text-sm text-neutral-400">Enter your details below</p>

            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              <div>
                <input id="name" name="name" type="text" placeholder="Name" required
                  className="w-full border-b border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-600 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-300" />
              </div>

              <div>
                <input id="email" name="identifier" type="text" placeholder=" Email or Phone Number" required
                  className="w-full border-b border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-600 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-300" />
              </div>

              <div>
                <input id="password" name="password" type="password" placeholder="Password" minLength={8} required
                  className="w-full border-b border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-600 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-300" />
                  
              </div>

              <button type="submit" disabled={loading}
                className="inline-flex w-full items-center justify-center bg-brand-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-300 disabled:opacity-70">
                {loading ? "Creating Account ⟳" : "Create Account"}
              </button>

              <button type="button"
                className="inline-flex w-full items-center justify-center gap-2 border border-neutral-200 bg-white px-5 py-3 text-sm font-medium text-neutral-600 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-brand-300"
                onClick={() => alert("Google OAuth (wire it up).")} aria-label="Sign up with Google">
                <GoogleIcon className="h-5 w-5" />
                <span>Sign up with Google</span>
              </button>

              <p className="text-center text-sm text-neutral-500">
                Already have account?{" "}
                <Link href="/login" className="underline underline-offset-5 hover:text-brand-700">
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
