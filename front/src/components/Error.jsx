import React from "react";
import { string } from "prop-types";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import ROUTES from "../routes/routesModel";

const Error = ({ errorMessage }) => {
  const handleLinkClick = () => {
    window.location.reload();
  };
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" color="initial">
            Oops... something went wrong: {errorMessage}
          </Typography>
          <Link to={ROUTES.ROOT} onClick={handleLinkClick}>
            click here to return to the home page
          </Link>
        </Grid>
        <Grid item xs={12} md={4} justifyContent="center">
          <img
            width="100%"
            src="/assets/images/broken-robot-error.png"
            alt="broken robot"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

Error.propTypes = {
  errorMessage: string.isRequired,
};

export default Error;
