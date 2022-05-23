import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

const Entry = () => {
  return (
    <Box sx={{ position: "relative", width: "100%" }}>
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
          top: "15vw",
          backgroundColor: "transparent",
        }}
      >
        <div style={{ width: "80%", margin: "0 auto", textAlign: "center" }}>
          <Typography variant="home">Empty Your Mind With Us.</Typography>
          <br />
          <div style={{ marginTop: "3vw" }}>
            <Button
              component={Link}
              to={"/start"}
              variant="contained"
              color="black"
              sx={{
                width: "20%",
                fontSize: {
                  xxs: "4vw",
                  xs: "3vw",
                  sm: "2.7vw",
                  md: "2.3vw",
                  lg: "2vw",
                  xl: "2vw",
                },
                padding: {
                  xxs: "2vw 2rem",
                  xs: "2vw 2rem",
                  sm: "2vw 2rem",
                  md: "2vw 2rem",
                  lg: "2vw 2rem",
                  xl: "2vw 2rem",
                },
              }}
            >
              Start
            </Button>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Entry;
