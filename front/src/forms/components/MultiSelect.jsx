import {
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import adjustOptionsToSelectValue from "../../helpers/adjustOptionsToSelectValue";
import formatNameToCamelCase from "../helpers/formatNameToCamelCase ";

export default function MultiSelect({ name, options, onChange, data }) {
  const _name = formatNameToCamelCase(name);
  const currentData = data[_name];
  const [selectedValue, setSelectedValue] = useState([]);
  adjustOptionsToSelectValue(options);

  const checkingData = (value) => {
    if (handleChipDelete.length > 0) setSelectedValue(value);
  };

  const handleChipDelete = (value) => {
    const updatedSelectedValue = currentData.filter((item) => {
      console.log(item);
      return item !== value;
    });
    console.log(updatedSelectedValue);
    setSelectedValue((prev) => updatedSelectedValue);
    console.log(value);
    onChange(createCustomTarget([value]));
  };

  const createCustomTarget = (value) => {
    console.log(_name);
    console.log(value);
    if (_name === "roles") value[0] = { role: value[0] };
    if (value[0].fullName)
      value = [{ fullName: value[0].fullName, _id: value[0]._id }];
    const customTarget = {
      target: {
        name: _name,
        value: value,
      },
    };
    return customTarget;
  };
  useEffect(() => {
    checkingData(selectedValue);
  }, [data, onChange, handleChipDelete, _name, selectedValue]);
  return (
    <>
      <FormControl sx={{ m: 1, width: "70%" }}>
        <InputLabel>{name}</InputLabel>
        <Select
          multiple
          value={selectedValue}
          name={name}
          onChange={() => onChange(createCustomTarget(selectedValue))}
          input={<OutlinedInput label={name} />}
          renderValue={() => {
            return (
              <Stack gap={1} direction="row" flexWrap="wrap">
                {currentData?.map((value) => {
                  return (
                    <Chip
                      key={value._id || value.role || value}
                      label={value.fullName || value.role || value}
                      onDelete={() => handleChipDelete(value.role || value)}
                      deleteIcon={
                        <CancelIcon
                          onMouseDown={(event) => event.stopPropagation()}
                        />
                      }
                    />
                  );
                })}
              </Stack>
            );
          }}
        >
          {options?.map((item) => {
            return (
              <MenuItem
                value={item._id || item}
                key={item.key || item._id || item}
                sx={{ justifyContent: "space-between" }}
                onClick={() => {
                  setSelectedValue((prev) => {
                    prev.splice(0, 1, item);
                    return prev;
                  });
                }}
              >
                {item.name || item.fullName || item}

                {currentData.map((obj) => {
                  if (obj.role && obj.role === item) {
                    return <CheckIcon color="info" key={item} />;
                  }
                  if (!obj.role && obj._id === item._id) {
                    return <CheckIcon color="info" key={item.key} />;
                  } else {
                    return null;
                  }
                })}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
}
