// import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteXuatXu } from "../services/XuatXuService";
import { toast } from "react-toastify";

const ModelConfirm = (props) => {
  const { show, handleClose, isDataXuatXu, getXanXuat } = props;

  const confirmDelte = async () => {
    let res = await deleteXuatXu(isDataXuatXu.idXx);
    console.log("Check res deleteXuatXu: " + res);
    if (res && res.statusCode === 200) {
      toast.success("This data has been deleted");
      handleClose();
      getXanXuat(0);
    } else {
      toast.error("This data hasn't been deleted");
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
          <b>Ma: {isDataXuatXu.maXx}</b>
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
