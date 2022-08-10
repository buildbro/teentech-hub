import React from "react";
import { NextPage } from "next";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";

import EventCard from "../../src/Components/Events/Card/EventCard";

import events from "../../src/Components/Events";
import Link from "../../src/Components/Link";
import CurrentEvent from "../../src/Components/Events/CurrentEvent";

const Events: NextPage = () => {
  return (
    <Container>
      <Box>
        <Typography variant="h3" sx={{ my: 5 }} color="primary">
          Teen Tech Hub Events
        </Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} container spacing={2}>
            <CurrentEvent />
          </Grid>
          {events.map((event: any, index: number) => {
            return (
              <Grid
                key={index}
                item
                xs={12}
                md={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <EventCard event={event} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
};

export default Events;
