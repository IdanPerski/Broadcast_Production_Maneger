import { Button, Typography } from "@mui/material";
import { object, string } from "prop-types";
import React, { useEffect, useState } from "react";
import NavBarLink from "./NavBarLink";
import { useTheme } from "../../providers/ThemeProvider";

export default function NavItem({ to, sx, label }) {
  const { isDark } = useTheme();

  const [textColor, setTextColor] = useState(isDark ? "white" : "#000");
  useEffect(() => {
    setTextColor(isDark ? "white" : "#000");
  }, [isDark]);

  const mergedSx = { color: textColor, ...sx };
  return (
    <NavBarLink to={to} sx={mergedSx}>
      <Button color="inherit">
        <Typography>{label}</Typography>
      </Button>
    </NavBarLink>
  );
}

NavItem.propTypes = {
  to: string.isRequired,
  label: string.isRequired,
  sx: object,
};

NavItem.defaultProps = {
  sx: {},
};
