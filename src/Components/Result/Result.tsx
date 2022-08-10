import React from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import colors from "../Theming/Colors";

import Results from "./Results";

const styles = {
  boxMain: {
    my: 10,
  },
  title: {
    bgcolor: colors.primary,
    fontSize: { xs: "3.5rem", md: "5.5rem" },
    fontFamily: '"Neucha", cursive',
    textAlign: "center",
    p: 3,
    borderRadius: 5,
  },
  subTitle: {
    fontFamily: '"Red Hat Mono", monospace',
  },
  normalText: {
    fontFamily: '"Red Hat Mono", monospace',
    my: 3,
  },
};

interface resultsType {
  title: string;
  number: number;
  content: string;
}

const results: Array<resultsType> = [
  {
    title: "+ Students Reached",
    number: 900,
    content: `We’ve successfully provided free computer science and coding training to over 900 students across multiple local government areas in Benue State. We are eager to do more… watch this space or join us in taking tech to more kids. Everyone is welcomed.`,
  },
  {
    title: " Schools And 2 Orphanage Reached",
    number: 8,
    content: `Since our inception, we’ve activated TeenTech Hub in 8 public schools and 2 orphanage homes. Feel free to contact us if you’ll like to have TeenTech Hub at an institution. We love to collaborate.`,
  },
  {
    title: "+ Facilitators",
    number: 19,
    content: `TeenTech Hub is powered by volunteers who code every day (real-life software developers). So far we’ve worked with over 15 amazing developers from near our host institutions. Are you a developer and would love to help? Feel free to send us a mail.`,
  },
];

const Result = () => {
  return (
    <Container id="results">
      <Box sx={styles.boxMain}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <div data-aos="flip-right">
              <Typography variant="h1" color="primary" sx={styles.title}>
                Our Results So Far
              </Typography>
            </div>
          </Grid>
          {results.map((result) => {
            return (
              <Grid key={result.title} item xs={12} md={4}>
                <Results
                  number={result.number}
                  title={result.title}
                  content={result.content}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
};
export default Result;
