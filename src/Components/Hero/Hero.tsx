import React from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import colors from "../Theming/Colors";
import Slides from "./Slides";
import Link from "../Link";
import ScrollToElement from "../ScrollToElement";

const styles = {
  boxMain: {
    bgcolor: colors.primary,
  },
  boxMain2: {
    display: "flex",
    alignItems: "center",
    backgroundImage: 'url("/images/background.svg")',
    minHeight: "90vh",
  },
  img: {
    width: "100%",
    height: "fit-content",
    maxHeight: 350,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 10,

    boxShadow: 3,
  },
  title: {
    fontSize: "5.5rem",
    fontFamily: '"Neucha", cursive',
  },
  subTitle: {
    fontFamily: '"Red Hat Mono", monospace',
  },
  leftGrid: {
    alignSelf: "flex-start",
    textAlign: { xs: "center", md: "left" },
  },
  innerBox: {
    py: { xs: 6, md: 2 },
  },
};

const Hero = () => {
  return (
    <Box sx={styles.boxMain}>
      <Box sx={styles.boxMain2}>
        <Container>
          <Box sx={styles.innerBox}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6} sx={styles.leftGrid}>
                <Typography variant="h4" color="primary" sx={styles.subTitle}>
                  Welcome To
                </Typography>
                <Typography variant="h1" color="primary" sx={styles.title}>
                  Teen Tech Hub
                </Typography>

                <Slides />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  sx={styles.img}
                  src="/images/hero-image.jpg"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={2} direction={{ xs: "column", md: "row" }}>
                  <Link
                    href="https://forms.gle/NUKcEeRim43szA5h7"
                    sx={{ width: { xs: "100%", md: "fit-content" } }}
                  >
                    <Button fullWidth variant="contained" sx={{ py: 2, px: 5 }}>
                      <Typography color="secondary">Support-Us</Typography>
                    </Button>
                  </Link>
                  <Link
                    href="/events"
                    sx={{ width: { xs: "100%", md: "fit-content" } }}
                  >
                    <Button fullWidth variant="outlined" sx={{ py: 2, px: 5 }}>
                      <Typography sx={{ fontWeight: "500" }} color="primary">
                        Events
                      </Typography>
                    </Button>
                  </Link>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
export default Hero;
