import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import Entry from "./Entry";

const Home = () => {
  return (
    <div>
      <Entry />
      <div style={{ margin: "2rem auto", width: "70%", textAlign: "center" }}>
        <Typography variant="cursive" sx={{ fontSize: "3rem" }}>
          We care about your well being.
        </Typography>
      </div>
    </div>
  );
};

export default Home;
