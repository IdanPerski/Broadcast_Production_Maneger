import { useState, useCallback, useMemo } from "react";
import { object, func } from "prop-types";
import Joi from "joi";
import formatNameToCamelCase from "../helpers/formatNameToCamelCase ";
import AddUserSchema from "../../users/models/joi-schema/AddUserSchema";
import RoleSchema from "../../users/models/joi-schema/roleShcema";
const useForm = (initialForm, schema, handleSubmit) => {
  const [roleState, setRolesState] = useState({});
  const [data, setData] = useState(initialForm);

  const [errors, setErrors] = useState({});

  function updateRoleToData(target) {
    const { name, value } = target;
    if (!validateField(target, RoleSchema)) {
      setRolesState((prev) => {
        const updatedState = { ...prev, [name]: value };

        setData((prevData) => {
          return { ...prevData, roles: updatedState };
        });
        return updatedState;
      });
    }
  }

  const validateField = ({ name, value }, joiObject) => {
    if (joiObject[name]) {
      const validationObject = { [name]: value };

      const { error } = Joi.object({
        [name]: joiObject[name],
      }).validate(validationObject);
      console.log(error, "error validateField");
      return error ? error.details[0].message : null;
    }
  };

  const handleReset = useCallback(() => {
    setData(initialForm);
    setErrors({});
  }, [initialForm]);

  const handleDateInput = useCallback((newDate) => {
    const selectedDate = new Date(newDate);
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      setErrors((prev) => ({
        ...prev,
        date: "Selected date has already passed.",
      }));

      setData((prevData) => ({
        ...prevData,
        date: "",
      }));
      return;
    } else {
      setErrors((prev) => {
        let obj = { ...prev };
        if (obj.date) delete obj.date;
        return obj;
      });
    }
    console.log(selectedDate);
    setData((prev) => ({
      ...prev,
      date: selectedDate,
    }));
  }, []);

  const validateProperty = useCallback(
    ({ name, value }) => {
      const _name = formatNameToCamelCase(name);
      console.log(_name, schema);
      if (_name === "date") handleDateInput(value);

      const obj = { [_name]: value };
      console.log(obj);
      const generateSchema = Joi.object({
        [_name]: schema[_name],
      });

      const { error } = generateSchema.validate(obj);
      console.log(error);
      // error == undefined ? console.log("no error") : console.log(error, "!!");
      return error ? error.details[0].message : null;
    },
    [schema, handleDateInput],
  );

  const handleChange = useCallback(
    ({ target }, singelValue = []) => {
      console.log(target);
      const { name, value } = target;
      let _value = value;
      if (Array.isArray(value)) _value = value[0];
      const _name = formatNameToCamelCase(name);

      const errorMessage = validateProperty(target);
      if (errorMessage) {
        validateTexField(target, errorMessage);
        return setErrors((prev) => ({ ...prev, [_name]: errorMessage }));
      } else
        setErrors((prev) => {
          let obj = { ...prev };
          delete obj[name];
          return obj;
        });

      if (singelValue.includes(_name)) {
        setData((prevData) => ({
          ...prevData,
          [_name]: value,
        }));
      } else {
        const currentDataKeyValue = data[_name];
        console.log(currentDataKeyValue);
        if (Array.isArray(currentDataKeyValue)) {
          const isIdInArray = currentDataKeyValue.some((obj) => {
            if (obj._id) return obj._id === _value._id;
            else return JSON.stringify(obj) === JSON.stringify(_value);
          });
          const updatedArray = isIdInArray
            ? currentDataKeyValue.filter((obj) => {
                if (obj._id) return obj._id !== _value._id;
                else return JSON.stringify(obj) !== JSON.stringify(_value);
              })
            : [...currentDataKeyValue, _value];
          console.log(updatedArray);
          setData((prevData) => ({
            ...prevData,
            [_name]: updatedArray,
          }));
        } else {
          // const filteredArray = currentDataKeyValue.filter((person) => {
          //   return person !== _value;
          // });
          setData((prevData) => ({
            ...prevData,
            [_name]: _value,
          }));
        }
      }
    },

    [validateProperty, data],
  );

  ///////////

  const handleChangeAtTextField = useCallback(
    ({ target }) => {
      const { name, value } = target;

      if (name === "role" || name === "rate") {
        return updateRoleToData(target);
      }

      const errorMessage = validateProperty(target);

      if (errorMessage)
        setErrors((prev) => ({ ...prev, [name]: errorMessage }));
      else
        setErrors((prev) => {
          let obj = { ...prev };
          delete obj[name];
          return obj;
        });

      setData((prev) => ({ ...prev, [name]: value }));
    },
    [validateProperty],
  );
  const validateTexField = useCallback(
    (target, errorMessage) => {
      const { name, value, type } = target;
      if (type === "email" || "password") {
        setErrors((prev) => ({ ...prev, [name]: errorMessage }));
      } else {
        setErrors((prev) => {
          let obj = { ...prev };
          delete obj[name];
          return obj;
        });
      }

      return setData((prev) => ({ ...prev, [name]: value }));
    },
    [validateProperty],
  );

  const validateForm = useCallback(() => {
    const schemaForValidate = Joi.object(schema);

    const { error } = schemaForValidate.validate(data);
    console.log(error);
    if (error) return error;
    return null;
  }, [schema, data]);

  const onSubmit = useCallback(() => {
    console.log("SUBMIT!");
    handleSubmit(data);
  }, [handleSubmit, data]);

  const value = useMemo(() => {
    return { data, errors };
  }, [data, errors]);

  return {
    value,
    onSubmit,
    handleChange,
    handleReset,
    validateForm,
    handleDateInput,
    setData,
    handleChangeAtTextField,
  };
};

useForm.propTypes = {
  initialForm: object.isRequired,
  schema: object.isRequired,
  handleSubmit: func.isRequired,
};

export default useForm;
