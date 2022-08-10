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

import events from ".";
import Link from "../Link";

const CurrentEvent = () => {
  return (
    <>
      {events
        .filter((evt: any) => evt.status === "upcoming")
        .map((evt: any) => (
          <Grid key={evt.name} item xs={12}>
            <Card
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{}}>
                  <Typography
                    component="div"
                    mb={2}
                    alignItems="center"
                    variant="h4"
                  >
                    Upcoming Event!!!{" "}
                    <IconButton>
                      <OnlinePredictionIcon color="success" />
                    </IconButton>
                  </Typography>
                  <Typography component="div" variant="h5">
                    {evt.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {evt.description}
                  </Typography>
                  <Typography
                    variant="h5"
                    my={1}
                    color="primary"
                    component="div"
                  >
                    Venue: {evt.venue}
                  </Typography>
                  <Typography
                    variant="h5"
                    my={1}
                    color="primary"
                    component="div"
                  >
                    Time: {evt.time}
                  </Typography>
                  {evt.link && (
                    <Link href={evt.link}>
                      <Button variant="contained" sx={{ px: 2, py: 3, my: 2 }}>
                        Enroll Now
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Box>
              <CardMedia
                component="img"
                sx={{ width: { xs: "100%", md: "35%" } }}
                image={evt.image}
                alt="summber bootcamp"
              />
            </Card>
          </Grid>
        ))}
    </>
  );
};

export default CurrentEvent;
