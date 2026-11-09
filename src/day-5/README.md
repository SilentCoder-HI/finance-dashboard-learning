# Day 5 — Invoice filtering and login flow

## Goal
Build an invoice page that can be filtered by customer, status, and search text. Continue improving the login flow and understand what is still needed for secure, real authentication.

## What I practiced
- reading the logged-in user from the Redux store with `useAppSelector`
- using React state to keep track of the selected customer, search text, and status filter
- using `useMemo` to derive customer invoices and filtered results
- searching invoice IDs, customers, statuses, and dates without changing the source data
- calculating total, paid, and overdue invoice amounts
- displaying invoice data in a Material UI table with status chips
- connecting the selected customer to the user stored in Redux

## Invoice filtering
The invoice page starts with the logged-in user's name as the selected customer. It then filters the invoice list by that customer. A search field and status dropdown narrow the results further. The summary cards show totals for that customer's invoices, and the table displays matching invoices or an empty-state message when there are no matches.

The original invoice data stays unchanged. The page derives filtered lists and totals from it, which keeps the filtering logic easier to reason about.

## How the login flow currently works
The login form dispatches a `login` action to Redux when the entered username matches a customer name found in the local invoice data. The app reads the Redux user state to decide whether to show the login page or the application.

This is a learning prototype, not real or secure authentication yet:
- the password is not checked
- the list of accepted usernames comes from local invoice data
- Redux state is kept in memory and is lost when the page is refreshed
- the customer selector can still be changed, so it must not be treated as an authorization boundary

## What I learned
A customer filter can make a dashboard feel personalized, but filtering data in the browser does not secure it. Real authorization must be enforced by a trusted server, and the server should return only the data the signed-in user is allowed to access.

I also learned how the login state and invoice page are connected: Redux supplies the current user, while local component state controls the page's temporary filters.

## Problem I worked on
I practiced combining global user state with local filter state to create a customer-focused invoice dashboard. I also identified the difference between a demo login flow and real authentication.

## Next learning goal
Connect the login form to an authentication API or provider. Validate credentials on the server, return and safely persist a session (preferably with secure, HttpOnly cookies), handle loading and error states, and enforce customer access on the server. Then test the login, logout, refresh, and protected-data flows.
