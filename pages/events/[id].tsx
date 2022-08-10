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

import events from "../../src/Components/Events";
import Link from "../../src/Components/Link";
import { useRouter } from "next/router";

const Event = () => {
  const [event, setEvent] = React.useState<any>(null);
  const router = useRouter();
  React.useEffect(() => {
    const _event = events.filter((evt) => {
      return evt.id === router.query.id;
    })[0];
    setEvent(_event);
  }, []);

  if (!event) {
    return null;
  }
  return (
    <Container>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
          my: 5,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{}}>
            {event.status === "upcoming" && (
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
            )}
            <Typography component="div" variant="h5">
              {event.title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {event.description}
            </Typography>
            <Typography variant="h5" my={1} color="primary" component="div">
              Venue: {event.venue}
            </Typography>
            <Typography variant="h5" my={1} color="primary" component="div">
              {event.time && <> Time: {event.time}</>}
            </Typography>
            {event.link && (
              <Link href={event.link}>
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
          image={event.image}
          alt="summber bootcamp"
        />
      </Card>
    </Container>
  );
};

export default Event;
