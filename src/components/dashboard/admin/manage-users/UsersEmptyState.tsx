import { SearchX } from "lucide-react";

export function UsersEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-card border border-dashed border-border bg-surface px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-background">
        <SearchX className="h-7 w-7 text-text-muted" />
      </div>
      <h3 className="text-lg font-bold text-text-primary">No users found</h3>
      <p className="max-w-xs text-sm text-text-muted">
        Try changing your search or filter.
      </p>
    </div>
  );
}