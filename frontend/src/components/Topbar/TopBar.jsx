import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../../utils/theme";
import { getColorPalette } from "../../utils/colors";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SearchIcon from "@mui/icons-material/Search";

const TopBar = () => {
  //get the theme from mui
  const theme = useTheme();
  //to access the color palette in mui
  const colors = getColorPalette(theme.palette.mode);
  //toggle different states states for the color mode
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "2px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          backgroundColor: `${colors.primary[400]}`,
          borderRadius: "3px",
        }}
      >
        <InputBase
          sx={{
            ml: 2,
            flex: 1,
          }}
          placeholder="serach"
        />
        <IconButton type="button" sx={{ padding: "1px" }}>
          <SearchIcon />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex" }}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton></IconButton>
      </Box>
    </Box>
  );
};

export default TopBar;
