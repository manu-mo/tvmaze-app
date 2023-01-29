import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { asyncToggleTheme } from "../redux/reducers/themeSlice";

export default function ToggleTheme() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: any) => state.theme.darkMode);

  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          m: 1, position: 'fixed', bottom: '30px', right: '30px', zIndex: 999999, 
          bgcolor: "background.default", color: "text.primary", borderRadius:'50%'
        }}
      >
        <IconButton
          onClick={() => dispatch(asyncToggleTheme())}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Box>
    </>
  );
}