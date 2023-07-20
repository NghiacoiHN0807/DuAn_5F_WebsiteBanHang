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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";

const ModalAddProduct = (props) => {
  const { show, handleClose, selectDataCart } = props;
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
  //Next Page
  const handlePageClick = (event) => {
    getAllDataImages(+event.selected);
  };
  //Insert product
  const param = useParams();
  const idHdParam = param.id;
  const handleChoose = async (idCtsp) => {
    await postAddDirect(idCtsp, 1, idCtsp.giaBan, idHdParam, 0);
    selectDataCart();
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
                      <td>{item.idCtsp.maCtsp}</td>
                      <td>{item.idCtsp.idSp.tenSp}</td>
                      <td>{item.idCtsp.giaBan}</td>
                      <td>
                        <Button
                          onClick={() => handleChoose(item.idCtsp)}
                          variant="success"
                        >
                          <FontAwesomeIcon icon={faCartPlus} size="lg" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={numberPages}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            //Class form
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
          />
        </Modal.Body>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal>
    </>
  );
};
export default ModalAddProduct;
