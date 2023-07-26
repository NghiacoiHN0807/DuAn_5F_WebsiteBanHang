// import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { remove } from "../services/giamGiaService";
// import {} from "./TableGiamGia";

const ModelConfirm = (props) => {
  const { show, handleClose, isDataGiamGia, getGiamGia } = props;

  const confirmDelte = async () => {
    let res = await remove(isDataGiamGia.idGgct);
    console.log(isDataGiamGia.idGgct);
    if (res.status === "Ok!") {
      toast.success("This data has been deleted");
      handleClose();
      getGiamGia(0, 5);
    } else {
      toast.error("This data hasn't been deleted");
      handleClose();
      getGiamGia(0, 5);
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>DELETE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Are you sure want delete this data?</div>
          <br />
          <b>Ma: {isDataGiamGia.idGgct}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => confirmDelte()}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModelConfirm;
