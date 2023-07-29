import { useState } from "react";
import { Form } from "react-bootstrap";

const Radio = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleRadioChange = () => {
    setIsChecked(!isChecked);
  };
  console.log("is checked: ", isChecked);
  return (
    <Form.Check
      type="radio"
      checked={isChecked}
      onChange={handleRadioChange}
      label="Option"
      aria-label="radio option"
    />
  );
};

export default Radio;
