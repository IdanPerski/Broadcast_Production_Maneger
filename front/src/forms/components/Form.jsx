import React from "react";
import { node, func, string, number, object } from "prop-types";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormButton from "./FormButton";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import LoopIcon from "@mui/icons-material/Loop";
import { blue } from "@mui/material/colors";
// import { useNavigate } from "react-router";

// import { useTheme } from "../../providers/ThemeProvider";
const Form = ({
  formTitle,
  onSubmit,
  onReset,
  onChange,
  to,
  color,
  spacing,
  styles,
  children,
}) => {
  const navigate = useNavigate();
  // const { isDark } = useTheme();
  const titleStyle = { color: "#333333 " };
  return (
    <Box
      component="form"
      color={color}
      sx={{ mt: 0, p: { xs: 1, sm: 2 }, ...styles }}
      onSubmit={onSubmit}
      autoComplete="off"
      noValidate
    >
      <Typography
        align="center"
        variant="h5"
        component="h1"
        mb={2}
        sx={titleStyle}
      >
        {formTitle.toUpperCase()}
      </Typography>

      <Grid container spacing={spacing}>
        {children}
      </Grid>

      <Grid container spacing={1} my={2} direction="row" width="100">
        <Grid item xs={12} sm={6}>
          <FormButton
            node="cancel"
            color="error"
            component="div"
            variant="outlined"
            onClick={() => navigate(to)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormButton
            node={<LoopIcon />}
            variant="outlined"
            component="div"
            onClick={onReset}
          />
        </Grid>
        <Grid item xs={12}>
          <FormButton
            node="Submit"
            onClick={onSubmit}
            disabled={!!onChange()}
            size="large"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

Form.propTypes = {
  children: node.isRequired,
  onSubmit: func.isRequired,
  color: string,
  to: string.isRequired,
  spacing: number,
  onReset: func.isRequired,
  onChange: func.isRequired,
  formTitle: string.isRequired,
  styles: object,
};

Form.defaultProps = {
  color: "inherit",
  to: "/",
  spacing: 1,
  formTitle: "",
  styles: {},
};

export default React.memo(Form);
