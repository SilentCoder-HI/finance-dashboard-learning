import { useState, type ReactElement } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { LayoutGrid, LogOut, User, UserRound, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { clearUser } from '../store/store';
import { hasPermission } from '../types';

export type PageId =
  | 'overview'
  | 'invoices'
  | 'profile'
  | 'user'
  | 'day-1'
  | 'day-2'
  | 'day-3'
  | 'day-4'
  | 'day-5'
  | 'day-6'
  | 'day-7';

export type NavItem = {
  id: PageId;
  label: string;
  icon: ReactElement;
  permission?: string;
};

export type NavSection = {
  section: string;
  items: NavItem[];
};

type SidenavProps = {
  activePage: PageId;
  setActivePage: (pageId: PageId) => void;
};

const NAV_SECTIONS: NavSection[] = [
  {
    section: 'Main',
    items: [
      {
        id: 'overview',
        label: 'Main Dashboard',
        permission: 'dashboard:read',
        icon: <LayoutGrid size={16} strokeWidth={1.5} />,
      },
      {
        id: 'profile',
        label: 'Profile',
        permission: 'profile:read',
        icon: <UserRound size={16} strokeWidth={1.5} />,
      },
      {
        id: 'user',
        label: 'User',
        permission: 'user:read',
        icon: <User size={16} strokeWidth={1.5} />,
      },
      {
        id: 'invoices',
        label: 'Invoices',
        permission: 'invoice:read',
        icon: <Wallet size={16} strokeWidth={1.5} />,
      },
    ],
  },
];

export default function Sidenav({ activePage, setActivePage }: SidenavProps) {
  const [open, setOpen] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);
  const can = (permission: string) =>
    hasPermission(user?.permissions ?? [], permission);
  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/login', { replace: true });
  };

  return (
    <Box
      component="nav"
      aria-label="Dashboard pages"
      className={`no-scrollbar flex flex-col justify-between overflow-x-hidden overflow-y-auto rounded-2xl border border-white/80 bg-white/60 p-5 shadow-lg backdrop-blur-xl transition-all duration-300 ${
        open ? 'w-[350px]' : 'w-[100px]'
      }`}
    >
      <Box>
        <Box
          className={`flex items-center ${
            open ? 'justify-between' : 'flex-col-reverse justify-center gap-2'
          }`}
        >
          <Typography
            variant="subtitle1"
            className="py-2 text-xl font-semibold tracking-tight text-slate-900"
          >
            FW.
          </Typography>
          <Button onClick={() => setOpen((prev) => !prev)}>
            {open ? 'Menu' : 'Open'}
          </Button>
        </Box>

        <Box className="w-full bg-transparent">
          {NAV_SECTIONS.map((group) => {
            const visibleItems = group.items.filter(
              (item) => !item.permission || can(item.permission)
            );
            if (visibleItems.length === 0) return null;

            return (
              <Box key={group.section} className="my-4 flex w-full flex-col gap-2">
                {visibleItems.map((item) => (
                  <Button
                    key={item.id}
                    fullWidth
                    variant={activePage === item.id ? 'contained' : 'outlined'}
                    onClick={() => setActivePage(item.id)}
                    sx={{
                      border: 0,
                      justifyContent: open ? 'flex-start' : 'center',
                      textTransform: 'none',
                    }}
                    className="flex items-center gap-4 rounded-2xl border border-white/60 bg-white/40 px-4 py-2 font-bold text-slate-800 backdrop-blur-xl transition-all duration-200 hover:scale-[1.02] hover:bg-white/60"
                  >
                    {item.icon}
                    {open && <span>{item.label}</span>}
                  </Button>
                ))}
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box>
        <Button
          fullWidth
          onClick={handleLogout}
          sx={{
            justifyContent: open ? 'flex-start' : 'center',
            textTransform: 'none',
          }}
          className="flex items-center gap-4 rounded-2xl px-4 py-2 text-slate-700 hover:bg-white/60"
        >
          <LogOut size={18} strokeWidth={1.5} />
          {open && <span>Logout</span>}
        </Button>
      </Box>
    </Box>
  );
}