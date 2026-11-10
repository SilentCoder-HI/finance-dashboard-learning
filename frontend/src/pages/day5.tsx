import { Box, Card, CardContent, Chip, Divider, Stack, Typography } from '@mui/material';

export function Day5LearningPage() {
  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', py: { xs: 2, md: 4 } }}>
      <Stack direction="row" spacing={1} sx={{ mb: 1, alignItems: 'center' }}>
        <Chip label="Day 5" color="primary" />
        <Typography variant="overline" color="text.secondary">
          Learning journey
        </Typography>
      </Stack>

      <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
        Invoice filtering and login flow
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 760 }}>
        Day 5 focused on combining Redux user state with a customer invoice page. I practiced filtering, searching, and summarizing invoices, and reviewed what is still needed to make the login system real and secure.
      </Typography>

      <Stack spacing={2}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              What I built
            </Typography>
            <Typography color="text.secondary">
              A customer invoice view with a customer selector, status filter, search field, summary cards for total, paid, and overdue amounts, and a table with colored status chips. The selected customer initially comes from the user stored in Redux.
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Filtering and derived data
            </Typography>
            <Stack spacing={1}>
              <Typography color="text.secondary"><strong>Local state:</strong> React state tracks the selected customer, search query, and invoice status.</Typography>
              <Typography color="text.secondary"><strong>Memoized filtering:</strong> useMemo derives the selected customer's invoices and applies the current search and status filters.</Typography>
              <Typography color="text.secondary"><strong>Summary values:</strong> totals are calculated from the selected customer's invoices so the cards stay relevant to that customer.</Typography>
              <Typography color="text.secondary"><strong>Empty state:</strong> the table shows a helpful message when no invoices match the filters.</Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Current login prototype
            </Typography>
            <Typography color="text.secondary">
              The login form currently checks a username against customer names in local invoice data and dispatches a Redux login action. It does not verify the password, contact an authentication server, or persist a session after refresh, so it is only a learning prototype—not real authentication.
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Security lesson
            </Typography>
            <Typography color="text.secondary">
              Filtering invoices in the browser is not access control. A customer selector can change which local records are displayed, so a real application must verify the user's identity and permissions on the server and only return authorized data.
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Next learning goal
            </Typography>
            <Typography color="text.secondary">
              Connect the form to an authentication API or provider, verify credentials on the server, safely persist a session, handle loading and error states, and enforce customer access on the server. Then test login, logout, refresh, and protected data.
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      <Divider sx={{ mt: 3 }} />
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        This page records the Day 5 learning log. The invoice dashboard and the learning journey are separate parts of the app.
      </Typography>
    </Box>
  );
}
