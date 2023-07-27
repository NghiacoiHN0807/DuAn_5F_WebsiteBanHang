import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "../scss/Cart.scss";
import Form from "react-bootstrap/Form";

const Cart = (props) => {
  return (
    <>
      <div className="class-tableCart">
        <Table className="table-Cart" striped hover borderless>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Form.Check aria-label="option 1" />
              </td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </Table>
      </div>

      <div className="class-checkout">
        <Button className="button-checkout" variant="dark">
          Checkout
        </Button>{" "}
      </div>
    </>
  );
};
export default Cart;
