import React from "react";

import { useIsVisible } from "react-is-visible";

import Typography from "@mui/material/Typography";
import colors from "../Theming/Colors";
import Counter from "../Counter";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const styles = {
  subTitle: {
    fontFamily: '"Red Hat Mono", monospace',
  },
  normalText: {
    fontFamily: '"Red Hat Mono", monospace',
    my: 3,
  },
  acc: {
    backgroundColor: "primary.main",
    color: colors.primary,
  },
};

const Results = ({
  title,
  number,
  content,
}: {
  title: string;
  number: number;
  content: string;
}) => {
  const [show, setShow] = React.useState<boolean>(false);
  const accNode = React.useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(accNode);

  let timing: any = undefined;

  React.useEffect(() => {
    timing = setTimeout(() => {
      setShow(isVisible);
    }, 1000);

    return () => clearTimeout(timing);
  }, [isVisible]);

  return (
    <div data-aos="zoom-in-up">
      <Accordion
        ref={accNode}
        disableGutters
        elevation={0}
        square
        expanded={show}
      >
        <AccordionSummary
          onClick={() => setShow(!show)}
          sx={styles.acc}
          expandIcon={<ExpandMoreIcon sx={{ color: colors.primary }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h5" sx={styles.subTitle}>
            <Counter start={0} end={number} interval={5} />
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{content}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default Results;
