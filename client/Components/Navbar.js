import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, MenuItem, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="fixed" sx={{ bgcolor: "white" }}>
      <Toolbar sx={{ borderBottom: "solid 1px grey" }}>
        <MenuItem
          component={Link}
          to={"/home"}
          sx={{
            "&:hover": { bgcolor: "transparent" },
            marginLeft: "6%",
            width: "100%",
          }}
        >
          <Typography variant="logo">MOTION YOGA</Typography>
        </MenuItem>
        <MenuItem
          component={Link}
          to={"/start"}
          sx={{ "&:hover": { bgcolor: "transparent" }, marginLeft: "auto" }}
        >
          <Typography variant="menuitem">Start</Typography>
        </MenuItem>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
