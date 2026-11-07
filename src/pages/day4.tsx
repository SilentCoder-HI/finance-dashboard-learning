import { Box, Card, CardContent, Chip, Divider, Stack, Typography } from '@mui/material';

export function Day4LearningPage() {
  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', py: { xs: 2, md: 4 } }}>
      <Stack direction="row" spacing={1} sx={{ mb: 1, alignItems: 'center' }}>
        <Chip label="Day 4" color="primary" />
        <Typography variant="overline" color="text.secondary">
          Learning journey
        </Typography>
      </Stack>

      <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
        Redux basics and user state
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 760 }}>
        Day 4 was about learning how a real app keeps shared data in one place. I studied Redux basics, how a slice works, why global state matters, and how to store the logged-in user in a proper slice.
      </Typography>

      <Stack spacing={2}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              What I practiced
            </Typography>
            <Typography color="text.secondary">
              I learned how Redux stores app-wide state in one place, how a slice defines state + actions + reducer logic, and how useSelector and useDispatch let components read and update that state. I also used a basic user object to represent the logged-in account.
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Why Redux is useful
            </Typography>
            <Stack spacing={1}>
              <Typography color="text.secondary"><strong>Shared state:</strong> if many pages need the same user or app data, Redux makes it available everywhere without passing props through every component.</Typography>
              <Typography color="text.secondary"><strong>Predictable updates:</strong> state changes happen through reducer actions, so they are easier to track and debug.</Typography>
              <Typography color="text.secondary"><strong>Cleaner app flow:</strong> your UI components stay focused on rendering, while the data logic lives in a slice.</Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              How a slice works
            </Typography>
            <Typography color="text.secondary">
              A slice is a small section of Redux state. It usually contains the initial state, reducer functions, and action creators. In this project, the auth slice stores the user object and exposes login and logout actions. That is the simplest real example of storing user data globally.
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Proper user data in a slice
            </Typography>
            <Typography color="text.secondary">
              The user should be stored as a structured object such as  id, name, role . Then every page can read it with useSelector and update it through dispatch(login(...)) or dispatch(logout()). This is better than keeping user data in local component state, because the login status must be shared across the entire app.
            </Typography>
          </CardContent>
        </Card>


        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Example idea
            </Typography>
            <Typography color="text.secondary">
              The app checks auth.user. If no user exists, it shows the login screen. If a user exists, the dashboard and protected pages become available. This is the basic pattern used in real apps: login state decides what the user can access.
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              What I learned from this day
            </Typography>
            <Stack spacing={1}>
              <Typography color="text.secondary"><strong>Store:</strong> the central place where all app state lives.</Typography>
              <Typography color="text.secondary"><strong>Slice:</strong> a focused section of state, usually grouped by feature like auth, invoices, or user settings.</Typography>
              <Typography color="text.secondary"><strong>Reducer:</strong> the function that changes state based on an action.</Typography>
              <Typography color="text.secondary"><strong>Selector:</strong> a function used to read data from Redux.</Typography>
              <Typography color="text.secondary"><strong>Dispatch:</strong> the method used to trigger actions and update state.</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Divider sx={{ mt: 3 }} />
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        This was my first real step into Redux. The goal was not to master everything yet, but to understand the basic pattern behind global application state and protected user data.
      </Typography>
    </Box>
  );
}
