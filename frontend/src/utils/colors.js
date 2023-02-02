//color pallete for dark and white theme
export const getColorPalette = (mode) => ({
  ...(mode === "dark"
    ? {
        primary: {
          400: "#434957",
          500: "#011422",
        },
        grey: {
          100: "#e0e0e0",
          500: "#666666",
          700: "#3d3d3d",
        },
        green: "#4cceac",
        red: "#db4f4a",
        blue: "#6879fa",
      }
    : {
        //for light theme
        primary: {
          400: "#d0d1d5",
          500: "#141b2d",
        },
        grey: {
          100: "#141414",
          500: "#666666",
          700: "#a3a3a3",
        },
        green: "#4cceac",
        red: "#db4f4a",
        blue: "#6879fa",
        white: "#fcfcfc",
      }),
});
