import React from "react";

// router
import { Link } from "react-router-dom";

// mui
import { AppBar, Toolbar, MenuItem, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "white",
        width: "100%",
        height: {
          xxs: "45px",
          xs: "50px",
          sm: "60px",
          md: "65px",
          lg: "73px",
          xl: "73px",
        },
      }}
    >
      <Toolbar
        sx={{
          // borderBottom: "solid 1px grey",
          width: "100%",
        }}
      >
        <MenuItem
          component={Link}
          to={"/home"}
          sx={{
            "&:hover": { bgcolor: "transparent" },
            width: "100%",
            textAlign: "center",
            marginTop: {
              xxs: "0",
            },
          }}
        >
          <Typography
            variant="logo"
            sx={{
              fontSize: {
                xxs: "25px",
                xs: "35px",
                sm: "45px",
                md: "55px",
                lg: "55px",
                xl: "55px",
              },
              paddingLeft: {
                xxs: "0",
                xs: "0",
                sm: "14vw",
                md: "14vw",
                lg: "14vw",
                xl: "14vw",
              },
            }}
          >
            MOTION YOGA
          </Typography>
        </MenuItem>
        <MenuItem
          component={Link}
          to={"/start"}
          sx={{
            "&:hover": { bgcolor: "transparent" },
            display: {
              xxs: "none",
              xs: "none",
              sm: "inline",
              md: "inline",
              lg: "inline",
              xl: "inline",
            },
          }}
        >
          <Typography variant="menuitem">Start</Typography>
        </MenuItem>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
