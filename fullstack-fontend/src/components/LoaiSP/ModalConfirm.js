// import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteLoaiSP } from "../../services/LoaiSPService";
import { toast } from "react-toastify";

const ModalConfirm = (props) => {
  const { show, handleClose, isDataLoaiSP, getLoaiSP } = props;

  const confirmDelte = async () => {
    let res = await deleteLoaiSP(isDataLoaiSP.idLoaisp);
    console.log("Check res delete: " + res);
    if (res && res.statusCode === 200) {
      toast.success("Xóa thành công!");
      handleClose();
      getLoaiSP(0);
    } else {
      handleClose();
      toast.error("Xóa thất bại!");
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
          <div>Bạn có chắc muốn xóa không?</div>
          <br />
          <b>Mã: {isDataLoaiSP.maLsp}</b>
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
export default ModalConfirm;
