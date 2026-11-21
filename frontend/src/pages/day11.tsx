import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';

export function Day11LearningPage() {
  return (
    <Box className="overflow-auto h-full" sx={{ mx: 'auto', py: { xs: 2, md: 4 } }}>
      <Stack direction="row" spacing={1} sx={{ mb: 1, alignItems: 'center' }}>
        <Chip label="Day 11" color="primary" />
        <Typography variant="overline" color="text.secondary">
          Learning journey
        </Typography>
      </Stack>

      <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
        Permission-driven page access
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 760 }}>
        Day 11 completed the permission work from Day 10. The server now computes and stores only overrides, while the sidebar and route guards consume the resolved permission list instead of comparing role strings.
      </Typography>

      <Stack spacing={2}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              What I built
            </Typography>
            <Typography color="text.secondary">
              Finished the user-permission update flow, simplified the manage modal so it works from the user object alone, wired the table to refetch after a save, switched the dashboard sidebar from role lists to permission strings, and converted the route guard from allowedRoles to a single permission prop. A viewer can now gain Users page access through a grant without changing role.
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Backend
            </Typography>
            <Stack spacing={1}>
              <Typography color="text.secondary"><strong>Contract:</strong> the client sends only the user id in the URL and the desired final permission list in the body.</Typography>
              <Typography color="text.secondary"><strong>Role source:</strong> the target role is read from the database document, never from the request body.</Typography>
              <Typography color="text.secondary"><strong>Diff:</strong> ROLE_PERMISSIONS[role] gives the defaults; grant is sent minus defaults, deny is defaults minus sent. Deny wins and redundant entries are dropped.</Typography>
              <Typography color="text.secondary"><strong>Storage:</strong> only permissionOverrides is saved, so role changes still apply automatically to stored exceptions.</Typography>
              <Typography color="text.secondary"><strong>Validation:</strong> every string is checked against ALL_PERMISSIONS and wildcards are rejected before saving.</Typography>
              <Typography color="text.secondary"><strong>Login:</strong> a disabled account is rejected with 403 and a resolved permissions array is returned to the client.</Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Frontend
            </Typography>
            <Stack spacing={1}>
              <Typography color="text.secondary"><strong>Manage modal:</strong> removed the permission fetch and dead loading state; ticks come from the role defaults plus the user saved state, and editing uses a local draft.</Typography>
              <Typography color="text.secondary"><strong>Overrides:</strong> green and red styling comes from grant and deny badges, while the change type is derived from status, permissions, or profile edits.</Typography>
              <Typography color="text.secondary"><strong>Refetch:</strong> UsersPage reloads the list after a successful save so the table reflects new overrides immediately.</Typography>
              <Typography color="text.secondary"><strong>Sidebar:</strong> each nav item declares a permission string and filters with hasPermission(user.permissions ?? [], permission).</Typography>
              <Typography color="text.secondary"><strong>Route guard:</strong> RoleRoute now accepts a permission prop; the Users route uses user:read instead of an allowedRoles array.</Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Why the viewer could open Users
            </Typography>
            <Stack spacing={1}>
              <Typography color="text.secondary">ProtectedRoute only asked whether a user was logged in, so any authenticated role passed.</Typography>
              <Typography color="text.secondary">RoleRoute already had the guard logic but was never imported by a route.</Typography>
              <Typography color="text.secondary">Role-only rules cannot honor a grant, because the role string stays viewer after the override is saved.</Typography>
              <Typography color="text.secondary">The fix was to let one resolved permission array drive both the link and the page guard.</Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Key takeaways
            </Typography>
            <Stack spacing={1}>
              <Typography color="text.secondary">Compute role + grant - deny once on the server and store the result in one flat array on the client.</Typography>
              <Typography color="text.secondary">The frontend decides what to ask for; the backend decides what is stored and what is allowed.</Typography>
              <Typography color="text.secondary">A permission check belongs on the thing that mounts the page, not inside every page component.</Typography>
              <Typography color="text.secondary">Permissions in Redux are a login snapshot, so overrides changed mid-session need a re-login or an /auth/me refresh.</Typography>
              <Typography color="text.secondary">Demo users have empty permission arrays, so real backend login is required to test grants.</Typography>
              <Typography color="text.secondary">Wiring existing code is often the real fix; the guard was already built and simply unused.</Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Problems hit and fixed
            </Typography>
            <Stack spacing={1}>
              <Typography color="text.secondary"><strong>Empty catch blocks:</strong> a failed permission update could hang the browser with no response; errors now need to return JSON.</Typography>
              <Typography color="text.secondary"><strong>Conditional hooks:</strong> DashboardLayout calls a navigation hook inside an if block, which breaks the Rules of Hooks and still needs fixing.</Typography>
              <Typography color="text.secondary"><strong>Lint tooling:</strong> npm run lint crashes in ts-api-utils with a TypeError before analyzing files, so TypeScript compilation was used to verify changes.</Typography>
              <Typography color="text.secondary"><strong>Partial refactor:</strong> switching RoleRoute to permissions left unused role imports and an old allowedRoles prop, which TypeScript caught.</Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Next learning goal
            </Typography>
            <Typography color="text.secondary">
              Enforce the same permission strings on every backend route, add /auth/me to refresh permissions without a full re-login, and fix the conditional hook in DashboardLayout.
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
