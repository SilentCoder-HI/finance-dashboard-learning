import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidenav, { type PageId } from "@Components/sidenav";
import { Box } from "@mui/material";
import { useAppSelector } from "../../store";
import useAppNavigate from "../../hooks/useAppNavigate";
export default function DashboardLayout() {
  const [activePage, setActivePage] = useState<PageId>("overview");
  const user = useAppSelector((state) => state.auth.user && state.auth.isAuthenticated)
  if (!user) {
    useAppNavigate("/dashboard");
    useAppNavigate("/login", true);
  }
  const navigate = useNavigate()
  const pageNavigator = (page: PageId) => {
    setActivePage(page)
    switch (page) {
      case 'overview':
        navigate('/dashboard', { replace: true });
        break;
      case 'user':
        navigate('/dashboard/users', { replace: true });
        break;
      case 'invoices':
        navigate('/dashboard/invoices', { replace: true });
        break;
      case 'profile':
        navigate('/dashboard/profile', { replace: true });
        break;
      default:
        navigate('/dashboard', { replace: true });
        break;
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-200 text-slate-900">

      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-200/40 to-blue-400/50" />

        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-blue-200/40 to-blue-400/50" />

        <div className="absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-blue-300/90 blur-[120px]" />

        <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-blue-500/50 blur-[140px]" />
      </div>

      {/* Dashboard */}
      <div className="relative z-10 flex min-h-screen gap-5 p-4">

        <Sidenav
          activePage={activePage}
          setActivePage={(e) => pageNavigator(e)}
        />

        {/* Main Content */}
        <Box
          className="
            flex-1 min-w-0
            rounded-2xl
            border 
            border-white/80 bg-white/60
            p-5
            shadow-lg
            backdrop-blur-xl
            overflow-y-auto
            no-scrollbar
          "
        >
          <main className="p-4 md:p-6">
            <Outlet />
          </main>
        </Box>

      </div>
    </div>
  );
}