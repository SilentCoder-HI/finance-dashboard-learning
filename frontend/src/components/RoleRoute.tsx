import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store";
import type { Role } from "../store/store";
import { navConfig } from "../nav/config";
import { useToast } from "../toast/ToastContext";

type RoleRouteProps = {
    allowedRoles?: Role[];
    path?: string;
    children: React.ReactNode;
};

export function RoleRoute({ allowedRoles, path, children }: RoleRouteProps) {
    const user = useAppSelector((state) => state.auth.user);
    const location = useLocation();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const shown = useRef(false);

    const resolvedRoles =
        allowedRoles ??
        navConfig.find((item) => item.path === (path ?? location.pathname))?.roles ??
        [];

    const forbidden = !!user && !resolvedRoles.includes(user.role);

    useEffect(() => {
        if (!user) {
            if (!shown.current) {
                shown.current = true;
                showToast("Please log in to continue.", "warning");
            }
            navigate("/login", { replace: true, state: { from: location } });
            return;
        }
        if (forbidden) {
            if (!shown.current) {
                shown.current = true;
                showToast("You don't have access.", "error");
            }
            navigate("/", { replace: true });
        }
    }, [user, forbidden, navigate, showToast, location]);

    if (!user) return null;
    if (forbidden) return null;
    return <>{children}</>;
}
