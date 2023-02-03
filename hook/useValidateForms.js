import { useState, useEffect, useRef } from "react";

export const useValidateForms = (data) => {
  const arrValidity = useRef({
    name: false,
    email: false,
    lastName: false,
    password: false,
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    lastName: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const errorDescription = {
    valueMissing: "This field cannot be empty",
    typeMismatch: "The field is incorrect",
  };

  const updateError = (value = "") => ({
    name: () => setErrors({ ...errors, name: value }),
    email: () => setErrors({ ...errors, email: value }),
    description: () => setErrors({ ...errors, messages: value }),
  });

  const handleBlur = (e) => {
    const { validity, name } = e.target;

    if (validity.valid) {
      arrValidity.current[name] = true;
      //   updateError()[name]();
      console.log("oeuoeuoeu");
    } else {
      for (const value in errorDescription) {
        if (validity[value]) {
          const a = errorDescription[value];
          console.log(a);
          //   updateError(a)[name]();
        }
      }
      arrValidity.current[name] = false;
    }

    if (
      arrValidity.current.length === 3 &&
      arrValidity.current.indexOf(false) === -1
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  return {
    handleBlur,
    buttonDisabled,
  };
};
