import { CssBaseline, MuiThemeProvider } from "@material-ui/core";

import Dash from "./components/Dash";
import darkTheme from "./theme";

function App() {
  return (
      <MuiThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Dash />
      </MuiThemeProvider>
  );
}

export default App;
