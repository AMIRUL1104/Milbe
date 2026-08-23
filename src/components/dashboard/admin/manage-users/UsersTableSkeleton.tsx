function SkeletonRow() {
  return (
    <tr className="border-b border-border-light">
      <td className="py-3.5 pl-5 pr-3">
        <div className="h-10 w-10 rounded-full bg-background" />
      </td>
      <td className="px-3 py-3.5">
        <div className="h-4 w-32 rounded-lg bg-background" />
      </td>
      <td className="px-3 py-3.5">
        <div className="h-4 w-44 rounded-lg bg-background" />
      </td>
      <td className="px-3 py-3.5">
        <div className="h-6 w-16 rounded-full bg-background" />
      </td>
      <td className="px-3 py-3.5">
        <div className="h-6 w-20 rounded-full bg-background" />
      </td>
      <td className="px-3 py-3.5">
        <div className="h-4 w-24 rounded-lg bg-background" />
      </td>
      <td className="py-3.5 pl-3 pr-5">
        <div className="h-8 w-8 rounded-lg bg-background" />
      </td>
    </tr>
  );
}

function MobileSkeletonCard() {
  return (
    <div className="flex items-start gap-3 rounded-card border border-border-light bg-surface p-4">
      <div className="h-10 w-10 shrink-0 rounded-full bg-background" />
      <div className="flex flex-1 flex-col gap-2">
        <div className="h-4 w-36 rounded-lg bg-background" />
        <div className="h-3 w-48 rounded-lg bg-background" />
        <div className="flex gap-2">
          <div className="h-5 w-14 rounded-full bg-background" />
          <div className="h-5 w-16 rounded-full bg-background" />
        </div>
        <div className="h-3 w-24 rounded-lg bg-background" />
      </div>
    </div>
  );
}

export function UsersTableSkeleton() {
  const rows = Array.from({ length: 8 });

  return (
    <>
      <div className="hidden overflow-hidden rounded-card border border-border-light bg-surface shadow-sm md:block">
        <table className="w-full animate-pulse">
          <thead>
            <tr className="border-b border-border-light bg-background">
              <th className="py-3 pl-5 pr-3">
                <div className="h-3 w-6 rounded bg-background" />
              </th>
              {["Name", "Email", "Role", "Status", "Joined"].map((h) => (
                <th key={h} className="px-3 py-3">
                  <div className="h-3 w-14 rounded bg-background" />
                </th>
              ))}
              <th className="py-3 pl-3 pr-5" />
            </tr>
          </thead>
          <tbody>
            {rows.map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex animate-pulse flex-col gap-3 md:hidden">
        {rows.slice(0, 5).map((_, i) => (
          <MobileSkeletonCard key={i} />
        ))}
      </div>
    </>
  );
}