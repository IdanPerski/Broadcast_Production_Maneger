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

  // function updateRolesToData(target) {
  //   const { name, value } = target;
  //   if (!validateField(target, RoleSchema)) {
  //     setRolesState((prev) => {
  //       const updatedState = { ...prev, [name]: value };

  //       console.log(data);
  //       // Check if the role already exists in data.role
  //       const existingRoleIndex = data.roles.findIndex((role) => {
  //         return role.role !== name;
  //       });

  //       if (existingRoleIndex !== -1) {
  //         console.log(data.roles);
  //         console.log("existingRoleIndex!!!!!!!!!!");
  //         // If the role exists, update its rate
  //         const updatedRoles = [...data.roles];
  //         updatedRoles[existingRoleIndex] = {
  //           ...updatedRoles[existingRoleIndex],
  //           rate: value,
  //         };

  //         setData((prevData) => ({
  //           ...prevData,
  //           roles: updatedRoles,
  //         }));
  //       } else {
  //         console.log("ELSE-the role doesnt exist");
  //         // If the role doesn't exist, add a new role object
  //         setData((prevData) => ({
  //           ...prevData,
  //           roles: [...prevData.roles, updatedState],
  //         }));
  //       }
  //       return updatedState;
  //     });
  //   }
  // }
  // function updateRolesToData(target) {
  //   const { name, value } = target;
  //   if (!validateField(target, RoleSchema)) {
  //     setRolesState((prevRoleState) => {
  //       const updatedRoleState = { ...prevRoleState, [name]: value };
  //       setData((prevData) => {
  //         const currentDataRoles = prevData.roles;
  //         console.log(currentDataRoles);

  //         currentDataRoles.map((role) => {
  //           console.log(role.role, "role.role");
  //           console.log(name, "name");
  //         });

  //         // Check if the role already exists prevData.roles
  //         const existingRoleIndex = currentDataRoles.findIndex(
  //           (role) => role.role === name,
  //         );
  //         console.log(existingRoleIndex);
  //         if (existingRoleIndex !== -1) {
  //           const currentRoles = prevData.roles;
  //           const exsistingRole = currentRoles[existingRoleIndex];
  //           console.log("exsistingRole:", exsistingRole);
  //           // If the role exists, update its rate
  //           currentRoles[existingRoleIndex] = { ...exsistingRole, rate: value };
  //           return currentRoles[existingRoleIndex];
  //         } else {
  //           return {
  //             ...prevData,
  //             roles: [...prevData.roles, updatedRoleState],
  //           };
  //         }
  //       });
  //       return updatedRoleState;
  //     });
  //   }
  // }

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

      if (_name === "date") handleDateInput(value);

      const obj = { [_name]: value };

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

  // const handleChange = useCallback(
  //   ({ target }) => {
  //     const { name, value } = target;

  //     let _value;
  //     if (Array.isArray(value)) _value = value[0];
  //     const _name = formatNameToCamelCase(name);

  //     const errorMessage = validateProperty(target);
  //     console.log("!!!!!!!!!!!!!!!!!!!!");
  //     if (errorMessage) {
  //       console.log("errorMessage is truth");
  //       console.log(target);
  //       return setErrors((prev) => ({ ...prev, [_name]: errorMessage }));
  //     } else
  //       setErrors((prev) => {
  //         let obj = { ...prev };
  //         delete obj[name];
  //         return obj;
  //       });
  //     console.log("????????");
  //     const singelValue = [
  //       "type",
  //       "location",
  //       "cg",
  //       "editor",
  //       "audioEngineer",
  //       "visionMixerOperator",
  //       "director",
  //     ];

  //     if (singelValue.includes(_name)) {
  //       setData((prevData) => ({
  //         ...prevData,
  //         [_name]: value,
  //       }));
  //     } else {
  //       const currentDataKeyValue = data[_name];
  //       if (Array.isArray(currentDataKeyValue)) {
  //         const isIdInArray = currentDataKeyValue.some(
  //           (obj) => obj._id === _value._id,
  //         );
  //         const updatedArray = isIdInArray
  //           ? currentDataKeyValue.filter((obj) => obj._id !== _value._id)
  //           : [...currentDataKeyValue, _value];

  //         setData((prevData) => ({
  //           ...prevData,
  //           [_name]: updatedArray,
  //         }));
  //       } else {
  //         const filteredArray = currentDataKeyValue.filter((person) => {
  //           return person !== _value;
  //         });
  //         setData((prevData) => ({
  //           ...prevData,
  //           [_name]: filteredArray,
  //         }));
  //       }
  //     }
  //   },

  //   [validateProperty, data],
  // );

  /////////

  const handleChange = useCallback(
    ({ target }, singelValue = []) => {
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
