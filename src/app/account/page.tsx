"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { updateMe, changeMyPassword, getMe } from "@/app/lib/account-api";
import { getUser as getUserFromStorage } from "@/app/lib/auth";

export default function AccountPage() {
  const [saving, setSaving] = useState(false);

  const [displayName, setDisplayName] = useState<string>("");

  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [email,     setEmail]     = useState("");
  const [address,   setAddress]   = useState("");

  const [currentPassword,       setCurrentPassword]       = useState("");
  const [newPassword,           setNewPassword]           = useState("");
  const [confirmNewPassword,    setConfirmNewPassword]    = useState("");

  useEffect(() => {
    const u = getUserFromStorage?.() as { name?: string } | null;
    if (u?.name) setDisplayName(u.name);
    const hasToken = typeof window !== "undefined" && !!localStorage.getItem("token");
    if (!hasToken) return;

    (async () => {
      try {
        const me = await getMe(); 
        if (me?.name) setDisplayName(me.name);
        if (me?.email) setEmail(me.email);
        if (me?.name) {
          const parts = me.name.split(" ");
          setFirstName(parts[0] ?? "");
          setLastName(parts.slice(1).join(" ") ?? "");
        }
      } catch {
  
      }
    })();
  }, []);

const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setSaving(true);
  try {
    // build profile payload only with non-empty changes
    const payload: { name?: string; email?: string; phone?: string } = {};
    const name = `${firstName} ${lastName}`.trim();
    if (name) payload.name = name;
    if (email) payload.email = email;

    if (Object.keys(payload).length) {
      await updateMe(payload); // 👈 send only fields the API accepts
    }
    const wants = !!(currentPassword || newPassword || confirmNewPassword);
    if (wants) {
      if (!currentPassword || !newPassword || !confirmNewPassword) {
        throw new Error("Please fill current, new, and confirm password to change it.");
      }
      if (newPassword !== confirmNewPassword) {
        throw new Error("New passwords do not match.");
      }
      await changeMyPassword({
        currentPassword,
        password: newPassword,
        passwordConfirm: confirmNewPassword,
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    }

    if (name) setDisplayName(name);
    alert("Saved successfully!");
  } catch (err: any) {
    alert(err?.message || "Save failed");
  } finally {
    setSaving(false);
  }
};


  return (
    <>
      <div className="container py-6 text-sm text-neutral-300">
        <nav className="flex items-center gap-2">
          <Link href="/" className="hover:text-neutral-600">Home</Link>
          <span>/</span>
          <span className="text-neutral-600">My Account</span>
        </nav>
        <div className="mt-2 text-right text-sm">
          Welcome!{" "}
          <span className="text-brand-600 font-medium">
            {displayName || "Guest"}
          </span>
        </div>
      </div>

      <section className="container pb-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <aside className="text-sm">
            <div className="rounded-md border border-neutral-100 bg-white p-6">
              <div>
                <div className="font-semibold text-xl">Manage My Account</div>
                <ul className="mt-3 space-y-1 text-neutral-500">
                  <li><span className="text-brand-600 font-medium">My Profile</span></li>
                  <li><Link href="#" className="hover:text-neutral-700">Address Book</Link></li>
                  <li><Link href="#" className="hover:text-neutral-700">My Payment Options</Link></li>
                </ul>
              </div>

              <div className="mt-6">
                <div className="font-semibold text-xl">My Orders</div>
                <ul className="mt-3 space-y-1 text-neutral-500">
                  <li><Link href="#" className="hover:text-neutral-700">My Returns</Link></li>
                  <li><Link href="#" className="hover:text-neutral-700">My Cancellations</Link></li>
                </ul>
              </div>

              <div className="mt-6">
                <div className="font-semibold text-xl">My Wishlist</div>
              </div>
            </div>
          </aside>
          <div className="lg:col-span-3">
            <div className="rounded-md border border-neutral-100 bg-white p-6">
              <h2 className="text-lg font-semibold text-brand-600">Edit Your Profile</h2>

              <form onSubmit={onSubmit} className="mt-6 space-y-6 text-sm">
    
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-medium text-neutral-600">First Name</label>
                    <input
                      className="h-12 w-full rounded-md bg-neutral-50 px-3 outline-none"
                      placeholder="Md"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-medium text-neutral-600">Last Name</label>
                    <input
                      className="h-12 w-full rounded-md bg-neutral-50 px-3 outline-none"
                      placeholder="Rimel"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
    
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-medium text-neutral-600">Email</label>
                    <input
                      type="email"
                      className="h-12 w-full rounded-md bg-neutral-50 px-3 outline-none"
                      placeholder="Rimel111@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-medium text-neutral-600">Address</label>
                    <input
                      className="h-12 w-full rounded-md bg-neutral-50 px-3 outline-none"
                      placeholder="Kingston, 5236, United States"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-3 font-semibold text-neutral-600">Password Changes</div>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="h-12 w-full rounded-md bg-neutral-50 px-3 outline-none"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      className="h-12 w-full rounded-md bg-neutral-50 px-3 outline-none"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      className="h-12 w-full rounded-md bg-neutral-50 px-3 outline-none"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-end gap-4">
                  <Link href="#" className="text-sm text-neutral-500">Cancel</Link>
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded bg-brand-600 px-6 py-3 text-sm font-medium text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-300 disabled:opacity-70"
                  >
                    {saving ? "Saving ⟳" : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
