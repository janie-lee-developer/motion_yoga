import React from "react";

// MUI
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../public/styles/mui_theme_effect";

// child components
import Navbar from "./Components/Navbar";
import Routes from "./Routes";

const App = () => {
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
