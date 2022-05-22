import React, { Suspense } from "react";

// preload
import lazy from "react-lazy-with-preload";
const Entry = lazy(() => import("./Entry"));
Entry.preload();

// MUI
import { Typography } from "@mui/material";

const Home = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Entry />
      </Suspense>
      <div style={{ margin: "0 auto", width: "70%", textAlign: "center" }}>
        <Typography variant="cursive" sx={{ fontSize: "3rem" }}>
          We care about your well being.
        </Typography>
      </div>
    </div>
  );
};

export default Home;
