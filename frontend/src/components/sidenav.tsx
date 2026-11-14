import { Box, Button, Typography } from '@mui/material'
import { LayoutGrid, LogOut, User, UserRound, Wallet } from 'lucide-react';
import { useState, type ReactElement } from 'react';
import { useAppDispatch } from '../store';
import { clearUser } from '../store/store';
import { useNavigate } from 'react-router-dom';
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

type SidenavProps = {
    activePage: PageId;
    setActivePage: (pageId: PageId) => void;
};

export default function Sidenav({ setActivePage, activePage }: SidenavProps) {
    const [open, setOpen] = useState(true)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const handle_logout = () => {
        navigate('/login', { replace: true })
        dispatch(clearUser())
    }

    const nav: { section: string; items: { id: PageId; label: string; icon: ReactElement }[] }[] = [

        {
            section: "Main",
            items: [
                { id: "overview", label: "Main Dashboard", icon: <LayoutGrid size={16} strokeWidth={1.5} /> },
                { id: "profile", label: "Profile", icon: <UserRound size={16} strokeWidth={1.5} /> },
                { id: "user", label: "User", icon: <User size={16} strokeWidth={1.5} /> },
                { id: "invoices", label: "Invoices", icon: <Wallet size={16} strokeWidth={1.5} /> },
            ]
        },
    ];

    return (
        <Box
            className={`rounded-2xl flex flex-col justify-between  overflow-x-hidden ${open ? "w-[350px]" : "w-[100px]"} border border-white/80 bg-white/60 p-5 backdrop-blur-xl shadow-lg overflow-y-auto no-scrollbar `}
            component="nav"
            aria-label="Dashboard pages"
        >
            <Box>
                <Box className={` flex items-center ${!open ? "flex-col-reverse justify-center" : " justify-between"} `}>
                    <Typography variant="subtitle1" className='text-slate-900 py-2 text-xl font-semibold tracking-tight'>
                        FW.
                    </Typography>
                    <Button onClick={() => setOpen(!open)}>

                        {open ? "Menu" : "Open"}
                    </Button>
                </Box>
                <Box className="bg-transparent w-full">
                    {nav.map((group) => (
                        <Box key={group.section} className="flex flex-col w-full gap-2 my-4">
                            {group.items.map((item) => (
                                <Button
                                    key={item.id}
                                    fullWidth
                                    variant={activePage === item.id ? "contained" : "outlined"}
                                    onClick={() => setActivePage(item.id)}
                                    sx={{
                                        border: 0,
                                        justifyContent: open ? 'flex-start' : 'center',
                                        textTransform: 'none', // Optional: prevents ALL CAPS text
                                    }}
                                    className="flex items-center font-bold gap-4 rounded-2xl border border-white/60 bg-white/40 px-4 py-2 text-slate-800 backdrop-blur-xl transition-all duration-200 hover:bg-white/60 hover:scale-[1.02]"
                                >
                                    {item.icon}
                                    {open && <span>{item.label}</span>}
                                </Button>
                            ))}
                        </Box>
                    ))}
                </Box>
            </Box>
            <Box className="">
                <Button><LogOut onClick={() => handle_logout()} /></Button>
            </Box>
        </Box>
    )
}