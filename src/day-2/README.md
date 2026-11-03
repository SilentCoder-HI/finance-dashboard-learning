# Day 2 — Learning Journey

## Project structure

The **Finance Dashboard** is the main, cumulative application. It lives in `src/App.tsx` and grows over time as new features are learned and added. Its Application navigation contains the overview and the sortable Invoices screen. The dashboard is not replaced by a separate version every day.

The **Day 1** and **Day 2** pages in `src/pages/` are learning-journal entries. They explain the concepts and logic practiced each day; they are not alternate dashboards or the main product UI. Add a journal page for each new learning day and link it under Learning Journey in the app sidebar.

## What I practiced on Day 2

- Sorting invoice columns in ascending and descending order.
- Keeping sorting in controlled React/TanStack Table state.
- Combining the table row models for search, sorting, and pagination.
- Grouping invoice amounts into monthly chart data using the year and month in each invoice date.
- Building year choices from the data instead of assuming the current calendar year has invoices.
- Giving a responsive chart a parent with a defined height.

## What I built

- The main dashboard now includes monthly revenue bars for the selected year and the previous year, with a year selector.
- The Invoices screen supports sorting, search by invoice ID or customer, and pagination.
- The app sidebar separates Application pages from the Day 1 and Day 2 learning journeys.

## Problem I solved

The chart originally used current-date ranges that did not match the years in the sample invoice JSON, so it could show no data. It now derives available years from invoice dates and aggregates each year's amounts by month.

## Next learning goals

- Add status and date filters that can be combined with search.
- Calculate KPI cards from the filtered invoice set.
- Keep adding learned business logic to the main dashboard while recording each day's concepts in its own learning page.
