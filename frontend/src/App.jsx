import PrimaryButton, {
  SecondaryButton,
  TertiaryButton,
} from "./components/Button/Button";
import { GlobalStyle } from "./utils/Global";
import { ColorModeContext, useMode } from "./utils/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <PrimaryButton>Primary Button</PrimaryButton>
            <SecondaryButton> Secondary Button</SecondaryButton>
            <TertiaryButton> Tertiary Button</TertiaryButton>
            <GlobalStyle />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
