import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Usage: useAppNavigate("/dashboard"); or useAppNavigate("/dashboard", true);
export default function useAppNavigate(route: string, rep: boolean = false) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(route, { replace: rep });
  }, [navigate, route, rep]);
}
