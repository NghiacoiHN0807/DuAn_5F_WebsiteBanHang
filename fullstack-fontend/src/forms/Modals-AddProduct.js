import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../scss/Car-Bill-ADM.scss";
import { selectAllImgProduct } from "../services/BillSevice";
import { useEffect } from "react";
import { postAddDirect } from "../services/DirectSaleSevice";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

const ModalAddProduct = (props) => {
  const { show, handleClose } = props;
  //Show Data on Table
  const [listData, setListData] = useState([]);
  const [numberPages, setNumberPages] = useState([]);

  useEffect(() => {
    getAllDataImages(0);
  }, []);
  const getAllDataImages = async (page) => {
    let getData = await selectAllImgProduct(page);
    console.log("Check getDataProduct: ", getData);
    if (getData && getData.content) {
      setListData(getData.content);
      setNumberPages(getData.totalPages);
    }
  };
  //Insert product
  const param = useParams();
  const idHdParam = param.id;
  const handleChoose = async (idCtsp) => {
    console.log("Enter Data", idCtsp);
    console.log("Enter product", idCtsp.idCtsp);
    console.log("Enter giaBan", idCtsp.giaBan);
    console.log("Enter IdHD", idHdParam);
    await postAddDirect(idCtsp, 1, idCtsp.giaBan, idHdParam, 0);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>LIST PRODUCT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table className="table-Cart" striped hover borderless>
            <thead>
              <tr>
                <th>IMAGE</th>
                <th>CODE</th>
                <th>NAME </th>
                <th>PRICE</th>
                <th>FUNCTION</th>
              </tr>
            </thead>
            <tbody>
              {listData &&
                listData.length &&
                listData.map((item, index) => {
                  return (
                    <tr key={`images-${index}`}>
                      <td>
                        <Col xs={6} md={4}>
                          <Image src={`../assets/${item.images}`} rounded />
                        </Col>
                      </td>
                      <td>{item.idCtsp.idSp.tenSp}</td>
                      <td>{item.idCtsp.maCtsp}</td>
                      <td>{item.idCtsp.giaBan}</td>
                      <td>
                        <Button
                          onClick={() => handleChoose(item.idCtsp)}
                          variant="success"
                        >
                          Choose
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Modal.Body>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal>
    </>
  );
};
export default ModalAddProduct;
