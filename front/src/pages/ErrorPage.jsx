import React from "react";
import PageHeader from "../components/PageHeader";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";

export default function ErrorPage() {
  return (
    <div>
      <Box
        sx={{
          width: "85%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 2,
          m: "0 auto",
          lineHeight: "1.5",
        }}
      >
        <PageHeader title="Error 404" subtitle="Page not found" />

        <Grid container spacing={0}>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box>
              <Typography variant="h5" color="initial">
                Oops... the requsted URL was not found in this server
              </Typography>
              <Link to={ROUTES.ROOT}>
                click here to return to the home page
              </Link>
            </Box>
          </Grid>

          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <img
              src="../assets\images\broken-robot-error.png"
              alt="robot"
              width="75%"
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
