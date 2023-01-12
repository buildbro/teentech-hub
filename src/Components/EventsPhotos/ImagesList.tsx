import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import colors from "../Theming/Colors";

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

const EventPhotos = () => {
  const arrayOfImages = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
  return (
    <Box>
      <Container>
        <div data-aos="flip-up">
          <Typography variant="h1" color="primary" sx={styles.title}>
            Photos From Recent Events
          </Typography>
        </div>

        <ImageList cols={3} rowHeight={256}>
          {
            
            arrayOfImages.reverse().map((item, index) => (
              <ImageListItem key={index}>
                <img
                  src={`/images/teen-code/${item}.jpg`}
                  srcSet={`/images/teen-code/${item}.jpg`}
                  alt={"Teen Tech Hub"}
                  loading="lazy"
                />
              </ImageListItem>
            ))
          }
        </ImageList>
      </Container>
    </Box>
  );
};
export default EventPhotos;

const itemData = [
  {
    img: "/images/kids.jpg",
    title: "Kids",
  },
  {
    img: "/images/kids.jpg",
    title: "Kids",
  },
  {
    img: "/images/kids.jpg",
    title: "Kids",
  },
  {
    img: "/images/kids.jpg",
    title: "Kids",
  },
  {
    img: "/images/kids.jpg",
    title: "Kids",
  },
  {
    img: "/images/kids.jpg",
    title: "Kids",
  },
  {
    img: "/images/kids.jpg",
    title: "Kids",
  },
  {
    img: "/images/kids.jpg",
    title: "Kids",
  },
  {
    img: "/images/kids.jpg",
    title: "Kids",
  },
  {
    img: "/images/kids.jpg",
    title: "Kids",
  },
  {
    img: "/images/kids.jpg",
    title: "Kids",
  },
];
