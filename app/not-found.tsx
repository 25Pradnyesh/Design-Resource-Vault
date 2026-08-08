import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="text-6xl font-semibold tracking-tight text-muted-foreground/30">
        404
      </div>
      <h1 className="mt-4 text-lg font-semibold">Resource not found</h1>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">
        This resource doesn&apos;t exist or may have been removed.
      </p>
      <Link href="/" className="mt-6">
        <Button>Back to vault</Button>
      </Link>
    </div>
  );
}
