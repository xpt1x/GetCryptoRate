import { createMuiTheme } from "@material-ui/core";
import { THEME_TYPE } from "./config";

const darkTheme = createMuiTheme({
  palette: {
    type: THEME_TYPE,
  },
});

export default darkTheme;
