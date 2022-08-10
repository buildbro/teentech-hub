import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "../../Link";

const EventCard = ({ event }: { event: any }) => {
  const handleShare = async () => {
    try {
      await navigator.share({
        title: event.title,
        text: event.description,
        url: `https://teentechhub.org.ng/events/${event.id}`,
      });
    } catch (err) {}
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="summber bootcamp"
        height="250"
        image={event.image}
        sx={{
          objectFit: "cover",
          objectPosition: "top",
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {event.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleShare} size="small">
          Share
        </Button>
        <Link href={`/events/${event.id}`}>
          <Button size="small">Learn More</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default EventCard;
