// import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteCTSP } from "../../services/ChiTietSPService";
import { toast } from "react-toastify";

const ModelConfirm = (props) => {
  const { show, handleClose, isDataCTSP, getCTSP } = props;

  const confirmDelte = async () => {
    let res = await deleteCTSP(isDataCTSP.idCtsp);
    console.log("Check res deleteCTSP: " + res);
    if (res && res.statusCode === 200) {
      toast.success("This data has been deleted");
      handleClose();
      getCTSP(0);
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
          <b>Ma: {isDataCTSP.maCtsp}</b>
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
