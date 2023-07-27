import { useCallback, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../scss/Car-Bill-ADM.scss";
import { selectClassify } from "../services/BillSevice";
import { useEffect } from "react";

const ModalUpdateProductOnCart = (props) => {
  const { show, handleClose, itemUpdateClassify } = props;
  //Show Data on Table
  const [listClassify, setListClassify] = useState([]);

  const getDataClassify = useCallback(async () => {
    if (itemUpdateClassify == null) {
      return null;
    } else {
      try {
        console.log("check name of Product: ", itemUpdateClassify);
        let getData = await selectClassify(itemUpdateClassify);
        console.log("Check getDataProduct: ", getData);
        if (getData && getData.content) {
          setListClassify(getData.content);
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  }, [itemUpdateClassify]);
  useEffect(() => {
    getDataClassify();
  }, [getDataClassify]);
  //Update product on cart

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Classify: {itemUpdateClassify}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <p>Size: </p>
            {listClassify &&
              listClassify.length &&
              listClassify.map((item, index) => {
                return (
                  <Button variant="outline-primary">
                    {itemUpdateClassify}
                  </Button>
                );
              })}
          </div>
          <div className="">
            <p>Size: </p>
          </div>
          <div className="">
            <p>Size: </p>
          </div>
        </Modal.Body>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal>
    </>
  );
};
export default ModalUpdateProductOnCart;
