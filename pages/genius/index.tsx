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

import EventCard from "../../src/Components/Events/Card/EventCard2";

import events from "../../src/Components/Events";
import Link from "../../src/Components/Link";
import CurrentEvent from "../../src/Components/Events/CurrentEvent";

const Events: NextPage = () => {
  const banners = [
    {
      title: "Learn",
      date: "13th April - 14th April",
      time: "10AM Everyday",
      link: "",
      venue:
        "Opposite Evangelical Nursery and Primary School, Lobi Quaters, Old GRA, Makurdi.",
      contact: ["08052465145", "08060386628"],
      status: "past",
      description:
        "Events, bootcamps and trainings to help young people learn new skills",
        image: '/1.png'
    },
    {
      title: "Get Mentorship",
      date: "13th April - 14th April",
      time: "10AM Everyday",
      link: "",
      venue:
        "Opposite Evangelical Nursery and Primary School, Lobi Quaters, Old GRA, Makurdi.",
      contact: ["08052465145", "08060386628"],
      status: "past",
      description:
        "Find an experienced leader, connect and grow.",
        image: '/2.png'
    },
    {
      title: "Invent",
      date: "13th April - 14th April",
      time: "10AM Everyday",
      link: "",
      venue:
        "Opposite Evangelical Nursery and Primary School, Lobi Quaters, Old GRA, Makurdi.",
      contact: ["08052465145", "08060386628"],
      status: "past",
      description:
        "Build the next great App/Startup.",
        image: '/3.png'
    }
  ];
  return (
    <Container>
      <Box>
        <Typography variant="h3" sx={{ my: 5 }} color="primary">
          Genius Club
        </Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} container spacing={2}>
            <CurrentEvent />
          </Grid>
          {banners.map((event: any, index: number) => {
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
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSdNcdmho5Gw5MJrHN-QxQN7yNcTxi_iVzKVGddLGPwm9hORMA/viewform?usp=header">Register</a>
        </Grid>
      </Box>
    </Container>
  );
};

export default Events;
