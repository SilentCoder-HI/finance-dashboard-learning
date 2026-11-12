import { Box, Typography } from '@mui/material';

export default function About() {
  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', py: 5 }}>
      <Typography variant="h4" className="text-slate-900 text-2xl font-bold mb-2">
        About this app
      </Typography>
      <Typography variant="body1" className="text-slate-600">
        This project is a finance dashboard learning app built with React, TypeScript,
        Redux, and Material UI. The goal is to practice real business dashboard logic,
        routing, and state management step by step.
      </Typography>
    </Box>
  );
}
