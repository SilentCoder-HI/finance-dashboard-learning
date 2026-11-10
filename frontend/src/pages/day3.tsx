import { Box, Card, CardContent, Chip, Divider, Stack, Typography } from '@mui/material';

export function Day3LearningPage() {
  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', py: { xs: 2, md: 4 } }}>
      <Stack direction="row" spacing={1} sx={{ mb: 1, alignItems: 'center' }}>
        <Chip label="Day 3" color="primary" />
        <Typography variant="overline" color="text.secondary">
          Learning journey
        </Typography>
      </Stack>
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
        Customer insights and combined filters
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 760 }}>
        Day 3 moved from the whole invoice list to a focused customer view. I practiced deriving a smaller dataset from the source invoices, combining search with status filters, and calculating KPI cards from the filtered result.
      </Typography>

      <Stack spacing={2}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              What I built
            </Typography>
            <Typography color="text.secondary">
              A customer selector, a search box, a status filter, summary cards for total, paid, and overdue amounts, and a table that updates for the selected customer. The controls stay responsive on small screens.
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Logic I learned
            </Typography>
            <Stack spacing={1}>
              <Typography color="text.secondary"><strong>Derived data:</strong> filter the source invoices by customer first, then apply search and status filters to that smaller set.</Typography>
              <Typography color="text.secondary"><strong>Controlled filters:</strong> keep each filter in its own React state and combine them in one memoized filter function.</Typography>
              <Typography color="text.secondary"><strong>Derived metrics:</strong> calculate totals from the customer invoice set so the cards describe the same data as the table.</Typography>
              <Typography color="text.secondary"><strong>Typed events:</strong> use the correct MUI event types for select and input changes to keep TypeScript strict.</Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Problem I solved
            </Typography>
            <Typography color="text.secondary">
              The original page kept an unused status filter and mixed TanStack Table features that were not needed. I removed the unused code, added a working status filter, and made the table simpler and easier to read.
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Next learning goal
            </Typography>
            <Typography color="text.secondary">
              Wrap up this finance dashboard as a portfolio project, then start the next project with forms, validation, and API-backed data.
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
