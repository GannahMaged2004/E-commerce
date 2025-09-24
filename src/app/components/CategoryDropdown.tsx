//src app components => CategoryDropdown.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCategories } from "@/app/lib/categories-api";

export default function CategoryDropdown() {
  const [open, setOpen] = useState(false);
  const [cats, setCats] = useState<Array<{ _id: string; name: string }>>([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await getCategories(20);
        setCats(list);
      } catch {}
    })();
  }, []);

  return (
    <div className="relative">
      <button className="rounded-md px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50" onClick={() => setOpen(v => !v)}>
        Categories ▾
      </button>
      {open && (
        <div className="absolute left-0 z-20 mt-2 w-64 rounded-md border border-neutral-100 bg-white p-2 shadow-lg">
          <ul className="max-h-80 overflow-auto text-sm">
            {cats.map(c => (
              <li key={c._id}>
                <Link href={`/categories/${c._id}`} className="block rounded px-3 py-2 hover:bg-neutral-50">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
