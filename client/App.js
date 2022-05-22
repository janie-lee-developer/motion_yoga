import React, { useEffect } from "react";

// MUI
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../public/styles/mui_theme_effect";

// child components
import Navbar from "./Components/Navbar";
import Routes from "./Routes";

const App = () => {
  useEffect(() => {
    const gif = new Image();
    gif.src = "https://giphy.com/embed/ly6swQArDGorfi4h7p/video";
  }, []);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Routes />
      </ThemeProvider>
    </div>
  );
};

export default App;
