"use client";
import Link from "next/link";

export default function CategoryPill({ c }: { c: { _id: string; name: string } }) {
  return (
    <Link
      href={`/categories/${c._id}`}
      className="rounded-md border border-neutral-100 bg-white py-4 text-center text-sm text-neutral-700 hover:border-neutral-200"
    >
      {c.name}
    </Link>
  );
}
