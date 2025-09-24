// src app (auth) login => page.tsx

"use client";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { loginReq } from "@/app/lib/auth-api";  
import { saveAuth } from "@/app/lib/auth";

export default function LoginPage() {
  const router = useRouter();               
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData(e.currentTarget);
      const email = String(form.get("identifier") || "");
      const password = String(form.get("password") || "");
      const res = await loginReq({ email, password });

      if (res?.token) saveAuth(res.token, res.user);
      router.push("/");
    } catch (err: any) {
      alert(err?.message || "Login failed :(");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        <div className="relative aspect-[4/4]  w-full overflow-hidden border border-neutral-100 bg-neutral-50">
          <Image
            src="/images/login.png"
            alt="login preview"
            fill
            className="object-fill"
            priority
          />
        </div>


        <div className="flex items-center">
          <div className="w-full max-w-md lg:mx-auto">
            <h1 className="text-3xl font-semibold text-neutral-600">Log in to Exclusive</h1>
            <p className="mt-2 text-sm text-neutral-400">Enter your details below</p>

            <form onSubmit={onSubmit} className="mt-8 space-y-5">
    
              <div>
                <label htmlFor="email" className="mb-1 block text-sm text-neutral-500"></label>
                <input
                  id="email"
                  name="identifier"
                  type="text"
                  placeholder="Email or Phone Number"
                  required
                  className="w-full border-b border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-600 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-300"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-1 block text-sm text-neutral-500"></label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  className="w-full border-b border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-600 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-300"
                />
              </div>


              <div className="mt-2 flex items-center justify-between">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex h-10 items-center justify-center bg-red-500 rounded-sm px-10 text-sm font-medium text-white transition-colors hover:bg-error-500 focus:outline-none focus:ring-2 focus:ring-brand-300 disabled:opacity-70"
                >
                  {loading ? "Logging in ⟳" : "Log In"}
                </button>

                <Link
                  href="/forgot-password"
                  className="text-sm text-brand-500 hover:text-brand-900"
                >
                  Forget Password?
                </Link>
              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
