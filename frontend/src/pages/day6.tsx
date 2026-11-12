import { Box, Card, CardContent, Chip, Divider, Stack, Typography } from '@mui/material';

export function Day6LearningPage() {
  return (
    <Box className="overflow-auto" h-full  sx={{ mx: 'auto', py: { xs: 2, md: 4 } }}>
      <Stack direction="row" spacing={1} sx={{ mb: 1, alignItems: 'center' }}>
        <Chip label="Day 6" color="primary" />
        <Typography variant="overline" color="text.secondary">
          Learning journey
        </Typography>
      </Stack>

      <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
        Tailwind, design polish, and auth integration
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 760 }}>
        Day 6 focused on styling the dashboard with Tailwind CSS, applying an unslop design pass, adding a glassmorphism UI, and connecting the login form to the backend API.
      </Typography>

      <Stack spacing={2}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              What I built
            </Typography>
            <Typography color="text.secondary">
              Installed Tailwind CSS v4 with the Vite plugin, removed conflicting template CSS, applied a glassmorphism background with glass cards, and polished the dashboard copy, type, icons, and motion. I also wired the login form to the Express backend and aligned the response shapes.
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Tailwind setup
            </Typography>
            <Stack spacing={1}>
              <Typography color="text.secondary"><strong>Plugin:</strong> registered `@tailwindcss/vite` in `vite.config.ts`.</Typography>
              <Typography color="text.secondary"><strong>Import:</strong> replaced template CSS in `index.css` with `@import "tailwindcss";`.</Typography>
              <Typography color="text.secondary"><strong>Cleanup:</strong> removed unused `App.css` so no legacy styles conflict.</Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Design pass (unslop)
            </Typography>
            <Stack spacing={1}>
              <Typography color="text.secondary"><strong>Color:</strong> graphite/slate ramp with one blue accent; removed gradients and glows.</Typography>
              <Typography color="text.secondary"><strong>Icons:</strong> standardized on lucide-react at 16px / 1.5 stroke.</Typography>
              <Typography color="text.secondary"><strong>Copy and type:</strong> sentence case, no greetings, weights 600 max, `tabular-nums` on figures.</Typography>
              <Typography color="text.secondary"><strong>Motion:</strong> replaced `transition-all` with named transitions; removed hover scale on cards.</Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Glassmorphism UI
            </Typography>
            <Typography color="text.secondary">
              Added a gradient background with colored blobs and styled the sidebar and main panel as glass cards using `backdrop-blur-xl` and translucent white backgrounds. Used dark slate text for readability.
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Authentication integration
            </Typography>
            <Stack spacing={1}>
              <Typography color="text.secondary"><strong>Backend:</strong> `/auth/login` now returns the user object directly instead of wrapping it in `data`.</Typography>
              <Typography color="text.secondary"><strong>Frontend:</strong> login stores the returned user in Redux as-is; added a guard in Profile for missing data.</Typography>
              <Typography color="text.secondary"><strong>TypeScript:</strong> fixed Sidenav prop types and removed unused variables.</Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Next learning goal
            </Typography>
            <Typography color="text.secondary">
              Add real password verification on the server, persist sessions safely, protect invoice data by user, and add loading and error states to the login flow.
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      <Divider sx={{ mt: 3 }} />
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        This page records the Day 6 learning log. The dashboard and the learning journey are separate parts of the app.
      </Typography>
    </Box>
  );
}
