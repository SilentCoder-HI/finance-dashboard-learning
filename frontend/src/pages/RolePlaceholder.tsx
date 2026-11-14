import { Box, Paper, Typography } from '@mui/material';

export function RolePlaceholder({ title }: { title: string }) {
    return (
        <Box sx={{ maxWidth: 720, mx: 'auto', py: { xs: 2, md: 4 } }}>
            <Paper sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    {title}
                </Typography>
                <Typography color="text.secondary">
                    This page is scaffolded for the role-based navigation. Full content is coming later.
                </Typography>
            </Paper>
        </Box>
    );
}
