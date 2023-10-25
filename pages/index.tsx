// import * as React from "react";
import type { NextPage } from "next";
// import Head from "next/head";
import { Container } from "@mui/material";
import Link from "../src/Components/Link";
import Hero from "../src/Components/Hero";
import About from "../src/Components/About";
import Result from "../src/Components/Result";
import Program from "../src/Components/Program";
import EventsPhotos from "../src/Components/EventsPhotos";
import CurrentEvent from "../src/Components/Events/CurrentEvent";

const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <Container sx={{ my: 5 }}>
        <CurrentEvent />
      </Container>
      <About />
      <Result />
      <Program />
      <EventsPhotos />
    </>
  );
};

export default Home;
