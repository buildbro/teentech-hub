import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import colors from "../Theming/Colors";

import AOS from "aos";
import "aos/dist/aos.css";

const styles = {
  subTitle: {
    fontFamily: '"Red Hat Mono", monospace',
    textDecoration: "underline",
  },
  normalText: {
    fontFamily: '"Red Hat Mono", monospace',
    my: 3,
  },
  boxMain: {
    width: "100%",
    bgcolor: colors.primary,
    p: 5,
  },
};

interface dataType {
  title: string;
  text: string;
}

const Section = ({ data, index }: { data: dataType; index: number }) => {
  React.useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div data-aos="fade-left">
      <Box sx={styles.boxMain}>
        <Typography variant="h5" color="primary" sx={styles.subTitle}>
          {data.title}
        </Typography>
        <Typography variant="subtitle1" color="primary" sx={styles.normalText}>
          {data.text}
        </Typography>
      </Box>
    </div>
  );
};
export default Section;
