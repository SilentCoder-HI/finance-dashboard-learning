import { Box, Card, CardContent, Chip, Divider, Stack, Typography } from '@mui/material';

export function Day7LearningPage() {
  return (
    <Box className="overflow-auto h-full" sx={{ mx: 'auto', py: { xs: 2, md: 4 } }}>
      <Stack direction="row" spacing={1} sx={{ mb: 1, alignItems: 'center' }}>
        <Chip label="Day 7" color="primary" />
        <Typography variant="overline" color="text.secondary">
          Learning journey
        </Typography>
      </Stack>

      <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
        Backend auth, MongoDB, and the Node 18 problem
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 760 }}>
        Day 7 focused on making the Express backend actually run with MongoDB, fixing the Node version mismatch, and completing a real login/signup flow with hashed passwords and a clean frontend redirect.
      </Typography>

      <Stack spacing={2}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              What I built
            </Typography>
            <Typography color="text.secondary">
              Connected Express to MongoDB Atlas using Mongoose, added register and login endpoints with bcryptjs password hashing, returned the saved user to the frontend, stored the user in Redux, and redirected to the home page after success. The login page moved to its own /login route.
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              The Node 18 issue
            </Typography>
            <Stack spacing={1}>
              <Typography color="text.secondary"><strong>Problem:</strong> the terminal was using apt Node 18 even though the project needs Node 22 for features like process.loadEnvFile().</Typography>
              <Typography color="text.secondary"><strong>Fix:</strong> used nvm/fnm to switch to Node 22, added .nvmrc with "22", and set engines.node to &gt;=22 in package.json.</Typography>
              <Typography color="text.secondary"><strong>Lesson:</strong> always check node -v in the project folder before debugging backend errors.</Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              MongoDB connection error
            </Typography>
            <Stack spacing={1}>
              <Typography color="text.secondary"><strong>Error:</strong> MONGODB_URI is missing in .env file.</Typography>
              <Typography color="text.secondary"><strong>Cause:</strong> the .env file existed but Node never loaded it into process.env.</Typography>
              <Typography color="text.secondary"><strong>Fix:</strong> load .env with process.loadEnvFile() (Node 22) or dotenv, and handle both the current working directory and the project root path.</Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Authentication flow
            </Typography>
            <Stack spacing={1}>
              <Typography color="text.secondary"><strong>Register:</strong> validates fields, normalizes email, checks for an existing user, hashes the password with bcryptjs, and creates the user in MongoDB.</Typography>
              <Typography color="text.secondary"><strong>Login:</strong> finds the user by email and compares the password with bcrypt.compare.</Typography>
              <Typography color="text.secondary"><strong>Frontend:</strong> login uses email + password, signup adds username, stores the returned user in Redux, and navigates to / after success.</Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Other issues we hit
            </Typography>
            <Stack spacing={1}>
              <Typography color="text.secondary"><strong>TypeScript:</strong> missing @types/express and @types/cors because tsconfig had "types": [].</Typography>
              <Typography color="text.secondary"><strong>Path aliases:</strong> @/ and @Data/ imports broke the compiled dist build, so they became relative imports.</Typography>
              <Typography color="text.secondary"><strong>Generated files:</strong> tsc without outDir created .js files in src; fixed by setting rootDir/outDir.</Typography>
              <Typography color="text.secondary"><strong>Redux typing:</strong> updated the User type to use username and email coming from the server.</Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Next learning goal
            </Typography>
            <Typography color="text.secondary">
              Add JWT authentication, protect routes, validate input with Zod, and persist sessions safely across refreshes.
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      <Divider sx={{ mt: 3 }} />
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        This page records the Day 7 learning log. The dashboard and the learning journey are separate parts of the app.
      </Typography>
    </Box>
  );
}