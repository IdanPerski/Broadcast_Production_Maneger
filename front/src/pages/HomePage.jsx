import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import useProductions from "../poductions/hooks/useProductions";
import ProductionTableDataRow from "../poductions/components/ProductionTableDataRow";
import TableHeadRow from "../poductions/components/TableHeadRow";
import sortByDate from "../helpers/sortArray";
import { useUser } from "../users/providers/UserProvider";
import { Navigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";

export default function HomePage() {
  const { handleGetProductionsForMainTable, value, handleDeleteProduction } =
    useProductions();
  useEffect(() => {
    handleGetProductionsForMainTable();
  }, []);
  const tableHeadArray = ["Date", "Location", "Weather", "Actions"];

  const { productions } = value;

  const [productionsState, setProductionsState] = useState(productions);

  const deleteProduction = (productionId) => {
    handleDeleteProduction(productionId);
    const updatedProductions = productionsState.filter(
      (production) => production._id !== productionId,
    );

    setProductionsState(updatedProductions);
  };

  // console.log("producrions main table:", productions);

  useEffect(() => {
    if (productions) {
      setProductionsState(sortByDate(productions));
    }
  }, [productions]);

  const { user } = useUser();
  console.log(user);

  if (!user) return <Navigate replace to={ROUTES.LOGIN_PAGE} />;
  return (
    <Container>
      <PageHeader title="Next Productions" subtitle="" />
      <TableContainer
        component={Paper}
        sx={{ width: "85%", margin: "auto" }}
        elevation={2}
      >
        <Table sx={{ bgcolor: "#B9B4C7" }}>
          <TableHeadRow tableHeadArray={tableHeadArray} />
          <TableBody>
            {!value.error ? (
              productionsState?.map((production) => {
                return (
                  <ProductionTableDataRow
                    key={production._id}
                    dataProp={production}
                    onDelete={deleteProduction}
                  />
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} sx={{ textAlign: "center" }}>
                  <Typography variant="body1" color="red">
                    {value.error}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
