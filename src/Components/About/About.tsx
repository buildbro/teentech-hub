import React from "react";
import type { NextComponentType } from "next";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import colors from "../Theming/Colors";
import Section from "./Section";

const styles = {
  boxMain: {
    my: 5,
  },
  title: {
    bgcolor: "primary.main",
    fontSize: { xs: "3.5rem", md: "5.5rem" },
    fontFamily: '"Neucha", cursive',
    textAlign: "center",
    borderBottom: "1px solid",
    p: 3,
    color: colors.primary,
    borderRadius: 5,
  },
  subTitle: {
    fontFamily: '"Red Hat Mono", monospace',
    textDecoration: "underline",
  },
  normalText: {
    fontFamily: '"Red Hat Mono", monospace',
    my: 3,
  },
};

const datas = [
  {
    title: "Our Motivation",
    text: `At BuildBrothers NG, we believe that exposing kids to computers and
        computer science increases their chances of becoming tech leaders in the
        future.`,
  },
  {
    title: "Facts We Found",
    text: `Our believe is backed by the stories of successful tech leaders like Bill Gates and Mark Zurkerberg.`,
  },
  {
    title: "Our Solution",
    text: `Hence, why we created TeenTech Hub, a complete tech club for school children.`,
  },
];

interface dataType {
  title: string;
  text: string;
}

const About: NextComponentType = () => {
  return (
    <Container id="about">
      <Box sx={styles.boxMain}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <div data-aos="flip-left">
              <Typography variant="h1" color="primary" sx={styles.title}>
                About Us
              </Typography>
            </div>
          </Grid>
          {datas.map((data: dataType, index: number) => {
            return (
              <Grid item xs={12} md={4} key={data.title}>
                <Section data={data} index={index} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
};
export default About;
