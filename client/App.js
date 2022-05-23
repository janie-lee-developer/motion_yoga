import React, { useEffect } from "react";

// MUI
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../public/styles/mui_theme_effect";

// child components
import NavbarRoutes from "./NavbarRoutes";
import Routes from "./Routes";

const App = () => {
  useEffect(() => {
    const gif = new Image();
    gif.src = "https://giphy.com/embed/ly6swQArDGorfi4h7p/video";
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <NavbarRoutes />
        <Routes />
      </ThemeProvider>
    </div>
  );
};

export default App;
