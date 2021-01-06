import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { navigate } from "@reach/router";

export default function SideMenu({ children }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRedirect = (location) => {
    switch (location) {
      case "show":
        navigate("/show");
        break;
      case "set":
        navigate("/set");
        break;
      case "show2":
        navigate("/show2");
        break;
      default:
        break;
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="side-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Open Menu
      </Button>
      <Menu
        id="side-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
      >
        <MenuItem onClick={() => handleRedirect("show")}>Show Rate</MenuItem>
        <MenuItem onClick={() => handleRedirect("set")}>Set Time</MenuItem>
        <MenuItem onClick={() => handleRedirect("show2")}>
          Show Rate (Class)
        </MenuItem>
      </Menu>
      {children}
    </div>
  );
}
