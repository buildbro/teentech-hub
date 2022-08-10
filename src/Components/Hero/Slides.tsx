import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const styles = {
  subTitle: {
    fontFamily: '"Red Hat Mono", monospace',
  },
  mBox: {
    mb: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    border: "1px solid gray",
    height: "100%",
  },
};

const slides = [
  {
    type: "Fact",
    text: `Mark Zuckerberg (inventor of Facebook) developed an
          interest in computers at an early age; when he was about 12, he used
          Atari BASIC to create a messaging program he named "Zucknet." His
          father used the program in his dental office, so that the receptionist
          could inform him of a new patient without yelling across the room.`,
    person: "- Mark Zuckerberg",
  },
  {
    type: "Quote",
    text: `All of my friends who have younger siblings who are going to college or high school - my number one piece of advice is: You should learn how to program.`,
    person: "- Mark Zuckerberg",
  },
  {
    type: "Quote",
    text: `In fifteen years we'll be teaching programming just like reading and writing, and wondering why we didn't do it sooner.`,
    person: "- Mark Zuckerberg",
  },
];

const Slides = () => {
  return (
    <>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {slides.map((slide, index) => {
          return (
            <SwiperSlide
              key={index}
              className="slidersS"
              style={{ height: "100%" }}
            >
              <Typography
                variant="subtitle1"
                color="primary"
                sx={styles.subTitle}
              >
                <b>{slide.type}:</b> {slide.text}
              </Typography>
              <small>{slide.person}</small>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <style>
        {`
            
            
          `}
      </style>
    </>
  );
};
export default Slides;
