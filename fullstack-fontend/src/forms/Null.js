import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons";
import "../scss/Null-Data.scss";
const Null = (props) => {
  return (
    <>
      <FontAwesomeIcon icon={faTable} size="xl" style={{ color: "#000000" }} />
      <h6>Your data is empty</h6>
    </>
  );
};
export default Null;
