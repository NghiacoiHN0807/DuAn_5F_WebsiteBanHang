import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { paymentOnlineSuccess } from "../services/BillSevice";

const TableSucces = (props) => {
  //Set value for table
  const [inforPayment, setInforPayment] = useState([]);

  const getInformation = async () => {
    let res = await paymentOnlineSuccess();
    console.log("Data", res);
    setInforPayment(res);
    console.log("Data", res);
  };
  useEffect(() => {
    getInformation();
  }, []);
  // Show Data On Tables

  return (
    <>
      <p>THANH TOÁN HÓA ĐƠN THÀNH CÔNG!!!</p>
      {/* <Table striped bordered hover>
        <thead>
          <tr>
            <th>Ma Xuat Xu</th>
            <th>Ten Nuoc</th>
            <th>Tinh Trang</th>
            <th>Function</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A</td>
            <td>B</td>
          </tr>
        </tbody>
      </Table> */}
    </>
  );
};

export default TableSucces;
