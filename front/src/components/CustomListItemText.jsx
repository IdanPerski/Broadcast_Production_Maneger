import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";

export default function CustomListItemText({
  primary,
  secondary,
  onClickAction,
  hoverColor,
}) {
  return (
    <Box sx={{ m: 1 }}>
      <Typography variant="subtitle1" color="textPrimary">
        {primary}
      </Typography>
      {secondary && (
        <Box
          onClick={onClickAction}
          sx={{
            fontSize: "1rem",
            color: "grey",
            lineHeight: "1.5",
            cursor: "pointer",
            "&:hover": {
              color: hoverColor, // Change color on hover
              textDecoration: "underline", // Add underline on hover
            },
          }}
        >
          {secondary}
        </Box>
      )}
    </Box>
  );
}
