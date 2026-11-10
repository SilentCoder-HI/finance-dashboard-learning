import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';

export function Day1LearningPage() {
  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', py: { xs: 2, md: 4 } }}>
      <Stack direction="row" spacing={1} sx={{ mb: 1, alignItems: "center" }}>
        <Chip label="Day 1" color="primary" />
        <Typography variant="overline" color="text.secondary">
          Learning journey
        </Typography>
      </Stack>
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
        Dashboard foundations
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 760 }}>
        The first day focused on connecting invoice data to useful business information and learning the basic data flow of a React dashboard.
      </Typography>

      <Stack spacing={2}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              What I practiced
            </Typography>
            <Typography color="text.secondary">
              Loading invoice records from JSON, describing them with a TypeScript type, calculating summary values, searching and paginating a table, and passing invoice data into charts.
            </Typography>
          </CardContent>
        </Card>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Logic I learned
            </Typography>
            <Typography color="text.secondary">
              Keep source records separate from derived display values. Use React state for interactive controls, compute summaries from the data, and reuse typed invoice records across the table and visualizations.
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
