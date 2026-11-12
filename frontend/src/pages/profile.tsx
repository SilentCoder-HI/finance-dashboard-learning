
import { Box } from '@mui/material'
import { useAppSelector } from '../store/store'
import { alluser } from '../data/userData'
import { invoices } from '../data/invoices'

// Layout only: Box components, theme colors, static placeholder text.
// Replace the placeholders with your own data/logic.

const paneSx = {
    bgcolor: 'background.paper',
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 3,
    p: 3,
}

const headingSx = {
    m: 0,
    mb: 1.5,
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontSize: 19,
    fontWeight: 700,
    color: "black"
}

const buttonSx = {
    font: 'inherit',
    cursor: 'pointer',
    borderRadius: 2.5,
    px: 2,
    py: 1.1,
    border: '1px solid',
    borderColor: 'divider',
    bgcolor: 'background.paper',
    color: 'text.primary',
}


export default function Profile() {
    const cUser = useAppSelector((state) => state.auth.user)
    const filterUser = alluser.filter((user) => user.company.name.toLocaleLowerCase() == cUser?.name?.toLowerCase())

    const user = filterUser[0]
    if (!user) {
        return <Box sx={{ p: 4 }}>Profile not found for the current user.</Box>
    }
    const userinvoice = invoices.filter((state) => state.customer == user.company.name)
    const paid = userinvoice.filter((state) => state.status == "Paid").reduce((sum, invoice) => sum + invoice.amount, 0)
    const overDue = userinvoice.filter((state) => state.status == "Overdue").reduce((sum, invoice) => sum + invoice.amount, 0)
    const draft = userinvoice.filter((state) => state.status == "Draft").reduce((sum, invoice) => sum + invoice.amount, 0)

    const logo = user.profile.fullName.split('').map(word => word.charAt(0)).join().substring(0, 1)
    return (
        <Box sx={{ maxWidth: 880, mx: 'auto', p: { xs: 2, md: 5 } }}>
            {/* Main card */}

            {user && (
                <>

                    <Box
                        sx={{
                            bgcolor: 'background.paper',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 4,
                            overflow: 'hidden',
                        }}
                    >
                        {/* Cover */}
                        <Box
                            sx={{
                                height: 170,
                                background: (t) =>
                                    `linear-gradient(120deg, ${t.palette.primary.dark}, ${t.palette.primary.main} 55%, ${t.palette.primary.light})`,
                            }}
                        />

                        {/* Header: avatar + name + buttons */}
                        <Box
                            sx={{
                                px: 3,
                                pb: 3,
                                mt: '-52px',
                                display: 'flex',
                                flexWrap: 'wrap',
                                alignItems: 'flex-end',
                                gap: 2.5,
                            }}
                        >
                            <Box
                                sx={{
                                    width: 104,
                                    height: 104,
                                    borderRadius: '50%',
                                    border: '5px solid',
                                    borderColor: 'background.paper',
                                    bgcolor: 'primary.main',
                                    color: 'primary.contrastText',
                                    display: 'grid',
                                    placeItems: 'center',
                                    fontFamily: 'Georgia, serif',
                                    fontWeight: 700,
                                    fontSize: 38,
                                }}
                            >
                                {logo}
                            </Box>

                            <Box sx={{ flex: 1, minWidth: 220, pt: { xs: 1, sm: 7 } }}>
                                <Box
                                    component="h1"
                                    sx={{
                                        m: 0,
                                        fontFamily: 'Georgia, serif',
                                        fontSize: 28,
                                        lineHeight: 1.15,
                                        color: "black"

                                    }}
                                >
                                    {user.profile.fullName}
                                </Box>
                                <Box sx={{ color: 'text.secondary', mt: 0.25 }}>
                                    {user.address.city}
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Box component="button" sx={buttonSx}>
                                    Follow
                                </Box>
                                <Box
                                    component="button"
                                    sx={{
                                        ...buttonSx,
                                        bgcolor: 'primary.main',
                                        color: 'primary.contrastText',
                                        borderColor: 'primary.main',
                                        fontWeight: 600,
                                    }}
                                >
                                    Edit profile
                                </Box>
                            </Box>
                        </Box>

                        {/* Stats */}
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                borderTop: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            {['Posts', 'Followers', 'Following'].map((label, i) => (
                                <Box
                                    key={label}
                                    sx={{
                                        p: 2,
                                        textAlign: 'center',
                                        borderRight: i < 2 ? '1px solid' : 0,
                                        borderColor: 'divider',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            fontFamily: 'Georgia, serif',
                                            fontWeight: 700,
                                            fontSize: 24,
                                        }}
                                    >
                                        48
                                    </Box>
                                    <Box sx={{ color: 'text.secondary', fontSize: 14 }}>{label}</Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                            gap: 2,
                            mt: 2,
                        }}
                    >
                        {/* About */}
                        <Box sx={paneSx}>
                            <Box component="h2" sx={headingSx}>About</Box>
                            <Box sx={{ mb: 1.5 }}>{user.company.industry}</Box>

                            {[
                                { label: 'Email', value: user.email },
                                { label: 'Location', value: user.address.city },
                                { label: 'Company', value: user.company.name },
                            ].map((item) => (
                                <Box key={item.label} sx={{ display: 'flex', gap: 1.25, py: 0.9, fontSize: 15 }}>
                                    <Box sx={{ fontWeight: 600, minWidth: 80 }}>{item.label}</Box>
                                    <Box sx={{ color: 'text.secondary' }}>{item.value}</Box>
                                </Box>
                            ))}
                        </Box>

                        {/* Skills */}
                        <Box sx={paneSx}>
                            <Box component="h2" sx={headingSx}>
                                Data
                            </Box>
                            {[
                                { label: 'Paid', value: paid },
                                { label: 'Overdue', value: overDue },
                                { label: 'pending', value: draft },
                            ].map((item) => (
                                <Box key={item.label} sx={{ display: 'flex', gap: 1.25, py: 0.9, fontSize: 15 }}>
                                    <Box sx={{ fontWeight: 600, minWidth: 80 }}>{item.label}</Box>
                                    <Box sx={{ color: 'text.secondary' }}>{item.value}</Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </>

            )}
        </Box>
    )
}