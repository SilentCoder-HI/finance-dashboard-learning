import { Box, Card, CardContent, Chip, Divider, Stack, Typography } from '@mui/material';

export function Day2LearningPage() {
  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', py: { xs: 2, md: 4 } }}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
        <Chip label="Day 2" color="primary" />
        <Typography variant="overline" color="text.secondary">
          Learning journey
        </Typography>
      </Stack>
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
        Table sorting and time-based data
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 760 }}>
        Today I focused on the logic behind business data: sorting invoices predictably and grouping dates correctly for a year-over-year chart.
      </Typography>

      <Stack spacing={2}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              What I built
            </Typography>
            <Typography color="text.secondary">
              Added sortable invoice columns with ascending and descending states, search by invoice ID or customer, and pagination. The main dashboard also groups invoice amounts by month and year, with a year selector and previous-year comparison.
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Logic I learned
            </Typography>
            <Stack spacing={1}>
              <Typography color="text.secondary"><strong>Sorting:</strong> keep sort state in React and let the table's sorted row model order records; render the direction from the active column state.</Typography>
              <Typography color="text.secondary"><strong>Search and pages:</strong> apply table row models so searching, sorting, and pagination work together instead of manually changing the source data.</Typography>
              <Typography color="text.secondary"><strong>Chart aggregation:</strong> read the year and month from each invoice date, then add each amount into the matching monthly bucket.</Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Problem I solved
            </Typography>
            <Typography color="text.secondary">
              Filtering chart data by the current week or year could hide invoices when the sample JSON covered another period. The dashboard now builds its year choices from the invoice data, rather than assuming today's calendar year contains records. The chart also needs a parent with a defined height for responsive sizing.
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Next learning goal
            </Typography>
            <Typography color="text.secondary">
              Add combined status and date filters, then calculate the summary cards from the filtered invoice set. The main dashboard remains the shared app and will grow as I learn more.
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      <Divider sx={{ mt: 3 }} />
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        The daily pages record what I practiced. They are separate from the cumulative finance dashboard.
      </Typography>
    </Box>
  );
}
