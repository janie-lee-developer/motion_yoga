import React, { Suspense } from "react";
import lazy from "react-lazy-with-preload";
import { Button, Typography } from "@mui/material";
// import Entry from "./Entry";
const Entry = lazy(() => import("./Entry"));
Entry.preload();

const Home = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Entry />
      </Suspense>
      <div style={{ margin: "2rem auto", width: "70%", textAlign: "center" }}>
        <Typography variant="cursive" sx={{ fontSize: "3rem" }}>
          We care about your well being.
        </Typography>
      </div>
    </div>
  );
};

export default Home;
