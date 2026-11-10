# Day 4 — Redux basics and user state

## Goal
Learn the basic idea of Redux, understand why global state is useful, and store logged-in user data in a proper slice.

## What I practiced
- how Redux keeps application state in one central store
- how a slice groups related state and actions together
- how reducers update state immutably
- how useSelector reads user data from the store
- how useDispatch sends actions like login and logout
- how to protect pages with a logged-in user

## Why Redux is used
When multiple pages or components need the same user information, passing props through many layers becomes messy. Redux solves this by storing shared state in one place. This makes the app easier to manage and more predictable.

## What a slice looks like
A slice usually contains:
- initialState
- reducer functions
- action creators

Example concept:

```ts
const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null },
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});
```

## Proper user data pattern
The logged-in user should be stored as an object, for example:

```ts
{
  id: 'u1',
  name: 'Ali',
  role: 'user'
}
```

Then any page can read it using `useSelector`, and actions like `login` or `logout` can update it globally.

## Why this matters in a real app
A dashboard should know whether a user is logged in before showing protected data. If the user is null, it should show the login screen. If the user exists, it should show the dashboard and user-specific pages.

## Problem I solved
I was learning how to keep app-level login state in one place instead of duplicating user data in many components. This makes the app more structured and easier to expand.

## Next learning goal
Start learning how to connect the user slice with real API login requests, form validation, and more advanced app state patterns.
