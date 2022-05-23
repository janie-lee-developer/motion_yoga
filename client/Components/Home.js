import React, { Suspense } from "react";

// preload
import lazy from "react-lazy-with-preload";
const Entry = lazy(() => import("./Entry"));
Entry.preload();

// MUI
import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box
      className={"MUI_BOX"}
      sx={{
        marginTop: {
          xxs: "45px",
          xs: "50px",
          sm: "60px",
          md: "65px",
          lg: "73px",
          xl: "73px",
        },
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Entry />
      </Suspense>
      <div style={{ margin: "0 auto", width: "70%", textAlign: "center" }}>
        <Typography variant="cursive" sx={{ fontSize: "3rem" }}>
          We care about your well being.
        </Typography>
      </div>
    </Box>
  );
};

export default Home;
