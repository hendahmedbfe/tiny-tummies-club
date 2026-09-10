import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        "inline-block h-8 w-8 animate-spin rounded-full border-[3px] border-rose-soft border-t-primary",
        className,
      )}
    />
  );
}

export function LoadingState({ label = "Loading fresh content…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <Spinner />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="card-soft mx-auto flex max-w-md flex-col items-center gap-3 p-8 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-rose-soft text-primary">
        <AlertCircle className="h-6 w-6" />
      </span>
      <h3 className="text-lg">We couldn't load this content</h3>
      <p className="text-sm text-muted-foreground">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} className="mt-2 rounded-full">
          Try again
        </Button>
      )}
    </div>
  );
}
