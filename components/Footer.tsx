"use client";

import { Box, Container, Grid, Link, Typography } from "@mui/material";
import React from "react";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="space-between">
          <Box sx={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              BDX0 Blog
            </Typography>
            <Typography variant="body2" color="text.secondary">
              &copy; {new Date().getFullYear()} BDX0 Material Design 3 Blog. All systems
              operational.
            </Typography>
          </Box>

          <Box sx={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" display="block" variant="body2">
              Blog
            </Link>
            <Link href="/projects" color="inherit" display="block" variant="body2">
              Projects
            </Link>
            <Link href="/resume" color="inherit" display="block" variant="body2">
              Resume
            </Link>
          </Box>

          <Box sx={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact & Support
            </Typography>
            <Link
              href="mailto:baoduy.duong0206@gmail.com?subject=Accessibility Issue Report"
              color="inherit"
              display="block"
              variant="body2"
            >
              Report an accessibility issue
            </Link>
            {/* Add more contact info or social media links here */}
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {/* Placeholder for social media icons */}
              {/* <IconButton color="inherit" aria-label="GitHub">
                <GitHubIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton> */}
            </Typography>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}
