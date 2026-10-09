"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  Ban,
  CheckCircle2,
  ChevronRight,
  MoreHorizontal,
  ShieldCheck,
  Trash2,
  User,
} from "lucide-react";
import type { UserProfile } from "@/interface/user/userProfile";
import {
  activateUser,
  changeUserRole,
  deleteManagedUser,
  suspendUser,
  type AdminActionResult,
} from "@/services/features/admin/actions";
import { ActionConfirmModal } from "./ActionConfirmModal";
import { UserProfileModal } from "./UserProfileModal";

interface UserActionsMenuProps {
  user: UserProfile;
  currentUserId: string;
}

type ModalState = "profile" | "suspend" | "delete" | null;

export function UserActionsMenu({
  user,
  currentUserId,
}: UserActionsMenuProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [modal, setModal] = useState<ModalState>(null);
  const [isPending, startTransition] = useTransition();
  const menuRef = useRef<HTMLDivElement>(null);

  const isSelf = user._id === currentUserId;

  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  const menuItemClass =
    "flex w-full cursor-pointer items-center gap-2.5 px-3.5 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50";

  function closeMenu() {
    setIsOpen(false);
    setShowRoleMenu(false);
  }

  function run(
    action: () => Promise<AdminActionResult>,
    successMessage: string,
  ) {
    startTransition(async () => {
      const result = await action();
      if (result.ok) {
        toast.success(successMessage);
        closeMenu();
        setModal(null);
        router.refresh();
      } else {
        toast.error(result.error ?? "কাজটি সম্পন্ন করা যায়নি।");
      }
    });
  }

  return (
    <>
      <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-background hover:text-text-secondary"
        aria-label={`Actions for ${user.fullName}`}
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-1.5 w-52 rounded-xl border border-border-light bg-surface py-1.5 shadow-lg">
          <button
            type="button"
            className={`${menuItemClass} text-text-secondary hover:bg-background`}
            onClick={() => {
              closeMenu();
              setModal("profile");
            }}
          >
            <User className="h-4 w-4 text-text-muted" />
            View Profile
          </button>

          <button
            type="button"
            className={`${menuItemClass} text-text-secondary hover:bg-background`}
            disabled={isSelf || isPending}
            title={isSelf ? "নিজের রোল পরিবর্তন করা যাবে না" : undefined}
            onClick={() => setShowRoleMenu((prev) => !prev)}
          >
            <ShieldCheck className="h-4 w-4 text-text-muted" />
            Change Role
            <ChevronRight
              className={`ml-auto h-3.5 w-3.5 text-text-muted transition-transform ${showRoleMenu ? "rotate-90" : ""}`}
            />
          </button>

          {showRoleMenu && (
            <div className="border-t border-border-light pt-1">
              {user.role === "user" ? (
                <button
                  type="button"
                  disabled={isPending}
                  className={`${menuItemClass} pl-10 text-text-secondary hover:bg-background`}
                  onClick={() =>
                    run(
                      () => changeUserRole(user._id, "admin"),
                      "ইউজার এখন অ্যাডমিন।",
                    )
                  }
                >
                  Make Admin
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isPending}
                  className={`${menuItemClass} pl-10 text-text-secondary hover:bg-background`}
                  onClick={() =>
                    run(
                      () => changeUserRole(user._id, "user"),
                      "অ্যাডমিন এখন সাধারণ ইউজার।",
                    )
                  }
                >
                  Make User
                </button>
              )}
            </div>
          )}

          <div className="my-1.5 border-t border-border-light" />

          {user.banned ? (
            <button
              type="button"
              disabled={isSelf || isPending}
              className={`${menuItemClass} text-success-text hover:bg-success-light`}
              onClick={() =>
                run(() => activateUser(user._id), "ইউজার আবার সক্রিয় হয়েছে।")
              }
            >
              <CheckCircle2 className="h-4 w-4" />
              Activate User
            </button>
          ) : (
            <button
              type="button"
              disabled={isSelf || isPending}
              title={isSelf ? "নিজেকে সাসপেন্ড করা যাবে না" : undefined}
              className={`${menuItemClass} text-warning-text hover:bg-warning-light`}
              onClick={() => {
                closeMenu();
                setModal("suspend");
              }}
            >
              <Ban className="h-4 w-4" />
              Suspend User
            </button>
          )}

          <div className="my-1.5 border-t border-border-light" />

          <button
            type="button"
            disabled={isSelf || isPending}
            title={isSelf ? "নিজের অ্যাকাউন্ট ডিলিট করা যাবে না" : undefined}
            className={`${menuItemClass} text-danger-text hover:bg-danger-light`}
            onClick={() => {
              closeMenu();
              setModal("delete");
            }}
          >
            <Trash2 className="h-4 w-4" />
            Delete User
          </button>
        </div>
      )}
      </div>

      {modal === "profile" && (
        <UserProfileModal user={user} onClose={() => setModal(null)} />
      )}

      {modal === "suspend" && (
        <ActionConfirmModal
          title="ইউজারকে সাসপেন্ড করবেন?"
          description={
            <>
              <span className="font-semibold text-text-primary">
                {user.fullName}
              </span>{" "}
              সাসপেন্ড হলে সাথে সাথে লগআউট হবে এবং আবার লগইন করতে পারবে না।
              রিজন হবে “Suspended by admin”।
            </>
          }
          confirmLabel="Suspend"
          tone="warning"
          isPending={isPending}
          onConfirm={() =>
            run(() => suspendUser(user._id), "ইউজার সাসপেন্ড করা হয়েছে।")
          }
          onCancel={() => !isPending && setModal(null)}
        />
      )}

      {modal === "delete" && (
        <ActionConfirmModal
          title="ইউজারকে ডিলিট করবেন?"
          description={
            <>
              <span className="font-semibold text-text-primary">
                {user.fullName}
              </span>
              -এর সব পোস্ট ও বুক রিকোয়েস্ট মুছে যাবে এবং অ্যাকাউন্টটি
              স্থায়ীভাবে ডিলিট হবে। এটি ফেরানো যাবে না।
            </>
          }
          confirmLabel="Delete"
          tone="danger"
          isPending={isPending}
          onConfirm={() =>
            run(() => deleteManagedUser(user._id), "ইউজার ডিলিট করা হয়েছে।")
          }
          onCancel={() => !isPending && setModal(null)}
        />
      )}
    </>
  );
}