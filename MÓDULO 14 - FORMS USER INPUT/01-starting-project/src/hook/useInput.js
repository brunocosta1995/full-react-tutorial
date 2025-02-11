import { useState } from "react";

export default function useInput(defaultValue, validationFn) {
    const [userInput, setUserInput] = useState(defaultValue);
      const [isEdit, setIsEdit] = useState(false);

      const isValid = validationFn(userInput);

      function handleChange(event) {
        setUserInput(event.target.value);
        setIsEdit(false);
      }
    
      function handleInputBlur() {
        setIsEdit(true);
      }

      return {
        value: userInput,
        handleChange,
        handleInputBlur,
        hasError: isEdit && !isValid
      }
}