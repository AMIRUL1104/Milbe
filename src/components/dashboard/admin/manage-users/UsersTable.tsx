import type { UserProfile } from "@/interface/user/userProfile";
import { UsersTableRow } from "./UsersTableRow";

interface UsersTableProps {
  users: UserProfile[];
}

const COLUMNS = [
  { key: "avatar", label: "" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
  { key: "joined", label: "Joined" },
  { key: "actions", label: "" },
];

export function UsersTable({ users }: UsersTableProps) {
  return (
    <div className="overflow-hidden rounded-card border border-border-light bg-surface shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-160 border-collapse">
          <thead>
            <tr className="border-b border-border-light bg-background">
              {COLUMNS.map((col, i) => (
                <th
                  key={col.key}
                  className={`py-3 text-left text-xs font-bold uppercase tracking-wider text-text-muted ${i === 0
                    ? "pl-5 pr-3"
                    : i === COLUMNS.length - 1
                      ? "pl-3 pr-5"
                      : "px-3"
                    }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UsersTableRow key={user._id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}