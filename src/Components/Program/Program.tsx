import React from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import colors from "../Theming/Colors";

const styles = {
  boxMain: {
    my: 10,
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
    display: "flex",
    alignItems: "center",
    my: 2,
  },
  normalText: {
    fontFamily: '"Red Hat Mono", monospace',
    my: 2,
  },
};

const Program = () => {
  return (
    <Container id="program">
      <Box sx={styles.boxMain}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <div data-aos="flip-up">
              <Typography variant="h1" color="primary" sx={styles.title}>
                Program Training and Resources
              </Typography>
            </div>
          </Grid>
          <div data-aos="zoom-in">
            <Grid item xs={12}>
              <Typography variant="h5" color="primary" sx={styles.subTitle}>
                Scratch{" "}
                <Box
                  sx={{ height: 50 }}
                  component="img"
                  src="/images/scratch.png"
                />
              </Typography>
              <Typography
                variant="subtitle1"
                color="primary"
                sx={styles.normalText}
              >
                Scratch is a software that helps young people learn to think
                creatively, reason systematically, and work collaboratively —
                essential skills for life in the 21st century.
              </Typography>
            </Grid>
          </div>
          <div data-aos="zoom-in">
            <Grid item xs={12}>
              <Typography variant="h5" color="primary" sx={styles.subTitle}>
                Google Doodle Kids coding Game{"  "}
                <Box
                  sx={{ height: 50 }}
                  component="img"
                  src="/images/doodle.gif"
                />
              </Typography>
              <Typography
                variant="subtitle1"
                color="primary"
                sx={styles.normalText}
              >
                The interactive doodle, which first debuted on the Google
                homepage on 4 December 2017, is titled 'Coding for Carrots,' and
                requires you to help a rabbit collect carrots by controlling its
                motion along a block of tiles, akin to an online version of
                hopscotch.
              </Typography>
            </Grid>
          </div>
          <div data-aos="zoom-in">
            <Grid item xs={12}>
              <Typography variant="h5" color="primary" sx={styles.subTitle}>
                Basic HTML{"  "}
                <Box
                  sx={{ height: 50 }}
                  component="img"
                  src="/images/html.jpg"
                />
              </Typography>
              <Typography
                variant="subtitle1"
                color="primary"
                sx={styles.normalText}
              >
                Explain to students how websites work. What a web page is. What
                a html document is. How to create a HTML document. Introduce
                tags like Headings, paragraph, image and lists.
              </Typography>
            </Grid>
          </div>
        </Grid>
      </Box>
    </Container>
  );
};
export default Program;
