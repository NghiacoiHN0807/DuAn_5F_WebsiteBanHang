import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons";
import "../scss/Null-Data.scss";
const Null = (props) => {
  return (
    <>
      <td className="notice-null-data">
        <FontAwesomeIcon
          icon={faTable}
          size="xl"
          style={{ color: "#000000" }}
        />
        <h6>Your shopping cart is empty</h6>
        <h6>Please choose a Product</h6>
      </td>
    </>
  );
};
export default Null;
