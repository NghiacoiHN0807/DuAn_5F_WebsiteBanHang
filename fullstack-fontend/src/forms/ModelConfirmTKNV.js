import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteTaiKhoan } from "../services/taiKhoanService";

const ModelConfirmTKNV = (props) => {
  const { show, handleClose, listData, getTaiKhoanNV } = props;

  const confirmDelete = async () => {
    let res = await deleteTaiKhoan(listData.idTaiKhoan);
    console.log("Check res delete TaiKhoan: " + res);
    if (res && res.statusCode === 200) {
      toast.success("This data has been deleted");
      handleClose();
      getTaiKhoanNV(0);
      
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
          <b>Ma: {listData.maTaiKhoan}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => confirmDelete()}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModelConfirmTKNV;
