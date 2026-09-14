export interface UserSession {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
  role: "user" | "admin" | null;
  isBlocked?: boolean | null;
  // ── Milbe profile fields (consolidated onto the Better Auth `user` doc) ──
  // Note: server-side `auth.api.getSession()` returns `createdAt` as a Date;
  // the client-side serialized session returns it as an ISO string.
  createdAt?: string | Date | null;
  phoneNumber?: string | null;
  district?: string | null;
  area?: string | null;
}
