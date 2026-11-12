import { Box, ButtonGroup, Button } from '@mui/material'
import { BookOpenCheck, LayoutGrid, UserRound, Wallet } from 'lucide-react';
import type { ReactElement } from 'react';

export type PageId =
  | 'overview'
  | 'invoices'
  | 'profile'
  | 'day-1'
  | 'day-2'
  | 'day-3'
  | 'day-4'
  | 'day-5'
  | 'day-6';

type SidenavProps = {
    activePage: PageId;
    setActivePage: (pageId: PageId) => void;
};

export default function Sidenav({ setActivePage, activePage }: SidenavProps) {

    const nav :{ section: string; items: { id: PageId; label: string; icon: ReactElement }[] }[] = [

        {
            section: "Main",
            items: [
                { id: "overview", label: "Main Dashboard", icon: <LayoutGrid size={16} strokeWidth={1.5} /> },
                { id: "profile", label: "Profile", icon: <UserRound size={16} strokeWidth={1.5} /> },
                { id: "invoices", label: "Invoices", icon: <Wallet size={16} strokeWidth={1.5} /> },
            ]
        },
        {
            section: "Learning",
            items: [
                { id: "day-1", label: "Day 1 - Learning", icon: <BookOpenCheck size={16} strokeWidth={1.5} /> },
                { id: "day-2", label: "Day 2 - Learning", icon: <BookOpenCheck size={16} strokeWidth={1.5} /> },
                { id: "day-3", label: "Day 3 - Learning", icon: <BookOpenCheck size={16} strokeWidth={1.5} /> },
                { id: "day-4", label: "Day 4 - Learning", icon: <BookOpenCheck size={16} strokeWidth={1.5} /> },
                { id: "day-5", label: "Day 5 - Learning", icon: <BookOpenCheck size={16} strokeWidth={1.5} /> },
                { id: "day-6", label: "Day 6 - Learning", icon: <BookOpenCheck size={16} strokeWidth={1.5} /> }
            ]
        }
    ];

    return (
        <Box className="bg-transparent w-full">
            {nav.map((group) => (
                <Box className="border-b w-full sidebar-item border-slate-200" key={group.section} sx={{ mb: 2 }}>
                    <ButtonGroup className='flex flex-col w-full gap-2 my-4' variant="outlined" >
                        {group.items.map((item) => (
                            <Button
                                sx={{ border: 0 }}
                                key={item.id}
                                variant={activePage === item.id ? "contained" : "outlined"}
                                className='flex items-center justify-start font-bold gap-5 rounded-2xl border border-white/60 bg-white/40 px-4 py-2 text-slate-800 backdrop-blur-xl transition-all duration-200 hover:bg-white/60 hover:scale-[1.02]'
                                onClick={()=>setActivePage(item.id)}
                            >
                                {item.icon}
                                {item.label}
                            </Button>
                        ))}
                    </ButtonGroup>
                </Box>
            ))}

        </Box>
    )
}