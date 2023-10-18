import React from "react";
import PropTypes from "prop-types";
import DynamicSelectInput from "../../forms/components/DynamicSelectInput";
import Input from "../../forms/components/Input";

const RoleRateInput = ({
  //   roleName,
  //   rateName,
  //   label,
  roleOptions,
  error,
  onChange,
  data,
}) => {
  return (
    <>
      <DynamicSelectInput
        name={"role"}
        label={"Role"}
        error={error}
        onChange={onChange}
        data={data}
        sm={8}
        options={roleOptions}
      />
      <Input
        name={"rate"}
        label="Rate"
        type="number"
        error={error}
        onChange={onChange}
        data={data}
        sm={4}
      />
    </>
  );
};

RoleRateInput.propTypes = {
  roleOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default RoleRateInput;
