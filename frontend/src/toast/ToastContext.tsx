import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

type Severity = "success" | "info" | "warning" | "error";

type ToastState = {
    open: boolean;
    message: string;
    severity: Severity;
};

type ToastContextValue = {
    showToast: (message: string, severity?: Severity) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used inside ToastProvider");
    return ctx;
}

export function emitToast(message: string, severity: Severity = "info") {
    window.dispatchEvent(new CustomEvent("app:toast", { detail: { message, severity } }));
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toast, setToast] = useState<ToastState>({ open: false, message: "", severity: "info" });
    const timer = useRef<number | null>(null);

    const showToast = useCallback((message: string, severity: Severity = "info") => {
        if (timer.current) window.clearTimeout(timer.current);
        setToast({ open: true, message, severity });
        timer.current = window.setTimeout(() => setToast((t) => ({ ...t, open: false })), 4000);
    }, []);

    useEffect(() => {
        const handler = (e: Event) => {
            const detail = (e as CustomEvent<{ message: string; severity?: Severity }>).detail;
            showToast(detail.message, detail.severity ?? "info");
        };
        window.addEventListener("app:toast", handler);
        return () => window.removeEventListener("app:toast", handler);
    }, [showToast]);

    const value = useMemo(() => ({ showToast }), [showToast]);

    return (
        <ToastContext.Provider value={value}>
            {children}
            <Snackbar
                open={toast.open}
                autoHideDuration={4000}
                onClose={() => setToast((t) => ({ ...t, open: false }))}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    onClose={() => setToast((t) => ({ ...t, open: false }))}
                    severity={toast.severity}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {toast.message}
                </Alert>
            </Snackbar>
        </ToastContext.Provider>
    );
}
