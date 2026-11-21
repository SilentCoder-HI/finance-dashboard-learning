import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { useToast } from "../toast/ToastContext";
import { hasPermission } from "../types";

type RoleRouteProps = {
    children: React.ReactNode;
    permission: string
};

export function RoleRoute({ children, permission }: RoleRouteProps) {
    const user = useAppSelector((state) => state.auth.user);
    const location = useLocation();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const shown = useRef(false);

    const forbidden = !!user && !!permission && !hasPermission(user.permissions ?? [], permission)

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
