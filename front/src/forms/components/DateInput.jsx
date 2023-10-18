import React, { useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Box, FormControl } from "@mui/material";
import dayjs from "dayjs";
import { red } from "@mui/material/colors";

export default function DateInput({ required, error, onChange, data, name }) {
  let helperText = "DD/MM/YYYY";
  const currentDate = data[name];
  if (error != undefined) {
    helperText = error;
  }
  useEffect(() => {}, [currentDate]);
  const formattedDate = dayjs(Date(data[name])).format("DD-MM-YYYY");
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ width: "50%" }}>
        <FormControl
          fullWidth
          variant="outlined"
          style={{
            paddingTop: "8px",
          }}
        >
          <DatePicker
            slotProps={{
              textField: {
                helperText: Boolean(error) ? (
                  <span style={{ color: "red" }}>{helperText}</span>
                ) : (
                  helperText
                ),
              },
            }}
            required={required}
            error={Boolean(error)}
            name={name}
            value={data[name]}
            onChange={onChange}
            format="DD-MM-YYYY"
          />
        </FormControl>
      </Box>
    </LocalizationProvider>
  );
}
