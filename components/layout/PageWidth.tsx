import { cn } from "@/lib/cn";

export function PageWidth({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-content", className)}>
      {children}
    </div>
  );
}
