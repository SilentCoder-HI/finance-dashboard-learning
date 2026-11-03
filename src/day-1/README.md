# Day 1

## Goal
Build the first working finance dashboard from the invoice dataset.

## What I built
- A typed invoice data model for the application
- A dashboard layout with summary cards for revenue, paid invoices, overdue items, and average invoice value
- A searchable invoice table using React and TanStack table patterns
- A pagination flow for viewing invoice records in batches
- A revenue chart and customer mix chart for visual business insights
- A clean MUI-based UI with a professional finance dashboard look

## Main focus
This day was about creating the foundation:
- the data layer
- the table logic
- the card-based stats overview
- the first chart-based visual sections

## Learnings
- how to map JSON data into a typed TypeScript model
- how to use controlled state in React for filtering and pagination
- how to structure reusable dashboard cards and details
- how to connect a table to a real dataset and render business information visually

## Project result
Day 1 created a stable starting dashboard that works as a base for future learning. It is the foundation for later improvements such as sorting, status filters, and more advanced table behavior.

## Key files
- `FinanceDashboard.tsx`
- `charts/RevenueChart.tsx`
- `charts/CustomerMixChart.tsx`
- `../data/invoices.ts`
