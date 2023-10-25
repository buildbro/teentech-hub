import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import FacebookIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

import Link from "../Link";
import colors from "../Theming/Colors";

const quickLinks: Array<any> = [
  { title: "Home", link: "/" },
  { title: "About", link: "/#about" },
  { title: "Program Training And Resources", link: "/#program" },
  { title: "Shop", link: "/shop" },
  { title: "News", link: "/#news" },
  // { title: "Contact", link: "#contact" },
  { title: "Contact", link: "/contact" },
];

const socialLinks: Array<any> = [
  {
    title: "Facebook",
    icon: <FacebookIcon />,
    link: "https://facebook.com/buildbrothers",
  },
  {
    title: "Instagram",
    icon: <InstagramIcon />,
    link: "https://instagram.com/teentechhub",
  },
  {
    title: "Twitter",
    icon: <TwitterIcon />,
    link: "https://twitter.com/TeenTech_Hub",
  },
];

const styles = {
  boxMain: {
    py: 1,
    borderTop: "1px solid",
    borderColor: "divider",
    bgcolor: "primary.main",
    color: `${colors.primary} !important`,
    mt: 5,
  },
};
const Footer = () => {
  return (
    <Box sx={styles.boxMain}>
      <Container>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <List
                sx={{
                  height: "97%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <ListItem>
                  <Box
                    sx={{ height: 60 }}
                    component="img"
                    src={"/images/logo.png"}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText>
                    Got Any Feedback? Send us an email via{" "}
                    <b>
                      <a href="mailto:info@buildbrothers.com">
                        info@buildbrothers.com
                      </a>
                    </b>
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    &copy; {new Date().getFullYear()} Teen Tech Hub
                  </ListItemText>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} sm={4}>
              <List>
                <ListItem>
                  <Typography variant="h5">Quick Links</Typography>
                </ListItem>
                {quickLinks.map((link: any) => {
                  return (
                    <Link href={link.link} key={link.title}>
                      <ListItem>
                        <ListItemText>
                          <Typography variant="subtitle2" color="secondary">
                            {link.title}
                          </Typography>
                        </ListItemText>
                      </ListItem>
                    </Link>
                  );
                })}
              </List>
            </Grid>
            <Grid item xs={12} sm={4}>
              <List>
                <ListItem>
                  <Typography variant="h5">Social Links</Typography>
                </ListItem>
                {socialLinks.map((link: any) => {
                  return (
                    <Link href={link.link} key={link.title}>
                      <ListItem>
                        <ListItemIcon>
                          <IconButton color="secondary" size="small">
                            {link.icon}
                          </IconButton>
                        </ListItemIcon>
                        <ListItemText>
                          <Typography variant="subtitle2" color="secondary">
                            {link.title}
                          </Typography>
                        </ListItemText>
                      </ListItem>
                    </Link>
                  );
                })}
              </List>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
export default Footer;
