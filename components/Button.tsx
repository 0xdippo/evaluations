import Link from "next/link";

type ButtonProps =
  | { href: string; children: React.ReactNode; variant?: "primary" | "secondary" }
  | { type: "submit"; children: React.ReactNode; variant?: "primary" | "secondary"; disabled?: boolean };

const base =
  "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2";
const primary = "bg-navy text-page-bg hover:bg-navy-hover";
const secondary = "border border-navy/40 bg-card-bg text-navy hover:bg-navy/5";

export function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const className = `${base} ${variant === "primary" ? primary : secondary}`;

  if ("href" in props) {
    return (
      <Link href={props.href} className={className}>
        {props.children}
      </Link>
    );
  }
  return (
    <button type="submit" className={className} disabled={props.disabled}>
      {props.children}
    </button>
  );
}
