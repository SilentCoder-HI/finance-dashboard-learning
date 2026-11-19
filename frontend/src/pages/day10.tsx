import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';

export function Day10LearningPage() {
  return (
    <Box className="overflow-auto h-full" sx={{ mx: 'auto', py: { xs: 2, md: 4 } }}>
      <Stack direction="row" spacing={1} sx={{ mb: 1, alignItems: 'center' }}>
        <Chip label="Day 10" color="primary" />
        <Typography variant="overline" color="text.secondary">
          Learning journey
        </Typography>
      </Stack>

      <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
        Permission system and user management
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 760 }}>
        Day 10 added a role-based permission system with per-user overrides, a permission service on the backend, user management UI on the frontend, and aligned the data layer and types across the stack.
      </Typography>

      <Stack spacing={2}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              What I built
            </Typography>
            <Typography color="text.secondary">
              Created a single source of truth for permission names, role-to-permission defaults, and a resolver that computes final permissions (role + grant - deny). Added permissionOverrides to the user model, returned resolved permissions from /auth/login, built a ManageUserModal with a permission matrix, and wired the UsersPage to open it. Moved dummy data into frontend/src/data/dummy and shared types into frontend/src/types.
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Backend
            </Typography>
            <Stack spacing={1}>
              <Typography color="text.secondary"><strong>Permissions:</strong> PERMISSIONS and ALL_PERMISSIONS in permissions.ts; ROLE_PERMISSIONS and resolvePermissions in permission.service.ts.</Typography>
              <Typography color="text.secondary"><strong>User model:</strong> permissionOverrides.grant/deny added; role defaults unchanged.</Typography>
              <Typography color="text.secondary"><strong>Auth:</strong> /auth/login now checks isActive, resolves permissions, and includes them in the response and JWT payload.</Typography>
              <Typography color="text.secondary"><strong>Models:</strong> added Order, AuditLog, Company/Customer/Invoice refinements and an index barrel in model/index.ts.</Typography>
              <Typography color="text.secondary"><strong>Routes:</strong> /api/users role-scoped listing; /api/companies mounted; company routes stubbed.</Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Frontend
            </Typography>
            <Stack spacing={1}>
              <Typography color="text.secondary"><strong>Types:</strong> shared types moved to frontend/src/types/index.ts (roles, permissions, users, customers, invoices, orders, money helpers).</Typography>
              <Typography color="text.secondary"><strong>Auth slice:</strong> re-exports ROLES/Role/AuthUser from the shared types; login stores permissions.</Typography>
              <Typography color="text.secondary"><strong>User service:</strong> fetchCompanyusers calls /api/users with credentials.</Typography>
              <Typography color="text.secondary"><strong>Users page:</strong> TanStack Table with loading/error states; clicking edit opens ManageUserModal.</Typography>
              <Typography color="text.secondary"><strong>Manage modal:</strong> loads effective permissions, toggles grants with read dependencies, saves diffs, delete and active toggle stubs.</Typography>
              <Typography color="text.secondary"><strong>Data paths:</strong> dummy JSON moved under frontend/src/data/dummy; imports updated.</Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Key takeaways
            </Typography>
            <Stack spacing={1}>
              <Typography color="text.secondary">Compute final permissions on the server (role + grant - deny) and send them to the client.</Typography>
              <Typography color="text.secondary">Keep permission names in one place shared by backend and frontend.</Typography>
              <Typography color="text.secondary">Model user exceptions as overrides instead of rewriting role defaults.</Typography>
              <Typography color="text.secondary">Scope list endpoints by token claims to avoid cross-company data leaks.</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}