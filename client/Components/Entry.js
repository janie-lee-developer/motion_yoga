import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

const Entry = () => {
  return (
    <Box
      sx={{
        marginTop: {
          xxs: "60px",
          xs: "63px",
          sm: "11vw",
          md: "10vw",
          lg: "9.5vw",
          xl: "9.5vw",
        },
      }}
    >
      <div style={{ width: "100%", zIndex: "-1" }}>
        <div
          className="gif_home"
          style={{
            height: "0",
            paddingBottom: "56.25%",
            position: "relative",
            width: "100%",
          }}
        >
          <iframe
            allowFullscreen=""
            frameBorder="0"
            src="https://giphy.com/embed/ly6swQArDGorfi4h7p/video"
            style={{
              left: "0",
              position: "absolute",
              top: "0",
              width: "100%",
              height: "100%",
            }}
          ></iframe>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          zIndex: "1",
          position: "absolute",
          top: "30%",
          left: "17%",
          backgroundColor: "transparent",
        }}
      >
        <Typography variant="home">Empty Your Mind With Us.</Typography>
        <br />
        <div style={{ marginTop: "2rem", marginLeft: "24%" }}>
          <Button
            component={Link}
            to={"/start"}
            variant="contained"
            color="black"
            sx={{ width: "20%", fontSize: "1.5rem", padding: "1.5rem 2rem" }}
          >
            Start
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default Entry;
