import React, { useEffect, useState } from "react";
import { Tabs, Tab, Paper, Box, Typography } from "@mui/material";
import Error from "../../components/Error";
import MyTable from "../../components/table/MyTable";
import DynamicTableDataRow from "../../components/table/DynamicTableDataRow";
import { sanitizeData } from "../../components/table/helpers/sanitaizeData";
import Spinner from "../../components/Spinner";

function ProductionCollapsibleContent({ data }) {
  const [controlRoomCrew, setControlRoomCrew] = useState({});
  const [fieldCrew, setfieldCrew] = useState({});

  useEffect(() => {
    if (data.production) {
      const { controlRoomCrewDetails, fieldCrewDetails, ...rest } =
        data.production;
      setfieldCrew(fieldCrewDetails);
      setControlRoomCrew(controlRoomCrewDetails);
    }
  }, [data]);

  const rowError = !data.error ? "unknowen error" : data.error;
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const crewheadRow = ["Role", "Name"];

  const santizedControlRoomCrew = Object.entries(sanitizeData(controlRoomCrew));
  const santizedControlFieldCrew = Object.entries(sanitizeData(fieldCrew));
  function renderRoleTableRows(santiziedData) {
    {
      return santiziedData.map(([role, roleData]) => {
        const multiplePersonForRole = roleData.persons;
        if (multiplePersonForRole) {
          return multiplePersonForRole.map((person) => {
            return (
              <DynamicTableDataRow
                key={person._id + roleData.role}
                data={{ role: roleData.role, ...person }}
              />
            );
          });
        } else {
          return (
            <DynamicTableDataRow
              key={roleData._id + roleData.role}
              data={roleData}
            />
          );
        }
      });
    }
  }

  if (!data.isLoading && data.production) {
    const { location } = data.production;
    const { contactPerson } = location;
    const {
      contact: { email, phoneNumber },
    } = contactPerson;
    return (
      <Paper sx={{ bgcolor: "#B9B4C1", p: 1, m: 3 }}>
        <Typography sx={{ m: 1, fontSize: "1em" }}>
          {`Sport type: ${data.production.type}`}
        </Typography>
        <Typography
          sx={{ ml: 1, fontSize: "1em" }}
        >{`${location.name}`}</Typography>
        <Typography sx={{ ml: 1, fontSize: "1em" }}>
          {`${location.address.street},${location.address.city}`}
        </Typography>
        <Box>
          <Typography sx={{ m: 1, fontSize: "1.2em" }}>
            {`On-site contact`}
          </Typography>
          <Typography sx={{ ml: 1, fontSize: "1em" }}>
            {`Name: ${contactPerson.name}`}
          </Typography>

          <Typography sx={{ ml: 1, fontSize: "1em" }}>
            {`Role: ${contactPerson.role}`}
          </Typography>
          <Typography sx={{ ml: 1, fontSize: "1em" }}>
            {`Tel: ${phoneNumber}`}
          </Typography>
          <Typography sx={{ ml: 1, mb: 1, fontSize: "1em" }}>
            {`E-mail: ${email}`}
          </Typography>
        </Box>

        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Control Room Crew" />
          <Tab label="Field Crew" />
          <Tab label="Schedule" />
        </Tabs>
        {activeTab === 0 && (
          <Box sx={{}}>
            <MyTable headRowArray={crewheadRow}>
              {renderRoleTableRows(santizedControlRoomCrew)}
            </MyTable>
          </Box>
        )}
        {activeTab === 1 && (
          <Box>
            <MyTable headRowArray={crewheadRow}>
              {renderRoleTableRows(santizedControlFieldCrew)}
            </MyTable>
          </Box>
        )}
        {activeTab === 2 && <Box>{/* Display production schedule */}</Box>}
      </Paper>
    );
  } else return <Spinner />;
  // <Error errorMessage={rowError} />
}

export default ProductionCollapsibleContent;
