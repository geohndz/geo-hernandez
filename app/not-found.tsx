import Link from "next/link";
import { Logo } from "@/components/layout/Logo";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <Logo className="mb-8 h-10 w-8 text-muted" />
      <h1 className="font-display text-[34px] tracking-tight">Page not found</h1>
      <p className="mt-3 max-w-sm text-sm text-muted">
        That URL doesn’t exist on this version of the site.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg"
      >
        Back home
      </Link>
    </div>
  );
}
