import Link from "next/link";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
      <h1 className="text-2xl font-semibold text-navy">Page not found</h1>
      <p className="mt-2 text-text-muted">
        The page you’re looking for doesn’t exist.
      </p>
      <div className="mt-8">
        <Button href="/">Go to Home</Button>
      </div>
    </div>
  );
}
