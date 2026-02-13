"use client";

import { Box, Container, Grid, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import React from "react";
import SectionTitle from "../../components/mainHeading/sectiontitle";

export default function ContactPage() {
  return (
    <Container>
      <SectionTitle title="Contact Us" subTitle="Contact Us" />

      <Grid container spacing={4} sx={{ justifySelf: "center", color: "gray" }}>
        {/* Contact Form */}

        {/* Contact Information */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <LocationOnIcon fontSize="large" />
            <Typography variant="body1">
              123 Pizza Street, Alger, Algeria
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <PhoneIcon fontSize="large" />
            <Typography variant="body1">+213 555 123 456</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <EmailIcon fontSize="large" />
            <Typography variant="body1">contact@pizza.com</Typography>
          </Box>
        </Box>
      </Grid>
    </Container>
  );
}
