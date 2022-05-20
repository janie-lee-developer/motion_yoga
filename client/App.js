import React, { useEffect } from "react";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../mui_theme_effect";

import Model from "./model_deploy";

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        {/* <Navbar /> */}
        <Model />
      </ThemeProvider>
    </div>
  );
};

export default App;

// test
