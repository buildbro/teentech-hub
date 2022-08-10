import * as React from "react";
import type { NextComponentType } from "next";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import MenuIcon from "@mui/icons-material/Menu";

import Link from "../Link";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import colors from "../Theming/Colors";
import ScrollToElement from "../ScrollToElement";

import { useRouter } from "next/router";

const socials = [
  {
    label: "Facebook",
    icon: <FacebookIcon />,
    link: "https://facebook.com/buildbrothers",
  },
  {
    label: "Twitter",
    icon: <TwitterIcon />,
    link: "https://twitter.com/TeenTech_Hub",
  },
  {
    label: "Instagram",
    icon: <InstagramIcon />,
    link: " https://www.instagram.com/teentechhub",
  },
];

const links = [
  { label: "Home", link: "/" },
  { label: "About", link: "#about" },
  { label: "Program Training and Resources", link: "#program" },
  { label: "News", link: "#" },
  { label: "Contact", link: "#" },
  { label: "Support", link: "https://forms.gle/NUKcEeRim43szA5h7" },
  { label: "Events", link: "/events" },
];

const styles = {
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bread: {
    flexGrow: 0.5,
    justifyContent: "space-around",
    display: {
      xs: "none",
      md: "flex",
    },
  },
  appBar: {
    backgroundColor: colors.primary,
    boxShadow: 0,
    borderBottom: "1px solid",
    borderColor: "divider",
  },
};

const Navigation: NextComponentType = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const trigger = useScrollTrigger({
    target: typeof window !== "undefined" ? window : undefined,
  });

  const router = useRouter();

  React.useEffect(() => {
    setOpen(false);
  }, [router.asPath]);
  return (
    <>
      <Drawer anchor={"left"} open={open} onClose={() => setOpen(false)}>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <Box
                component="img"
                src={"/images/logo.png"}
                sx={{ height: "30px" }}
              />
            </ListItemButton>
          </ListItem>
          {links.map((link, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <Link href={link.link}>
                  <ListItemText primary={link.label} />
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar sx={styles.appBar}>
          <Toolbar>
            <Container sx={styles.toolbar}>
              <Box sx={styles.toolbar}>
                <IconButton
                  onClick={() => setOpen(true)}
                  sx={{ display: { xs: "flex", md: "none" } }}
                >
                  <MenuIcon />
                </IconButton>
                <Link href="/">
                  <Box
                    component="img"
                    src={"/images/logo.png"}
                    sx={{ height: "30px" }}
                  />
                </Link>
              </Box>

              <Breadcrumbs separator=" " sx={styles.bread}>
                {links.map((link) => {
                  return (
                    <Button
                      key={link.label}
                      onClick={() =>
                        link.link.startsWith("#") && ScrollToElement(link.link)
                      }
                    >
                      {link.link.startsWith("#") ? (
                        <Typography variant="subtitle2">
                          {link.label}
                        </Typography>
                      ) : (
                        <Link href={link.link}>
                          <Typography variant="subtitle2">
                            {link.label}
                          </Typography>
                        </Link>
                      )}
                    </Button>
                  );
                })}
              </Breadcrumbs>

              <Box>
                {socials.map((social) => {
                  return (
                    <Link href={social.link} key={social.label}>
                      <IconButton color="primary">{social.icon}</IconButton>
                    </Link>
                  );
                })}
              </Box>
            </Container>
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar />
    </>
  );
};

export default Navigation;
