import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  breakpoints: {
    values: {
      xxs: 0,
      xs: 350,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 1800,
    },
  },
  typography: {
    logo: {
      fontSize: "40px",
      fontFamily: "Radio Canada, sans- serif",
      color: "black",
      margin: "0 auto",
    },
    fonts: {
      fontSize: "20px",
      fontFamily: "Radio Canada, sans- serif",
      color: "black",
    },
    menuitem: {
      fontSize: "20px",
      fontFamily: "Radio Canada, sans- serif",
      color: "white",
      backgroundColor: "black",
      width: "100%",
      borderRadius: "1.5rem",
      padding: ".7rem 1.5rem",
      fontWeight: "500",
    },
    home: {
      fontSize: "6vw",
      fontFamily: "Playball cursive",
      color: "black",
    },
    cursive: {
      fontSize: "3vw",
      fontFamily: "Playball, cursive",
      color: "black",
    },
  },
  palette: {
    black: {
      light: "#484848",
      main: "#000000",
      dark: "#212121",
      contrastText: "#ffffff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          height: "40px",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          width: 200,
          fontSize: "1rem",
          color: "#444444",
          fontWeight: "500",
          textTransform: "capitalize",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          margin: "10px 0px",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          " .MuiAlert-message": {
            padding: "18px 0",
          },
        },
      },
    },
  },
});
