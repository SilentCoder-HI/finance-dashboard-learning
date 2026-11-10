# Finance Dashboard Learning Project

This project is a daily React + TypeScript practice app focused on building a professional billing and finance dashboard.

The goal is simple: learn by building real UI features that look useful, feel professional, and mimic the kind of dashboards used in business tools, ERPs, and SaaS products.

## What this app is

This app currently includes:
- an invoice data table
- global search across invoice ID and customer name
- pagination
- status chips for invoice states
- a revenue chart
- a customer mix chart
- a clean dashboard layout using Material UI

This is not just a tutorial app. It is a portfolio-style project that helps build practical frontend skills with real business data.

## Why I’m updating it daily

I want to improve my React skills step by step:
- first learn the UI structure
- then improve data handling
- then add charts and filters
- then build professional components
- then make the app feel more polished and production-ready

The idea is to keep growing every day, not just finish one screen once.

## What I learned so far

From this stage, I learned:
- how to build a dashboard layout
- how to render table data in React
- how to connect data with Material UI components
- how to use TanStack Table for search and pagination
- how to use Recharts for graphs
- how to separate data, types, and chart components cleanly
- how to structure a React app in a more professional way

## Day-by-day plan

### Day 1
- invoice dashboard layout
- table with search
- pagination
- revenue chart
- customer chart

### Day 2
- advanced filtering by status, date, and customer
- sorting by amount or date
- better summary cards

### Day 3
- invoice add/edit form
- modal form for creating invoices
- validation for required fields

### Day 4
- dark mode and theme polish
- layout refinements
- responsive mobile design

### Day 5
- API integration
- loading states and error handling
- real backend data flow

### Day 6+
- authentication flow
- dashboard analytics pages
- export features
- better production-level architecture

## Project structure

```bash
src/
  App.tsx
  day-1/
    FinanceDashboard.tsx
    charts/
      RevenueChart.tsx
      CustomerMixChart.tsx
  data/
    invoices.json
    invoices.ts
  types/
    invoice.ts
```

## Tech stack

- React
- TypeScript
- Vite
- Material UI
- TanStack Table
- Recharts

## How to run

```bash
npm install
npm run dev
```

## Goal for this project

This project is a learning path toward becoming stronger at building real-world frontend dashboards and business interfaces.

Every day I will improve one part of the app, and over time it will become a more complete and professional product.

## Status

In progress — Day 3 complete. Customer insights, combined filters, and learning journal are finished.



## Next project

This finance dashboard is wrapped up through Day 3. The next project will focus on forms, validation, and API-backed data.
