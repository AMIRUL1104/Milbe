import type { AdminRequest } from "@/interface/dashboard/request";
import { RequestStatusBadge } from "./RequestStatusBadge";

interface RequestsTableProps {
  requests: AdminRequest[];
}

const COLUMNS = [
  { key: "book", label: "Book" },
  { key: "buyer", label: "Buyer" },
  { key: "seller", label: "Seller" },
  { key: "status", label: "Status" },
  { key: "date", label: "Date" },
];

function formatDate(value: Date | string | undefined): string {
  if (!value) return "—";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function RequestsTable({ requests }: RequestsTableProps) {
  return (
    <div className="overflow-hidden rounded-card border border-border-light bg-surface shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-160 border-collapse">
          <thead>
            <tr className="border-b border-border-light bg-background">
              {COLUMNS.map((col, i) => (
                <th
                  key={col.key}
                  className={`py-3 text-left text-xs font-bold uppercase tracking-wider text-text-muted ${
                    i === 0 ? "pl-5 pr-3" : "px-3"
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => {
              const key =
                request._id?.toString() ??
                `${request.postId}-${request.requesterId}`;
              return (
                <tr
                  key={key}
                  className="border-b border-border-light last:border-0 transition-colors hover:bg-background"
                >
                  <td className="max-w-55 py-3 pl-5 pr-3">
                    <div className="flex items-center gap-3">
                      {request.bookCoverUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={request.bookCoverUrl}
                          alt={request.postTitle}
                          className="h-11 w-8 shrink-0 rounded object-cover"
                        />
                      ) : (
                        <div className="flex h-11 w-8 shrink-0 items-center justify-center rounded bg-background text-xs font-bold text-text-muted">
                          —
                        </div>
                      )}
                      <p className="truncate text-sm font-semibold text-text-primary">
                        {request.postTitle}
                      </p>
                    </div>
                  </td>
                  <td className="max-w-40 truncate px-3 py-3 text-sm text-text-secondary">
                    {request.requesterName}
                  </td>
                  <td className="max-w-40 truncate px-3 py-3 text-sm text-text-secondary">
                    {request.sellerName}
                  </td>
                  <td className="px-3 py-3">
                    <RequestStatusBadge status={request.status} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-sm text-text-muted">
                    {formatDate(request.createdAt ?? request.requestDate)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
