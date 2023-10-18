import React, { useEffect } from "react";
import { string, bool, object, func, array } from "prop-types";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { makeFirstLetterCapital } from "../utils/algoMethods";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import adjustOptionsToSelectValue from "../../helpers/adjustOptionsToSelectValue";
import formatNameToCamelCase from "../helpers/formatNameToCamelCase ";

const DynamicSelectInput = ({
  variant,
  name,
  data,
  label,
  required,
  error,
  onChange,
  options,
  ...rest
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  const checkData = () => {
    const _name = formatNameToCamelCase(name);

    if (data[_name] === "") {
      setSelectedValue("");
    }
  };
  useEffect(() => {
    checkData();
    if (Array.isArray(options) && options.length > 0) {
      const optionsKeys = Object.keys(options[0]);

      options = optionsKeys.includes("fullName")
        ? options
        : adjustOptionsToSelectValue(options);
    }
  }, [selectedValue, options]);

  return (
    <Grid item xs={12} {...rest}>
      <FormControl fullWidth variant={variant}>
        <InputLabel>{makeFirstLetterCapital(label)}</InputLabel>

        <Select
          id={name}
          name={name}
          value={selectedValue._id || selectedValue}
          required={required}
          error={Boolean(error)}
          onChange={onChange}
        >
          <MenuItem
            value={""}
            onClick={() => setSelectedValue("")}
            sx={{ height: "2rem" }}
          >
            {" "}
          </MenuItem>
          {options?.map((item) => {
            return (
              <MenuItem
                value={item._id || item}
                key={item._key || item._id || item}
                onClick={() => {
                  setSelectedValue(item);
                }}
              >
                {item.name || item.fullName || item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Grid>
  );
};

DynamicSelectInput.propTypes = {
  name: string.isRequired,
  required: bool.isRequired,
  variant: string,
  data: object,
  label: string,
  error: string,
  onChange: func.isRequired,
  options: array.isRequired,
};

DynamicSelectInput.defaultProps = {
  required: true,
  variant: "outlined",
};

export default DynamicSelectInput;
