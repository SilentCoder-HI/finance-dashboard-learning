import { Box, Typography } from '@mui/material';

export default function About() {
  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', py: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        About this app
      </Typography>
      <Typography variant="body1" color="text.secondary">
        This project is a finance dashboard learning app built with React, TypeScript,
        Redux, and Material UI. The goal is to practice real business dashboard logic,
        routing, and state management step by step.
      </Typography>
    </Box>
  );
}
