import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';

export function Day9LearningPage() {
  return (
    <Box className="overflow-auto h-full" sx={{ mx: 'auto', py: { xs: 2, md: 4 } }}>
      <Stack direction="row" spacing={1} sx={{ mb: 1, alignItems: 'center' }}>
        <Chip label="Day 9" color="primary" />
        <Typography variant="overline" color="text.secondary">
          Learning journey
        </Typography>
      </Stack>

      <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
        Cookie-based JWT auth and role-based users API
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 760 }}>
        Day 9 moved authentication from a plain login response to a real cookie-based JWT flow, added a verification middleware, and built a role-based users API consumed by the frontend.
      </Typography>

      <Stack spacing={2}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              What I built
            </Typography>
            <Typography color="text.secondary">
              Added cookie-parser and wired JWT signing into /auth/login, created a verifyJwt middleware, refactored /api/users to be protected and role-scoped (superadmin sees all, others see their company), and connected the frontend UsersPage to the real API with credentials.
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Backend
            </Typography>
            <Stack spacing={1}>
              <Typography color="text.secondary"><strong>JWT cookie:</strong> login signs a token (userId, companyId, role) and sets it as an httpOnly cookie with sameSite lax.</Typography>
              <Typography color="text.secondary"><strong>Middleware:</strong> verifyJwt reads req.cookies.token, verifies it, attaches req.user.</Typography>
              <Typography color="text.secondary"><strong>Users API:</strong> GET /api/users returns all users for superadmins, company-scoped users otherwise; password hashes excluded.</Typography>
              <Typography color="text.secondary"><strong>Wiring:</strong> mounted /api/users, /api/companies, /auth in index.ts; cookieParser registered.</Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Frontend
            </Typography>
            <Stack spacing={1}>
              <Typography color="text.secondary"><strong>Login:</strong> added credentials: 'include' so the auth cookie is accepted cross-port.</Typography>
              <Typography color="text.secondary"><strong>User service:</strong> fetchCompanyusers calls /api/users with credentials and returns data.data.</Typography>
              <Typography color="text.secondary"><strong>Users page:</strong> TanStack Table with loading skeleton and error states.</Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Key takeaways
            </Typography>
            <Stack spacing={1}>
              <Typography color="text.secondary">httpOnly cookies plus credentials: 'include' keep JWTs out of localStorage.</Typography>
              <Typography color="text.secondary">Scope data access by token claims, not URL params, to avoid IDOR.</Typography>
              <Typography color="text.secondary">Never leave an empty catch in auth middleware; always return 401.</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
