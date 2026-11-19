import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../store/store";
import type { UserListItem, UserPermissionDetail } from "../types";
import { hasPermission } from "../utils/permissions";
import { handleUser } from "../lib/usermanagement";

// ---- adjust to your API client (cookie auth, so credentials: "include") ----
const API = import.meta.env.VITE_API_URL ?? "";
async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.message ?? `Request failed (${res.status})`);
  return body as T;
}

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
const SENSITIVE = new Set(["user:delete", "user:manage-permissions"]);

type Props = {
  user: UserListItem;
  onClose: () => void;
  onSaved?: () => void;
  onDeleted?: () => void;
};

export default function ManageUserModal({ user, onClose, onSaved, onDeleted }: Props) {
  const me = useAppSelector((s) => s.auth.user);
  const myPerms = me?.permissions ?? [];
  const [active, setActive] = useState(true);

  const [detail, setDetail] = useState<UserPermissionDetail | null>(null);
  const [draft, setDraft] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // load role defaults + current overrides
  useEffect(() => {
    let alive = true;
    setLoading(true);
    api<UserPermissionDetail>(`/api/users/${user.id}/permissions`)
      .then((d) => {
        if (!alive) return;
        setDetail(d);
        setDraft(new Set(d.effective));
      })
      .catch((e) => alive && setError(e.message))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [user.id]);

  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const roleSet = useMemo(() => new Set(detail?.rolePermissions ?? []), [detail]);
  const original = useMemo(() => new Set(detail?.effective ?? []), [detail]);

  const isSelf = me?.id === user.id;
  const targetIsSuperadmin = user.role === "superadmin";
  const canManage = hasPermission(myPerms, "user:manage-permissions");
  const canDelete = hasPermission(myPerms, "user:delete") && !isSelf && !targetIsSuperadmin;
  const readOnly = !canManage || isSelf || targetIsSuperadmin;

  const dirty =
    draft.size !== original.size || [...draft].some((p) => !original.has(p));

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

  async function save() {
    setBusy(true);
    setError("");
    try {
      await api(`/api/users/${user.id}/permissions`, {
        method: "PUT",
        body: JSON.stringify({ permissions: [...draft] }),
      });
      onSaved?.();
      onClose();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function deleteUser() {
    if (!window.confirm(`Delete ${user.name}? This cannot be undone.`)) return;
    setBusy(true);
    setError("");
    try {
      await api(`/api/users/${user.id}`, { method: "DELETE" });
      onDeleted?.();
      onClose();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  const handleUsers = () => {
    handleUser({isActive: active, action:"status",method:"PUT"})
    setActive((prev) => !prev)
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
                className={`rounded px-2 py-0.5 font-medium ${user.isActive ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
                  }`}
              >
                {user.isActive ? "Active" : "Disabled"}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-xl leading-none text-gray-400 hover:text-gray-700" aria-label="Close">
            ×
          </button>
        </div>
        <div className="flex items-start justify-between border-b px-5 py-4">
          <h2>Active</h2>

          <button
            type="button"
            role="switch"
            aria-checked={active}
            onClick={() => handleUsers()}
            className={`w-20 h-10 flex items-center overflow-hidden p-1 rounded-full border cursor-pointer transition-colors ${active ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"
              }`}
          >
            <span
              className={`block w-1/2 h-full rounded-full transition-transform duration-200 ${active ? "translate-x-full bg-white" : "translate-x-0 bg-gray-400"
                }`}
            />
          </button>
        </div>

        {/* body: permission table */}
        <div className="flex-1 overflow-y-auto px-5 py-3">
          {loading ? (
            <p className="py-10 text-center text-sm text-gray-500">Loading permissions...</p>
          ) : !detail ? (
            <p className="py-10 text-center text-sm text-red-600">{error || "Could not load permissions"}</p>
          ) : (
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
                            const granted = checked && !roleSet.has(perm);
                            const blocked = !checked && roleSet.has(perm);
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
                                  onChange={() => toggle(g.resource, a)}
                                />
                                <span className="capitalize">{a.replace("-", " ")}</span>
                                {SENSITIVE.has(perm) && (
                                  <span className="rounded bg-red-100 px-1 text-[10px] text-red-700">sensitive</span>
                                )}
                                {granted && (
                                  <span className="rounded bg-green-100 px-1 text-[10px] text-green-700">granted</span>
                                )}
                                {blocked && (
                                  <span className="rounded bg-red-100 px-1 text-[10px] text-red-700">blocked</span>
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
          )}
        </div>

        {/* footer */}
        <div className="flex items-center justify-between gap-3 border-t px-5 py-3">
          <div className="flex items-center gap-3">
            {canDelete && (
              <button
                onClick={deleteUser}
                disabled={busy}
                className="rounded border border-red-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
              >
                Delete user
              </button>
            )}
            {error && detail && <span className="text-sm text-red-600">{error}</span>}
          </div>

          <div className="flex items-center gap-2">
            {!readOnly && detail && (
              <button
                onClick={() => setDraft(new Set(detail.rolePermissions))}
                disabled={busy}
                className="rounded px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
              >
                Reset to role defaults
              </button>
            )}
            <button onClick={onClose} className="rounded border px-3 py-1.5 text-sm hover:bg-gray-50">
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