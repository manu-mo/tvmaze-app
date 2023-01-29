export const PaletteTheme = (mode: any) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
        // palette values for light mode
        /* primary: {
          main: "#fffbeb",
        }, 
        divider: "#fffbeb", */
        background: {
          default: "#f2f2f2",
          paper: "#EBEBEB",
        },
        text: {
          primary: "#212121",
          secondary: "#666666",
        },
      }
      : {
        // palette values for dark mode
        /* primary: {
          main: "#004282",
        }, 
        divider: "#004282", */
        background: {
          default: "#121212",
          paper: "#2F2F2F",
        },
        text: {
          primary: "#ffffff",
          secondary: "#B8B8B8",
        },
      }),
  },
});