import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../store/store";
import type { UserListItem } from "../types";
import { hasPermission } from "../utils/permissions";
import { handleUser } from "../lib/usermanagement";
// ---- permission catalog (same names as backend/src/permissions.ts) ----
const GROUPS: { resource: string; label: string; actions: string[] }[] = [
  { resource: "dashboard", label: "Dashboard", actions: ["read"] },
  { resource: "invoice", label: "Invoices", actions: ["read", "write", "delete"] },
  { resource: "customer", label: "Customers", actions: ["read", "write", "delete"] },
  { resource: "order", label: "Orders", actions: ["read", "write", "delete"] },
  { resource: "report", label: "Reports", actions: ["read", "export"] },
  { resource: "user", label: "Users", actions: ["read", "write", "delete", "manage-permissions"] },
  { resource: "company", label: "Company", actions: ["read", "write"] },
  { resource: "profile", label: "Profile", actions: ["read", "write"] },
];
const ALL_PERMISSIONS = [
  ...GROUPS.flatMap((g) => g.actions.map((a) => `${g.resource}:${a}`)),
  "platform:read",
];
const ROLE_PERMISSIONS: Record<string, string[]> = {
  superadmin: ALL_PERMISSIONS,
  admin: [
    "dashboard:read",
    "invoice:read", "invoice:write", "invoice:delete",
    "customer:read", "customer:write", "customer:delete",
    "order:read", "order:write", "order:delete",
    "report:read", "report:export",
    "user:read", "user:write", "user:delete", "user:manage-permissions",
    "company:read", "company:write",
    "profile:read", "profile:write",
  ],
  accountant: [
    "dashboard:read",
    "invoice:read", "invoice:write",
    "customer:read",
    "order:read", "order:write",
    "report:read",
    "profile:read", "profile:write",
  ],
  viewer: [
    "dashboard:read",
    "invoice:read",
    "customer:read",
    "order:read",
    "profile:read", "profile:write",
  ],
};
const SENSITIVE = new Set(["user:delete", "user:manage-permissions"]);

type Props = {
  user: UserListItem;
  onClose: () => void;
  onSaved?: () => void;
};

export default function ManageUserModal({ user, onClose, onSaved }: Props) {

  const me = useAppSelector((s) => s.auth.user);
  const myPerms = me?.permissions ?? [];

  // start from the user's real status (was hardcoded true before)
  const [active, setActive] = useState<boolean>(user.isActive);
  const userP = user.permissionOverrides
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const savedEffectives = useMemo(() => {
    const eff = new Set([...(ROLE_PERMISSIONS[user.role] ?? []), ...userP.grant]);
    userP.deny.forEach((p) => eff.delete(p));
    return eff;
  }, [user.role, userP]);

  const grantSet = useMemo(() => new Set(userP.grant), [userP.grant]);
  const denySet = useMemo(() => new Set(userP.deny), [userP.deny]);

  const [draft, setDraft] = useState<Set<string>>(() => new Set(savedEffectives));

  const dirty =
    active !== user.isActive ||
    draft.size !== savedEffectives.size ||
    [...draft].some((p) => !savedEffectives.has(p));


  const isSelf = me?.id === user._id;
  const targetIsSuperadmin = user.role === "superadmin";
  const canManage = hasPermission(myPerms, "user:manage-permissions");
  const canDelete = hasPermission(myPerms, "user:delete") && !isSelf && !targetIsSuperadmin;
  const readOnly = !canManage || isSelf || targetIsSuperadmin;
  // ---- single source of truth: everything this modal edits ----
  const form = useMemo(
    () => ({
      userId: user._id,
      isActive: active,
      permissions: [...draft].sort(),
    }),
    [user._id, active, draft]
  );

  function toggle(resource: string, action: string) {
    if (readOnly) return;
    const perm = `${resource}:${action}`;
    setDraft((prev) => {
      const next = new Set(prev);
      if (next.has(perm)) {
        next.delete(perm);
        // removing read removes everything else for that resource
        if (action === "read") {
          GROUPS.find((g) => g.resource === resource)?.actions.forEach((a) =>
            next.delete(`${resource}:${a}`)
          );
        }
      } else {
        next.add(perm);
        // write/delete/export need read
        if (action !== "read") {
          const readPerm = `${resource}:read`;
          if (GROUPS.find((g) => g.resource === resource)?.actions.includes("read")) {
            next.add(readPerm);
          }
        }
      }
      return next;
    });
  }

  const handleUsers = () => {
    if (readOnly) return;
    setActive((prev) => !prev);
  };


  function getChangeType(
    active: boolean,
    user: { isActive: boolean },
    original: Set<string>,
    draft: Set<string>
  ) {
    const statusChanged = active !== user.isActive;
    const permissionsChanged =
      original.size !== draft.size ||
      [...draft].some((p) => !original.has(p));

    if (statusChanged && permissionsChanged) return "update";
    if (statusChanged) return "status";
    if (permissionsChanged) return "permissions";
  }

  // sends the complete form to handleUser
  async function save() {
    const action = getChangeType(active, user, savedEffectives, draft)

    setBusy(true);
    setError("");
    try {
      await handleUser({
        ...form,
        action,
        method: "PUT",
      });
      onSaved?.();
      onClose();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="flex h-[600px] w-full max-w-3xl flex-col rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* header: user info */}
        <div className="flex items-start justify-between border-b px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-500">
              {user.email} · @{user.username}
            </p>
            <div className="mt-2 flex items-center gap-2 text-xs">
              <span className="rounded bg-blue-100 px-2 py-0.5 font-medium capitalize text-blue-700">
                {user.role}
              </span>
              <span
                className={`rounded px-2 py-0.5 font-medium ${active ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
                  }`}
              >
                {active ? "Active" : "Disabled"}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-xl leading-none text-gray-400 hover:text-gray-700"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* status switch */}
        <div className="flex items-start justify-between border-b px-5 py-4">
          <h2>Active</h2>

          <button
            type="button"
            role="switch"
            aria-checked={active}
            disabled={readOnly}
            onClick={() => {
              handleUsers();
            }}
            className={`flex h-10 w-20 items-center overflow-hidden rounded-full border p-1 transition-colors ${readOnly ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              } ${active ? "border-blue-500 bg-blue-500" : "border-gray-300 bg-white"}`}
          >
            <span
              className={`block h-full w-1/2 rounded-full transition-transform duration-200 ${active ? "translate-x-full bg-white" : "translate-x-0 bg-gray-400"
                }`}
            />
          </button>
        </div>

        {/* body: permission table */}
        <div className="flex-1 overflow-y-auto px-5 py-3">
          <>
            {readOnly && (
              <p className="mb-3 rounded bg-yellow-50 px-3 py-2 text-xs text-yellow-800">
                {targetIsSuperadmin
                  ? "Superadmin permissions cannot be edited."
                  : isSelf
                    ? "You cannot edit your own permissions."
                    : "You do not have permission to edit permissions."}
              </p>
            )}

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs uppercase text-gray-500">
                  <th className="w-36 py-2">Area</th>
                  <th className="py-2">Permissions</th>
                </tr>
              </thead>
              <tbody>
                {GROUPS.map((g) => (
                  <tr key={g.resource} className="border-b align-top">
                    <td className="py-3 font-medium">{g.label}</td>
                    <td className="py-3">
                      <div className="flex flex-wrap gap-x-5 gap-y-2">
                        {g.actions.map((a) => {
                          const perm = `${g.resource}:${a}`;
                          const checked = draft.has(perm);
                          const iHoldIt = hasPermission(myPerms, perm);
                          // cannot grant what you do not hold yourself
                          const disabled = readOnly || (!checked && !iHoldIt);
                          const granted = grantSet.has(perm);
                          const blocked = denySet.has(perm);
                          return (
                            <label
                              key={perm}
                              className={`flex items-center gap-1.5 ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                                }`}
                              title={!iHoldIt && !checked ? "You do not hold this permission" : perm}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                disabled={disabled}
                                className={blocked ? "accent-red-500" : granted ? "accent-green-600" : ""}
                                onChange={() => toggle(g.resource, a)}
                              />
                              <span className="capitalize">{a.replace("-", " ")}</span>
                              {SENSITIVE.has(perm) && (
                                <span className="rounded bg-red-100 px-1 text-[10px] text-red-700">
                                  sensitive
                                </span>
                              )}
                              {granted && (
                                <span className="rounded bg-green-100 px-1 text-[10px] text-green-700">
                                  granted
                                </span>
                              )}
                              {blocked && (
                                <span className="rounded bg-red-100 px-1 text-[10px] text-red-700">
                                  blocked
                                </span>
                              )}
                            </label>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        </div>

        {/* footer */}
        <div className="flex items-center justify-between gap-3 border-t px-5 py-3">
          <div className="flex items-center gap-3">
            {canDelete && (
              <button
                // onClick={deleteUser}
                disabled={busy}
                className="rounded border border-red-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
              >
                Delete user
              </button>
            )}
            {error && <span className="text-sm text-red-600">{error}</span>}
          </div>

          <div className="flex items-center gap-2">
            {!readOnly && (
              <button
                onClick={() => {
                  setDraft(new Set(ROLE_PERMISSIONS[user.role] ?? []));
                  setActive(user.isActive);
                }}
                disabled={busy}
                className="rounded px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
              >
                Reset to role defaults
              </button>
            )}
            <button
              onClick={onClose}
              className="rounded border px-3 py-1.5 text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            {!readOnly && (
              <button
                onClick={save}
                disabled={!dirty || busy}
                className="rounded bg-blue-600 px-4 py-1.5 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {busy ? "Saving..." : "Save"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}