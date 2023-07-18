import "../scss/Car-Bill-ADM.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { detailBill } from "../services/BillSevice";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import ModalAddProduct from "../forms/Modals-AddProduct";
import { getDetailOne } from "../services/DirectSaleSevice";

const CartBillADM = (props) => {
  //Get IdHd on http
  const param = useParams();
  const idHdParam = param.id;

  //Detail Hd
  const [listHD, setlistHD] = useState([]);
  // const [listHD, setlistHD] = useState([]);

  useEffect(() => {
    getDetailHD();
  }, []);

  const getDetailHD = async () => {
    let getData = await detailBill(idHdParam);
    console.log("checkDaTa: ", getData);
    setlistHD(getData);
  };
  //Select Product On Cart
  const [DataCart, setDataCart] = useState([]);
  const selectDataCart = async () => {
    console.log("Check Data Cart: ", idHdParam);
    let res = await getDetailOne(idHdParam);
    console.log("Check Data Cart: ", res);
    setDataCart(res);
  };
  useEffect(() => {
    selectDataCart();
  }, []);
  //Add Product
  const [showModalsAdd, setShowModalAdd] = useState(false);
  const handleAddProduct = () => {
    setShowModalAdd(true);
  };
  const handleClose = () => {
    setShowModalAdd(false);
  };

  return (
    <>
      <p>Bill Code: {listHD.maHd}</p>
      <div className="class-add-product">
        <Button
          onClick={() => handleAddProduct()}
          className="button-checkout"
          variant="success"
        >
          + Add new product
        </Button>{" "}
      </div>
      <div className="row customer-information">
        <h5>Cart</h5>
        <Table className="table-Cart" striped hover borderless>
          <thead>
            <tr>
              <th>
                <Form.Check aria-label="option 1" />
              </th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Function</th>
            </tr>
          </thead>
          <tbody>
            {DataCart &&
              DataCart.length > 0 &&
              DataCart.map((item, index) => {
                return (
                  <tr key={`hoaDonChiTiet-${index}`}>
                    <td>
                      <Form.Check aria-label="option 1" />
                    </td>
                    <td>{item.idCtsp.idSp.tenSp}</td>
                    <td>{item.soLuong}</td>
                    <td>{item.donGia}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
      <div className="row customer-information">
        <h5>Customer Information</h5>
        <Form>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Normal text" />
          <br />
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>
          <Form.Label>Number Phone</Form.Label>
          <Form.Control type="text" placeholder="Normal text" />
          <br />
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Normal text" />
          <br />
        </Form>
      </div>
      <div className="class-checkout">
        <Button className="button-checkout" variant="dark">
          Checkout
        </Button>{" "}
      </div>
      {/* Add Modals */}
      <ModalAddProduct show={showModalsAdd} handleClose={handleClose} />
    </>
  );
};
export default CartBillADM;
